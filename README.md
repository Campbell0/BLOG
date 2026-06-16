# BLOG

这个仓库只同步 Obsidian vault 里的 `BLOG` 文件夹内容。

建议把 GitHub 仓库设为 private。写完博客笔记后，在这个目录运行：

```powershell
.\scripts\sync-blog.ps1
```

首次关联 GitHub 远程仓库：

```powershell
git remote add origin https://github.com/<your-name>/<your-repo>.git
git push -u origin main
```
