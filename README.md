# liand.dev

Personal portfolio of Lian Duan, served by GitHub Pages at [liand.dev](https://liand.dev).

It's a hand-built static site: plain HTML, CSS and a little JavaScript, with no build step and no framework.

```
index.html          the whole site (one page)
404.html            not-found page
assets/css/style.css  frosted-glass theme (light and dark)
assets/js/main.js   theme toggle, scroll reveal, active nav
images/             project thumbnails
resume/             resume PDFs
```

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Updating

- **Content:** edit `index.html` directly. Each section is commented (`<!-- WORK -->`, `<!-- PROJECTS -->`, and so on).
- **Resume:** add a new PDF to `resume/` and update the the `resume/...pdf` links in `index.html`.
- **Colours:** every colour is a token at the top of `style.css`.
