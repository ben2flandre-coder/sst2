(function initC678() {
  const risk = document.querySelector('[data-risk-mechanic]');
  if (risk) {
    const steps = risk.querySelectorAll('[data-risk-step]');
    const title = risk.querySelector('[data-risk-title]');
    const text = risk.querySelector('[data-risk-text]');
    const detailMap = {
      danger: ['DANGER', 'La source capable de blesser est présente.'],
      situation: ['SITUATION DANGEREUSE', 'Une personne est réellement exposée au danger.'],
      declencheur: ['ÉVÉNEMENT DÉCLENCHEUR', 'Un fait précis déclenche l’accident (pas, geste, redémarrage).'],
      dommage: ['DOMMAGE', 'La lésion probable est identifiée pour agir avant.'],
    };

    steps.forEach((step) => {
      step.addEventListener('click', () => {
        steps.forEach((item) => {
          item.classList.remove('is-active');
          item.setAttribute('aria-selected', 'false');
        });
        step.classList.add('is-active');
        step.setAttribute('aria-selected', 'true');
        const key = step.dataset.riskStep;
        const detail = detailMap[key];
        if (!detail) return;
        title.textContent = detail[0];
        text.textContent = detail[1];
      });
    });
  }

  const journey = document.querySelector('[data-pap-journey]');
  if (journey) {
    const steps = journey.querySelectorAll('[data-journey-step]');
    const text = document.querySelector('[data-journey-text]');
    const descriptions = {
      observe: 'Je prends une photo mentale : lieu, geste, matériel, personne exposée.',
      danger: 'Je nomme une source de dommage claire et visible.',
      analyse: 'Je relie exposition, probabilité et gravité en contexte réel.',
      dommage: 'J’anticipe la blessure la plus probable pour prioriser.',
      action: 'Je choisis une action simple qui réduit vite l’exposition.',
      transmets: 'Je transmets au bon relais pour action immédiate + suivi DUERP.',
    };

    steps.forEach((step) => {
      step.addEventListener('click', () => {
        steps.forEach((item) => item.classList.remove('is-active'));
        step.classList.add('is-active');
        text.textContent = descriptions[step.dataset.journeyStep] || '';
      });
    });
  }

  document.querySelectorAll('[data-scenario]').forEach((scenario) => {
    const btn = scenario.querySelector('[data-reveal]');
    if (!btn) return;
    const lines = scenario.querySelectorAll('.scenario-line');
    let index = 0;
    btn.addEventListener('click', () => {
      if (index < lines.length) {
        lines[index].classList.add('is-visible');
        index += 1;
      }
      if (index >= lines.length) {
        btn.disabled = true;
        btn.textContent = 'Analyse complète';
      } else {
        btn.textContent = 'Étape suivante';
      }
    });
  });

  const trainer = document.querySelector('[data-trainer-board]');
  if (trainer) {
    const presets = {
      btp: ['Passage au bord de tranchée sous pluie.', 'Bord non protégé.', 'Chute de hauteur dans fouille.', 'Barriérage + arrêt zone + info chef chantier.'],
      atelier: ['Main proche organe mobile au réglage.', 'Zone de coupe accessible.', 'Coupure grave.', 'Consignation + contrôle capot + briefing.'],
      bureau: ['Cartons en allée + salarié étourdi.', 'Obstacle circulation.', 'Trébuchement et choc tête.', 'Dégager + signaler manager + suivi santé.'],
      manutention: ['Palette instable en recul quai humide.', 'Charge instable + sol glissant.', 'Glissade et écrasement pied.', 'Balisage + absorbant + manutention en binôme.'],
    };

    trainer.querySelectorAll('[data-board-case]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const data = presets[btn.dataset.boardCase];
        if (!data) return;
        trainer.querySelector('[data-cell="observation"]').textContent = data[0];
        trainer.querySelector('[data-cell="danger"]').textContent = data[1];
        trainer.querySelector('[data-cell="risque"]').textContent = data[2];
        trainer.querySelector('[data-cell="action"]').textContent = data[3];
      });
    });
  }
})();
