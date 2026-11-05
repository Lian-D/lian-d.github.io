(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // ----- Theme toggle -----
  var toggle = document.querySelector('.theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: light)');
  function current() {
    return root.dataset.theme || (media.matches ? 'light' : 'dark');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = current() === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ----- Reveal on scroll -----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 30 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ----- Active nav link -----
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) navIO.observe(s); });
  }

  // ----- Cursor sheen on glass cards -----
  document.querySelectorAll('.card, .mini').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
