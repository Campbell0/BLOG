# Deploy To Cloudflare Pages

This site is an Astro static site. The recommended deployment path is:

```text
GitHub repository -> Cloudflare Pages Git integration -> automatic deploys
```

## Cloudflare Pages Settings

Use these build settings:

```text
Framework preset: Astro
Production branch: main
Build command: npm run build
Build output directory: dist
```

If you have a custom domain, set the production environment variable:

```text
SITE_URL=https://your-production-domain.com
```

If `SITE_URL` is not set, Cloudflare Pages will provide `CF_PAGES_URL` during the build. The site uses that as a fallback. The site publishes `/robots.txt`, `/sitemap.xml`, and `/rss.xml` during the Astro build.

If you do not have a custom domain yet, use your temporary `*.pages.dev` URL first and update it later.

## First GitHub Push

After creating an empty GitHub repository, run these commands from the project root:

```powershell
git remote add origin https://github.com/<your-gh-username>/<repository-name>.git
git add .
git commit -m "Initial blog setup"
git branch -M main
git push -u origin main
```

## Cloudflare Dashboard Steps

1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages`.
3. Select `Create application`.
4. Select the `Pages` tab.
5. Import the GitHub repository.
6. Use the build settings above.
7. Save and deploy.

Every push to `main` will trigger a new production deployment. Pull requests get preview deployments.

## Useful Checks

Before pushing:

```powershell
npm run verify
```

If Cloudflare builds but the site looks old, check that the output directory is exactly:

```text
dist
```

If RSS or sitemap links use the wrong domain, update `SITE_URL` in Cloudflare Pages environment variables and redeploy.

## Comments

Comments use Giscus and GitHub Discussions. See `docs/comments-giscus.md` for the required GitHub and Cloudflare Pages environment variable setup.
