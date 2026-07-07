(function () {
  const burger = document.querySelector('.burger');
  const navList = document.querySelector('.site-header .nav-list');
  if (!burger || !navList) return;

  const toggle = (force) => {
    const willOpen = typeof force === 'boolean' ? force : !navList.classList.contains('open');
    navList.classList.toggle('open', willOpen);
    burger.classList.toggle('open', willOpen);
    burger.setAttribute('aria-expanded', String(willOpen));
    document.body.style.overflow = willOpen ? 'hidden' : '';
  };

  burger.addEventListener('click', () => toggle());
  navList.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(false);
  });
})();
