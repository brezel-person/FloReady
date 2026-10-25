/* FloReady: i18n.js (English / Spanish)
 *
 * How it works:
 *   The app is written in English. When Spanish is on, translatePage() looks at every piece of
 *   text on screen (and placeholders and button labels for screen readers) and swaps in the
 *   Spanish version from es.js. A MutationObserver re-runs it whenever a screen changes, so
 *   render functions don't need to know about languages at all.
 *
 *   es.js has three parts:
 *     ES_TEXT      exact sentences and labels:            'Home' -> 'Inicio'
 *     ES_PATTERNS  text with numbers or names in it:      '3 of 10 items packed' -> '3 de 10 artículos empacados'
 *     ES_KEEP      text that stays the same in Spanish:   place names, 'FloReady'
 */

var TRANSLATED_ATTRS = ['placeholder', 'aria-label', 'title'];
var missingSpanish = {}; // English text with no translation yet (useful while adding translations)

// Only the dictionary's own entries count (not built-in names like "constructor")
function owns(map, key) { return Object.prototype.hasOwnProperty.call(map, key); }

// Translate one string. Returns the Spanish text, or null if there's no translation.
function toSpanish(text) {
  var key = text.trim();
  if (!key || !/[A-Za-z]/.test(key)) return text;          // numbers, symbols, empty
  if (owns(ES_KEEP, key) || /^[A-Z]{1,4}$/.test(key)) return text;   // names, initials, zone letters
  var lead = text.match(/^\s*/)[0], trail = text.match(/\s*$/)[0];
  if (owns(ES_TEXT, key)) return lead + ES_TEXT[key] + trail;
  for (var i = 0; i < ES_PATTERNS.length; i++) {
    var match = key.match(ES_PATTERNS[i][0]);
    if (match) {
      var out = ES_PATTERNS[i][1](match);
      if (out !== null) return lead + out + trail;
    }
  }
  // "Tampa Bay · Kayaking, mermaid show": translate each part separately
  if (key.indexOf(' · ') !== -1) {
    var parts = key.split(' · ').map(function (p) { return toSpanish(p); });
    if (parts.every(function (p) { return p !== null; })) return lead + parts.join(' · ') + trail;
  }
  missingSpanish[key] = true;
  return null;
}

// Translate a string if Spanish is on (used for toasts and spoken text)
function tr(text) {
  if (state.lang !== 'es') return text;
  var out = toSpanish(text);
  return out === null ? text : out;
}

function translatePage(root) {
  root = root || document.body;
  var spanish = state.lang === 'es';

  // 1. Text: every text node, remembering the English original so we can switch back
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      var parent = node.parentNode, tag = parent && parent.nodeName;
      if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
      // Text the app has already translated itself (marked data-translated)
      return parent && parent.closest && parent.closest('[data-translated]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  var node;
  while ((node = walker.nextNode())) {
    var english = node.englishText !== undefined ? node.englishText : node.nodeValue;
    if (!spanish) {
      if (node.englishText !== undefined && node.nodeValue !== english) node.nodeValue = english;
      continue;
    }
    var translated = toSpanish(english);
    if (translated !== null && translated !== node.nodeValue) {
      node.englishText = english;
      node.nodeValue = translated;
    }
  }

  // 2. Attributes: placeholders and screen-reader labels
  TRANSLATED_ATTRS.forEach(function (attr) {
    var elements = root.querySelectorAll('[' + attr + ']');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i], saved = 'data-en-' + attr, shown = 'data-es-' + attr;
      var current = el.getAttribute(attr);
      // If the app changed the attribute since we translated it (e.g. "Listen" became "Stop reading"),
      // the new value is the English to use; otherwise use the English we saved
      var changedByApp = el.hasAttribute(shown) && current !== el.getAttribute(shown);
      var englishValue = el.hasAttribute(saved) && !changedByApp ? el.getAttribute(saved) : current;
      if (!spanish) {
        if (el.hasAttribute(saved) && !changedByApp) el.setAttribute(attr, englishValue);
        el.removeAttribute(saved); el.removeAttribute(shown);
        continue;
      }
      var value = toSpanish(englishValue);
      if (value !== null && value !== current) {
        el.setAttribute(saved, englishValue);
        el.setAttribute(shown, value);
        el.setAttribute(attr, value);
      }
    }
  });
}

// Re-translate automatically whenever anything on the page changes
var pageObserver = new MutationObserver(function () {
  pageObserver.disconnect();           // don't react to our own changes
  translatePage(document.body);
  observePage();
});
function observePage() {
  pageObserver.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: TRANSLATED_ATTRS });
}

function applyLanguage() {
  document.documentElement.lang = state.lang === 'es' ? 'es' : 'en';
  pageObserver.disconnect();
  translatePage(document.body);
  observePage();
}
