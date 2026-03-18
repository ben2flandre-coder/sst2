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

const NAV_GROUPS = {
  formation: [
    { label: 'Étape 1 • C1', href: '/modules/module-c1.html' },
    { label: 'Étape 2 • C2', href: '/modules/module-2.html' },
    { label: 'Étape 2 • C3', href: '/modules/module-3.html' },
    { label: 'Étape 3 • C4', href: '/modules/module-4.html' },
    { label: 'Étape 4 • C5', href: '/modules/module-5.html' },
    { label: 'Étape 5 • C6', href: '/modules/module-6.html' }
  ],
  revision: [
    { label: 'Révision terrain', href: '/revision/index.html' },
    { label: 'Livret SST', href: '/tools/livret.html' }
  ],
  urgence: [
    { label: 'Saignement', href: '/urgence/hemorragie.html' },
    { label: 'Étouffement', href: '/urgence/etouffement.html' },
    { label: 'Inconscience', href: '/urgence/inconscience.html' },
    { label: 'Arrêt cardiaque', href: '/urgence/arret-cardiaque.html' },
    { label: 'Brûlure', href: '/urgence/brulure.html' },
    { label: 'Malaise', href: '/urgence/malaise.html' }
  ],
  formateur: [
    { label: 'Accueil formateur', href: '/tools/ressources-formateur.html' },
    { label: 'PAP', href: '/tools/pap.html' },
    { label: 'PI', href: '/tools/pi.html' },
    { label: 'Médiathèque', href: '/tools/videos-inrs.html' },
    { label: 'Livret', href: '/tools/livret.html' }
  ]
};

const MODULE_CONTEXT = {
  '/modules/module-c1.html': {
    title: 'Étape suivante',
    links: [{ label: 'Aller à C2', href: '/modules/module-2.html' }]
  },
  '/modules/module-2.html': {
    title: 'Étape suivante',
    links: [{ label: 'Aller à C3', href: '/modules/module-3.html' }]
  },
  '/modules/module-3.html': {
    title: 'Étape suivante',
    links: [{ label: 'Aller à C4', href: '/modules/module-4.html' }]
  },
  '/modules/module-4.html': {
    title: 'Étape suivante',
    links: [{ label: 'Aller à C5', href: '/modules/module-5.html' }]
  },
  '/modules/module-5.html': {
    title: 'Accès C5',
    links: [
      { label: 'Saignement', href: '/urgence/hemorragie.html' },
      { label: 'Étouffement', href: '/urgence/etouffement.html' },
      { label: 'Arrêt cardiaque', href: '/urgence/arret-cardiaque.html' },
      { label: 'Adulte', href: '/modules/module-5.html#variante-adulte' },
      { label: 'Enfant', href: '/modules/module-5.html#variante-enfant' },
      { label: 'Nourrisson', href: '/modules/module-5.html#variante-nourrisson' }
    ]
  },
  '/modules/module-6.html': {
    title: 'Après le parcours',
    links: [
      { label: 'Révision terrain', href: '/revision/index.html' },
      { label: 'Aide-mémoire', href: '/tools/livret.html' }
    ]
  }
};

function getPageType(path) {
  if (path.includes('/tools/')) return 'tools';
  if (path.includes('/urgence/')) return 'urgence';
  if (path.includes('/revision/')) return 'revision';
  if (path.includes('/modules/')) return 'modules';
  return 'home';
}

function isActivePath(href) {
  const current = window.location.pathname.replace(getBasePath(), '');
  return current === href;
}

function renderGroup(title, links) {
  const chips = links
    .map((item) => `<a class="quick-link ${isActivePath(item.href) ? 'is-active' : ''}" href="${toUrl(item.href)}">${item.label}</a>`)
    .join('');
  return `<section class="quick-group"><h3>${title}</h3><div class="quick-links">${chips}</div></section>`;
}

