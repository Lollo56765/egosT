/* =========================================================
   egosDashboard — script.js
   Gestisce: navigazione, allenamenti, entrate, localStorage
   ========================================================= */

'use strict';

// ── Utility ──────────────────────────────────────────────

/** Formatta un numero come valuta italiana */
function formatCurrency(n) {
  return '€ ' + Number(n).toLocaleString('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/** Formatta una data ISO in formato leggibile */
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
}

/** Data di oggi in formato YYYY-MM-DD */
function todayISO() {
  return new Date().toISOString().split('T')[0];
}

/** Genera un ID univoco semplice */
function uid() {
  return Math.random().toString(36).slice(2, 10);
}


// ── LocalStorage helpers ──────────────────────────────────

function loadKey(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveKey(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
}


// ── Dati allenamento ─────────────────────────────────────

const DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

const WORKOUT_PLAN = [
  // Lunedì — Petto, Spalle, Tricipiti
  {
    focus: 'Petto · Spalle · Tricipiti',
    type: 'strength',
    exercises: [
      {
        name: 'Piegamenti', icon: '💪', sets: '4 × max',
        muscles: ['Petto', 'Tricipiti', 'Spalle'],
        desc: 'L\'esercizio fondamentale per il petto a corpo libero. Coinvolge petto, tricipiti e deltoide anteriore in modo sinergico.',
        steps: [
          'Mani leggermente più larghe delle spalle, corpo rettilineo.',
          'Contrai addome e glutei come se fossi in plank.',
          'Abbassa il petto quasi fino al suolo in 2-3 secondi.',
          'Spingi via esplosivamente tornando alla posizione alta.',
          'Non bloccare i gomiti: mantieni una leggerissima flessione.'
        ],
        tip: 'Per aumentare la difficoltà alza i piedi su una sedia; per facilitare, usa le ginocchia.',
        difficulty: 'Base'
      },
      {
        name: 'Distensioni manubri', icon: '🏋️', sets: '4 × 8–12',
        muscles: ['Petto', 'Spalle'],
        desc: 'Distensioni su panca o pavimento con manubri: permette un arco di movimento più ampio rispetto al bilanciere, massimizzando l\'allungamento del grande pettorale.',
        steps: [
          'Sdraiato, piedi piatti. Manubri ai lati del petto, palme avanti.',
          'Spingi i pesi verso il soffitto convergendo leggermente nella salita.',
          'Contrai il petto in cima — pensa di «abbracciare un albero».',
          'Abbassa lentamente fino a sentire lo stretch, gomiti a 45–60° dal busto.'
        ],
        tip: 'Respira dentro nella discesa, soffia fuori durante la spinta.',
        difficulty: 'Intermedio'
      },
      {
        name: 'Croci con manubri', icon: '🦅', sets: '3 × 10–12',
        muscles: ['Petto'],
        desc: 'Esercizio di isolamento per il grande pettorale, in particolare la parte mediale. Ideale come esercizio di finitura dopo le distensioni.',
        steps: [
          'Partenza con manubri sopra il petto, palme affacciate.',
          'Apri le braccia lateralmente mantenendo i gomiti leggermente piegati.',
          'Scendi finché i gomiti sono al livello delle spalle.',
          'Riporta i manubri in cima con un arco ampio, come se abbracciassi qualcuno di grande.'
        ],
        tip: 'Usa carichi leggeri e concentrati sulla sensazione nel petto, non sul peso sollevato.',
        difficulty: 'Intermedio'
      },
      {
        name: 'Alzate laterali', icon: '🙆', sets: '3 × 12',
        muscles: ['Spalle (laterale)'],
        desc: 'Esercizio di isolamento per il capo laterale del deltoide. Crea larghezza visiva alle spalle.',
        steps: [
          'In piedi, manubri ai fianchi, palme verso il corpo.',
          'Gomiti leggermente piegati per tutto il movimento.',
          'Alza le braccia lateralmente fino all\'altezza delle spalle (non oltre).',
          'Abbassa in 2 secondi controllando la discesa.',
          'Non oscillare il busto: il movimento viene solo dalle spalle.'
        ],
        tip: 'Ruota i mignoli leggermente verso l\'alto durante la salita — come se stessi versando acqua da due tazze.',
        difficulty: 'Base'
      },
      {
        name: 'Dip', icon: '⬇️', sets: '3 × max',
        muscles: ['Tricipiti', 'Petto inferiore'],
        desc: 'Esercizio composto eccellente per tricipiti e petto inferiore. Può essere fatto tra due sedie se non hai le parallele.',
        steps: [
          'Appoggiati sulle parallele o sul bordo di due sedie, gomiti estesi.',
          'Inclina il busto leggermente in avanti per enfatizzare il petto.',
          'Abbassa fino a quando i gomiti formano ~90°.',
          'Spingi via fino quasi all\'estensione completa, senza bloccare.',
          'Non abbassarti eccessivamente: mantieni il controllo.'
        ],
        tip: 'Se è troppo duro, inizia con i piedi a terra. Se è troppo facile, aggiungi un peso sulle cosce.',
        difficulty: 'Avanzato'
      },
      {
        name: 'Plank', icon: '🧱', sets: '3 × 60 s',
        muscles: ['Core', 'Addominali', 'Lombari'],
        desc: 'Esercizio isometrico per la stabilità del core. Lavora contemporaneamente addominali, obliqui, lombari e glutei.',
        steps: [
          'Appoggiati sugli avambracci e le punte dei piedi.',
          'Corpo perfettamente rettilineo: no all\'arco lombare, no al sedere alto.',
          'Contrai addome come se aspettassi un pugno, glutei stretti.',
          'Guarda verso il suolo, collo in posizione neutra.',
          'Respira regolarmente per tutto il tempo.'
        ],
        tip: 'Per rendere più difficile: solleva alternativamente una gamba di 5 cm, o porta un ginocchio verso il gomito.',
        difficulty: 'Base'
      }
    ]
  },

  // Martedì — Corsa
  {
    focus: 'Cardio · Resistenza',
    type: 'run',
    duration: '30–40 minuti',
    exercises: [
      {
        name: 'Corsa continua', icon: '🏃', sets: '30–40 min',
        muscles: ['Gambe', 'Cuore', 'Polmoni'],
        desc: 'Corsa a ritmo moderato e costante. Obiettivo: mantenere un passo che ti permetta di pronunciare frasi brevi senza affannarti.',
        steps: [
          '5 min di camminata veloce come riscaldamento.',
          'Aumenta gradualmente il passo nei primi 5 minuti.',
          'Mantieni un ritmo conversazionale per 20–30 min.',
          'Ultimi 5 min: diminuisci il passo, poi cammina 5 min.',
          'Termina con 5 min di stretching leggero a gambe e polpacci.'
        ],
        tip: 'Se è troppo duro correre per tutto il tempo, alterna 2 min di corsa e 1 min di camminata. Costruisci il volume settimana per settimana.',
        difficulty: 'Base'
      }
    ]
  },

  // Mercoledì — Schiena, Bicipiti, Addominali
  {
    focus: 'Schiena · Bicipiti · Addominali',
    type: 'strength',
    exercises: [
      {
        name: 'Trazioni', icon: '🏗️', sets: '4 × max',
        muscles: ['Dorsali', 'Bicipiti', 'Core'],
        desc: 'Re degli esercizi per la schiena. Richiede una sbarra fissa. Coinvolge praticamente tutta la muscolatura della parte alta del dorso.',
        steps: [
          'Presa prona (palme avanti), distanza spalle o leggermente oltre.',
          'Parti da braccia quasi estese, scapole leggermente depresse.',
          'Tira i gomiti verso i fianchi — non verso le orecchie.',
          'Porta il mento sopra la sbarra senza ruotare il collo.',
          'Abbassa lentamente fino quasi all\'estensione in 3 secondi.'
        ],
        tip: 'Se non riesci ancora, usa un elastico sotto i piedi come assistenza, oppure fai le negative: sali con un salto e abbassati il più lentamente possibile.',
        difficulty: 'Avanzato'
      },
      {
        name: 'Rematore con manubrio', icon: '🚣', sets: '4 × 10',
        muscles: ['Dorsali', 'Romboidi', 'Bicipiti'],
        desc: 'Esercizio fondamentale per lo spessore della schiena. Si esegue un braccio alla volta appoggiandosi a una panca o sedia.',
        steps: [
          'Ginocchio e mano dello stesso lato appoggiate sulla panca.',
          'Schiena parallela al suolo, colonna neutra.',
          'Tieni il manubrio con il braccio libero, palma verso di te.',
          'Tira il gomito verso il soffitto — gomito vicino al busto.',
          'Abbassa lentamente, lascia che la scapola scivoli in avanti.'
        ],
        tip: 'Pensa di avviare il movimento con il gomito, non con la mano. Concentrati sulla scapola che si avvicina alla colonna.',
        difficulty: 'Intermedio'
      },
      {
        name: 'Curl bicipiti', icon: '💪', sets: '3 × 10–12',
        muscles: ['Bicipiti', 'Brachiale'],
        desc: 'Esercizio classico per i bicipiti. Semplice ma efficace se fatto con il giusto controllo.',
        steps: [
          'In piedi, manubri ai fianchi, palme avanti.',
          'Gomiti fermi ai fianchi — non devono spostarsi.',
          'Porta i manubri verso le spalle in 1 secondo.',
          'Fai una pausa di mezzo secondo in cima.',
          'Abbassa in 2–3 secondi, quasi fino all\'estensione.'
        ],
        tip: 'La fase di discesa (eccentrica) è importante quanto la salita. Non lanciare i pesi giù.',
        difficulty: 'Base'
      },
      {
        name: 'Curl martello', icon: '🔨', sets: '3 × 10',
        muscles: ['Brachiale', 'Brachioradiale'],
        desc: 'Variante del curl con presa neutra (palme affacciate). Isola meglio il brachiale e aggiunge spessore al braccio.',
        steps: [
          'In piedi, manubri ai fianchi, palme affacciate (come un martello).',
          'Senza ruotare il polso, porta il manubrio verso la spalla.',
          'Mantenere il gomito fermo al fianco.',
          'Abbassa lentamente e controlla la discesa.'
        ],
        tip: 'Puoi fare i due lati in alternanza per mantenere la concentrazione su ogni braccio.',
        difficulty: 'Base'
      },
      {
        name: 'Sollevamento gambe', icon: '🦵', sets: '3 × 15',
        muscles: ['Addominali bassi', 'Flessori anca'],
        desc: 'Esercizio per gli addominali inferiori. Si esegue sdraiati, sollevando entrambe le gambe.',
        steps: [
          'Sdraiato, braccia ai fianchi o sotto i glutei per supporto.',
          'Gambe dritte (o leggermente piegate), talloni a 2–3 cm da terra.',
          'Contrai gli addominali bassi e porta le gambe a 90°.',
          'Abbassa lentamente senza toccare il suolo.',
          'Tieni la schiena bassa incollata al pavimento per tutto il movimento.'
        ],
        tip: 'Se senti la schiena bassa sollevarsi, piega leggermente le ginocchia.',
        difficulty: 'Intermedio'
      },
      {
        name: 'Crunch', icon: '🔥', sets: '3 × 20',
        muscles: ['Retto addominale'],
        desc: 'L\'esercizio classico per il retto addominale. Breve escursione di movimento, ma con massima contrazione.',
        steps: [
          'Sdraiato, ginocchia piegate, piedi piatti al suolo.',
          'Mani dietro la nuca — non tirare il collo.',
          'Stacca scapole e spalle dal pavimento di circa 30°.',
          'Contrai gli addominali nel punto più alto.',
          'Abbassa lentamente mantenendo tensione nel core.'
        ],
        tip: 'Immagina di voler avvicinare le costole al bacino, non di portare il mento al ginocchio.',
        difficulty: 'Base'
      }
    ]
  },

  // Giovedì — Corsa
  {
    focus: 'Cardio · Resistenza',
    type: 'run',
    duration: '30 minuti',
    exercises: [
      {
        name: 'Corsa continua', icon: '🏃', sets: '30 min',
        muscles: ['Gambe', 'Cuore', 'Polmoni'],
        desc: 'Sessione di corsa di medio volume. Mantieni un passo regolare e respira ritmicamente.',
        steps: [
          '5 min di camminata veloce o corsa blanda di riscaldamento.',
          'Passo costante per 20 min al ritmo che riesci a mantenere.',
          'Ultimi 5 min: rallenta gradualmente.',
          'Stretching finale: quadricipiti, polpacci, flessori dell\'anca.'
        ],
        tip: 'Usa il test del discorso: dovresti riuscire a dire una frase di 5–6 parole senza restare senza fiato.',
        difficulty: 'Base'
      }
    ]
  },

  // Venerdì — Gambe e Core
  {
    focus: 'Gambe · Core',
    type: 'strength',
    exercises: [
      {
        name: 'Squat', icon: '🏋️', sets: '4 × 12–15',
        muscles: ['Quadricipiti', 'Glutei', 'Hamstring'],
        desc: 'Il re degli esercizi per le gambe. Coinvolge tutta la catena cinetica posteriore e il core come stabilizzatore.',
        steps: [
          'Piedi a larghezza spalle, punte leggermente verso l\'esterno.',
          'Petto alto, sguardo avanti, core contratto.',
          'Scendi come se volessi sederti su una sedia molto bassa.',
          'Ginocchia nella direzione delle punte dei piedi — non verso l\'interno.',
          'Scendi almeno fino a cosce parallele al suolo, poi spingi su.'
        ],
        tip: 'Immagina di spingere il pavimento via dai piedi mentre sali, non di alzarti.',
        difficulty: 'Intermedio'
      },
      {
        name: 'Affondi', icon: '🚶', sets: '3 × 10 (per gamba)',
        muscles: ['Quadricipiti', 'Glutei', 'Stabilizzatori'],
        desc: 'Esercizio unilaterale per le gambe: corregge sbilanciamenti tra destra e sinistra, migliora l\'equilibrio.',
        steps: [
          'In piedi, piedi uniti. Fai un passo lungo in avanti.',
          'Abbassa il ginocchio posteriore quasi a terra, tibia verticale.',
          'Ginocchio anteriore sopra la caviglia, non oltre la punta.',
          'Spingi sul tallone anteriore per tornare alla posizione di partenza.',
          'Alterna le gambe o fai tutte le rip con una gamba, poi l\'altra.'
        ],
        tip: 'Se perdi l\'equilibrio, inizia con affondi fermi (senza camminare) per acquisire stabilità.',
        difficulty: 'Intermedio'
      },
      {
        name: 'Stacco rumeno', icon: '⬆️', sets: '4 × 10',
        muscles: ['Hamstring', 'Glutei', 'Lombari'],
        desc: 'Esercizio fondamentale per hamstring e glutei. Differisce dallo stacco classico per l\'angolo del ginocchio quasi fisso.',
        steps: [
          'In piedi, manubri davanti alle cosce, palme verso di te.',
          'Gambe quasi dritte, leggerissima flessione al ginocchio.',
          'Inclina il busto in avanti spingendo i fianchi indietro — schiena rigida.',
          'Scendi fino a sentire lo stretch negli hamstring (circa metà tibia).',
          'Contrai i glutei e spingi i fianchi in avanti per tornare su.'
        ],
        tip: 'Pensa di dover toccare il muro dietro di te con il sedere, non di piegarti in avanti.',
        difficulty: 'Intermedio'
      },
      {
        name: 'Calf raise', icon: '👟', sets: '4 × 20',
        muscles: ['Gastrocnemio', 'Soleo'],
        desc: 'Esercizio dedicato ai polpacci, spesso trascurati. Fondamentale per la spinta nella corsa e la stabilità della caviglia.',
        steps: [
          'In piedi su un gradino o sul pavimento, manubri ai fianchi.',
          'Abbassa i talloni sotto il livello delle punte (se su gradino).',
          'Spingi sulle punte il più in alto possibile.',
          'Tieni la posizione alta per 1 secondo.',
          'Abbassa lentamente per ottenere il massimo allungamento.'
        ],
        tip: 'I polpacci rispondono meglio ad alto volume. Fai le ripetizioni lentamente.',
        difficulty: 'Base'
      },
      {
        name: 'Plank', icon: '🧱', sets: '3 × 60 s',
        muscles: ['Core', 'Addominali', 'Lombari'],
        desc: 'Già presente nel programma di lunedì — la costanza in questo esercizio porta risultati visibili in 4–6 settimane.',
        steps: [
          'Avambracci e punte dei piedi a terra.',
          'Corpo perfettamente rettilineo dalla testa ai talloni.',
          'Contrai tutto: addome, glutei, cosce.',
          'Non trattenere il respiro: inspira ed espira con calma.'
        ],
        tip: 'Punta a 3 × 60s. Quando diventa facile, prova plank con un braccio o plank laterale.',
        difficulty: 'Base'
      },
      {
        name: 'Russian Twist', icon: '🌀', sets: '3 × 20',
        muscles: ['Obliqui', 'Core rotatorio'],
        desc: 'Esercizio per gli obliqui e la rotazione del tronco. Importante per la stabilità laterale e la potenza nei movimenti sportivi.',
        steps: [
          'Seduto a terra, ginocchia piegate a 90°.',
          'Solleva i piedi di qualche cm (difficoltà maggiore) oppure lasciali a terra.',
          'Inclina il busto indietro di circa 45°.',
          'Ruota il busto da destra a sinistra tenendo le mani giunte davanti a te.',
          'Per aumentare la difficoltà, tieni un peso tra le mani.'
        ],
        tip: 'Ogni rotazione completa (destra + sinistra) conta come 1 ripetizione.',
        difficulty: 'Intermedio'
      }
    ]
  },

  // Sabato — Corsa leggera
  {
    focus: 'Corsa leggera · Recupero attivo',
    type: 'run',
    duration: '20–30 minuti',
    exercises: [
      {
        name: 'Corsa leggera', icon: '🏃', sets: '20–30 min',
        muscles: ['Gambe', 'Cuore'],
        desc: 'Sessione di recupero attivo: ritmo molto blando, quasi come una camminata veloce. Aiuta la circolazione e il recupero muscolare dopo la settimana intensa.',
        steps: [
          'Ritmo blandissimo: dovresti sentirti a tuo agio a conversare normalmente.',
          'Nessuna velocità: l\'obiettivo è il movimento, non la performance.',
          'Goditi l\'uscita: musica, podcast, o semplicemente la quiete.',
          'Termina con qualche minuto di stretching.'
        ],
        tip: 'Questo è il giorno del recupero — non trasformarlo in un allenamento intenso. Il corpo cresce durante il riposo.',
        difficulty: 'Base'
      }
    ]
  },

  // Domenica — Riposo
  {
    focus: 'Riposo & Recupero',
    type: 'rest',
    exercises: []
  }
];


// ── Stato applicazione ────────────────────────────────────

let workoutHistory = loadKey('ego_workoutHistory', []); // [{date, day, dayName}]
let incomeEntries  = loadKey('ego_incomeEntries',  []); // [{id, desc, amount, date, category}]

let activeDay = 0; // indice 0–6


// ── Navigazione tra pagine ────────────────────────────────

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Card home → pagine
document.getElementById('cardWorkout').addEventListener('click', () => showPage('pageWorkout'));
document.getElementById('cardWorkout').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPage('pageWorkout'); }
});

