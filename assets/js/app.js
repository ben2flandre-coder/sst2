document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  if (typeof initUI === 'function') initUI();

  document.querySelectorAll('[data-print-page]').forEach((button) => {
    button.addEventListener('click', () => window.print());
  });
});