function injectGlobalNav() {
  const main = document.querySelector('.app-main');
  if (!main || document.body.classList.contains('home-main')) return;

  const path = window.location.pathname.replace(getBasePath(), '');
  const type = getPageType(path);
  const sections = [
    renderGroup('Formation', NAV_GROUPS.formation),
    renderGroup('Révision', NAV_GROUPS.revision),
    renderGroup('Urgence', NAV_GROUPS.urgence)
  ];

  if (type === 'tools') {
    sections.unshift(renderGroup('Outils formateur', NAV_GROUPS.formateur));
  }

  const nav = document.createElement('nav');
  nav.className = 'global-nav';
  nav.innerHTML = `
    <details>
      <summary>${type === 'tools' ? 'Navigation formateur' : 'Navigation apprenant'}</summary>
      ${sections.join('')}
    </details>`;

  main.prepend(nav);
}

function injectBreadcrumb() {
  const main = document.querySelector('.app-main');
  if (!main || document.body.classList.contains('home-main')) return;
  const h1 = main.querySelector('h1');
  const label = h1 ? h1.textContent.trim() : 'Page SST';
  const path = window.location.pathname.replace(getBasePath(), '');
  let parent = { label: 'Formation', href: '/modules/module-c1.html' };
  if (path.includes('/urgence/')) parent = { label: 'Urgence', href: '/urgence/arret-cardiaque.html' };
  if (path.includes('/tools/')) parent = { label: 'Outils formateur', href: '/tools/ressources-formateur.html' };
  if (path.includes('/revision/')) parent = { label: 'Révision', href: '/revision/index.html' };

  const crumb = document.createElement('div');
  crumb.className = 'breadcrumb';
  crumb.innerHTML = `<a href="${toUrl('/index.html')}">Accueil</a><span>›</span><a href="${toUrl(parent.href)}">${parent.label}</a><span>›</span><strong>${label}</strong>`;
  main.prepend(crumb);
}

function injectModuleShortcuts() {
  const main = document.querySelector('.app-main');
  if (!main) return;
  const path = window.location.pathname.replace(getBasePath(), '');
  const config = MODULE_CONTEXT[path];
  if (!config) return;

  const section = document.createElement('section');
  section.className = 'module-shortcuts';
  section.innerHTML = `<h3>${config.title}</h3><div class="quick-links">${config.links.map((item) => `<a class="quick-link" href="${toUrl(item.href)}">${item.label}</a>`).join('')}</div>`;
  main.insertBefore(section, main.children[2] || null);
}

function injectSeeAlso() {
  const main = document.querySelector('.app-main');
  if (!main || document.body.classList.contains('home-main')) return;
  const path = window.location.pathname.replace(getBasePath(), '');
  if (path.includes('/tools/ressources-formateur.html')) return;

  const section = document.createElement('section');
  section.className = 'card see-also';

  let links = [
    { label: 'Révision terrain', href: '/revision/index.html' },
    { label: 'Urgence vitale', href: '/urgence/arret-cardiaque.html' },
    { label: 'Livret SST', href: '/tools/livret.html' }
  ];

  if (path.includes('/urgence/')) {
    links = [
      { label: 'C5 — Secourir', href: '/modules/module-5.html' },
      { label: 'Révision terrain', href: '/revision/index.html' },
      { label: 'Arrêt cardiaque / DAE', href: '/urgence/dae.html' }
    ];
  }

  if (path.includes('/tools/')) {
    links = [
      { label: 'Accueil formateur', href: '/tools/ressources-formateur.html' },
      { label: 'PAP', href: '/tools/pap.html' },
      { label: 'PI', href: '/tools/pi.html' }
    ];
  }

  section.innerHTML = `<h3>Voir aussi</h3><div class="quick-links">${links.map((l) => `<a class="quick-link" href="${toUrl(l.href)}">${l.label}</a>`).join('')}</div>`;
  main.append(section);
}

function initNavigation() {
  injectGlobalNav();
  injectBreadcrumb();
  injectModuleShortcuts();
  injectSeeAlso();

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
