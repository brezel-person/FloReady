/* FloReady: app.js
 * The app itself: saved state, navigation between screens, and one render function per screen.
 */

/* =========================================================
   App state (kept in memory only; refreshing the page resets it)
   ========================================================= */
// Everything the app remembers about you. storage.js saves part of this between visits.
var state = {
  onboarded: false,
  name: '',
  region: 'tampa',
  stage: 'arrived',
  zone: '',
  kit: {},
  move: {},
  stamps: {},
  bucket: [],
  guidesRead: {},
  quizBest: null,
  prepTab: 'hurricanes',
  learnTab: 'regions',
  learnRegion: 'tampa',
  cat: 'all',
  near: false,
  tipTopic: 'all',
  tipIndex: 0,
  exploreRegion: '',
  textSize: 'default',
  bold: false,
  still: false,
  readAloud: false,
  voiceRate: 'normal',
  theme: null, // null = follow the device's light/dark setting
  lang: 'en',
  nextOpen: false,
  wasReady: false,
  lingoKnown: {},          // Lingo cards you marked "I knew it" (by card number)
  installHintDismissed: false
};

function regionById(id) { return REGIONS.filter(function (r) { return r.id === id; })[0]; }

/* =========================================================
   Navigation
   ========================================================= */
var currentScreen = 'welcome';
var previousScreen = 'home';

