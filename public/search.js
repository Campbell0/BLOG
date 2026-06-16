const root = document.querySelector('[data-search-root]');

if (root) {
  const input = root.querySelector('[data-search-input]');
  const results = root.querySelector('[data-search-results]');
  const count = root.querySelector('[data-search-count]');
  const indexNode = document.getElementById('search-index');
  const index = JSON.parse((indexNode && indexNode.textContent) || '[]');

  const esc = (value) =>
    String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');

  const render = (items) => {
    if (!results || !count) return;
    count.textContent = `${items.length} 条结果`;

    if (items.length === 0) {
      results.innerHTML = '<div class="search-empty">没有找到匹配内容，换个词试试。</div>';
      return;
    }

    results.innerHTML = items
      .map(
        (item) => `
          <article class="search-result">
            <div class="post-card__meta">
              <time datetime="${item.date}">${new Date(item.date).toLocaleDateString('zh-CN')}</time>
            </div>
            <h3><a href="${item.href}">${esc(item.title)}</a></h3>
            <p>${esc(item.description)}</p>
            <p class="search-result__excerpt">${esc(item.excerpt)}</p>
            <ul class="tag-list">
              ${item.tags.map((tag) => `<li>#${esc(tag)}</li>`).join('')}
            </ul>
          </article>
        `,
      )
      .join('');
  };

  const score = (item, query) => {
    const haystack = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.excerpt}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  };

  const apply = () => {
    const query = input && 'value' in input ? input.value.trim() : '';
    if (!query) {
      render(index);
      return;
    }
    render(index.filter((item) => score(item, query)));
  };

  if (input && 'addEventListener' in input) {
    input.addEventListener('input', apply);
  }

  render(index);
}
