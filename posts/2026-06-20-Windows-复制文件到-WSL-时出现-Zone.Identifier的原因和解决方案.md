---
title: Windows 复制文件到 WSL 时出现 Zone.Identifier 的原因和解决方案
slug: 2026-06-20-windows-wsl-zone-identifier
description: 解释 Windows 文件复制到 WSL 后生成 :Zone.Identifier 文件的原因，并给出快速清理命令。
pubDate: 2026-06-20
updatedDate: 2026-06-20
tags:
  - 技术笔记
featured: false
---

某次直接把从网上下载、解压后得到的文件夹，从 Windows 文件夹拖动复制到 WSL 文件夹中，出现了一堆带 :Zone.Identifier 后缀的文件。下面是经过检索后整理出的原因和临时解决方案。

## 解决方案
可以在拖进 WSL 的文件夹顶层目录执行下面命令，先预览会匹配到哪些文件：
```shell
find . -name "*:Zone.Identifier"
```
然后执行
```shell
find . -name "*:Zone.Identifier" -delete
```

## 原因
`Zone.Identifier` 是 Windows 给文件附加的一种“来源标记”，基于NTFS的一种机制：Alternate Data Stream（ADS，备用数据流），ADS可以用于存储文件的元数据、版本信息等，不改变文件的主内容。

这些标记通常来自 Windows 的 Mark of the Web 机制。当文件从浏览器、压缩包或其他外部来源进入本机时，Windows 可能会记录它的来源区域。

Linux 的文件系统不支持 ADS，因此这些标记会呈现为独立文件。它们通常不会影响原文件内容。
