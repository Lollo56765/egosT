// ===== DATA =====
const WORKOUT_PLAN = {
  1: { // Monday
    name: "Petto, Spalle, Tricipiti",
    type: "strength",
    emoji: "💪",
    color: "#2563eb",
    exercises: [
      { name: "Piegamenti", sets: "4×max", muscles: ["Petto","Tricipiti","Spalle"], diff: 1 },
      { name: "Distensioni manubri", sets: "4×8-12", muscles: ["Petto","Spalle"], diff: 2 },
      { name: "Croci", sets: "3×10-12", muscles: ["Petto"], diff: 2 },
      { name: "Alzate laterali", sets: "3×12", muscles: ["Spalle"], diff: 1 },
      { name: "Dip", sets: "3×max", muscles: ["Tricipiti","Petto"], diff: 2 },
      { name: "Plank", sets: "3×60 sec", muscles: ["Core","Addominali"], diff: 1 },
    ]
  },
  2: { // Tuesday
    name: "Corsa",
    type: "run",
    emoji: "🏃",
    color: "#059669",
    detail: "30-40 minuti",
    exercises: []
  },
  3: { // Wednesday
    name: "Schiena, Bicipiti, Addominali",
    type: "strength",
    emoji: "💪",
    color: "#7c3aed",
    exercises: [
      { name: "Trazioni", sets: "4×max", muscles: ["Schiena","Bicipiti"], diff: 3 },
      { name: "Rematore", sets: "4×10", muscles: ["Schiena","Bicipiti"], diff: 2 },
      { name: "Curl bicipiti", sets: "3×10-12", muscles: ["Bicipiti"], diff: 1 },
      { name: "Curl martello", sets: "3×10", muscles: ["Bicipiti","Avambracci"], diff: 1 },
      { name: "Sollevamento gambe", sets: "3×15", muscles: ["Addominali","Core"], diff: 2 },
      { name: "Crunch", sets: "3×20", muscles: ["Addominali"], diff: 1 },
    ]
  },
  4: { // Thursday
    name: "Corsa",
    type: "run",
    emoji: "🏃",
    color: "#059669",
    detail: "30 minuti",
    exercises: []
  },
  5: { // Friday
    name: "Gambe e Core",
    type: "strength",
    emoji: "🦵",
    color: "#dc2626",
    exercises: [
      { name: "Squat", sets: "4×12-15", muscles: ["Quadricipiti","Glutei","Hamstring"], diff: 2 },
      { name: "Affondi", sets: "3×10", muscles: ["Quadricipiti","Glutei"], diff: 2 },
      { name: "Stacco rumeno", sets: "4×10", muscles: ["Hamstring","Glutei","Schiena"], diff: 3 },
      { name: "Calf raise", sets: "4×20", muscles: ["Polpacci"], diff: 1 },
      { name: "Plank", sets: "3×60 sec", muscles: ["Core","Addominali"], diff: 1 },
      { name: "Russian Twist", sets: "3×20", muscles: ["Addominali","Core"], diff: 2 },
    ]
  },
  6: { // Saturday
    name: "Corsa leggera",
    type: "run",
    emoji: "🏃",
    color: "#059669",
    detail: "20-30 minuti",
    exercises: []
  },
  0: { // Sunday
    name: "Riposo",
    type: "rest",
    emoji: "😴",
    color: "#d97706",
    exercises: []
  }
};

