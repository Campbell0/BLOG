(() => {
  const panels = [...document.querySelectorAll('[data-search-panel]')];
  const openButtons = [...document.querySelectorAll('[data-search-open]')];
  let activePanel = null;
  let lastFocused = null;

  const esc = (value) =>
    String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');

  const formatDate = (value) =>
    new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(value));

  const getIndex = (root) => {
    const indexNode = root.querySelector('[data-search-index]') || document.getElementById('search-index');
    return JSON.parse((indexNode && indexNode.textContent) || '[]');
  };

  const initSearchRoot = (root) => {
    const input = root.querySelector('[data-search-input]');
    const results = root.querySelector('[data-search-results]');
    const count = root.querySelector('[data-search-count]');
    const index = getIndex(root);
    let currentItems = [...index];

    const render = (items, query = '') => {
      if (!results || !count) return;
      currentItems = items;
      count.textContent = query ? `${items.length} 条结果` : `${items.length} 篇文章`;

      if (items.length === 0) {
        results.innerHTML = `
          <div class="search-empty">
            <strong>没有找到匹配内容</strong>
            <span>换一个更短的关键词试试。</span>
          </div>
        `;
        return;
      }

      results.innerHTML = items
        .map(
          (item, index) => `
            <a class="search-result" href="${item.href}">
              <span class="search-result__index">${String(index + 1).padStart(2, '0')}</span>
              <span class="search-result__body">
                <span class="search-result__title">${esc(item.title)}</span>
                <span class="search-result__desc">${esc(item.description)}</span>
                <span class="search-result__meta">
                  <time datetime="${item.date}">${formatDate(item.date)}</time>
                  ${item.tags.map((tag) => `<span>#${esc(tag)}</span>`).join('')}
                </span>
              </span>
            </a>
          `,
        )
        .join('');
    };

    const matches = (item, query) => {
      const haystack = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.excerpt}`
        .normalize('NFKC')
        .toLowerCase();
      return haystack.includes(query.normalize('NFKC').toLowerCase());
    };

    const apply = () => {
      const query = input && 'value' in input ? input.value.trim() : '';
      render(query ? index.filter((item) => matches(item, query)) : index, query);
    };

    input?.addEventListener('input', apply);
    input?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && currentItems[0]) {
        window.location.href = currentItems[0].href;
      }
    });

    root.searchApply = apply;
    root.searchClear = () => {
      if (input) input.value = '';
      render(index);
    };
    root.searchFocus = () => input?.focus();

    render(index);
  };

  document.querySelectorAll('[data-search-root]').forEach(initSearchRoot);

  const openPanel = () => {
    const panel = panels[0];
    if (!panel) {
      window.location.href = '/search';
      return;
    }

    lastFocused = document.activeElement;
    activePanel = panel;
    panel.hidden = false;
    document.documentElement.classList.add('is-search-open');

    const root = panel.querySelector('[data-search-root]');
    root?.searchClear?.();
    window.setTimeout(() => root?.searchFocus?.(), 40);
  };

  const closePanel = () => {
    if (!activePanel) return;
    activePanel.hidden = true;
    activePanel = null;
    document.documentElement.classList.remove('is-search-open');
    if (lastFocused && 'focus' in lastFocused) lastFocused.focus();
  };

  openButtons.forEach((button) => {
    button.addEventListener('click', openPanel);
  });

  document.querySelectorAll('[data-search-close]').forEach((button) => {
    button.addEventListener('click', closePanel);
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTyping =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      target?.isContentEditable;

    if (event.key === 'Escape' && activePanel) {
      event.preventDefault();
      closePanel();
      return;
    }

    if (event.key === '/' && !isTyping) {
      event.preventDefault();
      openPanel();
    }
  });
})();
