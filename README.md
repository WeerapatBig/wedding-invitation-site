# Ice & Tao — Wedding Invitation

A bilingual (Thai + English) digital wedding invitation for **Waranphat (Ice) & Rakpon (Tao)** — **27 June 2026**, at **ศาลาประชาคมอ่าวอุดม (Ao Udom Community Hall)**.

Plain HTML / CSS / JavaScript. No framework, no build step.

## Run locally

Double-click `index.html` — it opens in the browser. That's it.

Or serve via any static server:

```bash
# Python
python -m http.server 8000

# Node (with `serve`)
npx serve .
```

## Project structure

```
.
├── index.html            ← page content (sections + envelope intro)
├── style.css             ← all visual styles
├── script.js             ← interactive behaviours (envelope, countdown, lightbox, petals, audio)
├── images/
│   ├── bg.png            ← envelope screen paper background
│   ├── card.png          ← envelope photo (embossed flap)
│   ├── stamp.png         ← gold wax seal
│   ├── flower1.png       ← cream peony for corner decorations
│   ├── flower2.png       ← sepia leaf accent
│   ├── thankyou.png      ← "thank you" title image
│   └── opt/              ← optimized webp variants of pre-wedding photos
├── audio/                ← background music mp3 (consent-gated playback)
├── vedio/                ← short pre-wedding film (mp4)
├── tools/
│   └── optimize-photos.mjs   ← sharp script to make webp variants
├── package.json          ← only declares sharp as a dev dep for the script
└── README.md
```

## Adding new photos

1. Drop the `.jpg`/`.png` into `images/Pre-Wedding/` (this folder is .gitignored — kept locally only)
2. Run `npm install` (one-time) then `npm run optimize`
3. New webp variants land in `images/opt/<slug>-{800,1200,2400}.webp`
4. In `index.html`, copy a `<figure>` block in the Gallery section and change the slug

There are clear CONFIG comment blocks inside `index.html` for the Hero, Story and Gallery photo swaps.

## Deploying

This is a static site — any of the following works:

- **GitHub Pages** — enable in repo Settings → Pages → "Deploy from branch: main / root"
- **Netlify** — drag & drop the project folder onto netlify.com (auto-deploys)
- **Vercel** — `vercel` CLI or import the GitHub repo
- **Cloudflare Pages** — same as above

## Credits

Design with love by **Nong Big** ♡

Photographs by the couple's pre-wedding photographer.

Music: *Those Eyes* — New West.

---

_All visual decisions live in `style.css` (tokens + section styles). Page is bilingual throughout with `lang="th"` attributes on Thai content for proper screen-reader pronunciation and a11y._
