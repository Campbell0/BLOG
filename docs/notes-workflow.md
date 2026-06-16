# Notes Workflow

This repository treats blog posts as Git-managed Markdown notes.

## Where Notes Live

Put published notes in:

```text
posts/
```

Each note is a Markdown file with frontmatter:

```md
---
title: 文章标题
description: 一句话摘要，会显示在列表和搜索里
pubDate: 2026-06-16
featured: false
tags:
  - 技术笔记
  - 项目复盘
hero: 文章页开头的一句话引导
---

正文从这里开始。
```

## Writing Loop

1. Create a Markdown file in `posts/`.
2. Run `npm run dev` and preview the note locally.
3. Run `npm run verify` before pushing.
4. Commit the change to Git.
5. Push to GitHub. Cloudflare Pages will build and publish it.

## Filename Convention

Use this shape:

```text
YYYY-MM-DD-short-english-slug.md
```

Example:

```text
2026-06-16-debugging-astro-content.md
```

This keeps URLs stable and easy to read.

## Drafts

For now, keep drafts outside `posts/` so they do not publish. A simple local folder works:

```text
drafts/
```

When a draft is ready, move it into `posts/`.