function navigate(id, anchorId) {
  if (typeof stopSpeaking === 'function' && isSpeaking) stopSpeaking();
  var target = document.getElementById('screen-' + id);
  if (!target) return;
  document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('is-active'); });
  target.classList.add('is-active');
  if (id !== currentScreen) { previousScreen = currentScreen; currentScreen = id; }
  document.getElementById('bottom-nav').classList.toggle('is-hidden', id === 'welcome');
  document.querySelectorAll('.nav-btn').forEach(function (b) {
    // Sub-screens keep their parent tab highlighted
    var tab = { quiz: 'learn', settings: 'home', passport: 'home', move: 'resources', links: 'resources' }[id] || id;
    var on = b.dataset.screen === tab;
    b.classList.toggle('is-active', on);
    if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  renderAll();
  var scroller = document.getElementById('app-screens');
  if (anchorId) {
    var a = document.getElementById(anchorId);
    scroller.scrollTop = a ? a.offsetTop - 16 : 0;
  } else {
    scroller.scrollTop = 0;
  }
}
function back() { navigate(previousScreen && previousScreen !== currentScreen ? previousScreen : 'home'); }
function openPrepare(tab, step) { state.prepTab = tab; navigate('prepare'); if (step) openPrepStep(step); }

/* =========================================================
   Onboarding
   ========================================================= */
function renderOnboarding() {
  renderLang();
  var regionsEl = document.getElementById('onb-regions');
  regionsEl.innerHTML = REGIONS.map(function (r) {
    return '<button class="chip" aria-pressed="' + (state.region === r.id) + '" onclick="pickOnbRegion(\'' + r.id + '\')">' + esc(r.name) + '</button>';
  }).join('');
  document.getElementById('onb-stages').innerHTML = STAGES.map(function (s) {
    return '<button aria-pressed="' + (state.stage === s.id) + '" onclick="pickStage(\'' + s.id + '\')">' + s.label + '</button>';
  }).join('');
}
function pickOnbRegion(id) { state.region = id; state.learnRegion = id; renderOnboarding(); }
function pickStage(id) { state.stage = id; renderOnboarding(); }
function finishOnboarding() {
  state.name = document.getElementById('name-input').value.trim();
  state.onboarded = true;
  navigate('home');
  toast('You’re all set. Welcome to Florida!');
}
function restart() {
  document.getElementById('name-input').value = state.name;
  renderOnboarding();
  navigate('welcome');
}

/* =========================================================
   Home
   ========================================================= */
function countDone(map, list) { return list.filter(function (i) { return map[i.id]; }).length; }
function allMoveItems() { return MOVE.reduce(function (acc, s) { return acc.concat(s.items); }, []); }

// Three move-plan steps check themselves off from your real progress, so they can never disagree with it
var AUTO_MOVE_STEPS = {
  zone: function () { return !!state.zone; },
  kit: function () { return countDone(state.kit, KIT) === KIT.length; },
  park: function () { return PLACES.some(function (p) { return state.stamps[p.id] && isPark(p); }); }
};
// State and national parks, including beaches and springs that are run as parks (marked park: true in data.js)
function isPark(p) { return p.park === true || p.cat === 'parks' || /\b(State Park|SP|National (Park|Seashore|Preserve|Forest))\b/.test(p.name); }
function isMoveDone(id) { return AUTO_MOVE_STEPS[id] ? AUTO_MOVE_STEPS[id]() : !!state.move[id]; }
function countMoveDone(list) { return list.filter(function (i) { return isMoveDone(i.id); }).length; }
function nextMoveItem() { return allMoveItems().filter(function (i) { return !isMoveDone(i.id); })[0]; }

function renderHome() {
  var region = regionById(state.region);
  var stageLabel = STAGES.filter(function (s) { return s.id === state.stage; })[0].label;
  document.getElementById('home-region').textContent = region.name + ' · ' + stageLabel;
  document.getElementById('home-greeting').textContent = state.name ? 'Hi, ' + state.name : 'Hi there';

  var kitDone = countDone(state.kit, KIT);
  document.getElementById('home-kit-label').textContent = kitDone + ' of ' + KIT.length + ' items packed';
  document.getElementById('home-kit-bar').style.width = Math.round(kitDone / KIT.length * 100) + '%';

  var items = allMoveItems();
  var moveDone = countMoveDone(items);
  var ring = Math.round(moveDone / items.length * 144.5);
  document.getElementById('home-ring').setAttribute('stroke-dasharray', ring + ' 145');
  document.getElementById('home-ring-text').textContent = moveDone + '/' + items.length;
  var next = nextMoveItem();
  document.getElementById('home-next-title').textContent = next ? next.title : 'All done. You’re a Floridian!';
  document.getElementById('home-next-detail').textContent = next ? (next.due || next.detail) : 'Nice work.';

  // Done rows show as done; when both are done the section collapses to a "ready" banner
  var kitComplete = kitDone === KIT.length, moveComplete = !next;
  document.getElementById('home-kit-label').textContent = kitComplete ? 'All ' + KIT.length + ' items packed' : kitDone + ' of ' + KIT.length + ' items packed';
  document.getElementById('next-kit-row').classList.toggle('is-done', kitComplete);
  document.getElementById('home-kit-title').textContent = kitComplete ? 'Storm kit packed' : 'Finish your storm kit';
  document.getElementById('next-move-row').classList.toggle('is-done', moveComplete);
  var allDone = kitComplete && moveComplete;
  var banner = document.getElementById('ready-banner');
  banner.hidden = !allDone;
  document.getElementById('next-card').hidden = allDone && !state.nextOpen;
  banner.setAttribute('aria-expanded', String(allDone && !!state.nextOpen));
  document.getElementById('ready-toggle').textContent = state.nextOpen ? 'Hide' : 'Show';
  if (allDone && !state.wasReady) { state.wasReady = true; state.nextOpen = false; toast('You’re Florida ready!'); }
  if (!allDone) state.wasReady = false;
  document.getElementById('next-h').textContent = allDone ? 'All set' : 'Your next steps';

  renderPassport();
  document.getElementById('install-hint').hidden = state.installHintDismissed || isInstalled();

  document.getElementById('hero-region').textContent = 'Life in ' + (region.id === 'panhandle' ? 'the Panhandle' : region.name);
  // Read aloud describes the picture, which is hidden from screen readers
  document.querySelector('.home-hero').dataset.speak = 'Picture: Life in ' + (region.id === 'panhandle' ? 'the Panhandle' : region.name);
  document.getElementById('hero-art').innerHTML = '<svg width="100%" height="100%" viewBox="0 0 350 150" preserveAspectRatio="xMidYMid slice">' + HEROES[region.id] + '</svg>';
}

function toggleNextSteps() { state.nextOpen = !state.nextOpen; renderHome(); }
// Opened from the home screen icon (installed), rather than in a browser tab
function isInstalled() {
  return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
}
function dismissInstallHint() { state.installHintDismissed = true; renderHome(); }

/* Passport stamps: each stamp shows the icon and color of the kind of place you visited */
var CAT_STAMP = {
  springs: { icon: 'drop', color: '#6FD3EC' },
  parks: { icon: 'tree', color: '#C4D150' },
  beaches: { icon: 'umbrella', color: '#F5CF1E' },
  trails: { icon: 'bike', color: '#8ED8D0' },
  wildlife: { icon: 'bird', color: '#EE8FA8' },
  towns: { icon: 'house', color: '#F6B48A' },
  food: { icon: 'food', color: '#F7DC63' }
};
function stampBadge(p, cls) {
  var look = CAT_STAMP[p.cat];
  return '<span class="' + cls + '" style="background:' + look.color + ';" title="' + esc(p.name) + '">' + icon(look.icon) + '</span>';
}

/* Passport on Home: stamps collected so far, plus the newest bucket list places */
function renderPassport() {
  var stamped = PLACES.filter(function (p) { return state.stamps[p.id]; });
  document.getElementById('passport-count').textContent = stamped.length + (stamped.length === 1 ? ' stamp' : ' stamps');
  var slots = stamped.map(function (p) { return stampBadge(p, 'mini-stamp'); });
  // Always show a few empty slots so the collection reads as "fill me in"
  for (var i = stamped.length; i < Math.max(5, stamped.length + 1); i++) {
    slots.push('<span class="mini-stamp is-empty" aria-hidden="true"></span>');
  }
  document.getElementById('passport-stamps').innerHTML = slots.join('');
  document.getElementById('passport-stamps').dataset.speak = stamped.length ? 'Stamps from: ' + stamped.map(function (p) { return p.name; }).join(', ') : '';

  // Home shows only what's still to visit; visited places live on the Passport page
  // Newest additions first; visited places drop off this preview
  var toGo = state.bucket.slice().reverse().map(placeById).filter(function (p) { return !state.stamps[p.id]; });
  document.getElementById('bucket-count').textContent = toGo.length ? toGo.length + ' to go' : '';
  var shown = toGo.slice(0, 3);
  document.getElementById('bucket-list').innerHTML = toGo.length
    ? shown.map(function (p) {
        return '<li><button class="bucket-open" onclick="openPlace(\'' + p.id + '\')">' +
          '<b>' + esc(p.name) + '</b><span>' + esc(regionById(p.region).name) + ' · ' + esc(p.best) + '</span></button>' +
          '<span class="bucket-chev" aria-hidden="true">' + icon('chevron', 'sm') + '</span></li>';
      }).join('') + (toGo.length > shown.length ? '<li><button class="bucket-more" onclick="navigate(\'passport\')">+ ' + (toGo.length - shown.length) + ' more on your list</button></li>' : '')
    : '<li class="bucket-empty">' + (state.bucket.length ? 'You’ve visited everything on your list. Find your next spot in Explore.' : 'Your bucket list is empty. Tap the heart on any place in Explore to add it here.') + '</li>';
}

function renderPassportPage() {
  var stamped = PLACES.filter(function (p) { return state.stamps[p.id]; });
  document.getElementById('pp-stamp-count').textContent = stamped.length + ' of ' + PLACES.length + ' places';
  var cells = stamped.map(function (p) {
    return '<button class="stamp-cell" onclick="openPlace(\'' + p.id + '\')">' + stampBadge(p, 'stamp') + '<span class="stamp-name">' + esc(p.name) + '</span></button>';
  });
  // Fill out the last row with empty slots (at least one row)
  for (var k = stamped.length; k < Math.max(3, Math.ceil((stamped.length + 1) / 3) * 3); k++) {
    cells.push('<span class="stamp-cell" aria-hidden="true"><span class="stamp stamp-empty"></span><span class="stamp-name">&nbsp;</span></span>');
  }
  document.getElementById('pp-stamps').innerHTML = cells.join('');

  var bucket = state.bucket.map(placeById);
  var toGo = bucket.filter(function (p) { return !state.stamps[p.id]; });
  var visited = bucket.filter(function (p) { return state.stamps[p.id]; });
  document.getElementById('pp-togo-count').textContent = toGo.length;
  document.getElementById('pp-visited-count').textContent = visited.length;
  function row(p, isVisited) {
    return '<button class="list-row' + (isVisited ? ' is-visited' : '') + '" onclick="openPlace(\'' + p.id + '\')">' +
      '<span class="thumb" style="width:56px;height:56px;">' + placeArt(p, 56, 56) + '</span>' +
      '<span class="grow"><span class="title">' + esc(p.name) + '</span><span class="meta">' + esc(regionById(p.region).name) + ' · ' +
      (isVisited ? 'Stamp collected' : esc(p.best)) + '</span></span>' +
      '<span style="color:' + (isVisited ? 'var(--palm-ink)' : 'var(--muted)') + ';display:inline-flex;">' + icon(isVisited ? 'check' : 'chevron') + '</span></button>';
  }
  document.getElementById('pp-togo').innerHTML = toGo.length ? toGo.map(function (p) { return row(p, false); }).join('')
    : '<p class="small muted pp-empty">' + (visited.length ? 'You’ve visited everything on your list. Tap the heart on a place in Explore to add more.' : 'Your bucket list is empty. Tap the heart on a place in Explore to add one.') + '</p>';
  document.getElementById('pp-visited').innerHTML = visited.length ? visited.map(function (p) { return row(p, true); }).join('')
    : '<p class="small muted pp-empty">Places you visit from your list will show up here.</p>';
}

/* Heart button: adds a place to (or removes it from) the bucket list */
function inBucket(id) { return state.bucket.indexOf(id) !== -1; }
function heartBtn(id) {
  var on = inBucket(id);
  var name = placeById(id).name;
  return '<button class="heart-btn" aria-pressed="' + on + '" aria-label="' + (on ? 'Remove ' : 'Add ') + esc(name) + (on ? ' from' : ' to') + ' bucket list" onclick="toggleBucket(\'' + id + '\')">' + icon('heart') + '</button>';
}
function toggleBucket(id) {
  var focusKey = onclickOf(document.activeElement);
  if (inBucket(id)) { state.bucket = state.bucket.filter(function (x) { return x !== id; }); toast('Removed from your bucket list'); }
  else { state.bucket.push(id); toast('Added to your bucket list'); }
  if (openPlaceId === id && document.getElementById('overlay').classList.contains('is-visible')) openPlace(id);
  else { renderAll(); refocus(focusKey, document.getElementById('app-screens')); }
}
function placeById(id) { return PLACES.filter(function (x) { return x.id === id; })[0]; }

/* =========================================================
   Prepare
   ========================================================= */
function renderPrepare() {
  var tabs = [['hurricanes', 'Hurricanes'], ['outdoors', 'Outdoors'], ['wildlife', 'Wildlife']];
  document.getElementById('prep-tabs').innerHTML = tabs.map(function (t) {
    return '<button aria-pressed="' + (state.prepTab === t[0]) + '" onclick="setPrepTab(\'' + t[0] + '\')">' + esc(t[1]) + '</button>';
  }).join('');
  var isH = state.prepTab === 'hurricanes';
  document.getElementById('prep-hurricanes').hidden = !isH;
  var other = document.getElementById('prep-other');
  other.hidden = isH;
  if (!isH) {
    // Outdoors is grouped (Heat & sun, Water, The ground); Wildlife is a single list
    other.innerHTML = state.prepTab === 'outdoors'
      ? OUTDOORS.map(function (g) {
          return '<section><h2 class="section-label">' + esc(g.label) + '</h2>' + g.keys.map(function (k) { return PREP_OTHER[k]; }).reduce(function (a, b) { return a.concat(b); }, []).map(safetyCard).join('') + '</section>';
        }).join('')
      : PREP_OTHER[state.prepTab].map(safetyCard).join('');
  }

  // Readiness = the three steps; the kit step counts as done only when every item is packed
  var kitDone = countDone(state.kit, KIT);
  var guidesRead = GUIDES.filter(function (g, i) { return state.guidesRead[i]; }).length;
  var steps = [
    { id: 'zone', title: 'Know your evacuation zone', done: !!state.zone,
      status: state.zone ? 'Your zone: ' + state.zone : 'Look it up in under a minute' },
    { id: 'kit', title: 'Build your storm kit', done: kitDone === KIT.length,
      status: kitDone + ' of ' + KIT.length + ' items packed', pct: Math.round(kitDone / KIT.length * 100) },
    { id: 'plan', title: 'Make your family plan', done: guidesRead === GUIDES.length,
      status: guidesRead + ' of ' + GUIDES.length + ' guides read', pct: Math.round(guidesRead / GUIDES.length * 100) }
  ];
  var stepsDone = steps.filter(function (x) { return x.done; }).length;
  document.getElementById('ready-ring').setAttribute('stroke-dasharray', Math.round(stepsDone / 3 * 144.5) + ' 145');
  document.getElementById('ready-ring-text').textContent = stepsDone + '/3';
  document.getElementById('ready-title').textContent = stepsDone === 3 ? 'You’re storm ready!' : stepsDone + ' of 3 steps done';
  renderSeason();
  var STEP_LOOK = { zone: ['pin', 'var(--lagoon-pale)', 'var(--lagoon-ink)'], kit: ['bolt', 'var(--sun-pale)', 'var(--sun-ink)'], plan: ['people', 'var(--pink-pale)', 'var(--pink-ink)'] };
  document.getElementById('prep-steps').innerHTML = steps.map(function (x, i) {
    var look = STEP_LOOK[x.id];
    return '<li><button class="prep-step' + (x.done ? ' is-done' : '') + '" onclick="openPrepStep(\'' + x.id + '\')">' +
      '<span class="step-ic" aria-hidden="true" style="background:' + look[1] + ';color:' + look[2] + ';">' + icon(look[0]) + '<span class="step-badge">' + (x.done ? icon('check', 'sm') : (i + 1)) + '</span></span>' +
      '<span class="grow"><span class="step-eyebrow">Step ' + (i + 1) + '</span><span class="title">' + esc(x.title) + '</span>' +
      (x.pct !== undefined && !x.done ? '<span class="mini-bar"><span style="width:' + x.pct + '%"></span></span>' : '') +
      '<span class="meta">' + (x.done ? 'Done · ' : '') + esc(x.status) + '</span></span>' +
      '<span style="color:var(--muted);display:inline-flex;">' + icon('chevron') + '</span></button></li>';
  }).join('');
}
function setPrepTab(t) { state.prepTab = t; renderPrepare(); }

// Hurricane season runs June through November; August to October is the peak
function renderSeason() {
  var months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
  var now = new Date(), m = now.getMonth(); // 0 = January
  var idx = m - 5; // June = 0
  document.getElementById('season-bar').innerHTML = months.map(function (name, k) {
    var peak = k >= 2 && k <= 4, here = k === idx;
    return '<div class="season-cell' + (peak ? ' is-peak' : '') + (here ? ' is-now' : '') + '"><span class="season-fill"></span><span class="season-month">' + name + '</span>' +
      (here ? '<span class="season-here">Today</span>' : '') + '</div>';
  }).join('');
  var note;
  if (idx < 0 || idx > 5) note = '<b>Off season.</b> The next season starts June 1. This is the best time to prepare.';
  else if (idx >= 2 && idx <= 4) note = '<b>Peak season now.</b> Most storms form from mid-August through October. Keep your kit ready and watch the forecast.';
  else note = '<b>Hurricane season is on.</b> It runs through November 30.';
  document.getElementById('season-note').innerHTML = note;
}

/* One safety topic: big title, one-line summary, optional scale, then Do / Don't lists */
function safetyCard(c) {
  function list(items, kind) {
    return '<ul class="safety-list">' + items.map(function (t) {
      return '<li><span class="mark mark-' + kind + '" aria-hidden="true">' + (kind === 'do' ? icon('check', 'sm') : icon('x', 'sm')) + '</span><span><span class="sr-only">' + (kind === 'do' ? 'Do: ' : 'Don’t: ') + '</span>' + esc(t) + '</span></li>';
    }).join('') + '</ul>';
  }
  return '<article class="safety-card">' +
    '<div class="safety-head"><span class="tile-ic" style="background:' + c.bg + ';color:' + c.fg + ';">' + icon(c.icon) + '</span><h2 class="h2">' + esc(c.title) + '</h2></div>' +
    '<p class="safety-sum">' + esc(c.summary) + '</p>' +
    (c.scale ? '<div class="scale" role="table" aria-label="' + esc(c.title) + ' scale">' + c.scale.map(function (x) {
      return '<div class="scale-row" role="row" style="background:' + x[2] + ';color:' + (x[3] || 'var(--ink)') + ';"><b role="cell">' + esc(x[0]) + '</b><span role="cell">' + esc(x[1]) + '</span></div>';
    }).join('') + '</div>' : '') +
    (c.do ? '<p class="safety-label">Do</p>' + list(c.do, 'do') : '') +
    (c.dont ? '<p class="safety-label">Don’t</p>' + list(c.dont, 'dont') : '') +
    (c.urgent ? '<div class="safety-urgent"><p><b>Get help:</b> ' + esc(c.urgent) + '</p>' + callButtonsFor(c.urgent) + '</div>' : '') +
    '</article>';
}

/* Each step opens its own panel so the main screen stays short */
function openPrepStep(id) {
  if (id === 'zone') openZoneSheet();
  else if (id === 'kit') openKitSheet();
  else openPlanSheet();
}
function openZoneSheet() {
  openSheet('<span class="eyebrow">Step 1</span><h2 class="h2" id="sheet-title">Know your evacuation zone</h2>' +
    '<p>Zones are based on storm surge risk, not wind. When officials order a zone to leave, you’ll know if that’s you.</p>' +
    '<p class="note note-warn"><b>Mobile home, manufactured home or RV?</b> Plan to leave during any evacuation order, whatever your zone. They aren’t safe in hurricane winds.</p>' +
    '<ol class="zone-steps"><li>Look up your address on the state’s official Know Your Zone map.</li><li>Write your zone below so FloReady remembers it.</li></ol>' +
    '<a class="btn btn-primary btn-block" href="https://www.floridadisaster.org/knowyourzone/" target="_blank" rel="noopener noreferrer">Open Know Your Zone ' + icon('external', 'sm') + '</a>' +
    '<div><label class="field-label" for="zone-input">Your zone</label>' +
    '<div class="row"><input class="text-input" id="zone-input" type="text" maxlength="20" placeholder="e.g. A, B or C" value="' + esc(state.zone) + '" />' +
    '<button class="btn btn-primary" onclick="saveZone()">Save</button></div></div>' +
    '<div class="note" id="zone-result"' + (state.zone ? '' : ' hidden') + '>' + (state.zone ? 'Saved: your zone is <b>' + esc(state.zone) + '</b>.' : '') + '</div>', 'zone-input');
}
function saveZone() {
  var v = document.getElementById('zone-input').value.trim();
  var out = document.getElementById('zone-result');
  out.hidden = false;
  if (!v) { out.textContent = 'Type the zone you found on the map first.'; return; }
  out.innerHTML = 'Saved: your zone is <b>' + esc(v) + '</b>. Listen for it in evacuation orders.';
  var firstTime = !state.zone;
  state.zone = v;
  if (firstTime) toast('Step 1 done: zone saved');
}
function openKitSheet() {
  var done = countDone(state.kit, KIT);
  openSheet('<span class="eyebrow">Step 2</span>' +
    '<div class="between"><h2 class="h2" id="sheet-title">Build your storm kit</h2><span class="small" style="font-weight:700;color:var(--palm-ink);">' + done + ' of ' + KIT.length + '</span></div>' +
    '<div class="bar"><span style="width:' + Math.round(done / KIT.length * 100) + '%"></span></div>' +
    '<div class="card stage-card check-list">' + KIT.map(function (k) { return checkItem(k, !!state.kit[k.id], 'toggleKit', false); }).join('') + '</div>');
}
function toggleKit(id) {
  state.kit[id] = !state.kit[id];
  if (state.kit[id] && countDone(state.kit, KIT) === KIT.length) toast('Step 2 done: storm kit packed');
  openKitSheet();
}
function openPlanSheet() {
  openSheet('<span class="eyebrow">Step 3</span><h2 class="h2" id="sheet-title">Make your family plan</h2>' +
    '<p>Three short guides. Read each one together with everyone you live with.</p>' +
    '<div>' + GUIDES.map(function (g, i) {
      return '<button class="list-row" onclick="openGuide(' + i + ')"><span class="tile-ic">' + (state.guidesRead[i] ? icon('check') : icon(g.icon)) + '</span>' +
        '<span class="grow"><span class="title">' + esc(g.title) + '</span><span class="meta">' + (state.guidesRead[i] ? 'Read · ' : '') + esc(g.meta) + '</span></span>' +
        '<span style="color:var(--muted);display:inline-flex;">' + icon('chevron') + '</span></button>';
    }).join('') + '</div>');
}
function openGuide(i) {
  var g = GUIDES[i];
  openSheet('<button class="back-btn" onclick="openPlanSheet()">' + icon('back', 'sm') + 'All guides</button>' +
    '<h2 class="h2" id="sheet-title">' + esc(g.title) + '</h2><p>' + esc(g.meta) + '</p>' +
    '<ul>' + g.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
    '<button class="btn btn-primary btn-block" onclick="markGuideRead(' + i + ')">' + (state.guidesRead[i] ? 'Back to guides' : 'Mark as read') + '</button>');
}
function markGuideRead(i) {
  var first = !state.guidesRead[i];
  state.guidesRead[i] = true;
  if (first && GUIDES.every(function (g, n) { return state.guidesRead[n]; })) toast('Step 3 done: family plan ready');
  openPlanSheet();
}

// Lowercase and drop accents, so "manaties" finds "manatíes"
function plain(text) { return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
// The words a place can be found by: its name, description, region and category, in English and in Spanish
function searchText(p) {
  var words = [p.name, p.short, p.body, regionById(p.region).name, catById(p.cat).label];
  var spanish = state.lang === 'es' ? words.map(tr) : [];
  return plain(words.concat(spanish).join(' '));
}
function catById(id) { return CATS.filter(function (c) { return c.id === id; })[0]; }
function filteredPlaces() {
  var q = plain(document.getElementById('explore-search').value.trim());
  return PLACES.filter(function (p) {
    if (state.cat !== 'all' && p.cat !== state.cat) return false;
    if (state.near && p.region !== state.region) return false;
    if (state.exploreRegion && p.region !== state.exploreRegion) return false;
    if (q && searchText(p).indexOf(q) === -1) return false;
    return true;
  });
}
function renderExplore() {
  document.getElementById('explore-cats').innerHTML = CATS.map(function (c) {
    return '<button class="chip" aria-pressed="' + (state.cat === c.id) + '" onclick="setCat(\'' + c.id + '\')">' + esc(c.label) + '</button>';
  }).join('');
  if (state.exploreRegion === state.region) state.exploreRegion = '';
  var sel = document.getElementById('region-filter');
  sel.innerHTML = '<option value="">All regions</option>' + REGIONS.filter(function (r) { return r.id !== state.region; }).map(function (r) {
    return '<option value="' + r.id + '">' + esc(r.name) + '</option>';
  }).join('');
  sel.value = state.exploreRegion;
  sel.classList.toggle('is-active', !!state.exploreRegion);
  var near = document.getElementById('near-toggle');
  near.setAttribute('aria-pressed', state.near);
  var list = filteredPlaces();
  var regionNote = state.near ? ' in ' + regionById(state.region).name + ' (your region)' : state.exploreRegion ? ' in ' + regionById(state.exploreRegion).name : ' across Florida';
  document.getElementById('explore-count').textContent = list.length + (list.length === 1 ? ' place' : ' places') + regionNote;
  document.getElementById('explore-list').innerHTML = list.length ? list.map(function (p) {
    return '<div class="place-row"><button class="list-row" onclick="openPlace(\'' + p.id + '\')">' +
      '<span class="thumb">' + placeArt(p, 76, 76) + '</span>' +
      '<span class="grow"><span class="title">' + esc(p.name) + (state.stamps[p.id] ? '\u00A0<span class="visited-check" title="Visited">✓</span>' : '') + '</span>' +
      '<span class="meta">' + esc(regionById(p.region).name) + ' · ' + esc(p.short) + '</span>' +
      '<span class="tag">' + esc(p.best) + '</span></span></button>' +
      heartBtn(p.id) + '</div>';
  }).join('') : emptyExplore();
}
// No results: say which filters are on and offer to clear them all
function emptyExplore() {
  var on = [];
  if (document.getElementById('explore-search').value.trim()) on.push('your search');
  if (state.cat !== 'all') on.push('the category');
  if (state.near || state.exploreRegion) on.push('the region');
  return '<div class="empty-state"><p class="muted small">No places match ' + (on.length ? 'with ' + joinList(on) + '.' : '.') + '</p>' +
    '<button class="btn btn-light" onclick="clearExploreFilters()">Clear filters</button></div>';
}
function joinList(items) { return items.length < 2 ? items.join('') : items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1]; }
function clearExploreFilters() {
  document.getElementById('explore-search').value = '';
  state.cat = 'all'; state.near = false; state.exploreRegion = '';
  renderExplore();
  document.getElementById('explore-search').focus();
}
function setCat(id) { state.cat = id; renderExplore(); }
function toggleNear() { state.near = !state.near; if (state.near) state.exploreRegion = ''; renderExplore(); }
function setExploreRegion(id) { state.exploreRegion = id; if (id) state.near = false; renderExplore(); }
var openPlaceId = null;
function openPlace(id) {
  openPlaceId = id;
  var p = placeById(id);
  var stamped = !!state.stamps[id];
  var saved = inBucket(id);
  openSheet(
    '<div class="art">' + placeArt(p, 340, 190) + '</div>' +
    '<div class="row" style="flex-wrap:wrap;gap:0.4rem;"><span class="pill pill-sun">' + esc(p.best) + '</span><span class="eyebrow" style="color:var(--lagoon-ink);">' + esc(CATS.filter(function (c) { return c.id === p.cat; })[0].label) + ' · ' + esc(regionById(p.region).name) + '</span></div>' +
    '<h2 class="h2" id="sheet-title">' + esc(p.name) + '</h2>' +
    '<p>' + esc(p.body) + '</p>' +
    '<div class="btn-row">' +
      '<button class="btn btn-light bucket-toggle" aria-pressed="' + saved + '" onclick="toggleBucket(\'' + id + '\')">' + icon('heart', 'sm') + (saved ? 'On bucket list' : 'Bucket list') + '</button>' +
      '<button class="btn ' + (stamped ? 'btn-soft' : 'btn-primary') + '" onclick="toggleStamp(\'' + id + '\')">' + (stamped ? icon('check', 'sm') + 'Stamped' : 'I’ve been here') + '</button>' +
    '</div>' +
    '<div class="btn-row">' +
      '<a class="btn btn-light" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.name + ', Florida') + '" target="_blank" rel="noopener noreferrer">' + icon('pin', 'sm') + 'Directions</a>' +
      '<a class="btn btn-light" href="https://www.google.com/search?q=' + encodeURIComponent(p.name + ' Florida hours') + '" target="_blank" rel="noopener noreferrer">' + icon('clock', 'sm') + 'Hours</a>' +
    '</div>' +
    '<p class="small" style="text-align:center;">Hours, fees and closures change by season and after storms. Check before you go.</p>');
}
function toggleStamp(id) {
  state.stamps[id] = !state.stamps[id];
  if (state.stamps[id]) toast('Stamp collected!');
  openPlace(id);
  renderAll();
}

/* =========================================================
   Learn
   ========================================================= */
function renderLearn() {
  document.getElementById('quiz-banner-meta').textContent = state.quizBest === null
    ? QUIZ.length + ' quick questions on what you’ve learned'
    : 'Your best: ' + state.quizBest + '/' + QUIZ.length + ' · ' + quizRank(state.quizBest)[0];
  var tabs = [['regions', 'Regions'], ['tips', 'Florida 101'], ['lingo', 'Lingo']];
  document.getElementById('learn-tabs').innerHTML = tabs.map(function (t) {
    return '<button aria-pressed="' + (state.learnTab === t[0]) + '" onclick="setLearnTab(\'' + t[0] + '\')">' + t[1] + '</button>';
  }).join('');
  ['regions', 'tips', 'lingo'].forEach(function (t) { document.getElementById('learn-' + t).hidden = state.learnTab !== t; });

  var regionSel = document.getElementById('learn-region-select');
  regionSel.innerHTML = REGIONS.map(function (x) {
    return '<option value="' + x.id + '">' + esc(x.name) + (x.id === state.region ? ' (your region)' : '') + '</option>';
  }).join('');
  regionSel.value = state.learnRegion;
  var r = regionById(state.learnRegion);
  document.getElementById('region-card').innerHTML =
    '<div class="region-head"><div class="eyebrow">' + esc(r.cities) + '</div><h2 class="h2" style="font-size:1.5rem;margin-top:0.3rem;">' + esc(r.name) + '</h2><p>' + esc(r.intro) + '</p></div>' +
    r.facts.map(function (f, i) {
      return '<div class="fact"' + (i === 0 ? ' style="border-top:0;"' : '') + '><span class="tile-ic">' + icon(f[0], 'sm') + '</span><div><b>' + esc(f[1]) + '</b><span>' + esc(f[2]) + '</span></div></div>';
    }).join('');

  ['cmp-a', 'cmp-b'].forEach(function (sid) {
    var sel = document.getElementById(sid);
    if (!sel.options.length) {
      sel.innerHTML = REGIONS.map(function (x) { return '<option value="' + x.id + '">' + esc(x.name) + '</option>'; }).join('');
      sel.value = sid === 'cmp-a' ? 'south' : 'north';
    }
  });
  renderCompare();

  renderTips();

  document.getElementById('lingo-list').innerHTML = LINGO.map(function (w) {
    return '<div><dt>' + esc(w[0]) + '</dt><dd>' + esc(w[1]) + '</dd></div>';
  }).join('');
  renderLingo();
}
function renderCompare() {
  var a = regionById(document.getElementById('cmp-a').value);
  var b = regionById(document.getElementById('cmp-b').value);
  var rows = [['Pace', 'pace'], ['Winters', 'winters'], ['Language', 'language'], ['Weekends', 'weekends']];
  document.getElementById('cmp-table').innerHTML =
    '<thead><tr><th scope="col"><span class="sr-only">Topic</span></th><th scope="col" style="color:var(--lagoon-ink);">' + esc(a.name) + '</th><th scope="col" style="color:var(--palm-ink);">' + esc(b.name) + '</th></tr></thead><tbody>' +
    rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + esc(a[r[1]]) + '</td><td>' + esc(b[r[1]]) + '</td></tr>'; }).join('') + '</tbody>';
}
function setLearnTab(t) { state.learnTab = t; renderLearn(); }

