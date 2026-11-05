// Travel map: Leaflet + OpenStreetMap tiles, pins from assets/data/travel.json
(function () {
  var el = document.getElementById('travel-map');
  if (!el || !window.L) return;

  // One world-width (360 degrees) centred on the Pacific, matching lng() below.
  // Panning stops at these edges, so the view never drifts onto a repeated copy
  // of the world where no pins are drawn.
  var world = L.latLngBounds([-75, -30], [84, 330]);

  var map = L.map(el, {
    scrollWheelZoom: false,
    zoomSnap: 1,
    maxBounds: world,
    maxBoundsViscosity: 1,
  }).setView([35, 200], 2);

  // Never zoom out so far that the view is wider than one world.
  function fitMinZoom() {
    map.setMinZoom(Math.ceil(map.getBoundsZoom(world, true)));
  }
  fitMinZoom();
  window.addEventListener('resize', fitMinZoom);

  // Only capture the scroll wheel after the visitor clicks into the map.
  map.on('click focus', function () { map.scrollWheelZoom.enable(); });
  map.on('mouseout blur', function () { map.scrollWheelZoom.disable(); });

  // Standard OpenStreetMap tiles; dark mode is a CSS filter on the tile pane.
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Most pins are in North America and East Asia, so centre the map on the Pacific:
  // shift western longitudes east by 360 degrees so both regions sit side by side.
  function lng(lon) { return lon < -30 ? lon + 360 : lon; }

  function era(year) {
    if (year >= 2024) return 'recent';
    if (year >= 2016) return 'mid';
    return 'early';
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  fetch('assets/data/travel.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { render(data); })
    .catch(function () { el.classList.add('map-error'); });

  function render(data) {
    var places = data.places;
    var markers = places.map(function (p) {
      var latest = Math.max.apply(null, p.years);
      var icon = L.divIcon({
        className: '',
        html: '<span class="pin pin-' + era(latest) + '"></span>',
        iconSize: [16, 16], iconAnchor: [8, 8], popupAnchor: [0, -8],
      });
      var m = L.marker([p.lat, lng(p.lon)], { icon: icon, title: p.name, riseOnHover: true });
      m.bindPopup(
        '<strong>' + esc(p.name) + '</strong><span>' + esc(p.country) + '</span>' +
        '<em>' + p.years.slice().sort().join(' · ') + '</em>'
      );
      m.place = p;
      return m;
    });

    if (data.home) {
      L.marker([data.home.lat, lng(data.home.lon)], {
        icon: L.divIcon({ className: '', html: '<span class="pin pin-home"></span>', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -9] }),
        title: 'Home', zIndexOffset: 1000,
      }).bindPopup('<strong>' + esc(data.home.name) + '</strong><span>Home base</span>').addTo(map);
    }

    var layer = L.featureGroup().addTo(map);

    // Year filter chips
    var years = {};
    places.forEach(function (p) { p.years.forEach(function (y) { years[y] = true; }); });
    var sorted = Object.keys(years).map(Number).sort(function (a, b) { return b - a; });
    var filters = document.getElementById('travel-filters');
    function chip(label, value) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = label; b.dataset.year = value;
      b.setAttribute('aria-pressed', value === 'all' ? 'true' : 'false');
      b.addEventListener('click', function () { show(value); });
      filters.appendChild(b);
    }
    chip('All', 'all');
    sorted.forEach(function (y) { chip(String(y), String(y)); });

    function show(value) {
      layer.clearLayers();
      var visible = markers.filter(function (m) {
        return value === 'all' || m.place.years.indexOf(Number(value)) !== -1;
      });
      visible.forEach(function (m) { layer.addLayer(m); });
      Array.prototype.forEach.call(filters.children, function (b) {
        b.setAttribute('aria-pressed', b.dataset.year === value ? 'true' : 'false');
      });
      if (visible.length) {
        map.fitBounds(layer.getBounds(), { padding: [40, 40], maxZoom: value === 'all' ? 4 : 7 });
      }
      stats(visible.map(function (m) { return m.place; }), value);
    }

    function stats(list, value) {
      var countries = {};
      list.forEach(function (p) { countries[p.country] = true; });
      var yrs = {};
      list.forEach(function (p) {
        p.years.forEach(function (y) {
          if (value === 'all' || String(y) === value) yrs[y] = true;
        });
      });
      document.getElementById('stat-cities').textContent = list.length;
      document.getElementById('stat-countries').textContent = Object.keys(countries).length;
      document.getElementById('stat-years').textContent = Object.keys(yrs).length;
    }

    show('all');
  }
})();
