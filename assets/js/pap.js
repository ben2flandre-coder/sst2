(function initPapFlow() {
  const pap = document.querySelector('[data-pap]');
  if (!pap) return;

  const steps = pap.querySelectorAll('[data-pap-step]');
  const title = pap.querySelector('[data-pap-title]');
  const text = pap.querySelector('[data-pap-text]');

  const details = {
    situation: {
      title: 'Situation',
      text: "Décrire le contexte réel : lieu, tâche, personne, moment. Sans interprétation.",
    },
    danger: {
      title: 'Danger',
      text: "Identifier la source de dommage : machine, sol, circulation, comportement, environnement.",
    },
    risque: {
      title: 'Risque',
      text: "Évaluer l'exposition : qui peut être touché, quand, et dans quelles conditions.",
    },
    dommage: {
      title: 'Dommage possible',
      text: "Anticiper la conséquence : coupure, chute, choc, malaise aggravé, arrêt d'activité.",
    },
    action: {
      title: 'Action de prévention',
      text: 'Choisir une mesure simple, immédiate et applicable par l’équipe terrain.',
    },
    transmission: {
      title: 'Transmission',
      text: 'Informer le bon relais avec un message court : fait, risque, action, urgence.',
    },
  };

  steps.forEach((step) => {
    step.addEventListener('click', () => {
      steps.forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
      });

      step.classList.add('is-active');
      step.setAttribute('aria-selected', 'true');
      const key = step.dataset.papStep;
      const detail = details[key];
      if (!detail) return;
      title.textContent = detail.title;
      text.textContent = detail.text;
    });
  });
})();
