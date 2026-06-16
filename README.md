# Campbell's Blog

An Astro-powered personal blog for Git-managed technical notes, project reviews, search, tags, comments, and RSS.

## Develop

```powershell
npm install
npm run dev
```

## Verify

```powershell
npm run verify
```

## Content

Published notes live in `posts/`.

See `docs/notes-workflow.md` for the writing workflow.

Draft notes can live in `_drafts/`; that folder is ignored by Git and will not be published.

## Deploy

Deploy with Cloudflare Pages Git integration:

```text
Build command: npm run build
Build output directory: dist
Optional environment variable: SITE_URL=https://your-production-domain.com
```

See `docs/deploy-cloudflare-pages.md` for the full setup.