document.getElementById('cardIncome').addEventListener('click', () => showPage('pageIncome'));
document.getElementById('cardIncome').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPage('pageIncome'); }
});

// Tasto Indietro
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target || 'pageHome';
    showPage(target);
    updateHomeStats();
  });
});


// ── Header date ───────────────────────────────────────────

function updateHeaderDate() {
  const el = document.getElementById('headerDate');
  const now = new Date();
  el.textContent = now.toLocaleDateString('it-IT', {
    weekday: 'short', day: 'numeric', month: 'short'
  });
}


// ── Homepage — stats strip ────────────────────────────────

function updateHomeStats() {
  document.getElementById('statWorkouts').textContent = workoutHistory.length;

  // Streak: giorni consecutivi con almeno un allenamento completato (non riposo)
  const uniqueDates = [...new Set(workoutHistory.map(h => h.date))].sort().reverse();
  let streak = 0;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (let i = 0; i < uniqueDates.length; i++) {
    const d = new Date(uniqueDates[i]); d.setHours(0, 0, 0, 0);
    const diff = Math.round((today - d) / 86400000);
    if (diff === i || (i === 0 && diff <= 1)) streak++;
    else break;
  }
  document.getElementById('statStreak').textContent = streak;

  // Entrate mese corrente
  const now = new Date();
  const monthTotal = incomeEntries
    .filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  document.getElementById('statIncome').textContent = formatCurrency(monthTotal);
}