const EXERCISE_GUIDE = {
  "Piegamenti": {
    desc: "I piegamenti (push-up) sono uno degli esercizi a corpo libero più completi. Lavorano petto, spalle e tricipiti contemporaneamente.",
    steps: ["Posizione prona con mani leggermente più larghe delle spalle","Corpo rettilineo come una tavola, addome contratto","Piega i gomiti abbassando il petto verso il suolo","Ferma a 1-2 cm dal pavimento","Spingi verso l'alto tornando alla posizione iniziale"],
    muscles: ["Petto (grande pettorale)","Tricipiti","Spalle (deltoide anteriore)","Core"],
    errors: ["Bacino che scende o sale troppo","Gomiti aperti oltre 45°","Range di movimento incompleto","Testa che pende in avanti"],
    diff: 1, recovery: "60 secondi",
    tips: "Concentrati sulla contrazione del petto spingendo. Per facilitare usa le ginocchia; per intensificare eleva i piedi."
  },
  "Distensioni manubri": {
    desc: "Distensioni su panca o a terra con manubri per sviluppare il petto con maggiore ampiezza di movimento rispetto al bilanciere.",
    steps: ["Sdraiati su panca o pavimento con manubri a lato","Porta i manubri sopra il petto con palme in avanti","Abbassa lentamente fino a sentire l'allungamento del petto","Premi i manubri verso l'alto senza bloccare i gomiti","Contrai il petto al punto più alto"],
    muscles: ["Grande pettorale","Tricipiti","Deltoide anteriore"],
    errors: ["Abbassare troppo velocemente","Non completare la salita","Sollevare i fianchi dalla panca"],
    diff: 2, recovery: "75 secondi",
    tips: "Immagina di 'abbracciare un albero' quando spingi su per massimizzare la contrazione."
  },
  "Croci": {
    desc: "Le croci isolano il grande pettorale lavorando principalmente sull'adduzione orizzontale. Ottimo per allargare il petto.",
    steps: ["Sdraiati con manubri sopra il petto, gomiti leggermente piegati","Apri le braccia lateralmente mantenendo la curva nei gomiti","Scendi finché senti l'allungamento del petto","Riporta le braccia su come se abbracciassi","Contrai il petto nella posizione alta"],
    muscles: ["Grande pettorale (isolamento)","Deltoide anteriore (secondario)"],
    errors: ["Stendere troppo i gomiti (rischio tendini)","Usare peso eccessivo","Movimento troppo brusco"],
    diff: 2, recovery: "60 secondi",
    tips: "Usa pesi leggeri con focus sulla sensazione nel petto. La qualità batte la quantità."
  },
  "Alzate laterali": {
    desc: "L'esercizio re per sviluppare le spalle laterali, creando larghezza e definizione nella parte superiore del corpo.",
    steps: ["In piedi con manubri ai lati, palme verso il corpo","Tieni un leggero piegamento nei gomiti","Alza le braccia lateralmente fino all'altezza delle spalle","Mantieni un secondo al punto più alto","Abbassa lentamente resistendo alla gravità"],
    muscles: ["Deltoide laterale (capo mediale)","Sovraspinato","Trapezio (secondario)"],
    errors: ["Usare il momentum oscillando il busto","Alzare oltre le spalle","Sollevare le spalle verso le orecchie"],
    diff: 1, recovery: "60 secondi",
    tips: "Ruota leggermente il mignolo verso l'alto (come versare acqua) per maggiore attivazione laterale."
  },
  "Dip": {
    desc: "I dip alle parallele sono un esercizio composto premium per tricipiti e petto inferiore. Richiedono forza e stabilità.",
    steps: ["Afferrare le parallele con corpo sospeso","Abbassarsi piegando i gomiti fino a 90°","Busto leggermente inclinato in avanti per petto, dritto per tricipiti","Spingi verso il basso sulle parallele tornando su","Completa la spinta senza iperestendere i gomiti"],
    muscles: ["Tricipiti","Petto inferiore","Deltoide anteriore"],
    errors: ["Abbassarsi troppo (stress sulle spalle)","Non completare la spinta","Oscillare il corpo"],
    diff: 2, recovery: "90 secondi",
    tips: "Aggiungi peso con una cintura appena riesci a fare 15 rip facili. Per facilitare usa elastico."
  },
  "Plank": {
    desc: "Il plank è l'esercizio fondamentale per la stabilità del core. Lavora su decine di muscoli contemporaneamente in modo isometrico.",
    steps: ["Posizione a terra su avambracci e punte dei piedi","Corpo rettilineo dalla testa ai talloni","Contrai addome, glutei e quadricipiti","Mantieni il respiro regolare","Tieni la posizione per il tempo prestabilito"],
    muscles: ["Retto dell'addome","Trasverso dell'addome","Obliqui","Glutei","Quadricipiti"],
    errors: ["Bacino alto o basso","Trattenere il respiro","Capo che cade o si alza","Spalle verso le orecchie"],
    diff: 1, recovery: "45 secondi",
    tips: "Immagina di spingere i gomiti verso i piedi e i piedi verso i gomiti: questo attiva meglio il core."
  },
  "Trazioni": {
    desc: "Le trazioni (pull-up) sono considerate il re degli esercizi per la schiena a corpo libero. Sviluppano larghezza e spessore.",
    steps: ["Afferrare la sbarra a presa prona più larga delle spalle","Corpo sospeso, scapole leggermente abbassate","Tira verso il basso le scapole e poi piega i gomiti","Porta il mento sopra la sbarra","Abbassa lentamente controllando il movimento"],
    muscles: ["Grande dorsale","Bicipiti","Romboidi","Trapezio inferiore"],
    errors: ["Usare solo i bicipiti senza attivare le scapole","Oscillare il corpo","Non completare l'estensione in basso"],
    diff: 3, recovery: "120 secondi",
    tips: "Pensa di portare i gomiti verso i fianchi, non le mani verso le spalle. Usa il lat."
  },
  "Rematore": {
    desc: "Il rematore con manubrio o bilanciere sviluppa spessore nella schiena, lavorando su trapezio, romboidi e dorsale.",
    steps: ["Posizione inclinata in avanti a 45°, prese a larghezza spalle","Tieni la schiena neutra, non iperestesa","Tira il peso verso il basso del busto","Porta i gomiti indietro, non verso l'alto","Abbassa lentamente mantenendo la tensione"],
    muscles: ["Grande dorsale","Romboidi","Trapezio","Bicipiti"],
    errors: ["Arrotondare la schiena bassa","Usare il momentum del busto","Non portare i gomiti indietro"],
    diff: 2, recovery: "90 secondi",
    tips: "Inizia ogni ripetizione retraendo le scapole prima di piegare i gomiti."
  },
  "Curl bicipiti": {
    desc: "Il curl standard con manubri o bilanciere è l'esercizio classico per lo sviluppo dei bicipiti.",
    steps: ["In piedi con manubri ai lati, palme in avanti","Tieni i gomiti fermi vicino ai fianchi","Curva le braccia portando i pesi verso le spalle","Contrai i bicipiti al punto più alto","Abbassa lentamente resistendo alla gravità"],
    muscles: ["Bicipiti brachiali","Brachiale","Supinatore"],
    errors: ["Muovere i gomiti in avanti","Oscillare il busto per aiutarsi","Abbassare troppo velocemente"],
    diff: 1, recovery: "60 secondi",
    tips: "La fase eccentrica (abbassamento) è altrettanto importante della salita per la crescita muscolare."
  },
  "Curl martello": {
    desc: "Il curl a presa neutra (martello) lavora il bicipite brachiale e il brachioradiale più efficacemente del curl classico.",
    steps: ["In piedi con manubri ai lati, palme verso l'interno","Tieni il polso in posizione neutra per tutto il movimento","Porta i manubri verso le spalle","Mantieni i gomiti fermi","Abbassa controllato"],
    muscles: ["Brachiale","Bicipiti brachiali","Brachioradiale"],
    errors: ["Ruotare il polso durante il movimento","Muovere i gomiti","Usare peso eccessivo"],
    diff: 1, recovery: "60 secondi",
    tips: "Alterna le braccia per aumentare la concentrazione su ogni singolo bicipite."
  },
  "Sollevamento gambe": {
    desc: "Il sollevamento gambe da sdraiato o appeso lavora la parte inferiore degli addominali e il flessore dell'anca.",
    steps: ["Sdraiato sulla schiena, mani sotto i glutei","Mantieni le gambe leggermente piegate","Alza le gambe portando i piedi verso il soffitto","Contrai gli addominali nella posizione alta","Abbassa le gambe senza toccare il suolo"],
    muscles: ["Retto dell'addome (basso)","Flessore dell'anca","Obliqui"],
    errors: ["Inarcare eccessivamente la schiena bassa","Abbassare troppo le gambe","Strappare con il collo"],
    diff: 2, recovery: "45 secondi",
    tips: "Per variante avanzata: esegui appeso alla sbarra per maggiore ampiezza di movimento."
  },
  "Crunch": {
    desc: "Il crunch classico è l'esercizio base per gli addominali superiori. Semplice ma efficace se eseguito correttamente.",
    steps: ["Sdraiato, ginocchia piegate a 90°, piedi al suolo","Mani incrociate al petto o dita alle tempie","Contrai gli addominali portando le spalle su","Stacca le scapole dal suolo di circa 30°","Abbassa lentamente senza rilassare completamente"],
    muscles: ["Retto dell'addome (superiore)","Obliqui (secondario)"],
    errors: ["Tirare il collo con le mani","Range di movimento eccessivo (non è uno sit-up)","Perdere tensione in basso"],
    diff: 1, recovery: "45 secondi",
    tips: "Immagina di accorciare lo spazio tra costole e bacino. Non portare il mento al petto."
  },
  "Squat": {
    desc: "Lo squat è il re degli esercizi per le gambe. Coinvolge quadricipiti, glutei, hamstring e core in un movimento funzionale.",
    steps: ["In piedi, piedi a larghezza spalle o leggermente oltre","Punte leggermente ruotate verso l'esterno","Inizia il movimento spingendo indietro il sedere","Scendi tenendo il busto eretto e le ginocchia sopra i piedi","Scendi finché le cosce sono parallele al suolo o oltre","Spingi sui talloni per tornare su"],
    muscles: ["Quadricipiti","Glutei","Hamstring","Polpacci","Core"],
    errors: ["Ginocchia che crollano verso l'interno","Talloni che si sollevano","Arrotondare la schiena bassa","Profondità insufficiente"],
    diff: 2, recovery: "90 secondi",
    tips: "Immagina di sedere su una sedia invisibile. Mantieni il petto alto e lo sguardo in avanti."
  },
  "Affondi": {
    desc: "Gli affondi allenano ogni gamba in modo indipendente, migliorando forza, equilibrio e coordinazione delle gambe.",
    steps: ["In piedi con piedi a larghezza fianchi","Fai un passo lungo in avanti con una gamba","Abbassa il ginocchio posteriore quasi a toccare il suolo","Mantieni il busto eretto, ginocchio anteriore sopra il piede","Torna alla posizione iniziale spingendo sul tallone anteriore"],
    muscles: ["Quadricipiti","Glutei","Hamstring","Polpacci"],
    errors: ["Ginocchio anteriore che supera le dita del piede","Busto che si inclina in avanti","Ginocchio posteriore che tocca il suolo con forza"],
    diff: 2, recovery: "75 secondi",
    tips: "Mantieni il core contratto per tutto il movimento. Inizia con affondi sul posto prima di quelli camminati."
  },
  "Stacco rumeno": {
    desc: "Lo stacco rumeno (RDL) è eccellente per hamstring e glutei. A differenza dello stacco classico mantiene le gambe semi-tese.",
    steps: ["In piedi con manubri davanti alle cosce, palme verso di te","Gambe leggermente piegate, piedi a larghezza fianchi","Inclina il busto in avanti mantenendo la schiena neutra","Scendi finché senti il forte allungamento degli hamstring","Spingi i fianchi in avanti per tornare su"],
    muscles: ["Hamstring","Glutei","Spina dorsale (erettori)","Core"],
    errors: ["Arrotondare la schiena bassa","Piegare troppo le ginocchia (diventa uno squat)","Abbassare i pesi troppo oltre la tibia"],
    diff: 3, recovery: "90 secondi",
    tips: "Pensa di 'spingere il sedere verso la parete dietro di te' per mantenere la tensione corretta."
  },
  "Calf raise": {
    desc: "Il calf raise sviluppa gastrocnemio e soleo, i muscoli del polpaccio, spesso trascurati ma fondamentali.",
    steps: ["In piedi con punte dei piedi su un gradino o al suolo","Abbassa i talloni sotto il livello delle punte (se su gradino)","Spingi sulle punte dei piedi il più in alto possibile","Contrai i polpacci al punto più alto","Abbassa lentamente per lo stretching completo"],
    muscles: ["Gastrocnemio","Soleo","Flessori plantari"],
    errors: ["Range di movimento parziale","Abbassare troppo velocemente","Non usare step per range completo"],
    diff: 1, recovery: "45 secondi",
    tips: "I polpacci necessitano alto volume. Includi sia rip veloci che lente per stimolare entrambe le fibre."
  },
  "Russian Twist": {
    desc: "Il Russian Twist lavora gli obliqui e la rotazione del tronco, fondamentale per la stabilità laterale del core.",
    steps: ["Seduto a terra con ginocchia piegate e piedi sollevati","Inclina leggermente il busto indietro a circa 45°","Porta le mani (o manubrio) da un lato all'altro","Ruota il busto, non solo le braccia","Mantieni gli addominali contratti per tutto il movimento"],
    muscles: ["Obliqui interni ed esterni","Retto dell'addome","Flessori dell'anca"],
    errors: ["Ruotare solo le braccia senza il busto","Perdere la tensione addominale","Posizione del busto troppo verticale"],
    diff: 2, recovery: "45 secondi",
    tips: "Per aumentare la difficoltà usa un manubrio o pallone medicinale. Piedi sollevati aumentano l'intensità."
  }
};

