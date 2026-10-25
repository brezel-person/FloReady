/* FloReady: storage.js
 * Saves your progress in this browser (localStorage) so it is still there next time you open the app.
 * Only the fields listed in SAVED_FIELDS are saved. Nothing is sent anywhere.
 */

var SAVE_KEY = 'floready-v1';
var savingPaused = false; // true while erasing, so nothing is saved back on the way out

// Everything the user would expect the app to remember
var SAVED_FIELDS = [
  'onboarded', 'name', 'region', 'stage', 'zone',
  'kit', 'move', 'guidesRead', 'stamps', 'bucket', 'quizBest',
  'textSize', 'bold', 'still', 'readAloud', 'voiceRate', 'lang', 'theme', 'learnRegion', 'wasReady',
  'lingoKnown', 'installHintDismissed'
];

function saveState() {
  if (savingPaused) return;
  try {
    var toSave = {};
    SAVED_FIELDS.forEach(function (key) { toSave[key] = state[key]; });
    localStorage.setItem(SAVE_KEY, JSON.stringify(toSave));
  } catch (e) {
    // Private browsing or blocked storage: the app still works, it just won't remember.
  }
}

// Returns true if saved progress was found and copied into `state`
function loadState() {
  try {
    var raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    var saved = JSON.parse(raw);
    SAVED_FIELDS.forEach(function (key) {
      if (saved[key] !== undefined && saved[key] !== null) state[key] = saved[key];
    });
    return true;
  } catch (e) {
    return false;
  }
}

function clearSavedState() {
  savingPaused = true;
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* nothing to clear */ }
}

/* Saved data can be old (from before a place was renamed or removed) or edited by hand.
 * Keep only values the current app understands; anything else falls back to its default. */
function cleanSavedState() {
  function has(map, key) { return Object.prototype.hasOwnProperty.call(map, key); }
  function ids(list) { var out = {}; list.forEach(function (x) { out[x.id] = true; }); return out; }
  function oneOf(value, allowed, fallback) { return allowed.indexOf(value) !== -1 ? value : fallback; }
  function isObject(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
  // Keep only true values whose key is in `known`
  function knownFlags(map, known) {
    var out = {};
    if (isObject(map)) Object.keys(map).forEach(function (k) { if (has(known, k) && map[k] === true) out[k] = true; });
    return out;
  }
  function text(v, max) { return typeof v === 'string' ? v.slice(0, max) : ''; }

  var regionIds = REGIONS.map(function (r) { return r.id; });
  var placeIds = ids(PLACES);
  var guideIds = {}; GUIDES.forEach(function (g, i) { guideIds[i] = true; });

  state.onboarded = state.onboarded === true;
  state.name = text(state.name, 40);
  state.zone = text(state.zone, 20);
  state.region = oneOf(state.region, regionIds, 'tampa');
  state.learnRegion = oneOf(state.learnRegion, regionIds, state.region);
  state.stage = oneOf(state.stage, STAGES.map(function (s) { return s.id; }), 'arrived');
  state.kit = knownFlags(state.kit, ids(KIT));
  state.move = knownFlags(state.move, ids(allMoveItems()));
  state.guidesRead = knownFlags(state.guidesRead, guideIds);
  state.stamps = knownFlags(state.stamps, placeIds);
  state.bucket = Array.isArray(state.bucket)
    ? state.bucket.filter(function (id, i, list) { return has(placeIds, id) && list.indexOf(id) === i; })
    : [];
  state.quizBest = typeof state.quizBest === 'number' && state.quizBest >= 0 && state.quizBest <= QUIZ.length ? Math.floor(state.quizBest) : null;
  state.textSize = oneOf(state.textSize, TEXT_SIZES.map(function (t) { return t[0]; }), 'default');
  state.voiceRate = oneOf(state.voiceRate, VOICE_RATES.map(function (r) { return r[0]; }), 'normal');
  state.lang = oneOf(state.lang, ['en', 'es'], 'en');
  state.theme = oneOf(state.theme, ['dark', 'light'], null);
  state.bold = state.bold === true;
  state.still = state.still === true;
  state.readAloud = state.readAloud === true;
  state.wasReady = state.wasReady === true;
  state.installHintDismissed = state.installHintDismissed === true;
  var lingoIds = {}; LINGO.forEach(function (w, i) { lingoIds[i] = true; });
  state.lingoKnown = knownFlags(state.lingoKnown, lingoIds);
  // app.js's flashcard deck points at this object, so keep that link after cleaning
  if (typeof lingo !== 'undefined') lingo.known = state.lingoKnown;
}
