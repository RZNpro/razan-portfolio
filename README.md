# RAZAN — Beyond Ideas

Personal portfolio of Razan Al-Awadh: a professional view plus an interactive painted "Explorer World" map.
Plain HTML/CSS/JS — no build step.

- `index.html` — professional view · `world.html` — the map · `project.html?p=<slug>` — case studies · `cv.html` — CV built from the content
- All text lives in `assets/js/content.js`.
- **Editing:** open `admin.html` on your own machine (served from `localhost`), edit, then *Publish* (writes `content.js`), then commit & push.
  The editor and the "Edit content" button only work locally; the live site never includes them.
- Pushing to `main` deploys to GitHub Pages (`.github/workflows/pages.yml`).

Run locally: `python3 -m http.server 5173` then open http://localhost:5173
