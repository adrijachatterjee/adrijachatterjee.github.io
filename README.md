# adrijachatterjee.github.io ✿

My Ghibli-flavoured portfolio: a software dev, matcha, latte & chai girlie, wanderer and poet at heart.

Built with React + Vite + framer-motion. All characters (Jiji, soot sprites, Totoro, Calcifer, No-Face, kodama, Kiki) are hand-drawn SVGs in `src/art/`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Editing content

Everything (jobs, projects, places, cafés, Jiji's lines) lives in **`src/data.js`**.

- **Cafés:** add entries to `cafes` and they'll appear on the café card.
- **Photos / AI art:** drop images into `public/art/` and set the paths in `art`
  (`portrait` for the polaroid in About, `cafes` for café polaroids).

### Prompts for AI art (to match the site)

- *Portrait:* "soft watercolor anime illustration of a young Indian woman with long dark hair, holding a matcha latte by a window, black cat beside her, pastel sky, dreamy, Studio Ghibli inspired, warm light"
- *Café:* "cosy Bengaluru café interior, rain outside, latte art and a kulhad of chai on a wooden table, soft pastel anime background art, hand-painted"
- *Travel:* "girl on a broom flying over Kolkata's Howrah bridge at sunset, pastel anime style, fluffy cumulus clouds"

## Deploying

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
One-time setup: **repo Settings → Pages → Source: GitHub Actions**.
