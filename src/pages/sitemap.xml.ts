import type { APIContext } from 'astro';
import { getPosts, getTagCounts } from '@/lib/blog';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://example.com');
  const posts = await getPosts();
  const tags = getTagCounts(posts);

  const paths = [
    '/',
    '/posts/',
    '/tags/',
    '/search/',
    '/rss.xml',
    ...posts.map((post) => `/posts/${post.id}/`),
    ...tags.map((tag) => `/tags/${tag.slug}/`),
  ];

  const urls = paths
    .map((path) => {
      const loc = new URL(path, site).toString();
      return `  <url><loc>${escapeXml(loc)}</loc></url>`;
    })
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