// ── Allenamenti ───────────────────────────────────────────

function renderDayContent(dayIndex) {
  activeDay = dayIndex;
  const plan = WORKOUT_PLAN[dayIndex];
  const container = document.getElementById('dayContent');

  // Aggiorna tab attivo
  document.querySelectorAll('.day-tab').forEach(t => {
    t.classList.toggle('active', Number(t.dataset.day) === dayIndex);
  });

  if (plan.type === 'rest') {
    container.innerHTML = `
      <div class="rest-card">
        <span class="rest-emoji">😴</span>
        <h2 class="rest-title">Giorno di riposo</h2>
        <p class="rest-desc">Il corpo cresce durante il recupero. Idratati, dormi bene e preparati per la prossima settimana.</p>
      </div>`;
    return;
  }

  // Check se già completato oggi
  const todayStr = todayISO();
  const alreadyDone = workoutHistory.some(h => h.date === todayStr && h.day === dayIndex);
  const btnClass = alreadyDone ? 'btn-complete done' : 'btn-complete';
  const btnText  = alreadyDone ? '✓ Completato' : 'Segna completato';

  // Tipo badge
  const typeBadge = plan.type === 'run'
    ? `<span style="color:var(--green);font-size:var(--text-sm)">🏃 Corsa${plan.duration ? ' · ' + plan.duration : ''}</span>`
    : `<span style="color:var(--blue);font-size:var(--text-sm)">💪 Forza</span>`;

  let exercisesHTML = '';
  plan.exercises.forEach((ex, i) => {
    exercisesHTML += `
      <div class="exercise-row" data-ex="${i}" tabindex="0" role="button" aria-label="Apri guida ${ex.name}">
        <span class="ex-icon">${ex.icon}</span>
        <div class="ex-info">
          <div class="ex-name">${ex.name}</div>
          <div class="ex-sets">${ex.sets}</div>
          <div class="ex-muscles">
            ${ex.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join('')}
          </div>
        </div>
        <span class="ex-chevron">›</span>
      </div>`;
  });

  container.innerHTML = `
    <div class="day-header">
      <div>
        <h2 class="day-title">${DAYS[dayIndex]}</h2>
        <p class="day-subtitle">${plan.focus}</p>
        <p style="margin-top:6px">${typeBadge}</p>
      </div>
      <button class="${btnClass}" id="btnComplete" aria-label="Segna allenamento come completato">
        ${btnText}
      </button>
    </div>
    <div class="exercise-list">${exercisesHTML}</div>`;

  // Evento: segna completato
  document.getElementById('btnComplete').addEventListener('click', () => {
    markWorkoutComplete(dayIndex);
  });

  // Evento: apri modal esercizio
  container.querySelectorAll('.exercise-row').forEach(row => {
    row.addEventListener('click', () => openExerciseModal(dayIndex, Number(row.dataset.ex)));
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openExerciseModal(dayIndex, Number(row.dataset.ex));
      }
    });
  });
}

