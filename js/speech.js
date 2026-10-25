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

function speakText(text) {
  if (!speechSupported) { toast('Read aloud isn’t supported in this browser'); return; }
  window.speechSynthesis.cancel();
  var chunks = speechChunks(text);
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

// Reads whatever is on screen: the open panel if there is one, otherwise the current screen
function readCurrentScreen() {
  if (isSpeaking) { stopSpeaking(); return; }
  var overlay = document.getElementById('overlay');
  var source = overlay.classList.contains('is-visible')
    ? document.getElementById('sheet')
    : document.querySelector('.screen.is-active');
  if (!source) return;
  // Collapse whitespace so the voice doesn't pause on every line break
  var text = source.innerText.replace(/\s+/g, ' ').trim();
  speakText(text);
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