/* Florida 101: one large tip card at a time, like the Lingo deck, with a full list underneath */
var TIP_STYLE = {
  weather: { icon: 'sun', bg: 'var(--lagoon-pale)', fg: 'var(--lagoon-ink)' },
  road: { icon: 'car', bg: 'var(--palm-pale)', fg: 'var(--palm-ink)' },
  home: { icon: 'house', bg: 'var(--sun-pale)', fg: 'var(--sun-ink)' },
  outdoors: { icon: 'compass', bg: 'var(--lime-pale)', fg: 'var(--lime-ink)' },
  life: { icon: 'people', bg: 'var(--pink-pale)', fg: 'var(--pink-ink)' },
  habits: { icon: 'drop', bg: 'var(--coral-pale)', fg: 'var(--coral-ink)' }
};
function tipsInTopic() { return TIPS.filter(function (t) { return state.tipTopic === 'all' || t.topic === state.tipTopic; }); }
function renderTips() {
  var sel = document.getElementById('tip-topic-select');
  sel.innerHTML = TIP_TOPICS.map(function (t) {
    var n = t.id === 'all' ? TIPS.length : TIPS.filter(function (x) { return x.topic === t.id; }).length;
    return '<option value="' + t.id + '">' + esc(t.id === 'all' ? 'All topics' : t.label) + ' (' + n + ')</option>';
  }).join('');
  sel.value = state.tipTopic;
  var list = tipsInTopic();
  if (state.tipIndex >= list.length) state.tipIndex = 0;
  var topicName = {}; TIP_TOPICS.forEach(function (t) { topicName[t.id] = t.label; });
  var t = list[state.tipIndex], st = TIP_STYLE[t.topic];
  var last = state.tipIndex === list.length - 1;
  document.getElementById('tip-deck').innerHTML =
    '<div class="between small muted" style="font-weight:700;margin-bottom:0.5rem;"><span>Tip ' + (state.tipIndex + 1) + ' of ' + list.length + '</span><span>' + esc(topicName[t.topic]) + '</span></div>' +
    '<div class="bar"><span style="width:' + Math.round((state.tipIndex + 1) / list.length * 100) + '%"></span></div>' +
    '<article class="tip-card">' +
      '<div class="tip-band" style="background:' + st.bg + ';color:' + st.fg + ';">' +
        '<span class="tip-ic" style="color:' + st.fg + ';">' + icon(st.icon) + '</span>' +
        '<span class="tip-topic">' + esc(topicName[t.topic]) + '</span>' +
        (t.deadline ? '<span class="pill pill-coral" style="margin-left:auto;">' + esc(t.deadline) + '</span>' : '') +
      '</div>' +
      '<div class="tip-body">' +
        '<h3 class="tip-title">' + esc(t.title) + '</h3>' +
        '<p class="tip-text">' + esc(t.body) + '</p>' +
        (t.source ? '<a class="tip-source" href="' + (SOURCE_URLS[t.source] || '#') + '" target="_blank" rel="noopener noreferrer">Official source: ' + esc(t.source) + ' ' + icon('external', 'sm') + '</a>' : '') +
      '</div>' +
    '</article>' +
    '<div class="btn-row" style="margin-top:0.8rem;">' +
      '<button class="btn btn-light" onclick="stepTip(-1)"' + (state.tipIndex === 0 ? ' disabled' : '') + '>' + icon('back', 'sm') + 'Previous</button>' +
      '<button class="btn btn-primary" onclick="stepTip(1)">' + (last ? 'Start over' : 'Next tip') + (last ? '' : icon('chevron', 'sm')) + '</button>' +
    '</div>';
  document.getElementById('tip-list').innerHTML = list.map(function (x, i) {
    return '<button class="tip-mini' + (i === state.tipIndex ? ' is-current' : '') + '" onclick="jumpTip(' + i + ')"><b>' + esc(x.title) + '</b><span>' + esc(topicName[x.topic]) + (x.deadline ? ' · ' + esc(x.deadline) : '') + '</span></button>';
  }).join('');
}
function stepTip(d) {
  var n = tipsInTopic().length;
  state.tipIndex = d > 0 && state.tipIndex === n - 1 ? 0 : Math.max(0, Math.min(n - 1, state.tipIndex + d));
  renderTips();
  announceTip();
}
function jumpTip(i) { state.tipIndex = i; renderTips(); announceTip(); document.getElementById('tip-deck').scrollIntoView({ block: 'start' }); }
function announceTip() {
  var t = tipsInTopic()[state.tipIndex];
  document.getElementById('tip-live').textContent = tr(t.title) + '. ' + tr(t.body);
}
function setTipTopic(id) { state.tipTopic = id; state.tipIndex = 0; renderTips(); }

