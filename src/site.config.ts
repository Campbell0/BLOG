export const site = {
  title: "Campbell's Blog",
  author: 'Campbell',
  url: import.meta.env.SITE_URL ?? import.meta.env.CF_PAGES_URL ?? 'https://example.com',
  description: '个人博客',
  tagline: 'tech notes, project logs, and thinking in public',
  footer: '把问题写清楚，把经验留下来。',
  hero: {
    eyebrow: 'personal tech blog',
    title: '技术笔记、项目复盘和持续生长的想法',
    description:
      '这里整理我在编程学习、项目实践和工具使用中的观察。文章不追求一次性完美，而是尽量把问题、过程和判断写清楚。',
    highlights: ['技术学习', '项目复盘', '长期写作'],
  },
  status: {
    title: '这个博客正在持续建设中',
    paragraphs: [
      '我会先把值得反复回看的技术问题、源码阅读、实践踩坑和工具链经验放在这里。',
      '后续内容会按标签、搜索、RSS 和时间线持续整理，让文章不只是发布出去，也能被重新找回来。',
    ],
  },
  about: {
    title: '这里是我的长期技术笔记',
    intro: [
      '我是 Campbell，正在把自己的技术学习、项目实践和思考过程整理成一个可以长期维护的公开空间。',
      '我关注工程实践、Java 后端、前端工具链、AI 工具使用和个人知识管理。这个博客会更偏实践和复盘，而不是只保存结论。',
    ],
    stack: ['Java', 'Spring', 'Astro', 'TypeScript', 'Cloudflare Pages', 'Obsidian', 'GitHub'],
    topics: ['技术笔记', '项目复盘', 'AI 工具链', '学习方法', '个人知识管理'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Campbell0' },
      { label: 'RSS', href: '/rss.xml' },
    ],
  },
};