const MOTIVATIONAL_QUOTES = [
  "Non aspettare la motivazione perfetta. Inizia e la motivazione arriverà.",
  "Ogni rep ti avvicina alla versione migliore di te stesso.",
  "Il dolore che senti oggi è la forza che sentirai domani.",
  "La costanza batte il talento quando il talento non è costante.",
  "Non fermarti finché non sei orgoglioso.",
  "Il tuo corpo può farlo. È la tua mente che devi convincere.",
  "Ogni allenamento conta. Anche quello brutto.",
  "La disciplina è scegliere tra ciò che vuoi ora e ciò che vuoi di più.",
  "Non cercare scuse. Cerca soluzioni.",
  "Forgia te stesso come un'arma ogni giorno.",
  "Il successo è la somma di piccoli sforzi ripetuti ogni giorno.",
  "Allenarsi è difficile. Non allenarsi è più difficile.",
  "Sii la versione migliore di te, non la copia di qualcun altro.",
  "I campioni non smettono quando sono stanchi, smettono quando hanno finito.",
  "Lavora in silenzio. Lascia che i risultati parlino per te."
];

const DAYS_IT = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];
const MONTHS_IT = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const SHORT_DAYS = ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];

// ===== STATE =====
let state = {
  workoutLog: {}, // { "YYYY-MM-DD": "done"|"skip" }
  diary: {},       // { "YYYY-MM-DD": "text" }
  goals: { weeklyWorkouts: 3, weeklyRuns: 3 },
  customGoals: [],
  notifs: { notif1: true, notif2: true, notif3: false, notifSound: true },
  badges: {},
  bestStreak: 0
};

function loadState() {
  try {
    const s = localStorage.getItem('egosTrain_state');
    if (s) state = { ...state, ...JSON.parse(s) };
  } catch(e) {}
}
function saveState() {
  localStorage.setItem('egosTrain_state', JSON.stringify(state));
}

// ===== UTILS =====
// Usa formato locale YYYY-MM-DD per evitare sfasamenti UTC
function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
// Parsare una chiave "YYYY-MM-DD" come data locale (non UTC)
function parseKey(k) {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function today() { return new Date(); }
function todayKey() { return dateKey(today()); }
function getWorkoutForDow(dow) { return WORKOUT_PLAN[dow]; }
function getDayStatus(key) { return state.workoutLog[key] || null; }

function calcStreak() {
  let streak = 0; let d = new Date();
  for (let i = 0; i < 365; i++) {
    const k = dateKey(d);
    const dow = d.getDay();
    const plan = WORKOUT_PLAN[dow];
    if (plan.type === 'rest') { d.setDate(d.getDate()-1); continue; }
    const s = state.workoutLog[k];
    if (s === 'done') { streak++; d.setDate(d.getDate()-1); }
    else if (s === 'skip') { break; }
    else if (k === todayKey()) { d.setDate(d.getDate()-1); }
    else break;
  }
  return streak;
}

function totalWorkouts() {
  return Object.values(state.workoutLog).filter(v => v === 'done').length;
}
function totalRuns() {
  return Object.entries(state.workoutLog).filter(([k,v]) => {
    if (v !== 'done') return false;
    const d = parseKey(k); const dow = d.getDay();
    return WORKOUT_PLAN[dow] && WORKOUT_PLAN[dow].type === 'run';
  }).length;
}

function weeklyStats() {
  const now = today();
  const dow = now.getDay();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((dow + 6) % 7)); // Monday start
  let done = 0, total = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek); d.setDate(startOfWeek.getDate() + i);
    const k = dateKey(d); const plan = WORKOUT_PLAN[d.getDay()];
    if (!plan || plan.type === 'rest') continue;
    total++;
    if (state.workoutLog[k] === 'done') done++;
  }
  return { done, total, pct: total ? Math.round(done/total*100) : 0 };
}

function monthlyStats(year, month) {
  let done = 0, total = 0;
  const daysInMonth = new Date(year, month+1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, month, d);
    if (dt > today()) break;
    const plan = WORKOUT_PLAN[dt.getDay()];
    if (!plan || plan.type === 'rest') continue;
    total++;
    if (state.workoutLog[dateKey(dt)] === 'done') done++;
  }
  return { done, total, pct: total ? Math.round(done/total*100) : 0 };
}

// ===== NAVIGATION =====
let currentSection = 'dashboard';
document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(el => {
  el.addEventListener('click', () => {
    const s = el.dataset.section;
    if (s) navigateTo(s);
  });
});
function navigateTo(section) {
  currentSection = section;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + section).classList.add('active');
  document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.section === section);
  });
  if (section === 'calendar') renderCalendar();
  if (section === 'stats') renderStats();
  if (section === 'badges') renderBadges();
  if (section === 'diary') { diaryToday(); renderRecentDiary(); }
  if (section === 'goals') renderGoals();
  if (section === 'dashboard') renderDashboard();
  if (section === 'workout') renderWorkout();
}

// ===== THEME =====
function toggleTheme() {
  const isDark = document.body.dataset.theme === 'dark';
  document.body.dataset.theme = isDark ? 'light' : 'dark';
  document.getElementById('themeIcon').textContent = isDark ? '🌙' : '☀️';
  document.getElementById('themeLabel').textContent = isDark ? 'Tema Scuro' : 'Tema Chiaro';
  localStorage.setItem('egosTrain_theme', document.body.dataset.theme);
}
function loadTheme() {
  const t = localStorage.getItem('egosTrain_theme');
  if (t) {
    document.body.dataset.theme = t;
    document.getElementById('themeIcon').textContent = t === 'dark' ? '☀️' : '🌙';
    document.getElementById('themeLabel').textContent = t === 'dark' ? 'Tema Chiaro' : 'Tema Scuro';
  }
}

// ===== DASHBOARD =====
function renderDashboard() {
  const now = today();
  const dow = now.getDay();
  const plan = WORKOUT_PLAN[dow];
  const tk = todayKey();

  // Header
  const h = now.getHours();
  const greeting = h < 12 ? 'Buongiorno 👋' : h < 18 ? 'Buon pomeriggio 👋' : 'Buonasera 👋';
  document.getElementById('dashTitle').textContent = greeting;
  document.getElementById('dashDate').textContent = `${DAYS_IT[dow]}, ${now.getDate()} ${MONTHS_IT[now.getMonth()]} ${now.getFullYear()}`;

  // Today card
  document.getElementById('todayDateStr').textContent = `${now.getDate()} ${MONTHS_IT[now.getMonth()]} ${now.getFullYear()}`;
  document.getElementById('todayDayName').textContent = `${plan.emoji} ${plan.name}`;
  document.getElementById('todayQuote').textContent = `"${MOTIVATIONAL_QUOTES[Math.floor(Math.random()*MOTIVATIONAL_QUOTES.length)]}"`;
  document.getElementById('todayWorkoutName').textContent = plan.type === 'rest' ? 'Giornata di riposo' : plan.name;
  document.getElementById('todayWorkoutDetail').textContent = plan.detail || (plan.exercises.length ? `${plan.exercises.length} esercizi` : '');

  // Actions
  const status = getDayStatus(tk);
  const actEl = document.getElementById('todayActions');
  if (plan.type === 'rest') {
    actEl.innerHTML = `<span class="status-badge status-pending">😴 Riposa e recupera</span>`;
  } else if (status === 'done') {
    actEl.innerHTML = `<span class="status-badge status-done">✅ Completato!</span>
      <button class="today-btn today-btn-skip" onclick="setTodayStatus('skip')">↩ Annulla</button>`;
  } else if (status === 'skip') {
    actEl.innerHTML = `<span class="status-badge status-skip">❌ Saltato</span>
      <button class="today-btn today-btn-done" onclick="setTodayStatus('done')">↩ Annulla</button>`;
  } else {
    actEl.innerHTML = `
      <button class="today-btn today-btn-done" onclick="setTodayStatus('done')">✅ Completato</button>
      <button class="today-btn today-btn-skip" onclick="setTodayStatus('skip')">❌ Salta</button>`;
  }

  // Stats
  const streak = calcStreak();
  const ws = weeklyStats();
  const ms = monthlyStats(now.getFullYear(), now.getMonth());
  document.getElementById('statWorkouts').textContent = totalWorkouts();
  document.getElementById('statRuns').textContent = totalRuns();
  document.getElementById('statStreak').textContent = streak;
  document.getElementById('statMonthPct').textContent = ms.pct + '%';
  document.getElementById('streakBadge').textContent = `🔥 ${streak} giorni`;

  // Weekly strip
  renderWeeklyStrip();
  document.getElementById('weeklyPct').textContent = ws.pct + '%';
  document.getElementById('weeklyBar').style.width = ws.pct + '%';

  // History
  renderRecentHistory();

  // Check badges
  checkBadges();
  updateBadgeSidebarCount();
}