/* =========================================================
   Lingo flashcards: flip to see the meaning, then sort into "knew it" / "still learning"
   ========================================================= */
// "known" points at state.lingoKnown, so the cards you know are saved between visits
var lingo = { order: LINGO.map(function (_, i) { return i; }), pos: 0, flipped: false, known: state.lingoKnown, learning: {} };
function renderLingo() {
  var deck = document.getElementById('lingo-deck');
  var knownCount = Object.keys(lingo.known).length;
  var i = lingo.order[lingo.pos], w = LINGO[i];
  var dots = lingo.order.map(function (n, k) {
    var cls = k === lingo.pos ? 'is-now' : lingo.known[n] ? 'is-done' : lingo.learning[n] ? 'is-learning' : '';
    return '<span class="' + cls + '"></span>';
  }).join('');
  deck.innerHTML =
    '<div class="between small muted" style="font-weight:700;margin-bottom:0.5rem;"><span>Card ' + (lingo.pos + 1) + ' of ' + lingo.order.length + '</span><span>' + knownCount + ' of ' + LINGO.length + ' known</span></div>' +
    '<div class="quiz-dots" aria-hidden="true">' + dots + '</div>' +
    '<div class="lingo-stage">' +
      '<button class="lingo-arrow" onclick="moveLingo(-1)" aria-label="Previous card">' + icon('back') + '</button>' +
      '<button class="flip-card' + (lingo.flipped ? ' is-flipped' : '') + '" onclick="flipLingo()" aria-label="' + esc(w[0]) + (lingo.flipped ? '. ' + esc(w[1]) : '. Tap to see what it means') + '">' +
        '<span class="flip-inner">' +
          '<span class="flip-face flip-front" aria-hidden="true"><span class="eyebrow">What does it mean?</span><span class="flip-term">' + esc(w[0]) + '</span><span class="flip-hint">Tap to flip</span></span>' +
          '<span class="flip-face flip-back" aria-hidden="true"><span class="eyebrow">' + esc(w[0]) + '</span><span class="flip-def">' + esc(w[1]) + '</span><span class="flip-ex">“' + esc(w[2]) + '”</span></span>' +
        '</span>' +
      '</button>' +
      '<button class="lingo-arrow" onclick="moveLingo(1)" aria-label="Next card">' + icon('chevron') + '</button>' +
    '</div>' +
    (lingo.flipped
      ? '<div class="btn-row" style="margin-top:0.8rem;"><button class="btn btn-light" onclick="rateLingo(false)">Still learning</button><button class="btn btn-primary" onclick="rateLingo(true)">I knew it</button></div>'
      : '<p class="small muted" style="text-align:center;margin-top:0.8rem;">Guess first, then flip the card. The deck loops, so keep going.</p>') +
    '<div style="text-align:center;margin-top:0.4rem;"><button class="link-btn" onclick="restartLingo(true)">Shuffle the deck</button></div>';
}
function flipLingo() { lingo.flipped = !lingo.flipped; renderLingo(); var c = document.querySelector('.flip-card'); if (c) c.focus(); }
// The deck loops: past the last card it wraps to the first (and the other way)
function moveLingo(d) {
  var n = lingo.order.length;
  lingo.pos = (lingo.pos + d + n) % n;
  lingo.flipped = false;
  renderLingo();
}
function rateLingo(knew) {
  var i = lingo.order[lingo.pos];
  if (knew) { lingo.known[i] = true; delete lingo.learning[i]; } else { lingo.learning[i] = true; delete lingo.known[i]; }
  if (lingo.pos === lingo.order.length - 1) toast('Back to the first card · ' + Object.keys(lingo.known).length + ' of ' + LINGO.length + ' known');
  moveLingo(1);
  var c = document.querySelector('#lingo-deck .flip-card'); if (c) c.focus();
}
function shuffle(a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; }
function restartLingo(doShuffle) {
  var order = LINGO.map(function (_, i) { return i; });
  lingo = { order: doShuffle ? shuffle(order) : order, pos: 0, flipped: false, known: state.lingoKnown, learning: lingo.learning || {} };
  renderLingo();
}

