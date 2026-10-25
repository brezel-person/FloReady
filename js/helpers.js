/* FloReady: helpers.js
 * Small shared helpers: the icon set, icon(), and esc() for safely inserting text into HTML.
 */

/* =========================================================
   Icons (inline stroke SVG, inserted wherever data-icon is used)
   ========================================================= */
var ICONS = {
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  book: '<path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M5 18a2 2 0 0 1 2-2h12"/>',
  list: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  pin: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  buoy: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v6H4V6h6"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c2.8 0 5 2.2 5 5"/>',
  house: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 14h6M9 17h6"/>',
  bolt: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cup: '<path d="M6 8h10v6a5 5 0 0 1-10 0z"/><path d="M16 9h2a2 2 0 0 1 0 4h-2"/><path d="M9 3v2M13 3v2"/>',
  car: '<path d="M5 16l1.5-6h11L19 16"/><path d="M4 16h16v3H4z"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  play: '<path d="M8 5l11 7-11 7z"/>',
  speaker: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  // Passport stamps: one per place category
  tree: '<path d="M12 3l6 8h-3.5l4.5 6H5l4.5-6H6z"/><path d="M12 17v4"/>',
  umbrella: '<path d="M3 12a9 9 0 0 1 18 0z"/><path d="M12 12v6.5a2 2 0 0 0 4 0"/>',
  bike: '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l3.5-7H15l3 7M9.5 9L12 16h-1M13.5 6H16"/>',
  bird: '<path d="M3 13c4 0 6-2 7-6 1.5 5 5 7.5 11 6-2.5 4-6.5 6-10.5 6C6.5 19 4 16.5 3 13z"/><path d="M14 9.5l2-1.5"/>',
  food: '<path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10"/><path d="M17 21V3c-2.2 1.2-3.5 4.2-3.5 8.5H17"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/>'
};
function icon(name, size) {
  var px = size === 'sm' ? 16 : 22;
  return '<svg width="' + px + '" height="' + px + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
}
function hydrateIcons(root) {
  (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
    if (!el.dataset.done) { el.innerHTML = icon(el.dataset.icon, el.dataset.size); el.dataset.done = '1'; el.style.display = 'inline-flex'; }
  });
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
}