function markWorkoutComplete(dayIndex) {
  const todayStr = todayISO();
  const alreadyDone = workoutHistory.some(h => h.date === todayStr && h.day === dayIndex);

  if (alreadyDone) {
    // Deseleziona
    workoutHistory = workoutHistory.filter(h => !(h.date === todayStr && h.day === dayIndex));
  } else {
    workoutHistory.push({
      date: todayStr,
      day: dayIndex,
      dayName: DAYS[dayIndex]
    });
  }

  saveKey('ego_workoutHistory', workoutHistory);
  renderDayContent(dayIndex);
  renderWorkoutHistory();
  updateHomeStats();
}

function renderWorkoutHistory() {
  const container = document.getElementById('workoutHistory');
  if (!workoutHistory.length) {
    container.innerHTML = `<div class="history-empty">Nessun allenamento completato ancora.<br>Inizia oggi! 💪</div>`;
    return;
  }

  // Ordine inverso cronologico
  const sorted = [...workoutHistory].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 20);

  container.innerHTML = sorted.map(h => `
    <div class="history-item">
      <span class="history-dot"></span>
      <span class="history-name">${h.dayName}</span>
      <span class="history-date">${formatDate(h.date)}</span>
    </div>`).join('');
}

// Tab days
document.querySelectorAll('.day-tab').forEach(tab => {
  tab.addEventListener('click', () => renderDayContent(Number(tab.dataset.day)));
  tab.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      const next = (Number(tab.dataset.day) + 1) % 7;
      document.querySelector(`.day-tab[data-day="${next}"]`)?.focus();
      renderDayContent(next);
    }
    if (e.key === 'ArrowLeft') {
      const prev = (Number(tab.dataset.day) + 6) % 7;
      document.querySelector(`.day-tab[data-day="${prev}"]`)?.focus();
      renderDayContent(prev);
    }
  });
});


