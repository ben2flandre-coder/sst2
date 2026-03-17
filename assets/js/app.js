document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  if (typeof initUI === 'function') initUI();
});
