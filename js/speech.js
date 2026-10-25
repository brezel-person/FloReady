/* FloReady: speech.js
 * Read aloud, using the browser's built-in text-to-speech (the Web Speech API).
 * No internet or account needed; voices come from the device.
 */

var speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
var isSpeaking = false;
var speechId = 0;

var VOICE_RATES = [['slow', 'Slower', 0.8], ['normal', 'Normal', 1], ['fast', 'Faster', 1.25]];

function voiceRateValue() {
  var match = VOICE_RATES.filter(function (r) { return r[0] === state.voiceRate; })[0];
  return match ? match[2] : 1;
}

// Split text into sentences, then group them into chunks of up to ~200 characters.
// Some browsers (notably Chrome on desktop) stop reading partway through one long utterance.
function speechChunks(text) {
  var sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
  var chunks = [], current = '';
  sentences.forEach(function (s) {
    if ((current + s).length > 200 && current) { chunks.push(current.trim()); current = ''; }
    current += s;
  });
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

/* Picking a nicer voice
 * The browser's default voice is often the most robotic one on the device, even when better ones are
 * installed. Score every voice for the current language and use the best.
 * Voices live on the device, so each person gets the best voice *their* device has. */
var GOOD_VOICE_WORDS = [
  [/natural|neural/i, 50],               // Microsoft Edge "Natural" voices: the best free ones
  [/premium/i, 45], [/enhanced/i, 40],   // Apple's downloadable high-quality voices
  [/^google/i, 35],                      // Chrome's built-in voices
  [/siri/i, 30],
  [/\b(samantha|ava|zoe|evan|allison|aria|jenny|guy|paulina|m[oó]nica|jorge|sabina|dalia)\b/i, 15]
];
// Joke and old-style voices that macOS lists alongside the real ones
var NOVELTY_VOICES = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley)\b/i;

function scoreVoice(voice, lang, online) {
  var voiceLang = (voice.lang || '').replace('_', '-').toLowerCase();
  if (voiceLang.slice(0, 2) !== lang.slice(0, 2)) return -1;   // wrong language: never use
  var score = voiceLang === lang.toLowerCase() ? 20 : 10;      // exact match (en-US) beats any English
  if (lang === 'es-US' && voiceLang === 'es-mx') score += 5;   // Latin American Spanish is next best
  GOOD_VOICE_WORDS.forEach(function (rule) { if (rule[0].test(voice.name)) score += rule[1]; });
  if (NOVELTY_VOICES.test(voice.name)) score -= 100;
  if (!voice.localService && !online) score -= 80;             // online-only voices fail with no internet
  return score;
}

// Returns the best voice in `voices` for `lang`, or null to let the browser choose
function bestVoice(voices, lang, online) {
  var best = null, bestScore = -1;
  voices.forEach(function (voice) {
    var score = scoreVoice(voice, lang, online);
    if (score > bestScore) { best = voice; bestScore = score; }
  });
  return best;
}

// Some browsers load their voice list a moment after the page opens
var deviceVoices = [];
function loadVoices() { deviceVoices = window.speechSynthesis.getVoices() || []; }
if (speechSupported) {
  loadVoices();
  if (window.speechSynthesis.addEventListener) window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
}

// Speaks a string, or a list of parts. Each part is spoken separately, which gives a natural pause between them.
function speakText(text) {
  if (!speechSupported) { toast('Read aloud isn’t supported in this browser'); return; }
  window.speechSynthesis.cancel();
  var parts = Array.isArray(text) ? text : [text];
  var chunks = parts.reduce(function (all, part) { return all.concat(speechChunks(part)); }, []);
  if (!chunks.length) return;
  var lang = state.lang === 'es' ? 'es-US' : 'en-US';
  if (!deviceVoices.length) loadVoices();
  var voice = bestVoice(deviceVoices, lang, navigator.onLine !== false);
  // cancel() makes the old speech report an error; only the newest reading may reset the button
  var id = ++speechId;
  function finished() { if (id !== speechId) return; isSpeaking = false; updateListenButton(); }
  chunks.forEach(function (chunk, i) {
    var utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = voice ? voice.lang : lang;
    if (voice) utterance.voice = voice;
    utterance.rate = voiceRateValue();
    if (i === chunks.length - 1) utterance.onend = finished;
    utterance.onerror = finished;
    window.speechSynthesis.speak(utterance);   // the browser queues them in order
  });
  isSpeaking = true;
  updateListenButton();
}

function stopSpeaking() {
  speechId++;
  if (speechSupported) window.speechSynthesis.cancel();
  isSpeaking = false;
  updateListenButton();
}

// Listen button: reads the open panel, or the part of the screen you can see
function readCurrentScreen() {
  if (isSpeaking) { stopSpeaking(); return; }
  speakText(spokenScreen());
}