var quiz = { i: 0, picked: null, score: 0, done: false };

function startQuiz() { quiz = { i: 0, picked: null, score: 0, done: false }; navigate('quiz'); }
function pickAnswer(n) {
  if (quiz.picked !== null) return;
  quiz.picked = n;
  if (n === QUIZ[quiz.i].answer) quiz.score++;
  renderQuiz();
}
function nextQuestion() {
  if (quiz.i < QUIZ.length - 1) { quiz.i++; quiz.picked = null; }
  else {
    quiz.done = true;
    if (state.quizBest === null || quiz.score > state.quizBest) state.quizBest = quiz.score;
  }
  renderQuiz();
  document.getElementById('app-screens').scrollTop = 0;
}
function quizRank(score) {
  if (score >= 7) return ['Certified Floridian', 'You know the rules, the lingo and when to put up the shutters. Welcome home.'];
  if (score >= 4) return ['Getting your sea legs', 'You’ve got the basics. A few more weeks with FloReady and you’ll be giving the tips.'];
  return ['Fresh off the plane', 'No worries. Everyone starts here. The Learn and Prepare tabs have every answer.'];
}
function renderQuiz() {
  var body = document.getElementById('quiz-body');
  if (quiz.done) {
    var r = quizRank(quiz.score);
    body.innerHTML =
      '<div class="card-sun" style="text-align:center;padding:1.8rem 1.2rem;">' +
        '<div class="quiz-badge" style="width:72px;height:72px;border-radius:36px;font-size:1.6rem;margin:0 auto;">' + quiz.score + '/' + QUIZ.length + '</div>' +
        '<h1 class="screen-title" style="font-size:1.5rem;">' + esc(r[0]) + '</h1>' +
        '<p style="font-size:0.92rem;line-height:1.5;color:var(--sun-ink);">' + esc(r[1]) + '</p>' +
      '</div>' +
      '<button class="btn btn-primary btn-block" onclick="startQuiz()">Try again</button>' +
      '<button class="btn btn-light btn-block" onclick="navigate(\'learn\')">Back to Learn</button>';
    return;
  }
  var item = QUIZ[quiz.i];
  var answered = quiz.picked !== null;
  var dots = QUIZ.map(function (_, n) {
    return '<span class="' + (n < quiz.i || (n === quiz.i && answered) ? 'is-done' : n === quiz.i ? 'is-now' : '') + '"></span>';
  }).join('');
  var opts = item.options.map(function (o, n) {
    var cls = '', mark = '';
    if (answered && n === item.answer) { cls = ' is-right'; mark = '<span class="mark">' + icon('check', 'sm') + '</span>'; }
    else if (answered && n === quiz.picked) { cls = ' is-wrong'; mark = '<span class="mark mark-wrong">Not quite</span>'; }
    return '<button class="quiz-option' + cls + '"' + (answered ? ' disabled' : '') + ' onclick="pickAnswer(' + n + ')">' + esc(o) + mark + '</button>';
  }).join('');
  var right = answered && quiz.picked === item.answer;
  body.innerHTML =
    '<div><div class="between small muted" style="font-weight:700;margin-bottom:0.5rem;"><span>Question ' + (quiz.i + 1) + ' of ' + QUIZ.length + '</span><span>Score ' + quiz.score + '</span></div>' +
    '<div class="quiz-dots" aria-hidden="true">' + dots + '</div></div>' +
    '<h1 class="screen-title" style="font-size:1.45rem;">' + esc(item.q) + '</h1>' +
    '<div>' + opts + '</div>' +
    (answered
      ? '<div class="' + (right ? 'card-palm' : 'card-sun') + '" role="status"><b>' + (right ? 'Correct!' : 'Good to know:') + '</b> <span style="font-size:0.9rem;line-height:1.5;">' + esc(item.why) + '</span></div>' +
        '<button class="btn btn-primary btn-block" onclick="nextQuestion()">' + (quiz.i < QUIZ.length - 1 ? 'Next question' : 'See my result') + '</button>'
      : '');
}
function setLearnRegion(id) { state.learnRegion = id; renderLearn(); }