function renderWeeklyStrip() {
  const now = today();
  const startOfWeek = new Date(now);
  const dow = now.getDay();
  startOfWeek.setDate(now.getDate() - ((dow + 6) % 7));
  let html = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek); d.setDate(startOfWeek.getDate() + i);
    const k = dateKey(d); const plan = WORKOUT_PLAN[d.getDay()];
    const isToday = k === todayKey();
    const status = state.workoutLog[k];
    let cls = 'pending', dotContent = SHORT_DAYS[d.getDay()][0];
    if (plan && plan.type === 'rest') cls = 'rest';
    if (status === 'done') cls = 'done';
    if (status === 'skip') cls = 'skip';
    html += `<div class="day-pill ${cls} ${isToday?'today-pill':''}">
      <div class="day-dot">${status==='done'?'✓':status==='skip'?'✗':plan?.type==='rest'?'😴':plan?.emoji||''}</div>
      <div class="day-name">${SHORT_DAYS[d.getDay()]}</div>
    </div>`;
  }
  document.getElementById('weeklyStrip').innerHTML = html;
}

function renderRecentHistory() {
  const entries = Object.entries(state.workoutLog)
    .sort(([a],[b]) => b.localeCompare(a)).slice(0,8);
  if (!entries.length) {
    document.getElementById('recentHistory').innerHTML = `<div class="text-xs" style="padding:10px 0">Nessun allenamento registrato ancora. Inizia oggi! 💪</div>`;
    return;
  }
  let html = '';
  entries.forEach(([k,v]) => {
    const d = parseKey(k); const plan = WORKOUT_PLAN[d.getDay()];
    const color = v === 'done' ? '#10b981' : '#ef4444';
    const icon = v === 'done' ? '✅' : '❌';
    html += `<div class="history-item">
      <div class="history-dot" style="background:${color}"></div>
      <div style="flex:1">
        <div class="text-sm font-bold">${plan?.emoji||''} ${plan?.name||'Allenamento'}</div>
        <div class="text-xs">${DAYS_IT[d.getDay()]}, ${d.getDate()} ${MONTHS_IT[d.getMonth()]}</div>
      </div>
      <span class="status-badge ${v==='done'?'status-done':'status-skip'}">${icon} ${v==='done'?'Completato':'Saltato'}</span>
    </div>`;
  });
  document.getElementById('recentHistory').innerHTML = html;
}

function setTodayStatus(status) {
  const tk = todayKey();
  const prevStatus = state.workoutLog[tk];
  state.workoutLog[tk] = status;
  saveState();
  renderDashboard();
  checkBadges();

  if (status === 'done' && prevStatus !== 'done') {
    // XP guadagnato
    const dow = today().getDay();
    const plan = WORKOUT_PLAN[dow];
    const isFirst = totalWorkouts() === 1;
    const xpAmount = isFirst ? XP_REWARDS.first_workout :
                     plan.type === 'run' ? XP_REWARDS.run_done : XP_REWARDS.workout_done;
    addXP(xpAmount, 'workout');
    // Recupera cuore se ne mancano
    if (state.gam.hearts < MAX_HEARTS) gainHeart();
    // Streak bonus
    const streak = calcStreak();
    if (streak === 7)  { setTimeout(() => { addXP(XP_REWARDS.streak_7, 'streak7'); toast('🔥 Streak di 7 giorni! +100 XP bonus!', 'success'); }, 800); }
    if (streak === 30) { setTimeout(() => { addXP(XP_REWARDS.streak_30, 'streak30'); toast('💎 Streak di 30 giorni! +500 XP BONUS!', 'success'); }, 800); }
    toast('🎉 +' + xpAmount + ' XP! Ottimo lavoro!', 'success');
  } else if (status === 'skip' && prevStatus !== 'skip') {
    loseHeart();
    toast('💔 Cuore perso! Non saltare troppo...', 'info');
  } else if (status === 'done' && prevStatus === 'done') {
    // annulla
  } else {
    toast('📝 Allenamento registrato come saltato', 'info');
  }

  renderGamHUD();
}

// ===== CALENDAR =====
let calYear = today().getFullYear();
let calMonth = today().getMonth();
function calNav(dir) { calMonth += dir; if (calMonth > 11) { calMonth=0; calYear++; } if (calMonth < 0) { calMonth=11; calYear--; } renderCalendar(); }
function renderCalendar() {
  document.getElementById('calTitle').textContent = `${MONTHS_IT[calMonth]} ${calYear}`;
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const startOffset = (firstDay + 6) % 7; // Monday start
  let html = SHORT_DAYS.slice(1).concat(SHORT_DAYS[0]).map(d => `<div class="cal-header-cell">${d}</div>`).join('');
  for (let i = 0; i < startOffset; i++) {
    const prevDay = new Date(calYear, calMonth, -(startOffset-1-i));
    html += `<div class="cal-cell other-month"><span>${prevDay.getDate()}</span></div>`;
  }
  const now = today();
  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(calYear, calMonth, d);
    const k = dateKey(dt);
    const plan = WORKOUT_PLAN[dt.getDay()];
    const status = state.workoutLog[k];
    const isToday = k === dateKey(now);
    let cls = '', dot = '';
    if (status === 'done') { cls = 'done'; dot = `<div class="cal-dot check"></div>`; }
    else if (status === 'skip') { cls = 'skip'; dot = `<div class="cal-dot cross"></div>`; }
    else if (plan?.type === 'strength') dot = `<div class="cal-dot blue"></div>`;
    else if (plan?.type === 'run') dot = `<div class="cal-dot green"></div>`;
    else if (plan?.type === 'rest') { cls = 'rest-day'; dot = `<div class="cal-dot orange"></div>`; }
    if (isToday) cls += ' today';
    html += `<div class="cal-cell ${cls}" onclick="openDayModal('${k}')"><span>${d}</span>${dot}</div>`;
  }
  const totalCells = startOffset + daysInMonth;
  const remainingCells = totalCells % 7 ? 7 - (totalCells % 7) : 0;
  for (let i = 1; i <= remainingCells; i++) html += `<div class="cal-cell other-month"><span>${i}</span></div>`;
  document.getElementById('calGrid').innerHTML = html;
}

function openDayModal(dateStr) {
  const d = parseKey(dateStr);
  const dow = d.getDay();
  const plan = WORKOUT_PLAN[dow];
  const status = state.workoutLog[dateStr];
  document.getElementById('dayModalTitle').textContent = `${plan.emoji} ${DAYS_IT[dow]} ${d.getDate()} ${MONTHS_IT[d.getMonth()]}`;
  document.getElementById('dayModalSub').textContent = plan.name;
  let body = '';
  // Status
  if (status === 'done') body += `<div class="status-badge status-done" style="margin-bottom:14px">✅ Completato</div><br>`;
  else if (status === 'skip') body += `<div class="status-badge status-skip" style="margin-bottom:14px">❌ Saltato</div><br>`;
  else body += `<div class="status-badge status-pending" style="margin-bottom:14px">⏳ Non registrato</div><br>`;
  // Exercises
  if (plan.type === 'strength' && plan.exercises.length) {
    body += `<div class="guide-section-title">Esercizi</div>`;
    plan.exercises.forEach(ex => {
      body += `<div class="exercise-item"><div class="exercise-info"><div class="exercise-name">${ex.name}</div><div class="exercise-sets">${ex.sets}</div></div></div>`;
    });
  } else if (plan.type === 'run') {
    body += `<div style="font-size:14px;color:var(--text-secondary)">🏃 Corsa: ${plan.detail||'30 minuti'}</div>`;
  } else {
    body += `<div style="font-size:14px;color:var(--text-secondary)">😴 Giornata di riposo e recupero</div>`;
  }
  // Diary note
  const note = state.diary[dateStr];
  if (note) {
    body += `<div class="guide-section-title" style="margin-top:14px">Note Diario</div><div style="font-size:13px;color:var(--text-secondary);line-height:1.6">${note.replace(/\n/g,'<br>')}</div>`;
  }
  // Actions
  if (plan.type !== 'rest' && dateStr <= dateKey(today())) {
    body += `<div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-success btn-sm" onclick="setDayStatus('${dateStr}','done')">✅ Completato</button>
      <button class="btn btn-danger btn-sm" onclick="setDayStatus('${dateStr}','skip')">❌ Saltato</button>
    </div>`;
  }
  document.getElementById('dayModalBody').innerHTML = body;
  openModal('dayModal');
}
function setDayStatus(dateStr, status) {
  const prevStatus = state.workoutLog[dateStr];
  state.workoutLog[dateStr] = status;
  saveState(); renderCalendar(); renderDashboard(); checkBadges();
  closeModal('dayModal');

  if (status === 'done' && prevStatus !== 'done') {
    const d = parseKey(dateStr);
    const plan = WORKOUT_PLAN[d.getDay()];
    const xpAmount = plan.type === 'run' ? XP_REWARDS.run_done : XP_REWARDS.workout_done;
    addXP(xpAmount, 'workout_cal');
    if (state.gam.hearts < MAX_HEARTS) gainHeart();
    toast('✅ +' + xpAmount + ' XP! Registrato come completato', 'success');
  } else if (status === 'skip' && prevStatus !== 'skip') {
    loseHeart();
    toast('❌ Cuore perso! Registrato come saltato', 'info');
  } else {
    toast(status==='done'?'✅ Registrato come completato':'❌ Registrato come saltato', status==='done'?'success':'info');
  }
  renderGamHUD();
}

