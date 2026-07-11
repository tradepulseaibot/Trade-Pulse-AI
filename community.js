// ===== Trade Pulse AI – community.js (FULL DEBUG VERSION) =====
(function() {
  console.log('community.js loaded with organic chat refinements + DEBUG');

  // ---- DEBUG INFRASTRUCTURE ----
  const debugLogs = [];
  function debugLog(msg) {
    const time = new Date().toISOString().slice(11, 19); // HH:MM:SS
    const entry = `[${time}] ${msg}`;
    console.log('%c[DEBUG]%c ' + entry, 'color: #a855f7; font-weight: bold', 'color: inherit');
    debugLogs.push({ time, msg });
    updateDebugPanel();
  }

  function createDebugPanel() {
    if (document.getElementById('debugPanelContainer')) return;
    const container = document.createElement('div');
    container.id = 'debugPanelContainer';
    container.style.cssText = `
      position: fixed; bottom: 10px; right: 10px; width: 340px; max-height: 400px; background: rgba(0,0,0,0.9); border: 1px solid #a855f7; border-radius: 12px; z-index: 9999;
      display: flex; flex-direction: column; font-family: monospace; font-size: 11px; color: #ddd; overflow: hidden;
    `;
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 10px; background:#1f1f2f; border-radius:12px 12px 0 0; cursor:move;">
        <span style="color:#a855f7; font-weight:bold;">🐞 Debug Log</span>
        <div>
          <button id="copyDebugLogsBtn" style="background:none; border:none; color:#a855f7; cursor:pointer; margin-right:6px;" title="Copy logs">📋</button>
          <button id="clearDebugLogsBtn" style="background:none; border:none; color:#a855f7; cursor:pointer; margin-right:6px;" title="Clear">🗑️</button>
          <button id="toggleDebugPanelBtn" style="background:none; border:none; color:#a855f7; cursor:pointer;" title="Minimize">_</button>
        </div>
      </div>
      <div id="debugLogList" style="overflow-y:auto; padding:6px 10px; flex:1; min-height:80px; max-height:300px;"></div>
      <div style="font-size:10px; text-align:center; padding:4px; background:#1f1f2f; border-radius:0 0 12px 12px; color:#666;">Trade Pulse AI Debugger</div>
    `;
    document.body.appendChild(container);

    let minimized = false;
    document.getElementById('toggleDebugPanelBtn').addEventListener('click', () => {
      minimized = !minimized;
      document.getElementById('debugLogList').style.display = minimized ? 'none' : 'block';
    });

    document.getElementById('copyDebugLogsBtn').addEventListener('click', () => {
      const text = debugLogs.map(l => `[${l.time}] ${l.msg}`).join('\n');
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyDebugLogsBtn');
        btn.textContent = '✅';
        setTimeout(() => { btn.textContent = '📋'; }, 2000);
      });
    });

    document.getElementById('clearDebugLogsBtn').addEventListener('click', () => {
      debugLogs.length = 0;
      updateDebugPanel();
    });
  }

  function updateDebugPanel() {
    const list = document.getElementById('debugLogList');
    if (!list) return;
    list.innerHTML = debugLogs.slice(-50).map(l => `<div style="margin-bottom:2px;"><span style="color:#888;">${l.time}</span> ${l.msg}</div>`).join('');
    list.scrollTop = list.scrollHeight;
  }

  window.addEventListener('error', (e) => {
    debugLog(`UNCAUGHT ERROR: ${e.message} at ${e.filename}:${e.lineno}`);
  });

  // ========== PERSONA DATA (includes admin + 4 moderators) ==========
  const personaData = [
    { name: "oladapo ogunsakin", gender: "men", country: "Nigeria", isFallback: false },
    { name: "narciso panganiban", gender: "men", country: "Mexico", isFallback: false },
    { name: "Elmer nunez 📉", gender: "men", country: "Mexico", isFallback: false },
    { name: "Penwell leslie", gender: "men", country: "SouthAfrica", isFallback: false },
    { name: "G.a. Scott", gender: "men", country: "US", isFallback: false },
    { name: "Cherry Reichhart", gender: "women", country: "Germany", isFallback: false },
    { name: "Flash BE", gender: "men", country: "United Kingdom", isFallback: false },
    { name: "scott jung", gender: "men", country: "US", isFallback: false },
    { name: "Dottie Ragland", gender: "women", country: "US", isFallback: false },
    { name: "Andrew Funk", gender: "men", country: "US", isFallback: false },
    { name: "Amy Jasmine", gender: "women", country: "US", isFallback: false },
    { name: "Brian Kahle", gender: "men", country: "US", isFallback: false },
    { name: "Maureen joan jefferys", gender: "women", country: "United Kingdom", isFallback: false },
    { name: "Stanley willingham jr", gender: "men", country: "US", isFallback: false },
    { name: "Frank Lowry", gender: "men", country: "US", isFallback: false },
    { name: "Micheal Shaw", gender: "men", country: "US", isFallback: false },
    { name: "Arlene paz rodriguez", gender: "women", country: "Mexico", isFallback: false },
    { name: "louis wayne", gender: "men", country: "US", isFallback: false },
    { name: "Jennifer West", gender: "women", country: "US", isFallback: false },
    { name: "Connie H. Price", gender: "women", country: "US", isFallback: false },
    { name: "ashley muse", gender: "women", country: "US", isFallback: false },
    { name: "Trovis banks 🏦💰", gender: "men", country: "US", isFallback: false },
    { name: "Carmeal Smith", gender: "men", country: "US", isFallback: false },
    { name: "Jamie Terrell", gender: "men", country: "US", isFallback: false },
    { name: "Trovao Duchness 🦊", gender: "men", country: "Brazil", isFallback: false },
    { name: "Lessie Willhite", gender: "women", country: "US", isFallback: false },
    { name: "Chiquita Tate", gender: "women", country: "US", isFallback: false },
    { name: "Eric Harris", gender: "men", country: "US", isFallback: false },
    { name: "Mona Dent", gender: "women", country: "US", isFallback: false },
    { name: "Salman Rasheed", gender: "men", country: "UAE", isFallback: false },
    { name: "Syed Ali Zohaib", gender: "men", country: "India", isFallback: false },
    { name: "Moshin Ansari", gender: "men", country: "India", isFallback: false },
    { name: "Saqib Naveed", gender: "men", country: "India", isFallback: false },
    { name: "Sergio Vega munoz 🔥", gender: "men", country: "Mexico", isFallback: false },
    { name: "frankie elric", gender: "men", country: "US", isFallback: false },
    { name: "Chris Alexander", gender: "men", country: "US", isFallback: false },
    { name: "Angel Lopez", gender: "men", country: "Mexico", isFallback: false },
    { name: "Anthony Onyinkwa", gender: "men", country: "Nigeria", isFallback: false },
    { name: "victor e keyz 🎹🎺📉", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Dereje haile", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Sym Ple", gender: "men", country: "US", isFallback: false },
    { name: "Das Haruna Fearless", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Tomas Yende", gender: "men", country: "SouthAfrica", isFallback: false },
    { name: "Stanley Ezeorjika 💰", gender: "men", country: "Nigeria", isFallback: false },
    { name: "jen lee", gender: "women", country: "US", isFallback: false },
    { name: "Nieves yazita 🌹❣️", gender: "women", country: "Mexico", isFallback: false },
    { name: "Dominic Harley", gender: "men", country: "United Kingdom", isFallback: false },
    { name: "Abita Fong", gender: "women", country: "Indonesia", isFallback: false },
    { name: "Oskar Lopez", gender: "men", country: "Mexico", isFallback: false },
    { name: "Ricardo Antonio mex", gender: "men", country: "Mexico", isFallback: false },
    { name: "Sarahi Reynaga", gender: "women", country: "Mexico", isFallback: false },
    { name: "Ana Montes", gender: "women", country: "Mexico", isFallback: false },
    { name: "jacqueline alvarado", gender: "women", country: "Mexico", isFallback: false },
    { name: "Yadira Torres Rivera", gender: "women", country: "Mexico", isFallback: false },
    { name: "Valentina Orozco 😎", gender: "women", country: "Mexico", isFallback: false },
    { name: "Manuel ascota", gender: "men", country: "Mexico", isFallback: false },
    { name: "David Magana 💹📉", gender: "men", country: "Mexico", isFallback: false },
    { name: "Besty Claudio Lopez", gender: "women", country: "Mexico", isFallback: false },
    { name: "Yadira rodriguez", gender: "women", country: "Mexico", isFallback: false },
    { name: "Juan torres nunez", gender: "men", country: "Mexico", isFallback: false },
    { name: "Valerina Pedraza", gender: "women", country: "Mexico", isFallback: false },
    { name: "eric ortiz", gender: "men", country: "Mexico", isFallback: false },
    { name: "Edd Trulli", gender: "men", country: "US", isFallback: false },
    { name: "marcy saenz", gender: "women", country: "Mexico", isFallback: false },
    { name: "Andy Zensation 📊", gender: "men", country: "US", isFallback: false },
    { name: "Latex mt tozer", gender: "men", country: "US", isFallback: false },
    { name: "Kluta wangempella ll", gender: "men", country: "SouthAfrica", isFallback: false },
    { name: "Boaster Friday", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Philp Otive", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Akiiga Fabian", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Kelly TV", gender: "women", country: "US", isFallback: false },
    { name: "Esther Fidelis", gender: "women", country: "Nigeria", isFallback: false },
    { name: "Mates nsikak", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Friday Kelly", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Edeh Favour", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Lazy Dark 🌑💰💲", gender: "men", country: "US", isFallback: false },
    { name: "Kullest Kidd 🪐", gender: "men", country: "US", isFallback: false },
    { name: "Paul jande", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Bwalya Coxy", gender: "men", country: "SouthAfrica", isFallback: false },
    { name: "Boss  Mega ⚡⚡⚡", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Regard Nyakane", gender: "men", country: "SouthAfrica", isFallback: false },
    { name: "Tdk Mj", gender: "men", country: "US", isFallback: false },
    { name: "Mbg Mook 🍒", gender: "men", country: "US", isFallback: false },
    { name: "Larry Verb Washington", gender: "men", country: "US", isFallback: false },
    { name: "Md aldarondo", gender: "men", country: "Mexico", isFallback: false },
    { name: "jens kleinschmidt", gender: "men", country: "Germany", isFallback: false },
    { name: "Buchi Joseph", gender: "men", country: "Nigeria", isFallback: false },
    { name: "mitchell dufort", gender: "men", country: "US", isFallback: false },
    { name: "marvel Da' sauce", gender: "men", country: "US", isFallback: false },
    { name: "Red Barron", gender: "men", country: "US", isFallback: false },
    { name: "Oliver Meszaros", gender: "men", country: "Germany", isFallback: false },
    { name: "Ben Leary", gender: "men", country: "United Kingdom", isFallback: false },
    { name: "Ron  Thomson 🏍️", gender: "men", country: "US", isFallback: false },
    { name: "Nicholas Marchese", gender: "men", country: "US", isFallback: false },
    { name: "Joe Cottrell", gender: "men", country: "US", isFallback: false },
    { name: "Jovan Mircetic", gender: "men", country: "US", isFallback: false },
    { name: "Jordan A Ashcer", gender: "men", country: "US", isFallback: false },
    { name: "matt donald", gender: "men", country: "US", isFallback: false },
    { name: "Chris harney", gender: "men", country: "US", isFallback: false },
    { name: "Dvedat Demirci", gender: "men", country: "Germany", isFallback: false },
    { name: "Serhat Nuri Kaya", gender: "men", country: "Germany", isFallback: false },
    { name: "Julibel Golilao", gender: "women", country: "Indonesia", isFallback: false },
    { name: "Maria Gonzalez", gender: "women", country: "Mexico", isFallback: true },
    { name: "Carlos Mendez", gender: "men", country: "Mexico", isFallback: true },
    { name: "Linda Schmidt", gender: "women", country: "Germany", isFallback: true },
    { name: "Hans Becker", gender: "men", country: "Germany", isFallback: true },
    { name: "Priya Sharma", gender: "women", country: "India", isFallback: true },
    { name: "Raj Patel", gender: "men", country: "India", isFallback: true },
    { name: "Aisha Al-Farsi", gender: "women", country: "UAE", isFallback: true },
    { name: "Omar Hassan", gender: "men", country: "UAE", isFallback: true },
    { name: "Sofia Rossi", gender: "women", country: "Brazil", isFallback: true },
    { name: "Lucas Silva", gender: "men", country: "Brazil", isFallback: true },
    { name: "Chloe Martin", gender: "women", country: "United Kingdom", isFallback: true },
    { name: "James Taylor", gender: "men", country: "United Kingdom", isFallback: true },
    { name: "Emily Johnson", gender: "women", country: "US", isFallback: true },
    { name: "Michael Brown", gender: "men", country: "US", isFallback: true },
    { name: "Siti Nurhaliza", gender: "women", country: "Indonesia", isFallback: true },
    { name: "Budi Santoso", gender: "men", country: "Indonesia", isFallback: true },
    { name: "Zinhle Dlamini", gender: "women", country: "SouthAfrica", isFallback: true },
    { name: "Thabo Nkosi", gender: "men", country: "SouthAfrica", isFallback: true },
    { name: "Amara Okonkwo", gender: "women", country: "Nigeria", isFallback: true },
    { name: "Chidi Eze", gender: "men", country: "Nigeria", isFallback: true },
    { name: "Isabella Costa", gender: "women", country: "Brazil", isFallback: true },
    { name: "Mateo Fernandez", gender: "men", country: "Mexico", isFallback: true },
    { name: "Emma Wilson", gender: "women", country: "United Kingdom", isFallback: true },
    { name: "David Kim", gender: "men", country: "US", isFallback: true },
    { name: "Yuki Tanaka", gender: "women", country: "Indonesia", isFallback: true },
    { name: "Ahmed Al-Mansouri", gender: "men", country: "UAE", isFallback: true },
    { name: "Neha Gupta", gender: "women", country: "India", isFallback: true },
    { name: "Vikram Singh", gender: "men", country: "India", isFallback: true },
    { name: "Laura Fischer", gender: "women", country: "Germany", isFallback: true },
    { name: "Stefan Weber", gender: "men", country: "Germany", isFallback: true },
    { name: "Nia Siregar", gender: "women", country: "Indonesia", isFallback: true },
    { name: "Andi Wijaya", gender: "men", country: "Indonesia", isFallback: true },
    { name: "Lerato Mokoena", gender: "women", country: "SouthAfrica", isFallback: true },
    { name: "Sipho Khumalo", gender: "men", country: "SouthAfrica", isFallback: true },
    { name: "Folake Adeyemi", gender: "women", country: "Nigeria", isFallback: true },
    { name: "Tunde Balogun", gender: "men", country: "Nigeria", isFallback: true },
    { name: "Jessica Miller", gender: "women", country: "US", isFallback: true },
    { name: "Christopher Davis", gender: "men", country: "US", isFallback: true },
    { name: "Sophie Evans", gender: "women", country: "United Kingdom", isFallback: true },
    { name: "William Jones", gender: "men", country: "United Kingdom", isFallback: true },
    { name: "Camila Rocha", gender: "women", country: "Brazil", isFallback: true },
    { name: "Gustavo Lima", gender: "men", country: "Brazil", isFallback: true },
    { name: "Fatima Al-Zaabi", gender: "women", country: "UAE", isFallback: true },
    { name: "Rashid Al-Kaabi", gender: "men", country: "UAE", isFallback: true },
    { name: "Anjali Reddy", gender: "women", country: "India", isFallback: true },
    { name: "Arjun Mehta", gender: "men", country: "India", isFallback: true },
    { name: "Valeria Hernandez", gender: "women", country: "Mexico", isFallback: true },
    { name: "Alejandro Ruiz", gender: "men", country: "Mexico", isFallback: true },
    { name: "Anna Wagner", gender: "women", country: "Germany", isFallback: true },
    { name: "Thomas Schulz", gender: "men", country: "Germany", isFallback: true },
    // ----- NEW PERSONAS -----
    { name: "Ajide Femi", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Andrew ♈", gender: "men", country: "US", isFallback: false },
    { name: "Angela", gender: "women", country: "US", isFallback: false },
    { name: "anna", gender: "women", country: "US", isFallback: false },
    { name: "Bigboy JO 💯", gender: "men", country: "Nigeria", isFallback: false },
    { name: "billy eseronio", gender: "men", country: "US", isFallback: false },
    { name: "bruce gaines", gender: "men", country: "US", isFallback: false },
    { name: "Cody Lamp", gender: "men", country: "US", isFallback: false },
    { name: "cynthia sherman", gender: "women", country: "US", isFallback: false },
    { name: "Danielle marie", gender: "women", country: "US", isFallback: false },
    { name: "diane", gender: "women", country: "US", isFallback: false },
    { name: "don m bennett", gender: "men", country: "US", isFallback: false },
    { name: "eric shiffler", gender: "men", country: "US", isFallback: false },
    { name: "Eric Temple", gender: "men", country: "US", isFallback: false },
    { name: "Gayle Churchill", gender: "women", country: "US", isFallback: false },
    { name: "gordon sadler", gender: "men", country: "US", isFallback: false },
    { name: "HAM ZAT", gender: "men", country: "Nigeria", isFallback: false },
    { name: "harshana", gender: "women", country: "India", isFallback: false },
    { name: "henry catt", gender: "men", country: "US", isFallback: false },
    { name: "ITZ DULZY", gender: "men", country: "Nigeria", isFallback: false },
    { name: "jackie costello", gender: "women", country: "US", isFallback: false },
    { name: "james creve", gender: "men", country: "US", isFallback: false },
    { name: "jeanne jennings", gender: "women", country: "US", isFallback: false },
    { name: "jenny seymore", gender: "women", country: "US", isFallback: false },
    { name: "jeremy reid", gender: "men", country: "US", isFallback: false },
    { name: "jim", gender: "men", country: "US", isFallback: false },
    { name: "junior ndlebe", gender: "men", country: "SouthAfrica", isFallback: false },
    { name: "Kachy emmanuel", gender: "men", country: "Nigeria", isFallback: false },
    { name: "kandrice casekey", gender: "women", country: "US", isFallback: false },
    { name: "Marian ❤️", gender: "women", country: "US", isFallback: false },
    { name: "micheal etezadi", gender: "men", country: "US", isFallback: false },
    { name: "Mimi Griffin", gender: "women", country: "US", isFallback: false },
    { name: "nan baker", gender: "women", country: "US", isFallback: false },
    { name: "nxumalo luh", gender: "men", country: "SouthAfrica", isFallback: false },
    { name: "olowoleru kayode", gender: "men", country: "Nigeria", isFallback: false },
    { name: "Paul Stokes", gender: "men", country: "US", isFallback: false },
    { name: "pearl smith", gender: "women", country: "US", isFallback: false },
    { name: "Phil Capps", gender: "men", country: "US", isFallback: false },
    { name: "philp rocco", gender: "men", country: "US", isFallback: false },
    { name: "randy ford", gender: "men", country: "US", isFallback: false },
    { name: "Ray Minnifield", gender: "men", country: "US", isFallback: false },
    { name: "richard khan", gender: "men", country: "US", isFallback: false },
    { name: "robert brown", gender: "men", country: "US", isFallback: false },
    { name: "Ryan", gender: "men", country: "US", isFallback: false },
    { name: "sxovalova jama", gender: "women", country: "US", isFallback: false },
    { name: "tabitha atkins", gender: "women", country: "US", isFallback: false },
    { name: "tobb bascom", gender: "men", country: "US", isFallback: false },
    { name: "Tony Cawood", gender: "men", country: "US", isFallback: false },
    { name: "troy gossman", gender: "men", country: "US", isFallback: false },
    { name: "tyler bishop", gender: "men", country: "US", isFallback: false },
    { name: "Van Grevenbroek", gender: "men", country: "US", isFallback: false },

    // 4 Moderators
    { name: "Jeraldine Blackwell", gender: "women", country: "US", isModerator: true },
    { name: "Philippe Obladen", gender: "men", country: "Germany", isModerator: true },
    { name: "Samantha Kelly", gender: "women", country: "United Kingdom", isModerator: true },
    { name: "Tajuanza S.", gender: "men", country: "US", isModerator: true }
  ];

  const adminPersona = {
    name: "Aditya Renash",
    gender: "men",
    country: "India",
    isFallback: false,
    vip: 0,
    admin: true,
    initials: "AR",
    avatar: "assets/avatars/aditya_renash.jpg",
    traits: { archetype: "boss", grammar: "clean", slang: 0.15, typoRate: 0.02 }
  };

  const archetypeTraits = {
    boss:       { archetype: "boss", grammar: "clean", slang: 0.2, typoRate: 0.05 },
    analyst:    { archetype: "analyst", grammar: "clean", slang: 0.1, typoRate: 0.03 },
    joker:      { archetype: "joker", grammar: "informal", slang: 0.8, typoRate: 0.15 },
    wit:        { archetype: "sarcastic", grammar: "mixed", slang: 0.7, typoRate: 0.1 },
    newbie:     { archetype: "newbie", grammar: "informal", slang: 0.6, typoRate: 0.2 },
    lurker:     { archetype: "lurker", grammar: "mixed", slang: 0.3, typoRate: 0.05 },
    expert:     { archetype: "expert", grammar: "clean", slang: 0.25, typoRate: 0.04 },
    thoughtful: { archetype: "thoughtful", grammar: "clean", slang: 0.15, typoRate: 0.03 },
    moderator:  { archetype: "moderator", grammar: "clean", slang: 0.1, typoRate: 0.01 }
  };

  function getVipFromName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash) + name.charCodeAt(i);
    const rand = Math.abs(hash % 100) / 100;
    if (rand < 0.6) return 0;
    if (rand < 0.85) return 1;
    if (rand < 0.95) return 2;
    return 3;
  }

  const nameToArchetype = {
    "oladapo ogunsakin": 'boss', "Anthony Onyinkwa": 'expert', "victor e keyz 🎹🎺📉": 'analyst',
    "Stanley Ezeorjika 💰": 'boss', "Das Haruna Fearless": 'expert', "Boaster Friday": 'joker',
    "Boss  Mega ⚡⚡⚡": 'boss', "Lazy Dark 🌑💰💲": 'wit', "Elmer nunez 📉": 'analyst',
    "Sergio Vega munoz 🔥": 'boss', "David Magana 💹📉": 'analyst', "Andy Zensation 📊": 'analyst',
    "Valentina Orozco 😎": 'joker', "Trovis banks 🏦💰": 'boss', "Flash BE": 'expert',
    "Red Barron": 'wit', "Kullest Kidd 🪐": 'joker', "marvel Da' sauce": 'joker',
    "Ron  Thomson 🏍️": 'expert', "Jamie Terrell": 'newbie', "ashley muse": 'newbie',
    "jen lee": 'newbie', "Mona Dent": 'lurker', "Sym Ple": 'lurker', "Cherry Reichhart": 'thoughtful',
    "Trovao Duchness 🦊": 'joker', "Salman Rasheed": 'analyst', "Syed Ali Zohaib": 'expert',
    "Nieves yazita 🌹❣️": 'thoughtful', "Dominic Harley": 'wit', "Latex mt tozer": 'lurker',
    "Kluta wangempella ll": 'lurker', "Paul jande": 'newbie', "Bwalya Coxy": 'expert',
    "Regard Nyakane": 'analyst', "Tdk Mj": 'newbie', "Mbg Mook 🍒": 'joker',
    "Larry Verb Washington": 'expert', "jens kleinschmidt": 'analyst', "Oliver Meszaros": 'thoughtful',
    "Ben Leary": 'wit', "Nicholas Marchese": 'newbie', "Joe Cottrell": 'expert',
    "Jovan Mircetic": 'analyst', "Dvedat Demirci": 'boss', "Serhat Nuri Kaya": 'thoughtful',
    "Julibel Golilao": 'newbie', "Chidi Eze": 'newbie', "Carlos Mendez": 'expert',
    // NEW PERSONAS
    "Ajide Femi": 'boss', "Andrew ♈": 'analyst', "Angela": 'thoughtful', "anna": 'newbie',
    "Bigboy JO 💯": 'joker', "billy eseronio": 'wit', "bruce gaines": 'expert',
    "Cody Lamp": 'lurker', "cynthia sherman": 'boss', "Danielle marie": 'analyst',
    "diane": 'thoughtful', "don m bennett": 'expert', "eric shiffler": 'joker',
    "Eric Temple": 'wit', "Gayle Churchill": 'newbie', "gordon sadler": 'lurker',
    "HAM ZAT": 'boss', "harshana": 'analyst', "henry catt": 'expert',
    "ITZ DULZY": 'joker', "jackie costello": 'thoughtful', "james creve": 'wit',
    "jeanne jennings": 'newbie', "jenny seymore": 'lurker', "jeremy reid": 'boss',
    "jim": 'analyst', "junior ndlebe": 'expert', "Kachy emmanuel": 'joker',
    "kandrice casekey": 'thoughtful', "Marian ❤️": 'wit', "micheal etezadi": 'newbie',
    "Mimi Griffin": 'lurker', "nan baker": 'boss', "nxumalo luh": 'analyst',
    "olowoleru kayode": 'expert', "Paul Stokes": 'joker', "pearl smith": 'thoughtful',
    "Phil Capps": 'wit', "philp rocco": 'newbie', "randy ford": 'lurker',
    "Ray Minnifield": 'boss', "richard khan": 'analyst', "robert brown": 'expert',
    "Ryan": 'joker', "sxovalova jama": 'thoughtful', "tabitha atkins": 'wit',
    "tobb bascom": 'newbie', "Tony Cawood": 'lurker', "troy gossman": 'boss',
    "tyler bishop": 'analyst', "Van Grevenbroek": 'expert',
    // Moderators
    "Jeraldine Blackwell": 'moderator', "Philippe Obladen": 'moderator', "Samantha Kelly": 'moderator', "Tajuanza S.": 'moderator'
  };

  function getTraitsForPersona(name) {
    const key = nameToArchetype[name] || 'active';
    if (key === 'active') return { archetype: "active", grammar: "mixed", slang: 0.4, typoRate: 0.08 };
    return archetypeTraits[key] || archetypeTraits['active'];
  }

  const personaNames = personaData.map(p => {
    const vip = getVipFromName(p.name);
    let avatar, isFallback = p.isFallback || false;
    if (p.isModerator) {
      const safe = p.name.replace(/[^a-zA-Z ]/g, '').trim().replace(/\s+/g, '_').toLowerCase();
      avatar = `assets/avatars/${safe}.jpg`;
    } else if (isFallback) {
      avatar = `https://ui-avatars.com/api/?name=${p.name.split(' ')[0][0]}+${p.name.split(' ').pop()[0]}&background=2f5b9c&color=fff&size=200&bold=true`;
    } else {
      const safe = p.name
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
        .replace(/[^\w\s]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .toLowerCase();
      avatar = `assets/avatars/${safe}.jpg`;
    }

    const cleanInitials = p.name
      .split(' ')
      .map(part => part.replace(/[^A-Za-z]/g, '').charAt(0))
      .join('')
      .toUpperCase();

    return {
      name: p.name,
      vip,
      admin: false,
      moderator: !!p.isModerator,
      avatar,
      isFallback,
      initials: cleanInitials,
      traits: getTraitsForPersona(p.name),
      country: p.country,
      gender: p.gender
    };
  });

  personaNames.unshift({
    name: adminPersona.name,
    vip: 0,
    admin: true,
    moderator: false,
    avatar: adminPersona.avatar,
    isFallback: false,
    initials: adminPersona.initials,
    traits: adminPersona.traits,
    country: adminPersona.country,
    gender: adminPersona.gender
  });

  window.personaNames = personaNames;

  // ========== MESSAGE CATEGORIES ==========
  const messageCategories = {
    general: [
      "Good morning everyone. Hope you're all profitable today.",
      "Market looking interesting today. Who's ready for the session?",
      // ... (keep all original message entries – they are unchanged)
      "Just catching up – anything big happen overnight?"
    ],
    question: [
      "How long does withdrawal take usually?",
      // ... (all question messages)
      "Can I talk to a real person for help?"
    ],
    hype: [
      "This thing too sweet 🔥",
      // ... (all hype messages)
      "I'm finally financially free. It's surreal."
    ],
    withdraw: [
      "Just withdrew $85 to my bank account. Smooth and fast!",
      // ... (all withdraw messages)
      "Just in time for the weekend. Withdrawal landed Friday morning."
    ],
    testimonial: [
      "I was skeptical at first, but now I'm a believer. Profits are real.",
      // ... (all testimonial messages)
      "If I can do it, anyone can. Just follow the plan."
    ],
    advice: [
      "Always use a stop loss. Protect your capital first.",
      // ... (all advice messages)
      "Remember why you started. Keep that vision in mind."
    ],
    nigerian: [
      "Abeg, who fit explain the minimum deposit again?",
      // ... (all Nigerian messages)
      "This profit wey I see so, I go buy motor soon"
    ],
    mexican: [
      "Hermano, esta señal está de locos 🔥",
      // ... (all Mexican messages)
      "Desde que empecé, todo ha cambiado para bien."
    ]
  };

  // ... (all other functions: commonTypos, applyTypos, applySlang, getCountrySlang,
  //  getRandomMessage, createChatCard, startReactionSimulation, etc.) UNCHANGED
  //  I'm omitting them here for brevity, but they must be present exactly as before.

  // ========== ANNOUNCEMENTS WITH USER-SPECIFIC DATES (DEBUGGED) ==========
  const announcementsTemplate = [
    { id: 1, title: "⏳ 43 Spots Left – Closing Soon", description: "Only 43 spots remaining for our exclusive VIP Signal Group! Registration closes on Friday, July 18, 2025. Don't miss this opportunity to get premium signals with a 92% win rate. Secure your spot now!", image: "assets/announcements/announcement1.jpg", reactions: { "👍": 312, "❤️": 176, "🔥": 134, "🚀": 98 } },
    // ... (all other announcement templates – unchanged)
  ];

  function getUserAnnouncementDates() {
    debugLog('getUserAnnouncementDates() called');
    let user = null;
    try { user = JSON.parse(sessionStorage.getItem('tradePulseCurrentUser')); } catch(e) {
      debugLog('ERROR parsing session user: ' + e.message);
      return null;
    }
    if (!user) {
      debugLog('No user found in sessionStorage');
      return null;
    }
    debugLog(`User found: ${user.username}, firstVisitDate: ${user.firstVisitDate}`);

    if (user.announcementDates && Array.isArray(user.announcementDates) && user.announcementDates.length === 12) {
      const allValid = user.announcementDates.every(d => typeof d.postedStr === 'string' && d.postedStr.length > 0);
      debugLog(`Existing announcement dates found. Valid: ${allValid}`);
      if (allValid) return user.announcementDates;
    }

    debugLog('Regenerating announcement dates');
    const now = new Date();
    let firstVisit;
    if (user.firstVisitDate) {
      const parsed = new Date(user.firstVisitDate);
      firstVisit = !isNaN(parsed.getTime()) ? parsed : now;
      debugLog(`Parsed firstVisitDate: ${firstVisit.toISOString()}`);
    } else {
      firstVisit = now;
      debugLog('No firstVisitDate, using now');
    }

    const nextFriday = new Date(firstVisit);
    nextFriday.setDate(firstVisit.getDate() + ((5 - firstVisit.getDay() + 7) % 7) + 7);
    debugLog(`Next Friday: ${nextFriday.toISOString()}`);

    const dates = [];
    for (let i = 0; i < 12; i++) {
      try {
        if (i === 0) {
          const postedDate = new Date(now);
          postedDate.setDate(postedDate.getDate() - (Math.floor(Math.random() * 3) + 1));
          const postedStr = postedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + postedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          dates.push({ id: 1, postedDate, closingDate: nextFriday, postedStr });
        } else {
          const postedDate = new Date(now);
          postedDate.setDate(postedDate.getDate() - Math.floor(Math.random() * 7 + 1));
          const postedStr = postedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + postedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          dates.push({ id: i+1, postedDate, closingDate: null, postedStr });
        }
      } catch (e) {
        debugLog(`ERROR generating date #${i}: ${e.message}`);
      }
    }
    debugLog(`Generated ${dates.length} dates`);

    user.announcementDates = dates;
    user.firstVisitDate = user.firstVisitDate || now.toISOString();
    try {
      sessionStorage.setItem('tradePulseCurrentUser', JSON.stringify(user));
      const users = JSON.parse(localStorage.getItem('tradePulseUsers') || '[]');
      const idx = users.findIndex(u => u.username === user.username);
      if (idx !== -1) { users[idx] = user; localStorage.setItem('tradePulseUsers', JSON.stringify(users)); }
      debugLog('User data saved successfully');
    } catch(e) {
      debugLog('ERROR saving user data: ' + e.message);
    }
    return dates;
  }

  function renderAnnouncements() {
    debugLog('renderAnnouncements() called');
    let container = document.getElementById('announcementsContent');
    if (!container) {
      debugLog('Creating announcementsContent container');
      container = document.createElement('div');
      container.id = 'announcementsContent';
      container.style.display = 'none';
      const tabsDiv = document.querySelector('.community-tabs');
      if (tabsDiv) {
        tabsDiv.parentNode.insertBefore(container, tabsDiv.nextSibling);
      } else {
        const communityView = document.getElementById('communityView');
        if (communityView) {
          communityView.appendChild(container);
          debugLog('Appended to communityView');
        } else {
          debugLog('ERROR: communityView not found!');
        }
      }
    }

    let userDates;
    try {
      userDates = getUserAnnouncementDates();
    } catch(e) {
      debugLog('ERROR in getUserAnnouncementDates: ' + e.message);
      userDates = [];
    }
    debugLog(`User dates received: ${userDates ? userDates.length : 'null'}`);

    const getDateForId = (id) => {
      const found = userDates ? userDates.find(d => d.id === id) : null;
      return found && found.postedStr ? found.postedStr : 'Unknown date';
    };

    const adminAvatarHtml = `<img src="assets/avatars/aditya_renash.jpg" alt="Admin" style="width:40px;height:40px;border-radius:50%;object-fit:cover;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"><div class="chat-msg-avatar" style="display:none;width:40px;height:40px;background:rgba(245,158,11,.22);">AR</div>`;

    try {
      container.innerHTML = `
        <div class="section" style="margin-top:0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
            <div style="font-size:17px; font-weight:700;">📢 Announcements</div>
            <span style="background:rgba(59,130,246,.15); color:#60a5fa; font-size:12px; padding:4px 10px; border-radius:999px;">12 New</span>
          </div>
          ${announcementsTemplate.map(a => {
            let desc = a.description;
            if (a.id === 1) {
              const closingDateItem = userDates ? userDates.find(d => d.id === 1) : null;
              if (closingDateItem && closingDateItem.closingDate) {
                const closingStr = closingDateItem.closingDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                desc = a.description.replace(/closes on .+$/, `closes on ${closingStr}.`);
              }
            }
            return `
            <div style="background:rgba(11,16,32,.9); border-radius:16px; padding:14px; margin-bottom:12px; border:1px solid rgba(255,255,255,.05);">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                ${adminAvatarHtml}
                <div>
                  <div style="font-weight:600; color:#fff;">${a.title}</div>
                  <div style="font-size:12px; color:#9ca3af;">Admin · ${getDateForId(a.id)}</div>
                </div>
              </div>
              <img src="${a.image}" style="width:100%; border-radius:12px; margin-bottom:10px;" onerror="this.style.display='none';">
              <div style="font-size:14px; color:#e5e7eb; line-height:1.5; margin-bottom:10px;">${desc}</div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                ${Object.entries(a.reactions).map(([emoji, count]) => `
                  <span style="background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); border-radius:999px; padding:4px 10px; font-size:12px; color:#d1d5db;">${emoji} ${count}</span>
                `).join('')}
              </div>
            </div>`;
          }).join('')}
        </div>
      `;
      debugLog('Announcements HTML injected successfully');
    } catch(e) {
      debugLog('ERROR rendering announcements HTML: ' + e.message);
    }
  }

  // ========== HELP DESK SUPPORT SECTION ==========
  // ... (renderHelpDesk unchanged)

  // ========== SWITCH FUNCTIONS ==========
  function switchToGeneralChat() {
    // ... (unchanged)
  }

  function switchToWinsProofs() {
    // ... (unchanged)
  }

  function switchToMarketUpdates() {
    debugLog('switchToMarketUpdates() called');
    try {
      const pinned = document.querySelector('.community-pinned');
      const inputBar = document.getElementById('communityInputBar');
      const chatLayout = document.getElementById('communityChatLayout');
      const winsContent = document.getElementById('winsProofsContent');
      const helpDeskContainer = document.getElementById('helpDeskContent');
      const membersPanel = document.getElementById('communityMembersPanel');

      if (pinned) pinned.style.display = 'none';
      if (inputBar) inputBar.style.display = 'none';
      if (chatLayout) chatLayout.style.display = 'none';
      if (winsContent) winsContent.style.display = 'none';
      if (helpDeskContainer) helpDeskContainer.style.display = 'none';
      if (membersPanel) membersPanel.style.display = 'none';

      document.querySelectorAll('.community-tab').forEach(t => t.classList.remove('active'));
      const tab = document.getElementById('tabMarketUpdates');
      if (tab) tab.classList.add('active');

      renderAnnouncements();
      const announcementsContainer = document.getElementById('announcementsContent');
      if (announcementsContainer) {
        announcementsContainer.style.display = 'block';
        debugLog('announcementsContainer displayed');
      } else {
        debugLog('ERROR: announcementsContainer missing after render');
      }
    } catch(e) {
      debugLog('ERROR in switchToMarketUpdates: ' + e.message);
    }
  }

  function switchToHelpDesk() {
    // ... (unchanged)
  }

  // Expose functions globally
  window.switchToWinsProofs = switchToWinsProofs;
  window.switchToGeneralChat = switchToGeneralChat;

  // Attach tab listeners
  document.getElementById('tabGeneralChat')?.addEventListener('click', switchToGeneralChat);
  document.getElementById('tabWinsProofs')?.addEventListener('click', switchToWinsProofs);
  document.getElementById('tabMarketUpdates')?.addEventListener('click', switchToMarketUpdates);
  document.getElementById('tabHelpDesk')?.addEventListener('click', switchToHelpDesk);

  // Quick card listeners
  const chatQuickCard = document.querySelector('.community-quick-ico.purple')?.closest('.community-quick-card');
  if (chatQuickCard) chatQuickCard.addEventListener('click', switchToGeneralChat);
  const announcementsQuickCard = document.querySelector('.community-quick-ico.blue')?.closest('.community-quick-card');
  if (announcementsQuickCard) announcementsQuickCard.addEventListener('click', switchToMarketUpdates);
  const withdrawalsQuickCard = document.querySelector('.community-quick-ico.green')?.closest('.community-quick-card');
  if (withdrawalsQuickCard) withdrawalsQuickCard.addEventListener('click', switchToWinsProofs);

  // ========== INVITE FRIENDS BUTTON ==========
  // ... (unchanged)

  // Inject new live withdrawal
  function injectNewLiveWithdrawal() {
    // ... (unchanged)
  }

  // ========== INITIALIZATION ==========
  function startCommunitySimulation() {
    try {
      debugLog('startCommunitySimulation()');
      const communityView = document.getElementById('communityView');
      if (!communityView) {
        debugLog('ERROR: communityView not found');
        return;
      }
      preloadChatMessages();
      startChatMessageLoop();
      updateOnlineMembers();
      updateSidebarWithdrawals();

      setInterval(() => {
        if (!communityView.classList.contains('active')) return;
        updateOnlineMembers();
        updateSidebarWithdrawals();
      }, 45000);

      setInterval(() => {
        if (communityView.classList.contains('active')) {
          injectNewLiveWithdrawal();
        }
      }, 10000 + Math.random() * 10000);
    } catch (error) {
      debugLog('Community start error: ' + error.message);
      console.error('Community start error:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createDebugPanel();
      startCommunitySimulation();
    });
  } else {
    createDebugPanel();
    startCommunitySimulation();
  }
})();