/* =========================================================
   Move plan
   ========================================================= */
function checkItem(item, on, handler, round) {
  return '<button class="check-item" aria-pressed="' + on + '" onclick="' + handler + '(\'' + item.id + '\')">' +
    '<span class="check-box' + (round ? ' round' : '') + '">' + icon('check', 'sm') + '</span>' +
    '<span><span class="check-title">' + esc(item.title) + '</span><span class="check-detail">' + esc(item.detail) + '</span></span></button>';
}
// A step FloReady ticks for you (zone, storm kit, first park): not a button, with a note saying so
function autoItem(item, on) {
  return '<div class="check-item is-auto' + (on ? ' is-on' : '') + '">' +
    '<span class="check-box round" aria-hidden="true">' + icon('check', 'sm') + '</span>' +
    '<span><span class="check-title">' + esc(item.title) + '<span class="sr-only">' + (on ? ' (done)' : ' (not done yet)') + '</span></span>' +
    '<span class="check-detail">' + esc(item.detail) + '</span>' +
    '<span class="auto-note">' + (on ? 'Done' : 'Checks itself off when you finish it') + '</span></span></div>';
}

function renderLinks() {
  document.getElementById('links-list').innerHTML = LINKS.map(function (g) {
    return '<h2 class="group-label">' + esc(g.group) + '</h2>' + g.items.map(function (l) {
      return '<a class="link-row" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(l.name) + ' (opens in a new tab)">' +
        '<span class="tile-ic" style="background:var(--lagoon-pale);color:var(--lagoon-ink);">' + icon(l.type === 'App' ? 'phone' : 'globe') + '</span>' +
        '<span class="grow"><span class="title">' + esc(l.name) + '</span><span class="meta">' + esc(l.desc) + '</span>' +
        '<span class="tags">' + (l.official ? '<span class="tag-pill official">Official</span>' : '') + '<span class="tag-pill">' + l.type + '</span></span></span>' +
        '<span style="color:var(--muted);display:inline-flex;">' + icon('external', 'sm') + '</span></a>';
    }).join('');
  }).join('');
}
function renderResources() {
  var all = [];
  LINKS.forEach(function (g) { all = all.concat(g.items); });
  document.getElementById('res-chips').innerHTML = ['National Hurricane Center', 'FL511', 'WeatherBug'].map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('') + '<span>+' + (all.length - 3) + ' more</span>';
  var items = allMoveItems();
  var done = countMoveDone(items);
  document.getElementById('res-ring').setAttribute('stroke-dasharray', Math.round(done / items.length * 144.5) + ' 145');
  document.getElementById('res-ring-text').textContent = done + '/' + items.length;
  document.getElementById('res-move-meta').textContent = done + ' of ' + items.length + ' steps done · moving to ' + regionById(state.region).name;
  document.getElementById('res-move-bar').style.width = Math.round(done / items.length * 100) + '%';
  var next = nextMoveItem();
  document.getElementById('res-move-next').innerHTML = next ? '<b>Next up:</b> ' + esc(next.title) : '<b>All done.</b> Welcome home!';
  renderSos();
}
// Emergency numbers: each is a button that asks before calling
function renderSos() {
  document.getElementById('sos-card').innerHTML = SOS_NUMBERS.map(function (n, i) {
    return '<div class="' + (i === 0 ? 'sos-main' : 'sos-row') + '"><span>' + esc(PHONES[n].label) + '</span>' + callButton(n, i === 0 ? 'call-big' : '') + '</div>';
  }).join('');
}