// ===== WORKOUT =====
let activeWorkoutDay = today().getDay();
function renderWorkout() {
  const tabs = document.getElementById('workoutDayTabs');
  tabs.innerHTML = Object.entries(WORKOUT_PLAN).map(([dow,plan]) => `
    <button class="preset-btn ${parseInt(dow)===activeWorkoutDay?'active':''}" onclick="setWorkoutDay(${dow})">${plan.emoji} ${DAYS_IT[dow].substring(0,3)}</button>
  `).join('');
  renderWorkoutDay();
}
function setWorkoutDay(dow) {
  activeWorkoutDay = parseInt(dow);
  renderWorkout();
}
function renderWorkoutDay() {
  const plan = WORKOUT_PLAN[activeWorkoutDay];
  const dow = activeWorkoutDay;
  let html = '';
  if (plan.type === 'rest') {
    html = `<div class="card" style="text-align:center;padding:40px">
      <div style="font-size:56px;margin-bottom:12px">😴</div>
      <div style="font-size:20px;font-weight:700;margin-bottom:8px">Giorno di Riposo</div>
      <div style="color:var(--text-muted);font-size:14px">Il recupero è parte fondamentale dell'allenamento. Rilassati e idratati!</div>
    </div>`;
  } else if (plan.type === 'run') {
    html = `<div class="card">
      <div class="flex items-center gap-3" style="margin-bottom:16px">
        <div style="font-size:40px">🏃</div>
        <div>
          <div style="font-size:20px;font-weight:700">Corsa</div>
          <div style="color:var(--text-muted);font-size:14px">${plan.detail}</div>
        </div>
      </div>
      <div class="guide-section">
        <div class="guide-section-title">Consigli per la corsa</div>
        <div class="guide-step"><div class="guide-step-num">1</div><div class="guide-step-text">Inizia con 5 minuti di camminata veloce per il riscaldamento</div></div>
        <div class="guide-step"><div class="guide-step-num">2</div><div class="guide-step-text">Mantieni un ritmo conversazionale: dovresti riuscire a parlare</div></div>
        <div class="guide-step"><div class="guide-step-num">3</div><div class="guide-step-text">Respira dal naso e dalla bocca, con un ritmo regolare</div></div>
        <div class="guide-step"><div class="guide-step-num">4</div><div class="guide-step-text">Termina con 5 minuti di defaticamento e stretching</div></div>
      </div>
    </div>`;
  } else {
    html = `<div class="card">
      <div class="flex items-center gap-3" style="margin-bottom:18px">
        <div style="font-size:40px">${plan.emoji}</div>
        <div>
          <div style="font-size:20px;font-weight:700">${plan.name}</div>
          <div style="color:var(--text-muted);font-size:14px">${plan.exercises.length} esercizi</div>
        </div>
      </div>`;
    plan.exercises.forEach(ex => {
      const guide = EXERCISE_GUIDE[ex.name];
      const diffColors = ['','#10b981','#f59e0b','#ef4444'];
      const diffNames = ['','Principiante','Intermedio','Avanzato'];
      html += `<div class="exercise-item">
        <div class="exercise-info">
          <div class="exercise-name">${ex.name}</div>
          <div class="exercise-sets" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:3px">
            <span>${ex.sets}</span>
            ${ex.muscles ? `<span style="color:var(--text-muted)">${ex.muscles.slice(0,2).join(', ')}</span>` : ''}
            ${guide ? `<span style="color:${diffColors[ex.diff||1]}">⬤ ${diffNames[ex.diff||1]}</span>` : ''}
          </div>
        </div>
        <div class="exercise-actions">
          <button class="btn btn-glass btn-sm" onclick="openExerciseGuide('${ex.name}')">📖 Guida</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  document.getElementById('workoutDayContent').innerHTML = html;
}

// ===== EXERCISE GUIDE =====
function openExerciseGuide(name) {
  const g = EXERCISE_GUIDE[name];
  if (!g) return;
  document.getElementById('modalExerciseName').textContent = name;
  document.getElementById('modalMuscles').innerHTML = g.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join('');
  const diffColors = ['','#10b981','#f59e0b','#ef4444'];
  const diffNames = ['','Principiante','Intermedio','Avanzato'];
  let body = `
    <div class="exercise-illustration">
      <div style="text-align:center">
        <div style="font-size:52px;filter:drop-shadow(0 2px 8px rgba(37,99,235,0.25))">${getExerciseEmoji(name)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:8px">${name}</div>
      </div>
    </div>
    <div class="guide-section">
      <div class="guide-section-title">Descrizione</div>
      <div class="text-sm">${g.desc}</div>
    </div>
    <div class="guide-section">
      <div class="guide-section-title">Esecuzione passo passo</div>
      ${g.steps.map((s,i) => `<div class="guide-step"><div class="guide-step-num">${i+1}</div><div class="guide-step-text">${s}</div></div>`).join('')}
    </div>
    <div class="guide-section">
      <div class="guide-section-title">Muscoli coinvolti</div>
      <div>${g.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join('')}</div>
    </div>
    <div class="guide-section">
      <div class="guide-section-title">Errori comuni</div>
      ${g.errors.map(e => `<div class="error-item"><span class="error-icon">⚠️</span><span class="error-text">${e}</span></div>`).join('')}
    </div>
    <div class="guide-section">
      <div class="guide-section-title">Dettagli</div>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <div><span class="text-xs">Difficoltà</span><br><span style="color:${diffColors[g.diff||1]};font-weight:700">● ${diffNames[g.diff||1]}</span></div>
        <div><span class="text-xs">Recupero</span><br><span class="text-sm font-bold">⏱ ${g.recovery}</span></div>
      </div>
    </div>
    <div class="guide-section">
      <div class="guide-section-title">💡 Consiglio pro</div>
      <div style="background:linear-gradient(135deg,rgba(37,99,235,0.08),rgba(124,58,237,0.05));border:1px solid rgba(37,99,235,0.15);border-radius:10px;padding:12px;font-size:13px;color:var(--text-secondary);line-height:1.6">${g.tips}</div>
    </div>`;
  document.getElementById('modalBody').innerHTML = body;
  openModal('exerciseModal');
}

function getExerciseEmoji(name) {
  const map = {
    'Piegamenti':'💪','Distensioni manubri':'🏋️','Croci':'🤸','Alzate laterali':'🙆',
    'Dip':'⬇️','Plank':'🧘','Trazioni':'🏗️','Rematore':'🚣','Curl bicipiti':'💪',
    'Curl martello':'🔨','Sollevamento gambe':'🦵','Crunch':'🔥','Squat':'🦵',
    'Affondi':'🚶','Stacco rumeno':'⬆️','Calf raise':'👟','Russian Twist':'🌀'
  };
  return map[name] || '💪';
}

// ===== MODAL =====
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => { if (e.target === el) closeModal(el.id); });
});

// ===== TIMER =====
let timerMode = 'stopwatch';
let timerRunning = false, timerInterval = null;
let timerSeconds = 0, timerTotal = 0;
let laps = [];

function setTimerMode(mode) {
  timerMode = mode;
  timerReset();
  document.querySelectorAll('.timer-presets .preset-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.timer-presets .preset-btn').forEach(b => {
    if ((mode==='stopwatch'&&b.textContent.includes('Cronometro'))||(mode==='countdown'&&b.textContent.includes('Conto'))||(mode==='rest'&&b.textContent.includes('Recupero'))) b.classList.add('active');
  });
  document.getElementById('countdownPresets').style.display = mode==='countdown'?'flex':'none';
  document.getElementById('restPresets').style.display = mode==='rest'?'flex':'none';
  document.getElementById('customTimerWrap').style.display = mode==='countdown'?'flex':'none';
  document.getElementById('timerModeLabel').textContent = {stopwatch:'CRONOMETRO',countdown:'CONTO ALLA ROVESCIA',rest:'RECUPERO'}[mode];
  document.getElementById('timerLapBtn').style.display = mode==='stopwatch'?'':'none';
}

function setCountdown(sec) { timerTotal = sec; timerSeconds = sec; updateTimerDisplay(); updateCircle(); }
function setCustomCountdown() {
  const m = parseInt(document.getElementById('customMin').value)||0;
  const s = parseInt(document.getElementById('customSec').value)||0;
  setCountdown(m*60+s);
}

function timerToggle() {
  if (timerRunning) {
    clearInterval(timerInterval); timerRunning = false;
    document.getElementById('timerStartBtn').textContent = '▶ Riprendi';
  } else {
    if (timerMode !== 'stopwatch' && timerSeconds <= 0) { if(timerTotal>0) timerSeconds=timerTotal; else return; }
    timerRunning = true;
    document.getElementById('timerStartBtn').textContent = '⏸ Pausa';
    timerInterval = setInterval(() => {
      if (timerMode === 'stopwatch') {
        timerSeconds++;
      } else {
        timerSeconds--;
        if (timerSeconds <= 0) {
          timerSeconds = 0; clearInterval(timerInterval); timerRunning = false;
          document.getElementById('timerStartBtn').textContent = '▶ Avvia';
          if (state.notifs.notifSound) playBeep();
          toast('⏰ Timer completato!', 'success');
        }
      }
      updateTimerDisplay(); updateCircle();
    }, 1000);
  }
}

function timerReset() {
  clearInterval(timerInterval); timerRunning = false; timerSeconds = timerTotal; laps = [];
  document.getElementById('timerStartBtn').textContent = '▶ Avvia';
  updateTimerDisplay(); updateCircle();
  document.getElementById('lapsContainer').innerHTML = '';
}

function timerLap() {
  if (!timerRunning) return;
  laps.unshift(formatTime(timerSeconds));
  document.getElementById('lapsContainer').innerHTML = laps.map((l,i)=>`<div class="history-item"><span class="text-xs" style="color:var(--text-muted)">Giro ${laps.length-i}</span><span class="text-sm font-bold ml-auto">${l}</span></div>`).join('');
}

function updateTimerDisplay() {
  document.getElementById('timerDisplay').textContent = formatTime(timerSeconds);
}
function formatTime(s) {
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = s%60;
  if (h > 0) return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}
function updateCircle() {
  const circ = 603;
  let pct = 1;
  if (timerMode !== 'stopwatch' && timerTotal > 0) pct = timerSeconds / timerTotal;
  const offset = circ * (1 - pct);
  document.getElementById('timerCircle').style.strokeDashoffset = offset;
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0,250,500].forEach(delay => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880; gain.gain.setValueAtTime(0.3, ctx.currentTime + delay/1000);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay/1000 + 0.3);
      osc.start(ctx.currentTime + delay/1000); osc.stop(ctx.currentTime + delay/1000 + 0.3);
    });
  } catch(e) {}
}

// ===== STATS =====
function renderStats() {
  const now = today();
  const yr = now.getFullYear();
  const streak = calcStreak();
  const ms = monthlyStats(yr, now.getMonth());
  
  // Annual stats
  let yDone = 0, yTotal = 0, restDays = 0;
  for (let m = 0; m <= now.getMonth(); m++) {
    const s = monthlyStats(yr, m); yDone += s.done; yTotal += s.total;
  }
  // Rest days taken
  Object.entries(state.workoutLog).forEach(([k,v]) => {
    if (v === 'done') {
      const d = parseKey(k);
      if (WORKOUT_PLAN[d.getDay()]?.type === 'rest') restDays++;
    }
  });
  // Count actual rest sundays
  let rCount = 0;
  const log = state.workoutLog;
  Object.keys(log).forEach(k => {
    const d = parseKey(k); if (d.getDay()===0) rCount++;
  });

  document.getElementById('s_workouts').textContent = totalWorkouts();
  document.getElementById('s_runs').textContent = totalRuns();
  document.getElementById('s_streak').textContent = Math.max(streak, state.bestStreak);
  document.getElementById('s_rest').textContent = rCount;
  document.getElementById('s_monthPct').textContent = ms.pct + '%';
  document.getElementById('s_yearPct').textContent = yTotal ? Math.round(yDone/yTotal*100) + '%' : '0%';
  document.getElementById('s_time').textContent = Math.round(totalWorkouts()*45/60) + 'h';
  document.getElementById('s_streak_cur').textContent = streak;

  // Charts
  renderBarChart('monthlyChart', 'strength');
  renderBarChart('runsChart', 'run');
}

function renderBarChart(containerId, type) {
  const now = today();
  const yr = now.getFullYear();
  const data = [];
  for (let m = 0; m < 12; m++) {
    if (m > now.getMonth()) { data.push({label: MONTHS_IT[m].substring(0,3), val:0}); continue; }
    const daysInMonth = new Date(yr, m+1, 0).getDate();
    let done = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(yr, m, d);
      const plan = WORKOUT_PLAN[dt.getDay()];
      if (plan?.type !== type) continue;
      if (state.workoutLog[dateKey(dt)] === 'done') done++;
    }
    data.push({label: MONTHS_IT[m].substring(0,3), val: done});
  }
  const maxVal = Math.max(...data.map(d=>d.val), 1);
  const html = data.map(d => `<div class="chart-bar-wrap">
    <div class="chart-bar ${type==='run'?'run':''}" style="height:${Math.round(d.val/maxVal*100)}%"></div>
    <div class="chart-label">${d.label.substring(0,1)}</div>
  </div>`).join('');
  document.getElementById(containerId).innerHTML = html;
}

// ===== GOALS =====
function renderGoals() {
  const ws = weeklyStats();
  const now = today();
  const weekRuns = countWeeklyRuns();
  const html = `
    <div class="goal-row">
      <div class="goal-info">
        <div class="goal-name">💪 Allenamenti settimanali</div>
        <div class="goal-progress-row">
          <div class="goal-pct">${ws.done}/${state.goals.weeklyWorkouts}</div>
          <div class="goal-track progress-track"><div class="progress-fill" style="width:${Math.min(100,Math.round(ws.done/state.goals.weeklyWorkouts*100))}%"></div></div>
        </div>
      </div>
      <input type="number" class="goal-input" id="goalWeeklyWorkouts" value="${state.goals.weeklyWorkouts}" min="1" max="7">
    </div>
    <div class="goal-row">
      <div class="goal-info">
        <div class="goal-name">🏃 Corse settimanali</div>
        <div class="goal-progress-row">
          <div class="goal-pct">${weekRuns}/${state.goals.weeklyRuns}</div>
          <div class="goal-track progress-track"><div class="progress-fill green" style="width:${Math.min(100,Math.round(weekRuns/state.goals.weeklyRuns*100))}%"></div></div>
        </div>
      </div>
      <input type="number" class="goal-input" id="goalWeeklyRuns" value="${state.goals.weeklyRuns}" min="1" max="7">
    </div>`;
  document.getElementById('goalsContainer').innerHTML = html;

  // Custom goals
  renderCustomGoals();
}

function countWeeklyRuns() {
  const now = today();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay()+6)%7));
  let runs = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek); d.setDate(startOfWeek.getDate()+i);
    const k = dateKey(d); const plan = WORKOUT_PLAN[d.getDay()];
    if (plan?.type === 'run' && state.workoutLog[k] === 'done') runs++;
  }
  return runs;
}

function saveGoals() {
  state.goals.weeklyWorkouts = parseInt(document.getElementById('goalWeeklyWorkouts').value) || 3;
  state.goals.weeklyRuns = parseInt(document.getElementById('goalWeeklyRuns').value) || 3;
  saveState(); toast('🎯 Obiettivi salvati!', 'success'); renderGoals();
}

function addCustomGoal() {
  const text = document.getElementById('customGoalText').value.trim();
  const date = document.getElementById('customGoalDate').value;
  if (!text) { toast('❌ Inserisci una descrizione', 'error'); return; }
  state.customGoals.push({ text, date, done: false, id: Date.now() });
  saveState(); document.getElementById('customGoalText').value = ''; document.getElementById('customGoalDate').value = '';
  renderCustomGoals(); toast('✅ Obiettivo aggiunto!', 'success');
}

function renderCustomGoals() {
  if (!state.customGoals.length) { document.getElementById('customGoalsList').innerHTML = '<div class="text-xs">Nessun obiettivo personalizzato</div>'; return; }
  const html = state.customGoals.map(g => `<div class="goal-row">
    <div class="goal-info">
      <div class="goal-name" style="${g.done?'text-decoration:line-through;opacity:0.6':''}">🎯 ${g.text}</div>
      ${g.date ? `<div class="text-xs">Scadenza: ${new Date(g.date).toLocaleDateString('it-IT')}</div>` : ''}
    </div>
    <div style="display:flex;gap:6px">
      <button class="btn btn-glass btn-sm" onclick="toggleCustomGoal(${g.id})">${g.done?'↩':'✅'}</button>
      <button class="btn btn-danger btn-sm" onclick="removeCustomGoal(${g.id})">🗑</button>
    </div>
  </div>`).join('');
  document.getElementById('customGoalsList').innerHTML = html;
}

function toggleCustomGoal(id) {
  const g = state.customGoals.find(g => g.id === id);
  if (g) { g.done = !g.done; saveState(); renderCustomGoals(); }
}
function removeCustomGoal(id) {
  state.customGoals = state.customGoals.filter(g => g.id !== id);
  saveState(); renderCustomGoals();
}

// ===== BADGES =====
const BADGE_DEFS = [
  { id: 'first_workout', emoji: '🌟', name: 'Primo Passo', desc: 'Primo allenamento completato', check: () => totalWorkouts() >= 1 },
  { id: 'week1', emoji: '📅', name: 'Prima Settimana', desc: 'Settimana completata', check: () => weeklyStats().pct >= 100 },
  { id: 'w10', emoji: '🔟', name: '10 Allenamenti', desc: 'Raggiunti 10 allenamenti', check: () => totalWorkouts() >= 10 },
  { id: 'w25', emoji: '💎', name: '25 Allenamenti', desc: 'Raggiunti 25 allenamenti', check: () => totalWorkouts() >= 25 },
  { id: 'w50', emoji: '🏅', name: '50 Allenamenti', desc: 'Raggiunti 50 allenamenti', check: () => totalWorkouts() >= 50 },
  { id: 'w100', emoji: '🏆', name: '100 Allenamenti', desc: 'Leggendario: 100 allenamenti!', check: () => totalWorkouts() >= 100 },
  { id: 'streak30', emoji: '🔥', name: '30 Giorni', desc: '30 giorni consecutivi', check: () => calcStreak() >= 30 },
  { id: 'streak7', emoji: '⚡', name: '7 Giorni', desc: '7 giorni di fila', check: () => calcStreak() >= 7 },
  { id: 'run10', emoji: '🏃', name: '10 Corse', desc: 'Raggiunte 10 corse', check: () => totalRuns() >= 10 },
  { id: 'run25', emoji: '🥇', name: '25 Corse', desc: 'Raggiunte 25 corse', check: () => totalRuns() >= 25 },
  { id: 'consistent', emoji: '📊', name: 'Costante', desc: 'Mese con >75% completamento', check: () => { const m=monthlyStats(today().getFullYear(),today().getMonth()); return m.pct >= 75; } },
  { id: 'early_bird', emoji: '🌅', name: 'Mattiniero', desc: 'Benvenuto nella famiglia egosTrain', check: () => totalWorkouts() >= 1 },
];

function checkBadges() {
  let newBadge = false;
  BADGE_DEFS.forEach(b => {
    if (!state.badges[b.id] && b.check()) {
      state.badges[b.id] = new Date().toISOString();
      newBadge = true;
      setTimeout(() => toast(`🏆 Badge sbloccato: ${b.name}!`, 'success'), 500);
    }
  });
  if (newBadge) saveState();
  updateBadgeSidebarCount();
}

function updateBadgeSidebarCount() {
  const count = Object.keys(state.badges).length;
  document.getElementById('sidebarBadgeCount').textContent = count;
  document.getElementById('badgeUnlockedCount').textContent = `${count} sbloccati`;
}

function renderBadges() {
  const html = BADGE_DEFS.map(b => {
    const unlocked = !!state.badges[b.id];
    const dateStr = unlocked ? new Date(state.badges[b.id]).toLocaleDateString('it-IT') : '';
    return `<div class="badge-card ${unlocked?'':'locked'}">
      <span class="badge-emoji">${b.emoji}</span>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
      ${unlocked ? `<div class="badge-unlocked">✅ ${dateStr}</div>` : '<div class="text-xs">🔒 Da sbloccare</div>'}
    </div>`;
  }).join('');
  document.getElementById('badgesGrid').innerHTML = html;
  updateBadgeSidebarCount();
}

// ===== DIARY =====
let diaryDebounce = null;
function diaryToday() {
  const d = today();
  document.getElementById('diaryDate').value = dateKey(d);
  loadDiaryEntry();
}
function loadDiaryEntry() {
  const k = document.getElementById('diaryDate').value;
  const d = parseKey(k);
  document.getElementById('diaryDayLabel').textContent = `${DAYS_IT[d.getDay()]}, ${d.getDate()} ${MONTHS_IT[d.getMonth()]} ${d.getFullYear()}`;
  const entry = state.diary[k] || '';
  document.getElementById('diaryEntry').value = entry;
  document.getElementById('diaryCharCount').textContent = `${entry.length} caratteri`;
  document.getElementById('diarySaveStatus').textContent = '';
}
function saveDiaryEntry() {
  const k = document.getElementById('diaryDate').value;
  const text = document.getElementById('diaryEntry').value;
  document.getElementById('diaryCharCount').textContent = `${text.length} caratteri`;
  clearTimeout(diaryDebounce);
  diaryDebounce = setTimeout(() => {
    const isNew = !state.diary[k] || state.diary[k].trim() === '';
    state.diary[k] = text;
    saveState();
    if (isNew && text.trim().length > 20) { addXP(XP_REWARDS.diary_entry, 'diary'); }
    document.getElementById('diarySaveStatus').textContent = '✅ Salvato';
    setTimeout(() => document.getElementById('diarySaveStatus').textContent = '', 1500);
    renderRecentDiary();
  }, 600);
}
function renderRecentDiary() {
  const entries = Object.entries(state.diary)
    .filter(([,v]) => v.trim())
    .sort(([a],[b]) => b.localeCompare(a)).slice(0,5);
  if (!entries.length) { document.getElementById('recentDiaryEntries').innerHTML = '<div class="text-xs">Nessuna nota ancora. Inizia a scrivere!</div>'; return; }
  let html = '';
  entries.forEach(([k,v]) => {
    const d = parseKey(k);
    html += `<div class="history-item">
      <div style="flex:1">
        <div class="text-xs" style="color:var(--accent)">${DAYS_IT[d.getDay()]} ${d.getDate()} ${MONTHS_IT[d.getMonth()]}</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-top:2px;line-height:1.5">${v.substring(0,120)}${v.length>120?'…':''}</div>
      </div>
      <button class="btn btn-glass btn-sm" onclick="document.getElementById('diaryDate').value='${k}';loadDiaryEntry();navigateTo('diary')">Apri</button>
    </div>`;
  });
  document.getElementById('recentDiaryEntries').innerHTML = html;
}

// ===== NOTIFICATIONS =====
function saveNotifSettings() {
  state.notifs = {
    notif1: document.getElementById('notif1').checked,
    notif2: document.getElementById('notif2').checked,
    notif3: document.getElementById('notif3').checked,
    notifSound: document.getElementById('notifSound').checked
  };
  saveState();
}
function loadNotifSettings() {
  if (state.notifs.notif1 !== undefined) document.getElementById('notif1').checked = state.notifs.notif1;
  if (state.notifs.notif2 !== undefined) document.getElementById('notif2').checked = state.notifs.notif2;
  if (state.notifs.notif3 !== undefined) document.getElementById('notif3').checked = state.notifs.notif3;
  if (state.notifs.notifSound !== undefined) document.getElementById('notifSound').checked = state.notifs.notifSound;
}

// ===== TOAST =====
function toast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${msg}</span>`;
  document.getElementById('toastContainer').appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(40px)'; t.style.transition='0.3s'; setTimeout(()=>t.remove(),300); }, 3200);
}

// ===== RESET =====
function resetAllData() {
  localStorage.removeItem('egosTrain_state');
  state = { workoutLog:{}, diary:{}, goals:{weeklyWorkouts:3,weeklyRuns:3}, customGoals:[], notifs:{notif1:true,notif2:true,notif3:false,notifSound:true}, badges:{}, bestStreak:0 };
  renderDashboard(); toast('🗑 Dati eliminati', 'info');
}


// ===== GAMIFICATION SYSTEM =====

// Livelli: ogni livello richiede XP cumulativo
const LEVELS = [
  { level:1,  name:'Principiante',  xpNeeded:0,    emoji:'🌱', bonus:'5 💎' },
  { level:2,  name:'Atleta Junior', xpNeeded:100,  emoji:'🏃', bonus:'10 💎' },
  { level:3,  name:'Guerriero',     xpNeeded:250,  emoji:'⚔️', bonus:'15 💎 + ❤️ extra' },
  { level:4,  name:'Campione',      xpNeeded:500,  emoji:'🥊', bonus:'20 💎' },
  { level:5,  name:'Maestro',       xpNeeded:850,  emoji:'🏆', bonus:'30 💎 + ❤️ extra' },
  { level:6,  name:'Leggenda',      xpNeeded:1300, emoji:'⭐', bonus:'50 💎' },
  { level:7,  name:'Semidio',       xpNeeded:2000, emoji:'⚡', bonus:'75 💎 + ❤️ extra' },
  { level:8,  name:'Immortale',     xpNeeded:3000, emoji:'🦅', bonus:'100 💎' },
  { level:9,  name:'Titano',        xpNeeded:4500, emoji:'🌋', bonus:'150 💎' },
  { level:10, name:'egosTitan',     xpNeeded:6500, emoji:'👑', bonus:'200 💎 + cuori infiniti' },
];

// XP guadagnato per azione
const XP_REWARDS = {
  workout_done:   50,   // allenamento forza completato
  run_done:       40,   // corsa completata
  streak_7:       100,  // 7 giorni consecutivi
  streak_30:      500,  // 30 giorni consecutivi
  diary_entry:    10,   // nota diario salvata
  goal_complete:  80,   // obiettivo completato
  first_workout:  150,  // primo allenamento in assoluto
};

const MAX_HEARTS = 5;

// ── Inizializza stato gamification ──
if (!state.gam) {
  state.gam = {
    xp: 0,
    level: 1,
    hearts: MAX_HEARTS,
    gems: 0,
    streakFreeze: false,
    lastHeartRecover: null, // data ultima perdita cuore
  };
}

function getLevelInfo(xp) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpNeeded) { current = LEVELS[i]; next = LEVELS[i+1] || null; break; }
  }
  const xpInLevel = xp - current.xpNeeded;
  const xpToNext  = next ? next.xpNeeded - current.xpNeeded : 1;
  const pct       = next ? Math.min(100, Math.round(xpInLevel / xpToNext * 100)) : 100;
  return { current, next, xpInLevel, xpToNext, pct };
}

function addXP(amount, reason) {
  const g = state.gam;
  const prevLevel = getLevelInfo(g.xp).current.level;
  g.xp += amount;
  const newInfo = getLevelInfo(g.xp);
  const newLevel = newInfo.current.level;

  saveState();
  renderGamHUD();
  showXpPopup(amount);

  // Level up?
  if (newLevel > prevLevel) {
    setTimeout(() => showLevelUpModal(newInfo.current, newInfo.next), 400);
    // Bonus gemme
    g.gems += parseInt(newInfo.current.bonus) || 10;
    // Alcuni livelli danno cuore extra
    if (newInfo.current.bonus && newInfo.current.bonus.includes('❤️')) {
      g.hearts = Math.min(MAX_HEARTS + 1, g.hearts + 1);
    }
    saveState();
  }
}

function loseHeart() {
  const g = state.gam;
  if (g.hearts <= 0) { openModal('heartsModal'); return; }
  g.hearts = Math.max(0, g.hearts - 1);
  state.gam.lastHeartRecover = todayKey();
  saveState();
  renderGamHUD();
  const el = document.getElementById('hudHeartsVal');
  if (el) { el.classList.add('heart-lost'); setTimeout(() => el.classList.remove('heart-lost'), 400); }
  if (g.hearts === 0) { setTimeout(() => openModal('heartsModal'), 600); }
}

function gainHeart() {
  const g = state.gam;
  if (g.hearts >= MAX_HEARTS) return;
  g.hearts++;
  saveState();
  renderGamHUD();
  const el = document.getElementById('hudHeartsVal');
  if (el) { el.classList.add('heart-gained'); setTimeout(() => el.classList.remove('heart-gained'), 500); }
}

function showXpPopup(amount) {
  const el = document.getElementById('xpPopup');
  if (!el) return;
  el.textContent = '+' + amount + ' XP';
  el.classList.remove('show');
  void el.offsetWidth; // reflow
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 1500);
}

