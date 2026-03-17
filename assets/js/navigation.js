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
  competences: [
    { label: 'C1', href: '/modules/module-c1.html' },
    { label: 'C6', href: '/modules/module-6.html' },
    { label: 'C7', href: '/modules/module-7.html' },
    { label: 'C8', href: '/modules/module-8.html' },
    { label: 'C2', href: '/modules/module-2.html' },
    { label: 'C3', href: '/modules/module-3.html' },
    { label: 'C4', href: '/modules/module-4.html' },
    { label: 'C5', href: '/modules/module-5.html' }
  ],
  situations: [
    { label: 'Saignement abondant', href: '/urgence/hemorragie.html' },
    { label: 'Étouffement', href: '/urgence/etouffement.html' },
    { label: 'Malaise', href: '/urgence/malaise.html' },
    { label: 'Brûlure', href: '/urgence/brulure.html' },
    { label: 'Traumatisme / douleur', href: '/urgence/douleur-mouvements.html' },
    { label: 'Plaie simple', href: '/urgence/plaie-simple.html' },
    { label: 'Inconscience', href: '/urgence/inconscience.html' },
    { label: 'Arrêt cardiaque', href: '/urgence/arret-cardiaque.html' },
    { label: 'DAE', href: '/urgence/dae.html' }
  ],
  publics: [
    { label: 'Adulte', href: '/modules/module-5.html#variante-adulte' },
    { label: 'Enfant', href: '/modules/module-5.html#variante-enfant' },
    { label: 'Nourrisson', href: '/modules/module-5.html#variante-nourrisson' }
  ],
  outils: [
    { label: 'PAP SST', href: '/modules/module-6.html' },
    { label: 'PI SST', href: '/modules/module-5.html' },
    { label: 'Aide-mémoire PDF', href: '/tools/livret.html' },
    { label: 'Staying Alive', href: '/tools/staying-alive.html' },
    { label: 'Révision', href: '/revision/index.html' },
    { label: 'Simulateur / cas concrets', href: '/modules/module-8.html' }
  ]
};

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
  if (!main) return;

  const nav = document.createElement('nav');
  nav.className = 'global-nav';
  nav.innerHTML = `
    <details>
      <summary>Navigation premium SST</summary>
      ${renderGroup('Par compétences', NAV_GROUPS.competences)}
      ${renderGroup('Par situations', NAV_GROUPS.situations)}
      ${renderGroup('Par publics', NAV_GROUPS.publics)}
      ${renderGroup('Par outils', NAV_GROUPS.outils)}
    </details>`;

  main.prepend(nav);
}

function injectBreadcrumb() {
  const main = document.querySelector('.app-main');
  if (!main) return;
  const h1 = main.querySelector('h1');
  const label = h1 ? h1.textContent.trim() : 'Page SST';
  const path = window.location.pathname.replace(getBasePath(), '');
  let parent = { label: 'Parcours', href: '/modules/module-0.html' };
  if (path.includes('/urgence/')) parent = { label: 'Urgences', href: '/urgence/hemorragie.html' };
  if (path.includes('/tools/')) parent = { label: 'Outils', href: '/tools/livret.html' };
  if (path.includes('/revision/')) parent = { label: 'Révision', href: '/revision/index.html' };

  const crumb = document.createElement('div');
  crumb.className = 'breadcrumb';
  crumb.innerHTML = `<a href="${toUrl('/index.html')}">Accueil</a><span>›</span><a href="${toUrl(parent.href)}">${parent.label}</a><span>›</span><strong>${label}</strong>`;
  main.prepend(crumb);
}

function injectSeeAlso() {
  const main = document.querySelector('.app-main');
  if (!main) return;
  const path = window.location.pathname.replace(getBasePath(), '');
  const section = document.createElement('section');
  section.className = 'card see-also';

  let links = NAV_GROUPS.outils.slice(0, 3);
  if (path.includes('/urgence/')) links = [
    { label: 'PI SST', href: '/modules/module-5.html' },
    { label: 'Alerter (C4)', href: '/modules/module-4.html' },
    { label: 'Révision express', href: '/revision/index.html' }
  ];

  section.innerHTML = `<h3>Voir aussi</h3><div class="quick-links">${links.map((l) => `<a class="quick-link" href="${toUrl(l.href)}">${l.label}</a>`).join('')}</div>`;
  main.append(section);
}

function initNavigation() {
  injectGlobalNav();
  injectBreadcrumb();
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