function renderMove() {
  var items = allMoveItems();
  var done = countMoveDone(items);
  document.getElementById('move-sub').textContent = 'Moving to ' + regionById(state.region).name;
  document.getElementById('move-done').textContent = done;
  document.getElementById('move-total').textContent = items.length;
  document.getElementById('move-bar').style.width = Math.round(done / items.length * 100) + '%';
  var next = nextMoveItem();
  document.getElementById('move-next').innerHTML = next
    ? '<b style="color:#FFFFFF;">Next up:</b> ' + esc(next.title) + (next.due ? ', ' + esc(next.due.toLowerCase()) : '')
    : '<b style="color:#FFFFFF;">Everything’s done.</b> Welcome home!';

  document.getElementById('move-stages').innerHTML = MOVE.map(function (s) {
    var d = countMoveDone(s.items);
    var complete = d === s.items.length;
    return '<div style="margin-bottom:1.1rem;"><div class="between" style="padding:0.2rem 0 0.5rem;"><h2 class="h2" style="font-size:1.1rem;">' + esc(s.stage) + '</h2>' +
      '<span class="small" style="font-weight:700;color:' + (complete ? 'var(--palm-ink)' : 'var(--muted)') + ';">' + (complete ? 'Complete' : d + ' of ' + s.items.length) + '</span></div>' +
      '<div class="card stage-card check-list">' + s.items.map(function (it) {
        // Automatic steps can't be ticked by hand; a link takes you to where you do them
        var html = AUTO_MOVE_STEPS[it.id] ? autoItem(it, isMoveDone(it.id)) : checkItem(it, isMoveDone(it.id), 'toggleMove', true);
        if (it.action && !isMoveDone(it.id)) {
          var label = { zone: 'Find your zone', kit: 'Open storm kit', explore: 'Open Explore' }[it.action];
          html += '<button class="link-btn step-link" onclick="goAction(\'' + it.action + '\')">' + label + ' →</button>';
        }
        return html;
      }).join('') + '</div></div>';
  }).join('');
}
function toggleMove(id) {
  state.move[id] = !state.move[id];
  if (state.move[id] && !nextMoveItem()) toast('Move plan complete. Welcome home!');
  renderMove();
}
function goAction(a) {
  if (a === 'zone') openPrepare('hurricanes', 'zone');
  else if (a === 'kit') openPrepare('hurricanes', 'kit');
  else navigate('explore');
}

/* =========================================================
   Settings
   ========================================================= */
function renderSettings() {
  renderA11y();
  renderLang();
  var sel = document.getElementById('set-region');
  if (!sel.options.length) sel.innerHTML = REGIONS.map(function (r) { return '<option value="' + r.id + '">' + esc(r.name) + '</option>'; }).join('');
  sel.value = state.region;
  var nameEl = document.getElementById('set-name');
  if (document.activeElement !== nameEl) nameEl.value = state.name;
}
function setName(v) { state.name = v.trim(); }
function setRegion(id) { state.region = id; state.learnRegion = id; toast('Region changed to ' + regionById(id).name); }
/* Accessibility: text size zooms the app content (so it reflows), bold and reduce motion are classes on the phone */
var TEXT_SIZES = [['default', 'Default', 1], ['large', 'Large', 1.15], ['xl', 'Extra large', 1.3]];
/* Language picker (English / Español). i18n.js does the translating */
var LANGS = [['en', 'English'], ['es', 'Español']];
function renderLang() {
  var html = LANGS.map(function (l) {
    return '<button aria-pressed="' + (state.lang === l[0]) + '" lang="' + l[0] + '" onclick="setLang(\'' + l[0] + '\')">' + l[1] + '</button>';
  }).join('');
  ['onb-lang', 'set-lang'].forEach(function (id) { var el = document.getElementById(id); if (el) el.innerHTML = html; });
}
function setLang(id) {
  state.lang = id;
  renderLang();
  applyLanguage();
  if (isSpeaking) stopSpeaking();
}
function renderA11y() {
  document.getElementById('text-size').innerHTML = TEXT_SIZES.map(function (t) {
    return '<button aria-pressed="' + (state.textSize === t[0]) + '" onclick="setTextSize(\'' + t[0] + '\')">' + t[1] + '</button>';
  }).join('');
  document.getElementById('bold-toggle').checked = !!state.bold;
  document.getElementById('motion-toggle').checked = !!state.still;
  document.getElementById('read-toggle').checked = !!state.readAloud;
  document.getElementById('read-options').hidden = !state.readAloud;
  document.getElementById('voice-speed').innerHTML = VOICE_RATES.map(function (r) {
    return '<button aria-pressed="' + (state.voiceRate === r[0]) + '" onclick="setVoiceRate(\'' + r[0] + '\')">' + r[1] + '</button>';
  }).join('');
  document.getElementById('dark-toggle').checked = prefersDark();
}
function setTextSize(id) {
  state.textSize = id;
  var zoom = TEXT_SIZES.filter(function (t) { return t[0] === id; })[0][2];
  var phone = document.getElementById('phone');
  phone.style.setProperty('--text-zoom', zoom);
  phone.dataset.textSize = id;
  renderA11y();
}
function setA11y(which, on) {
  var phone = document.getElementById('phone');
  if (which === 'bold') { state.bold = on; phone.classList.toggle('is-bold', on); }
  if (which === 'motion') { state.still = on; phone.classList.toggle('is-still', on); }
  if (which === 'read') {
    state.readAloud = on;
    if (on && !speechSupported) toast('Read aloud isn’t supported in this browser');
    if (!on) stopSpeaking();
    updateListenButton();
  }
  renderA11y();
}
function setVoiceRate(id) { state.voiceRate = id; renderA11y(); }
function toggleTheme(isDark) {
  state.theme = isDark ? 'dark' : 'light';
  applyTheme();
}
// The in-app switch changes the phone only; the page around it keeps following the device's setting
function applyTheme() {
  var phone = document.getElementById('phone');
  if (state.theme) phone.dataset.theme = state.theme; else delete phone.dataset.theme;
}
function prefersDark() {
  return state.theme ? state.theme === 'dark' : !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

// Applies saved settings (text size, bold, motion, theme) when the app opens
function applySettings() {
  var phone = document.getElementById('phone');
  var size = TEXT_SIZES.filter(function (t) { return t[0] === state.textSize; })[0] || TEXT_SIZES[0];
  phone.style.setProperty('--text-zoom', size[2]);
  phone.classList.toggle('is-bold', !!state.bold);
  phone.classList.toggle('is-still', !!state.still);
  phone.dataset.textSize = size[0];
  applyTheme();
}

// Erasing takes two taps so it can't happen by accident
function askEraseData() { document.getElementById('erase-confirm').hidden = false; document.getElementById('erase-ask').hidden = true; }
function cancelEraseData() { document.getElementById('erase-confirm').hidden = true; document.getElementById('erase-ask').hidden = false; }
function eraseData() {
  clearSavedState();
  try { localStorage.removeItem(SAVE_KEY + '-backup'); } catch (e) { /* nothing to clear */ }
  window.location.reload();
}

/* =========================================================
   Sheet + toast helpers
   ========================================================= */
var lastFocus = null, lastFocusKey = null;
function openSheet(html, focusId) {
  var sheet = document.getElementById('sheet');
  var wasOpen = document.getElementById('overlay').classList.contains('is-visible');
  if (!wasOpen) { lastFocus = document.activeElement; lastFocusKey = onclickOf(lastFocus); }
  // When a panel re-renders (e.g. ticking a kit item), keep focus on the same control
  var active = wasOpen && sheet.contains(document.activeElement) ? document.activeElement.getAttribute('onclick') : null;
  var scroll = sheet.scrollTop;
  sheet.innerHTML = '<div class="sheet-handle" aria-hidden="true"></div>' + html +
    '<button class="btn btn-light btn-block" onclick="closeSheet()">Close</button>';
  document.getElementById('overlay').classList.add('is-visible');
  setBehindPanelInert(true);
  var same = active && Array.prototype.filter.call(sheet.querySelectorAll('[onclick]'), function (el) { return el.getAttribute('onclick') === active; })[0];
  if (same) { sheet.scrollTop = scroll; same.focus(); }
  else {
    sheet.scrollTop = 0;
    // Start on the panel's title, so screen readers announce it and no button looks pre-selected
    var title = document.getElementById('sheet-title');
    if (title) title.setAttribute('tabindex', '-1');
    var target = (focusId && document.getElementById(focusId)) || title || sheet.querySelector('button');
    if (target) target.focus();
  }
}
// While a panel is open, the screen behind it can't be focused or read (the `inert` attribute).
// The Listen button stays usable, so you can have the open panel read to you.
function setBehindPanelInert(on) {
  ['app-screens', 'bottom-nav'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.inert = on;
  });
}
function closeSheet() {
  setBehindPanelInert(false);
  document.getElementById('overlay').classList.remove('is-visible');
  if (typeof stopSpeaking === 'function' && isSpeaking) stopSpeaking();
  renderAll();
  // Put keyboard focus back where it was. If that button was redrawn, find its replacement.
  if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus();
  else refocus(lastFocusKey, document.getElementById('app-screens'));
}
function onclickOf(el) { return el && el.getAttribute ? el.getAttribute('onclick') : null; }
function refocus(key, container) {
  if (!key || !container) return;
  var match = Array.prototype.filter.call(container.querySelectorAll('[onclick]'), function (el) { return el.getAttribute('onclick') === key; })[0];
  if (match) match.focus();
}
document.addEventListener('keydown', function (e) {
  var callOpen = !document.getElementById('call-overlay').hidden;
  var sheetOpen = document.getElementById('overlay').classList.contains('is-visible');
  if (e.key === 'Escape') {
    if (callOpen) closeCall(); else if (sheetOpen) closeSheet();
  } else if (e.key === 'Tab' && (callOpen || sheetOpen)) {
    // The Listen button stays reachable while a panel is open
    trapFocus(e, document.getElementById(callOpen ? 'call-overlay' : 'sheet'), callOpen ? null : document.getElementById('listen-btn'));
  }
});
// Keep Tab and Shift+Tab cycling inside an open panel or box instead of escaping to the page
function trapFocus(e, box, extra) {
  var items = Array.prototype.filter.call(box.querySelectorAll('button, a[href], input, select, [tabindex="0"]'), function (el) {
    return !el.disabled && el.offsetParent !== null;
  });
  if (extra && !extra.hidden) items.push(extra);
  if (!items.length) return;
  var first = items[0], last = items[items.length - 1];
  var inside = items.indexOf(document.activeElement) !== -1 || box.contains(document.activeElement);
  if (e.shiftKey && (document.activeElement === first || !inside)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && (document.activeElement === last || !inside)) { e.preventDefault(); first.focus(); }
}

