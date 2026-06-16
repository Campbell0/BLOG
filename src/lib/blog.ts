import { getCollection } from 'astro:content';

export async function getPosts() {
  return (await getCollection('blog')).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function getTagCounts(posts: Awaited<ReturnType<typeof getPosts>>) {
  const counts = new Map<string, { label: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const key = slugifyTag(tag);
      const current = counts.get(key);
      counts.set(key, {
        label: current?.label ?? tag.trim(),
        count: (current?.count ?? 0) + 1,
      });
    }
  }

  return [...counts.entries()]
    .map(([slug, value]) => ({ slug, ...value }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

export function slugifyTag(tag: string) {
  return normalizeTag(tag).replace(/\s+/g, '-');
}

export function unslugifyTag(tag: string) {
  return tag.replace(/-/g, ' ');
}

export function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function makeExcerpt(value: string, maxLength = 180) {
  const text = stripMarkdown(value);
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text;
}
