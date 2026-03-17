function initUI() {
  const pulse = document.querySelector('.floating-urgence .btn-danger');
  if (!pulse) return;
  setInterval(() => {
    pulse.style.opacity = pulse.style.opacity === '0.75' ? '1' : '0.75';
  }, 900);
}