function showLevelUpModal(lvl, next) {
  const content = document.getElementById('levelUpContent');
  if (!content) return;
  const nextHTML = next
    ? `<div class="levelup-reward">🎯 Prossimo: ${next.name}</div>`
    : `<div class="levelup-reward">👑 Livello massimo!</div>`;
  content.innerHTML = `
    <span class="levelup-emoji">${lvl.emoji}</span>
    <div class="levelup-title">Livello raggiunto!</div>
    <div class="levelup-level">Livello ${lvl.level}</div>
    <div class="levelup-name">${lvl.name}</div>
    <div class="levelup-rewards">
      <div class="levelup-reward">🎁 ${lvl.bonus}</div>
      ${nextHTML}
    </div>
    <button class="btn btn-primary" onclick="closeModal('levelUpModal')" style="width:100%;justify-content:center">Fantastico! 🎉</button>
  `;
  openModal('levelUpModal');
}

function renderGamHUD() {
  const g = state.gam;
  const streak = calcStreak();
  const info = getLevelInfo(g.xp);
  const lvl = info.current;

  const ids = {
    badge:   ['hudLevelBadge','dashLevelBadge','mxpBadge'],
    name:    ['hudLevelName','dashLevelName','mxpLevelName'],
    xpFill:  ['hudXpFill','dashXpFill2','mxpFill'],
    xpText:  ['hudXpText','mxpXpText'],
    streak:  ['hudStreakVal','dashStreakVal2','mxpStreak'],
    hearts:  ['hudHeartsVal','dashHeartsVal2','mxpHearts'],
    gems:    ['hudGemsVal','dashGemsVal2'],
  };

  const setAll = (keys, val, attr='textContent') => keys.forEach(id => {
    const el = document.getElementById(id); if (el) el[attr] = val;
  });

  setAll(ids.badge, lvl.level);
  setAll(ids.name, lvl.name);
  setAll(ids.xpFill, info.pct + '%', 'style.width'); // fix below
  ids.xpFill.forEach(id => {
    const el = document.getElementById(id); if (el) el.style.width = info.pct + '%';
  });
  ids.xpText.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = info.next
      ? (info.xpInLevel + ' / ' + info.xpToNext + ' XP')
      : 'MAX';
  });
  const dashSub = document.getElementById('dashXpSub');
  if (dashSub) dashSub.textContent = info.next
    ? (info.xpInLevel + ' / ' + info.xpToNext + ' XP al prossimo livello')
    : '🏆 Livello massimo!';

  setAll(ids.streak, streak);
  setAll(ids.hearts, g.hearts);
  setAll(ids.gems, g.gems);

  // Streak badge dashboard
  const sb = document.getElementById('streakBadge');
  if (sb) sb.textContent = '🔥 ' + streak + ' giorni';
}

// ===== INIT =====
function init() {
  loadState();
  // Assicura che stato gamification esista
  if (!state.gam) state.gam = { xp:0, level:1, hearts:MAX_HEARTS, gems:0, streakFreeze:false, lastHeartRecover:null };
  loadTheme();
  loadNotifSettings();
  renderDashboard();
  renderWorkout();
  setTimerMode('stopwatch');
  calYear = today().getFullYear(); calMonth = today().getMonth();
  renderGamHUD();
}

init();
