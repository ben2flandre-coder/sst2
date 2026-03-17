function getBasePath() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  if (parts[0] === 'sst2') return '/sst2';
  return '';
}

function toUrl(path) {
  return `${getBasePath()}${path}`;
}

function goToModule(n) {
  window.location.href = toUrl(`/modules/module-${n}.html`);
}

function goToUrgence(type) {
  window.location.href = toUrl(`/urgence/${type}.html`);
}

function goHome() {
  window.location.href = toUrl('/index.html');
}

function initNavigation() {
  const prev = document.querySelector('[data-nav="prev"]');
  const next = document.querySelector('[data-nav="next"]');
  const hub = document.querySelectorAll('[data-nav="hub"]');
  const urg = document.querySelectorAll('[data-nav="urgence"]');

  if (prev) {
    const target = document.body.dataset.prev;
    prev.disabled = !target;
    prev.addEventListener('click', () => { if (target) window.location.href = toUrl(target); });
  }
  if (next) {
    const target = document.body.dataset.next;
    next.disabled = !target;
    next.addEventListener('click', () => { if (target) window.location.href = toUrl(target); });
  }
  hub.forEach((el) => el.addEventListener('click', goHome));
  urg.forEach((el) => el.addEventListener('click', () => goToUrgence('arret-cardiaque')));
}
