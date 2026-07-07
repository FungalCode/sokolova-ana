# sokolova-ana

Personal website for Ana Sokolova. Built with [Eleventy](https://www.11ty.dev/) — plain HTML/CSS/JS with a small build step for shared layouts and partials.

## Prerequisites

- Node.js 18+

## Local development

```sh
npm install          # once, after cloning
npm run serve        # dev server with live reload
npm run build        # one-shot build into _site/
npm run clean        # delete _site/
```

Open the URL that `npm run serve` prints (usually http://localhost:8080).

## Structure

```
src/                 source — edit here
  _includes/         layout + shared partials (header, etc.)
  css/ js/ assets/   static files, copied verbatim
_site/               build output — do NOT edit or commit
.eleventy.js         Eleventy config
```

Change the header once in `src/_includes/header.njk`; every page picks it up on the next build.

## Deployment (git-based)

**Best practice: never commit `_site/` — let the host build it from `src/`.** `_site/` is generated output; treating it as source of truth invites drift between what's in git and what's live.

Recommended paths:

- **Netlify / Vercel / Cloudflare Pages** — connect the repo, set build command `npm run build`, publish directory `_site`. Every push to `main` auto-deploys. Zero config beyond that.
- **GitHub Pages** — add a workflow (`.github/workflows/deploy.yml`) that runs `npm ci && npm run build` and publishes `_site/` via `actions/deploy-pages`. Free, works well for academic sites.

Whichever host: the git repo stays clean (source only), builds happen in CI, and rollbacks are just `git revert`.