// ── Modal esercizio ───────────────────────────────────────

const modal        = document.getElementById('exerciseModal');
const modalClose   = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

function openExerciseModal(dayIndex, exIndex) {
  const ex = WORKOUT_PLAN[dayIndex].exercises[exIndex];
  if (!ex) return;

  const diffColor = { 'Base': 'var(--green)', 'Intermedio': 'var(--amber)', 'Avanzato': 'var(--red)' };
  const color = diffColor[ex.difficulty] || 'var(--text-2)';

  const stepsHTML = ex.steps.map((s, i) => `
    <div class="modal-step">
      <div class="modal-step-num">${i + 1}</div>
      <div class="modal-step-text">${s}</div>
    </div>`).join('');

  const muscleTagsHTML = ex.muscles.map(m => `<span class="modal-tag">${m}</span>`).join('');

  modalContent.innerHTML = `
    <div class="modal-exercise-icon">${ex.icon}</div>
    <h2 class="modal-exercise-name">${ex.name}</h2>

    <div class="modal-section">
      <div class="modal-section-title">Volume</div>
      <p class="modal-desc" style="font-size:1.05rem;font-weight:600;color:var(--text-1)">${ex.sets}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Descrizione</div>
      <p class="modal-desc">${ex.desc}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Esecuzione passo per passo</div>
      <div class="modal-steps">${stepsHTML}</div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Muscoli coinvolti</div>
      <div class="modal-tags">${muscleTagsHTML}</div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Difficoltà</div>
      <p class="modal-desc" style="color:${color};font-weight:600">${ex.difficulty}</p>
    </div>

    <div class="modal-section">
      <div class="modal-tip">
        <span class="modal-tip-icon">💡</span>
        <p class="modal-tip-text">${ex.tip}</p>
      </div>
    </div>`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


// ── Entrate ───────────────────────────────────────────────

// Set default date
document.getElementById('incomeDate').value = todayISO();

// Mese corrente label
function updateIncomeMonthLabel() {
  const now = new Date();
  document.getElementById('incomeMonthLabel').textContent =
    now.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
}

function calcMonthTotal() {
  const now = new Date();
  return incomeEntries
    .filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);
}