/* =========================================================
   What read aloud says
   Instead of reading the screen word for word, it starts with a one-line description of the screen,
   then reads what is visible in short parts (headings, rows, buttons), pausing between them.
   Buttons, links and switches say what they are and whether they're on, like a screen reader does.
   ========================================================= */
var SCREEN_INTROS = {
  home: 'Home screen. It shows your next steps, your storm kit progress and your Florida Travel Passport.',
  'prepare-hurricanes': 'Prepare screen, Hurricanes tab. It shows how ready you are, the hurricane season, three steps to get ready and what storm alerts mean.',
  'prepare-outdoors': 'Prepare screen, Outdoors tab. Safety tips for heat and sun, water and the ground, with things to do and things to avoid.',
  'prepare-wildlife': 'Prepare screen, Wildlife tab. Safety tips for alligators, snakes and other Florida wildlife.',
  explore: 'Explore screen. A list of places to visit, with search and filters at the top. Each place has a heart button that saves it to your bucket list.',
  'learn-regions': 'Learn screen, Regions tab. Facts about the region you choose, and a table that compares two regions.',
  'learn-tips': 'Learn screen, Florida 101 tab. One tip at a time, with Previous and Next buttons.',
  'learn-lingo': 'Learn screen, Lingo tab. Flashcards of local words. Tap the card to flip it and hear what the word means.',
  resources: 'Resources screen. Trusted apps and websites, your move plan, and emergency phone numbers.',
  links: 'Apps and websites screen. Trusted links grouped by topic. Each one opens in a new tab.',
  move: 'Move plan screen. A checklist for your move, grouped by when to do each step.',
  passport: 'Florida Travel Passport screen. Stamps from places you have visited, then your bucket list.',
  quiz: 'Quiz screen. Pick one answer for each question.',
  settings: 'Settings screen. Your name and region, language, accessibility options and dark mode.'
};
function screenIntro() {
  var key = currentScreen === 'prepare' ? 'prepare-' + state.prepTab : currentScreen === 'learn' ? 'learn-' + state.learnTab : currentScreen;
  return SCREEN_INTROS[key] ? tr(SCREEN_INTROS[key]) : '';
}

function spokenScreen() {
  var panelOpen = document.getElementById('overlay').classList.contains('is-visible');
  if (panelOpen) return [tr('A panel is open.')].concat(spokenParts(document.getElementById('sheet'), null).parts);
  var screen = document.querySelector('.screen.is-active');
  if (!screen) return [];
  var scroller = document.getElementById('app-screens');
  var result = spokenParts(screen, scroller.getBoundingClientRect());
  var parts = [screenIntro()].concat(result.parts);
  if (result.more) parts.push(tr('Scroll down to hear more.'));
  return parts.filter(Boolean);
}

var BLOCK_TAGS = /^(DIV|P|H1|H2|H3|H4|UL|OL|LI|DL|DT|DD|SECTION|ARTICLE|NAV|TABLE|THEAD|TBODY|TR|TD|TH|DETAILS|SUMMARY|FIGURE)$/;
function say(word) { return tr(word); }

// Turns a piece of screen text into something that sounds natural: "1/12" becomes "1 of 12", "·" becomes a pause
function tidy(text) {
  var of = state.lang === 'es' ? ' de ' : ' of ';
  return text.replace(/\s*\n+\s*/g, '. ').replace(/ · /g, ', ').replace(/ – /g, state.lang === 'es' ? ' a ' : ' to ').replace(/(\d+)\/(\d+)/g, '$1' + of + '$2')
    .replace(/\s*✓/g, ', ' + say('visited')).replace(/[→›]/g, '').replace(/[.,]\s*([.,])/g, '$1').replace(/\s+/g, ' ')
    .trim().replace(/^[.,:;]\s*/, '').replace(/\.,/g, ',');
}
// The words inside an element as a person sees them: blocks on their own lines, decorations skipped.
// (Progress rings are drawn as pictures, so their "3/10" text is kept.)
function visibleText(el) {
  var out = '';
  el.childNodes.forEach(function (child) {
    if (child.nodeType === 3) { out += child.nodeValue; return; }
    if (child.nodeType !== 1 || child.hidden) return;
    var tag = child.tagName.toLowerCase();
    if (tag === 'svg') { var t = child.querySelector('text'); if (t && t.textContent) out += ' ' + t.textContent + '\n'; return; }
    if (child.getAttribute('aria-hidden') === 'true' || !child.getClientRects().length) return;
    var block = getComputedStyle(child).display.indexOf('inline') !== 0;
    out += (block ? '\n' : '') + visibleText(child) + (block ? '\n' : '');
  });
  return out;
}
function hasWords(text) { return /[0-9A-Za-zÀ-ÿ]/.test(text); }
function endSentence(text) { return /[.!?:,]$/.test(text) ? text : text + '.'; }

