(function () {
  const main = document.querySelector('main.content');
  const toc = document.querySelector('.toc');
  const list = toc && toc.querySelector('.toc-list');
  const toggleBtn = toc && toc.querySelector('.toc-mobile-toggle');
  const currentLabel = toggleBtn && toggleBtn.querySelector('.current-section');
  if (!main || !list) return;

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const usedSlugs = new Set();
  const uniqueSlug = (base) => {
    let s = base || 'section';
    let i = 2;
    while (usedSlugs.has(s)) {
      s = `${base}-${i++}`;
    }
    usedSlugs.add(s);
    return s;
  };

  const headerOffsetPx = () => {
    const root = getComputedStyle(document.documentElement);
    const val = root.getPropertyValue('--header-offset').trim();
    if (val.endsWith('rem')) {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      return parseFloat(val) * rem;
    }
    if (val.endsWith('px')) return parseFloat(val);
    return 88;
  };

  const buildTOC = () => {
    usedSlugs.clear();
    list.innerHTML = '';
    const h2s = Array.from(main.querySelectorAll('h2'));
    h2s.forEach((h2) => {
      if (!h2.id) h2.id = uniqueSlug(slugify(h2.textContent));
      else usedSlugs.add(h2.id);
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${h2.id}`;
      a.textContent = h2.textContent;
      a.addEventListener('click', () => {
        if (toc.classList.contains('open')) toc.classList.remove('open');
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    return h2s;
  };

  let h2s = buildTOC();

  const updateActive = () => {
    if (!h2s.length) return;
    const offset = headerOffsetPx() + 8;
    let activeIdx = -1;
    for (let i = 0; i < h2s.length; i++) {
      if (h2s[i].getBoundingClientRect().top - offset <= 0) activeIdx = i;
      else break;
    }
    if (activeIdx === -1) activeIdx = 0;
    Array.from(list.children).forEach((li, i) => {
      li.classList.toggle('active', i === activeIdx);
    });
    if (currentLabel) currentLabel.textContent = h2s[activeIdx].textContent;
  };

  updateActive();
  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive);

  const observer = new MutationObserver(() => {
    h2s = buildTOC();
    updateActive();
  });
  observer.observe(main, { childList: true, subtree: true, characterData: true });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      toc.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!toc.contains(e.target) && toc.classList.contains('open')) {
        toc.classList.remove('open');
      }
    });
  }
})();