function updateIncomeTotal() {
  document.getElementById('incomeTotal').textContent = formatCurrency(calcMonthTotal());
}

function renderIncomeList() {
  const container = document.getElementById('incomeList');
  if (!incomeEntries.length) {
    container.innerHTML = `<div class="income-empty">Nessuna entrata registrata.<br>Aggiungi il primo movimento qui sopra.</div>`;
    return;
  }

  const sorted = [...incomeEntries].sort((a, b) => b.date.localeCompare(a.date));
  const icons = { lavoro: '💼', freelance: '💻', investimenti: '📈', altro: '📦' };

  container.innerHTML = sorted.map(e => `
    <div class="income-item" data-id="${e.id}">
      <span class="income-item-icon">${icons[e.category] || '📦'}</span>
      <div class="income-item-info">
        <div class="income-item-desc">${escapeHtml(e.desc)}</div>
        <div class="income-item-meta">${formatDate(e.date)} · ${e.category}</div>
      </div>
      <span class="income-item-amount">+ ${formatCurrency(e.amount)}</span>
      <button class="income-item-del" aria-label="Elimina entrata ${escapeHtml(e.desc)}" data-id="${e.id}">✕</button>
    </div>`).join('');

  // Delegazione eventi su pulsanti elimina
  container.querySelectorAll('.income-item-del').forEach(btn => {
    btn.addEventListener('click', () => deleteIncomeEntry(btn.dataset.id));
  });
}

