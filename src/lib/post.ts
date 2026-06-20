export function formatDate(value: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value);
}

export function formatShortDate(value: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
  }).format(value);
}

export function readingTime(body?: string) {
  const text = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const cjkChars = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latinWords =
    text
      .replace(/[\u3400-\u9fff]/g, ' ')
      .match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;

  const minutes = cjkChars / 400 + latinWords / 200;
  return Math.max(1, Math.ceil(minutes));
}
