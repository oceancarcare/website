# Ocean Car Care Website

Static React site for Ocean Car Detailing ZPA, deployed to GitHub Pages.

## Project files

- `index.html` — page shell and CDN-loaded React, React DOM, and HTM libraries.
- `app.js` — site components, page content, and interactions.
- `styles.css` — responsive layout, theme, and image styling.
- `assets/` — logo, images, and cinematic detailing video clips.
- `assets/hero-car-loop.mp4` — looping home page hero video.
- `assets/gallery/` — photo assets used by the gallery page.
- `assets/cinematic-sequence/clips/` — five video cuts scrubbed by scrolling through the detailing sequence.
- `.github/workflows/static.yml` — GitHub Pages deployment workflow.

## Preview

Open `index.html` in a browser. The site loads its JavaScript libraries and fonts from CDNs, so an internet connection is required.

Changes pushed to `main` are deployed by the GitHub Pages workflow.


## Gallery admin

Open `/admin/` on the GitHub Pages site to manage Gallery media. Sign in with a fine-grained GitHub personal access token scoped to `oceancarcare/website`, with repository Contents read/write permission. The token is kept in browser memory only and is not stored in the site or repository. The admin can browse, preview, upload, replace, delete, and update descriptions for supported media in `assets/gallery/`; Gallery captions are stored in `assets/gallery/gallery.json`.
