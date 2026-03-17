(function () {
  const root = document.querySelector('[data-sst-simulator]');
  if (!root) return;

  const STORAGE_KEY = 'sst.simulator.progress.v1';
  const phaseLabel = {
    proteger: 'Protéger',
    examiner: 'Examiner',
    alerter: 'Alerter',
    secourir: 'Secourir',
  };

  const state = {
    data: null,
    index: 0,
    step: 0,
    score: 100,
    errors: [],
    start: Date.now(),
    variant: 'adulte',
    timer: 0,
    elapsed: 0,
  };

  const $ = (sel) => root.querySelector(sel);

  const readProgress = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  };

  const saveProgress = (report) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      updatedAt: new Date().toISOString(),
      lastReport: report,
    }));
  };

  const updateTimer = (limit) => {
    state.elapsed = Math.floor((Date.now() - state.start) / 1000);
    const remaining = Math.max(limit - state.elapsed, 0);
    $('[data-timer]').textContent = `${remaining}s`;
    if (remaining === 0) {
      state.score = Math.max(state.score - 5, 0);
      renderFeedback('⚠️ Pression temporelle : vous devez décider rapidement.', 'warn');
      state.start = Date.now();
    }
  };

  const renderFeedback = (text, tone) => {
    const box = $('[data-feedback]');
    box.className = `sim-feedback-box ${tone || ''}`;
    box.textContent = text;
  };

  const renderScore = () => {
    $('[data-score]').textContent = `${Math.max(0, state.score)}/100`;
    $('[data-errors]').textContent = `${state.errors.length}`;
  };

  const nextStep = () => {
    const scenario = state.data.scenarios[state.index];
    if (state.step >= scenario.steps.length - 1) {
      state.index += 1;
      state.step = 0;
      if (state.index >= state.data.scenarios.length) {
        finish();
        return;
      }
      renderScenario();
      return;
    }
    state.step += 1;
    renderScenario();
  };

  const handleChoice = (choice, stepData) => {
    const phase = phaseLabel[stepData.phase] || stepData.phase;
    if (choice.correct) {
      renderFeedback(`✅ ${choice.feedback}`, 'good');
      setTimeout(nextStep, 450);
      return;
    }

    state.score -= choice.critical ? 20 : 10;
    const message = choice.critical
      ? `❌ Erreur critique (${phase}) : ${choice.feedback}`
      : `❌ ${choice.feedback}`;
    state.errors.push({ scenario: state.data.scenarios[state.index].title, phase, message });
    renderFeedback(message, choice.critical ? 'bad' : 'warn');
    renderScore();
  };

  const renderChoices = (stepData) => {
    const container = $('[data-choices]');
    container.innerHTML = '';
    stepData.choices.forEach((choice) => {
      const btn = document.createElement('button');
      btn.className = 'btn-secondary';
      btn.textContent = choice.label;
      btn.type = 'button';
      btn.addEventListener('click', () => handleChoice(choice, stepData));
      container.appendChild(btn);
    });
  };

  const renderScenario = () => {
    const scenario = state.data.scenarios[state.index];
    const stepData = scenario.steps[state.step];
    $('[data-context]').textContent = `${scenario.context} — ${scenario.title}`;
    $('[data-description]').textContent = scenario.description;
    $('[data-variant-hint]').textContent = scenario.variantHints[state.variant];
    $('[data-phase]').textContent = phaseLabel[stepData.phase] || stepData.phase;
    $('[data-question]').textContent = stepData.question;
    $('[data-progress]').textContent = `${state.index + 1}/${state.data.scenarios.length}`;
    renderChoices(stepData);
    renderScore();
  };

  const finish = () => {
    clearInterval(state.timer);
    const pass = state.score >= state.data.meta.passingScore && state.errors.length <= 5;
    const axes = state.errors.slice(0, 3).map((err) => `- ${err.phase} : revoir ${err.scenario}`).join('\n') || '- Maintenir les acquis par entraînement régulier.';

    const report = {
      score: Math.max(0, state.score),
      elapsedSeconds: Math.floor((Date.now() - state.start) / 1000) + state.elapsed,
      errors: state.errors,
      validated: pass,
    };
    saveProgress(report);

    root.innerHTML = `
      <article class="card-action sim-report">
        <h3>Rapport automatique SST</h3>
        <p><strong>Score :</strong> ${report.score}/100</p>
        <p><strong>Erreurs :</strong> ${report.errors.length}</p>
        <p><strong>Temps de réaction :</strong> ${report.elapsedSeconds}s</p>
        <p><strong>Validation :</strong> ${pass ? '✅ Validée' : '❌ Non validée'}</p>
        <h4>Axes d'amélioration</h4>
        <pre>${axes}</pre>
        <button class="btn-primary" type="button" data-restart>Rejouer la simulation</button>
      </article>
    `;

    root.querySelector('[data-restart]').addEventListener('click', () => window.location.reload());
  };

  const boot = async () => {
    const response = await fetch('../assets/data/simulator-scenarios.json');
    state.data = await response.json();
    state.start = Date.now();

    const previous = readProgress();
    if (previous.lastReport) {
      $('[data-previous]').textContent = `Dernier score : ${previous.lastReport.score}/100 (${previous.lastReport.validated ? 'validé' : 'à retravailler'}).`;
    }

    root.querySelectorAll('[data-variant]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.variant = btn.dataset.variant;
        renderScenario();
      });
    });

    renderScenario();
    state.timer = setInterval(() => updateTimer(state.data.meta.timeLimit), 1000);
  };

  boot().catch(() => {
    root.innerHTML = '<p class="card error-block">Le simulateur est indisponible : impossible de charger les scénarios.</p>';
  });
})();
