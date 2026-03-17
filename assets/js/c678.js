(function initC678Simulator() {
  const modules = {
    c6: {
      label: 'C6',
      cases: [
        {
          badge: 'Atelier',
          title: 'Redémarrage après bourrage',
          situation: 'Tu vois un opérateur relancer la machine avec le capot ouvert et sa main proche des pièces en mouvement.',
          steps: [
            {
              key: 'danger',
              question: 'Où est le danger ?',
              correct: 1,
              choices: [
                {
                  label: 'Dans le bruit de la machine',
                  badReason: 'Le bruit gêne, mais ici ce n\'est pas la source immédiate de blessure grave.',
                },
                {
                  label: 'Dans la zone de coupe accessible capot ouvert',
                  goodReason: 'Exact. La zone de coupe est la source qui peut blesser immédiatement.',
                },
                {
                  label: 'Dans le planning serré de production',
                  badReason: 'La pression de cadence existe, mais le danger physique est la zone de coupe.',
                },
                {
                  label: 'Dans la lumière de l\'atelier',
                  badReason: 'La lumière peut fatiguer, mais elle n\'explique pas l\'accident immédiat ici.',
                },
              ],
            },
            {
              key: 'risque',
              question: 'Quel est le risque ?',
              correct: 2,
              choices: [
                { label: 'Rater la pause', badReason: 'Ce n\'est pas un risque de santé-sécurité immédiat.' },
                { label: 'Glisser sur un sol sec', badReason: 'Le scénario ne parle pas de sol glissant.' },
                { label: 'Contact brutal main/outil en mouvement', goodReason: 'Oui. Exposition + mouvement = risque de contact traumatique.' },
                { label: 'Perte de réseau informatique', badReason: 'Hors sujet prévention dans ce cas.' },
              ],
            },
            {
              key: 'dommage',
              question: 'Quel dommage possible ?',
              correct: 0,
              choices: [
                { label: 'Coupure grave ou amputation des doigts', goodReason: 'Correct. C\'est le dommage plausible au vu du danger.' },
                { label: 'Mal de dos différé', badReason: 'Possible ailleurs, mais pas le dommage principal ici.' },
                { label: 'Irritation oculaire légère', badReason: 'Pas cohérent avec la zone de coupe exposée.' },
              ],
            },
            {
              key: 'action',
              question: 'Quelle action immédiate et transmission ?',
              correct: 1,
              choices: [
                { label: 'Laisser finir puis en parler demain', badReason: 'Trop tardif. Le danger est immédiat et doit être supprimé maintenant.' },
                { label: 'Arrêt machine, consignation, capot fermé, info chef + QHSE', goodReason: 'Parfait : tu agis et tu transmets dans la foulée.' },
                { label: 'Prendre une photo sans intervenir', badReason: 'Documenter sans agir laisse l\'exposition active.' },
              ],
            },
          ],
        },
        {
          badge: 'Bureau',
          title: 'Allée d\'évacuation encombrée',
          situation: 'En fin de journée, cartons et câble traversent l\'allée pendant qu\'un collègue se déplace en regardant son téléphone.',
          steps: [
            {
              key: 'danger',
              question: 'Où est le danger ?',
              correct: 2,
              choices: [
                { label: 'Dans la couleur des cartons', badReason: 'La couleur ne crée pas le danger.' },
                { label: 'Dans le téléphone du collègue uniquement', badReason: 'L\'inattention joue, mais le danger matériel reste l\'obstacle.' },
                { label: 'Dans l\'obstacle bas (cartons + câble) sur l\'axe de marche', goodReason: 'Exact, c\'est la source de chute.' },
                { label: 'Dans la climatisation', badReason: 'Hors contexte de ce cas.' },
              ],
            },
            {
              key: 'risque',
              question: 'Quel est le risque ?',
              correct: 0,
              choices: [
                { label: 'Trébuchement avec chute au sol', goodReason: 'Oui, le risque est cohérent avec l\'obstacle.' },
                { label: 'Brûlure thermique', badReason: 'Aucune source chaude signalée.' },
                { label: 'Électrisation instantanée', badReason: 'Le câble au sol gêne surtout la marche dans ce cas.' },
              ],
            },
            {
              key: 'dommage',
              question: 'Quel dommage possible ?',
              correct: 1,
              choices: [
                { label: 'Rhume', badReason: 'Pas lié au mécanisme de chute.' },
                { label: 'Entorse cheville ou choc crânien', goodReason: 'Exact, dommages typiques après trébuchement.' },
                { label: 'Douleur dentaire', badReason: 'Pas le dommage attendu dans ce scénario.' },
              ],
            },
            {
              key: 'action',
              question: 'Quelle action immédiate et transmission ?',
              correct: 2,
              choices: [
                { label: 'Contourner et ignorer', badReason: 'Tu ne supprimes pas l\'exposition pour les autres.' },
                { label: 'Envoyer un mail plus tard', badReason: 'La prévention doit être immédiate ici.' },
                { label: 'Dégager l\'allée, sécuriser le câble, prévenir manager/référent', goodReason: 'Très bon réflexe PAP complet.' },
              ],
            },
          ],
        },
      ],
    },
    c7: {
      label: 'C7',
      cases: [
        {
          badge: 'BTP',
          title: 'Tranchée ouverte sous pluie',
          situation: 'Passage piéton maintenu, rubalise partielle, sol gras : les équipes rentrent du chantier.',
          steps: [
            {
              key: 'danger',
              question: 'Où est le danger ?',
              correct: 1,
              choices: [
                { label: 'Dans la météo annoncée demain', badReason: 'Ici, le danger est déjà présent sur zone.' },
                { label: 'Dans le bord de tranchée non protégé + sol glissant', goodReason: 'Exact : source de chute immédiate.' },
                { label: 'Dans les gants des opérateurs', badReason: 'Les gants ne sont pas la source de dommage ici.' },
              ],
            },
            {
              key: 'risque',
              question: 'Quel est le risque ?',
              correct: 0,
              choices: [
                { label: 'Pas de côté puis chute dans la fouille', goodReason: 'Oui, c\'est le scénario d\'accident probable.' },
                { label: 'Intoxication chimique', badReason: 'Aucune exposition chimique mentionnée.' },
                { label: 'Perte auditive aiguë', badReason: 'Pas d\'indice de bruit extrême dans le cas.' },
              ],
            },
            {
              key: 'dommage',
              question: 'Quel dommage possible ?',
              correct: 2,
              choices: [
                { label: 'Fatigue mentale', badReason: 'Ce n\'est pas le dommage principal lié à la chute.' },
                { label: 'Déshydratation', badReason: 'Hors mécanisme ici.' },
                { label: 'Fracture / traumatisme crânien', goodReason: 'Correct. Le dommage est cohérent avec la chute de hauteur.' },
              ],
            },
            {
              key: 'action',
              question: 'Quelle action immédiate et transmission ?',
              correct: 1,
              choices: [
                { label: 'Laisser un cône et repartir', badReason: 'Insuffisant pour neutraliser le danger de chute.' },
                { label: 'Stopper le passage, barriérage rigide, alerte chef chantier + traçabilité', goodReason: 'Exact : action immédiate et transmission utile.' },
                { label: 'Attendre la réunion hebdo', badReason: 'La prévention ne peut pas attendre dans cette situation.' },
              ],
            },
          ],
        },
        {
          badge: 'Manutention',
          title: 'Quai humide et palette haute',
          situation: 'Un cariste recule, visibilité réduite, flaque en zone de manœuvre, palette désaxée.',
          steps: [
            {
              key: 'danger',
              question: 'Où est le danger ?',
              correct: 0,
              choices: [
                { label: 'Sol glissant + charge instable en déplacement', goodReason: 'Exact. Deux sources de dommage cumulées.' },
                { label: 'Le badge du cariste', badReason: 'Sans lien avec l\'accident probable.' },
                { label: 'Le bruit de la radio', badReason: 'Pas la source principale ici.' },
              ],
            },
            {
              key: 'risque',
              question: 'Quel est le risque ?',
              correct: 1,
              choices: [
                { label: 'Retard de chargement', badReason: 'Ce n\'est pas un risque sécurité.' },
                { label: 'Glissade + perte de charge avec choc', goodReason: 'Oui, chaîne d\'accident crédible.' },
                { label: 'Coup de soleil', badReason: 'Pas cohérent avec le contexte.' },
              ],
            },
            {
              key: 'dommage',
              question: 'Quel dommage possible ?',
              correct: 2,
              choices: [
                { label: 'Irritation de gorge', badReason: 'Hors mécanisme décrit.' },
                { label: 'Conjonctivite', badReason: 'Pas le dommage attendu ici.' },
                { label: 'Fracture poignet / écrasement pied', goodReason: 'Correct, dommage plausible sur quai.' },
              ],
            },
            {
              key: 'action',
              question: 'Quelle action immédiate et transmission ?',
              correct: 0,
              choices: [
                { label: 'Baliser, assécher, stabiliser la palette, prévenir chef + QHSE', goodReason: 'Parfait : agir puis transmettre avec traçabilité.' },
                { label: 'Finir la manœuvre rapidement', badReason: 'Accélérer augmente le risque au lieu de le réduire.' },
                { label: 'Demander juste plus de vigilance', badReason: 'La vigilance seule ne supprime pas le danger.' },
              ],
            },
          ],
        },
      ],
    },
    c8: {
      label: 'C8',
      cases: [
        {
          badge: 'Logistique',
          title: 'Batterie de transpalette en charge',
          situation: 'Le chargeur chauffe, câble abîmé, passage fréquent à proximité de la zone.',
          steps: [
            {
              key: 'danger',
              question: 'Où est le danger ?',
              correct: 1,
              choices: [
                { label: 'Dans la pause café', badReason: 'Aucun lien avec le danger électrique observé.' },
                { label: 'Dans le câble endommagé + échauffement du chargeur', goodReason: 'Exact, danger électrique/incendie concret.' },
                { label: 'Dans la couleur du transpalette', badReason: 'Hors sujet.' },
              ],
            },
            {
              key: 'risque',
              question: 'Quel est le risque ?',
              correct: 2,
              choices: [
                { label: 'Blocage administratif', badReason: 'Pas un risque sécurité immédiat.' },
                { label: 'Perte de stock', badReason: 'Conséquence possible mais pas le risque corporel principal.' },
                { label: 'Électrisation ou départ de feu', goodReason: 'Correct.' },
              ],
            },
            {
              key: 'dommage',
              question: 'Quel dommage possible ?',
              correct: 0,
              choices: [
                { label: 'Brûlure grave / arrêt cardio-respiratoire', goodReason: 'Oui, dommage majeur à anticiper.' },
                { label: 'Ampoule au pied', badReason: 'Sans rapport avec le scénario.' },
                { label: 'Fatigue visuelle', badReason: 'Ce n\'est pas la priorité de ce cas.' },
              ],
            },
            {
              key: 'action',
              question: 'Quelle action immédiate et transmission ?',
              correct: 2,
              choices: [
                { label: 'Couper le son de l\'alarme', badReason: 'Masquer le signal n\'enlève pas le danger.' },
                { label: 'Noter pour plus tard', badReason: 'Trop tardif face à un risque d\'incendie.' },
                { label: 'Mettre hors tension, isoler la zone, maintenance + alerte encadrement', goodReason: 'Réponse attendue : agir vite et transmettre correctement.' },
              ],
            },
          ],
        },
        {
          badge: 'Commerce',
          title: 'Nettoyage sans balisage',
          situation: 'Entrée magasin mouillée, agent d\'entretien seul, clients qui continuent à passer.',
          steps: [
            {
              key: 'danger',
              question: 'Où est le danger ?',
              correct: 0,
              choices: [
                { label: 'Dans le sol mouillé non signalé', goodReason: 'Exact, source directe de chute.' },
                { label: 'Dans la musique d\'ambiance', badReason: 'Aucun lien avec le danger principal.' },
                { label: 'Dans le logo à l\'entrée', badReason: 'Hors sujet.' },
              ],
            },
            {
              key: 'risque',
              question: 'Quel est le risque ?',
              correct: 1,
              choices: [
                { label: 'Erreur de caisse', badReason: 'Pas lié au sol mouillé.' },
                { label: 'Glissade des clients/salariés', goodReason: 'Oui, c\'est le risque probable.' },
                { label: 'Panne d\'éclairage', badReason: 'Non décrit dans la situation.' },
              ],
            },
            {
              key: 'dommage',
              question: 'Quel dommage possible ?',
              correct: 2,
              choices: [
                { label: 'Extinction de voix', badReason: 'Sans rapport.' },
                { label: 'Trouble du sommeil', badReason: 'Pas le dommage immédiat attendu.' },
                { label: 'Chute avec fracture poignet/hanche', goodReason: 'Correct.' },
              ],
            },
            {
              key: 'action',
              question: 'Quelle action immédiate et transmission ?',
              correct: 1,
              choices: [
                { label: 'Accélérer le nettoyage sans prévenir', badReason: 'Le flux piéton reste exposé.' },
                { label: 'Baliser, dévier le flux, sécher, informer responsable + registre', goodReason: 'Très bien : action + transmission formalisée.' },
                { label: 'Demander aux clients d\'être prudents', badReason: 'Le message seul ne remplace pas la suppression du danger.' },
              ],
            },
          ],
        },
      ],
    },
  };

  const createCaseHtml = (moduleCase, caseIndex) => {
    const stepLabels = ['Observer', 'Analyser', 'Agir', 'Transmettre'];
    return `
      <article class="sim-card" data-case-index="${caseIndex}">
        <p class="badge">${moduleCase.badge}</p>
        <h3>${moduleCase.title}</h3>
        <p class="sim-stage"><strong>Observer</strong> : ${moduleCase.situation}</p>
        <p class="sim-stepper">${stepLabels.join(' → ')}</p>
        <div class="sim-question" data-question></div>
        <div class="sim-choices" data-choices></div>
        <p class="sim-feedback" data-feedback aria-live="polite"></p>
        <p class="sim-score" data-score>Progression : 0/${moduleCase.steps.length} étapes validées</p>
      </article>
    `;
  };

  const renderStep = (card, moduleCase, state, onSuccess) => {
    const questionEl = card.querySelector('[data-question]');
    const choicesEl = card.querySelector('[data-choices]');
    const feedbackEl = card.querySelector('[data-feedback]');
    const scoreEl = card.querySelector('[data-score]');

    if (state.stepIndex >= moduleCase.steps.length) {
      questionEl.innerHTML = '<strong>Cas validé ✅</strong> Tu as suivi la logique PAP complète.';
      choicesEl.innerHTML = '';
      feedbackEl.className = 'sim-feedback is-good';
      feedbackEl.textContent = 'Observer → Analyser → Agir → Transmettre : enchaînement validé.';
      scoreEl.textContent = `Progression : ${moduleCase.steps.length}/${moduleCase.steps.length} étapes validées`;
      onSuccess();
      return;
    }

    const step = moduleCase.steps[state.stepIndex];
    questionEl.innerHTML = `<strong>Étape ${state.stepIndex + 1}</strong> — ${step.question}`;
    choicesEl.innerHTML = '';

    step.choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn-secondary sim-choice-btn';
      btn.type = 'button';
      btn.textContent = choice.label;
      btn.addEventListener('click', () => {
        const isCorrect = idx === step.correct;
        if (isCorrect) {
          state.stepIndex += 1;
          feedbackEl.className = 'sim-feedback is-good';
          feedbackEl.textContent = `✅ ${choice.goodReason || 'Bonne décision.'}`;
          scoreEl.textContent = `Progression : ${state.stepIndex}/${moduleCase.steps.length} étapes validées`;
          renderStep(card, moduleCase, state, onSuccess);
          return;
        }

        feedbackEl.className = 'sim-feedback is-bad';
        feedbackEl.textContent = `❌ Faux. ${choice.badReason || 'Ce choix ne protège pas efficacement.'} Raisonnement attendu : identifier la source réelle, anticiper le dommage puis choisir une action immédiate transmise au bon relais.`;
      });
      choicesEl.appendChild(btn);
    });
  };

  document.querySelectorAll('[data-simulator]').forEach((container) => {
    const key = container.dataset.simulator;
    const moduleData = modules[key];
    if (!moduleData) return;

    let completedCases = 0;
    const completedMap = new Set();
    const globalProgress = document.querySelector('[data-sim-global-progress]');
    container.innerHTML = moduleData.cases.map(createCaseHtml).join('');

    const updateGlobalProgress = () => {
      if (!globalProgress) return;
      globalProgress.textContent = `${moduleData.label} : ${completedCases}/${moduleData.cases.length} cas validés.`;
    };

    container.querySelectorAll('[data-case-index]').forEach((card) => {
      const caseIndex = Number(card.dataset.caseIndex);
      const moduleCase = moduleData.cases[caseIndex];
      const state = { stepIndex: 0 };
      renderStep(card, moduleCase, state, () => {
        if (completedMap.has(caseIndex)) return;
        completedMap.add(caseIndex);
        completedCases += 1;
        updateGlobalProgress();
      });
    });

    updateGlobalProgress();
  });
})();
