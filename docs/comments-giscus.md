# Giscus Comments

This site loads comments with Giscus only when all required public environment variables are set.

## GitHub Setup

1. Open the GitHub repository.
2. Enable `Settings -> Features -> Discussions`.
3. Install or enable the Giscus GitHub app for the repository.
4. Open `https://giscus.app`.
5. Enter the repository:

```text
Campbell0/BLOG
```

6. Choose a Discussions category, for example `Announcements`.
7. Copy the generated values into Cloudflare Pages environment variables.

## Cloudflare Pages Variables

Set these variables for Production:

```text
PUBLIC_GISCUS_REPO=Campbell0/BLOG
PUBLIC_GISCUS_REPO_ID=<from giscus.app>
PUBLIC_GISCUS_CATEGORY=Announcements
PUBLIC_GISCUS_CATEGORY_ID=<from giscus.app>
```

After saving the variables, redeploy the site. If any value is missing, the comments section stays hidden.