/* =========================================================
   Phone calls: tapping a number asks first, so nobody calls by accident
   ========================================================= */
function callButton(number, cls) {
  return '<button class="call-btn' + (cls ? ' ' + cls : '') + '" onclick="confirmCall(\'' + number + '\')" aria-label="Call ' + number + ', ' + esc(PHONES[number].name) + '">' +
    (cls === 'call-small' ? icon('phone', 'sm') : '') + '<span>' + number + '</span></button>';
}
// A row of call buttons for every known phone number mentioned in a piece of text
function callButtonsFor(text) {
  var numbers = (text.match(/\b(911|1-\d{3}-\d{3}-\d{4})\b/g) || []).filter(function (n, i, all) { return PHONES[n] && all.indexOf(n) === i; });
  return numbers.length ? '<div class="call-row">' + numbers.map(function (n) { return callButton(n, 'call-small'); }).join('') + '</div>' : '';
}
var callReturnFocus = null;
function confirmCall(number) {
  var phone = PHONES[number];
  if (!phone) return;
  callReturnFocus = document.activeElement;
  document.getElementById('call-title').textContent = 'Call ' + number + '?';
  document.getElementById('call-name').textContent = phone.name;
  document.getElementById('call-desc').textContent = phone.desc;
  var go = document.getElementById('call-go');
  go.setAttribute('href', 'tel:' + phone.tel);
  go.setAttribute('aria-label', 'Call ' + number + ', ' + phone.name);
  document.getElementById('call-go-label').textContent = 'Call';
  document.getElementById('call-overlay').hidden = false;
  // Everything behind the box is off limits until you choose
  ['app-screens', 'bottom-nav', 'overlay', 'listen-btn'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) { el.dataset.wasInert = el.inert ? '1' : ''; el.inert = true; }
  });
  document.getElementById('call-cancel').focus();
}
function closeCall() {
  document.getElementById('call-overlay').hidden = true;
  ['app-screens', 'bottom-nav', 'overlay', 'listen-btn'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.inert = el.dataset.wasInert === '1';
  });
  if (callReturnFocus && document.body.contains(callReturnFocus)) callReturnFocus.focus();
}
// After "Call" is tapped the phone app opens; close the box so it's gone when you come back
function placedCall() { setTimeout(closeCall, 300); }

var toastTimer = null;
function toast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove('is-visible'); }, 2200);
}

function renderAll() {
  updateListenButton();
  var s = currentScreen;
  if (s === 'welcome') renderOnboarding();
  if (s === 'home') renderHome();
  if (s === 'prepare') renderPrepare();
  if (s === 'explore') renderExplore();
  if (s === 'learn') renderLearn();
  if (s === 'move') renderMove();
  if (s === 'resources') renderResources();
  if (s === 'links') renderLinks();
  if (s === 'settings') renderSettings();
  if (s === 'quiz') renderQuiz();
  if (s === 'passport') renderPassportPage();
  saveState();
}

/* =========================================================
   Start-up
   ========================================================= */
function startApp() {
  var hadSavedProgress = loadState();
  cleanSavedState();
  applySettings();
  applyLanguage();
  if (hadSavedProgress && state.onboarded) {
    document.getElementById('name-input').value = state.name;
    navigate('home');
  } else {
    renderOnboarding();
  }
}
hydrateIcons();
try {
  startApp();
} catch (e) {
  // If start-up fails, it may be bad saved data: set it aside (not delete it) and try once more.
  // The flag stops this from ever turning into an endless reload loop.
  var retried = false;
  try { retried = sessionStorage.getItem('floready-retried') === '1'; sessionStorage.setItem('floready-retried', '1'); } catch (err) { retried = true; }
  if (!retried) {
    try { localStorage.setItem(SAVE_KEY + '-backup', localStorage.getItem(SAVE_KEY) || ''); } catch (err) { /* no storage */ }
    clearSavedState();
    window.location.reload();
  }
}

// Save after anything you tap, toggle or type, whenever a screen redraws (see renderAll),
// and when the app is closed or hidden, so progress is never lost
['click', 'change', 'input'].forEach(function (eventName) {
  document.addEventListener(eventName, function () { setTimeout(saveState, 0); });
});
window.addEventListener('pagehide', saveState);
document.addEventListener('visibilitychange', function () { if (document.hidden) saveState(); });

// Offline support: works when the app is served from a website (not when opened as a file)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(function () { /* offline mode unavailable here */ });
}