// The name and state of a button, link, switch, text box or dropdown
function describeControl(el) {
  var tag = el.tagName, label = '';
  if (tag === 'INPUT' || tag === 'SELECT') {
    label = el.labels && el.labels[0] ? el.labels[0].innerText : (el.getAttribute('aria-label') || '');
    label = tidy(label);
    if (el.type === 'checkbox') return label + ', ' + say(el.checked ? 'on' : 'off');
    if (tag === 'SELECT') return label + ': ' + (el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : '') + ', ' + say('dropdown');
    return label + ', ' + say('text box') + (el.value ? ': ' + el.value : '');
  }
  var name = tidy(el.getAttribute('aria-label') || visibleText(el));
  if (!name) return '';
  var pressed = el.getAttribute('aria-pressed');
  if (el.classList.contains('check-item')) return endSentence(name) + ' ' + say(pressed === 'true' ? 'Checked' : 'Not checked');
  var role = say(tag === 'A' ? 'link' : 'button');
  return name.replace(/\.$/, '') + ', ' + role + (pressed === 'true' ? ', ' + say('selected') : '');
}

function spokenParts(root, view) {
  var parts = [], buffer = '', more = false;
  function add(text) {
    if (!hasWords(text)) return;
    text = endSentence(text);
    if (parts[parts.length - 1] !== text) parts.push(text);
  }
  function flush() { add(tidy(buffer)); buffer = ''; }
  // Is any of it on screen? Anything below the bottom edge counts as "more"
  function onScreen(el) {
    if (!view) return true;
    var r = el.getBoundingClientRect();
    if (r.top >= view.bottom - 4) { more = true; return false; }
    return r.bottom > view.top + 4;
  }
  function walk(node) {
    node.childNodes.forEach(function (child) {
      if (child.nodeType === 3) { buffer += child.nodeValue; return; }
      if (child.nodeType !== 1) return;
      var el = child, tag = el.tagName;
      if (el.hidden || !el.getClientRects().length) return;          // not displayed
      // A description written for read aloud (e.g. of a picture) replaces whatever is inside
      if (el.dataset && el.dataset.speak !== undefined) { flush(); if (el.dataset.speak && onScreen(el)) add(tr(el.dataset.speak)); return; }
      if (el.getAttribute('aria-hidden') === 'true' || /^(svg|SVG|SCRIPT|STYLE|TEMPLATE)$/.test(tag)) return;
      if (tag === 'LABEL' && el.htmlFor) return;                    // read together with its control
      // A row of choices (tabs, categories): one sentence, e.g. "Categories: All, selected, Springs, Beaches."
      if (el.getAttribute('role') === 'group' && el.querySelector('button')) {
        flush();
        if (onScreen(el)) {
          var labelEl = el.getAttribute('aria-labelledby') && document.getElementById(el.getAttribute('aria-labelledby'));
          var groupName = tidy(el.getAttribute('aria-label') || (labelEl ? labelEl.textContent : ''));
          var items = Array.prototype.map.call(el.querySelectorAll('button'), function (b) {
            return tidy(visibleText(b)) + (b.getAttribute('aria-pressed') === 'true' ? ', ' + say('selected') : '');
          });
          add((groupName ? groupName + ': ' : '') + items.join(', '));
        }
        return;
      }
      if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'SELECT') {
        flush(); if (onScreen(el)) { var c = describeControl(el); if (c) add(c); } return;
      }
      var inline = !BLOCK_TAGS.test(tag) && getComputedStyle(el).display.indexOf('inline') === 0;
      if (inline) { walk(el); return; }
      flush();
      if (!onScreen(el)) return;
      walk(el);
      flush();
    });
  }
  walk(root);
  flush();
  return { parts: parts, more: more };
}

function speakSample() {
  speakText(state.lang === 'es'
    ? 'La temporada de huracanes va del primero de junio al treinta de noviembre. Los meses tranquilos son el momento de prepararse.'
    : 'Hurricane season runs from June first to November thirtieth. The calm months are the time to prepare.');
}

// The floating "Listen" button shows only when read aloud is turned on in Settings
function updateListenButton() {
  var btn = document.getElementById('listen-btn');
  if (!btn) return;
  btn.hidden = !state.readAloud || currentScreen === 'welcome';
  // Leave room at the bottom of screens and panels so the button never covers anything
  document.getElementById('phone').classList.toggle('has-listen', !btn.hidden);
  btn.classList.toggle('is-speaking', isSpeaking);
  btn.setAttribute('aria-label', isSpeaking ? 'Stop reading' : 'Read this screen aloud');
  btn.innerHTML = icon(isSpeaking ? 'x' : 'speaker') + '<span>' + (isSpeaking ? 'Stop' : 'Listen') + '</span>';
}