function renderCategoryChart() {
  const container = document.getElementById('categoryChart');
  if (!incomeEntries.length) {
    container.innerHTML = `<p style="color:var(--text-3);font-size:var(--text-sm)">Nessun dato disponibile.</p>`;
    return;
  }

  // Raggruppa per categoria
  const totals = {};
  incomeEntries.forEach(e => {
    totals[e.category] = (totals[e.category] || 0) + Number(e.amount);
  });

  const icons = { lavoro: '💼', freelance: '💻', investimenti: '📈', altro: '📦' };
  const max = Math.max(...Object.values(totals));
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  container.innerHTML = sorted.map(([cat, total]) => `
    <div class="cat-row">
      <span class="cat-label">${icons[cat] || '📦'} ${cat}</span>
      <div class="cat-bar-track">
        <div class="cat-bar-fill" style="width:${Math.round(total / max * 100)}%"></div>
      </div>
      <span class="cat-amount">${formatCurrency(total)}</span>
    </div>`).join('');
}

// Form submit
document.getElementById('incomeForm').addEventListener('submit', e => {
  e.preventDefault();

  const desc   = document.getElementById('incomeDesc').value.trim();
  const amount = parseFloat(document.getElementById('incomeAmount').value);
  const date   = document.getElementById('incomeDate').value;
  const cat    = document.getElementById('incomeCategory').value;

  if (!desc || isNaN(amount) || amount <= 0 || !date) return;

  incomeEntries.push({ id: uid(), desc, amount, date, category: cat });
  saveKey('ego_incomeEntries', incomeEntries);

  // Reset form
  document.getElementById('incomeDesc').value = '';
  document.getElementById('incomeAmount').value = '';
  document.getElementById('incomeDate').value = todayISO();

  updateIncomeTotal();
  renderIncomeList();
  renderCategoryChart();
  updateHomeStats();
});

function deleteIncomeEntry(id) {
  incomeEntries = incomeEntries.filter(e => e.id !== id);
  saveKey('ego_incomeEntries', incomeEntries);
  updateIncomeTotal();
  renderIncomeList();
  renderCategoryChart();
  updateHomeStats();
}

document.getElementById('clearIncomeBtn').addEventListener('click', () => {
  if (!incomeEntries.length) return;
  if (confirm('Eliminare tutti i movimenti? L\'azione non è reversibile.')) {
    incomeEntries = [];
    saveKey('ego_incomeEntries', incomeEntries);
    updateIncomeTotal();
    renderIncomeList();
    renderCategoryChart();
    updateHomeStats();
  }
});


// ── Utility ───────────────────────────────────────────────

/** Previene XSS nell'inserimento dati utente */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


// ── Init ──────────────────────────────────────────────────

function init() {
  updateHeaderDate();
  updateHomeStats();
  renderDayContent(activeDay);
  renderWorkoutHistory();
  updateIncomeMonthLabel();
  updateIncomeTotal();
  renderIncomeList();
  renderCategoryChart();
}

init();
