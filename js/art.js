/* FloReady: art.js
 * Hand-drawn SVG illustrations: one scene per place category (SCENES) and one per region (HEROES).
 */

/* =========================================================
   Place illustrations: one scene per category, drawn on a 160×100 canvas.
   The subject sits in the middle (x 40–120, y 18–82) so it survives both
   square thumbnails and wide banners (preserveAspectRatio slice).
   ========================================================= */
var SCENES = {
  // Sea turtle on the sand
  beaches:
    '<rect width="160" height="100" fill="#8ED8D0"/>' +
    '<circle cx="132" cy="22" r="11" fill="#F5CF1E"/>' +
    '<rect y="34" width="160" height="22" fill="#0E8A93"/>' +
    '<path d="M0 50c10-3 20-3 30 0s20 3 30 0 20-3 30 0 20 3 30 0 20-3 40 0v8H0z" fill="#6FD3EC"/>' +
    '<path d="M0 55c40-6 100-6 160 0v45H0z" fill="#F2E3B3"/>' +
    '<path d="M73 88v10M87 88v10" stroke="#D9C48A" stroke-width="2.5" stroke-dasharray="2 3"/>' +
    '<ellipse cx="63" cy="64" rx="10" ry="4" transform="rotate(-30 63 64)" fill="#5E8C2A"/>' +
    '<ellipse cx="97" cy="64" rx="10" ry="4" transform="rotate(30 97 64)" fill="#5E8C2A"/>' +
    '<ellipse cx="67" cy="83" rx="6" ry="3" transform="rotate(35 67 83)" fill="#5E8C2A"/>' +
    '<ellipse cx="93" cy="83" rx="6" ry="3" transform="rotate(-35 93 83)" fill="#5E8C2A"/>' +
    '<ellipse cx="80" cy="53" rx="6" ry="7" fill="#5E8C2A"/>' +
    '<circle cx="77.5" cy="51" r="1.2" fill="#12303A"/><circle cx="82.5" cy="51" r="1.2" fill="#12303A"/>' +
    '<ellipse cx="80" cy="72" rx="17" ry="14" fill="#7FA82E"/>' +
    '<polygon points="80,63 88,68 88,77 80,82 72,77 72,68" fill="#C4D150"/>' +
    '<path d="M80 58v5M80 82v4M64 68l8 1M96 68l-8 1M65 79l7-2M95 79l-7-2" stroke="#C4D150" stroke-width="1.6" stroke-linecap="round"/>',

  // Manatee in clear spring water
  springs:
    '<rect width="160" height="100" fill="#6FD3EC"/>' +
    '<path d="M40 0l-14 100h10L50 0zM104 0l-8 100h8l8-100z" fill="#FFFFFF" opacity="0.18"/>' +
    '<path d="M0 10c10-3 20-3 30 0s20 3 30 0 20-3 30 0 20 3 30 0 20-3 40 0V0H0z" fill="#DDF4FA"/>' +
    '<path d="M0 88c40-4 100-4 160 0v12H0z" fill="#F2E3B3"/>' +
    '<path d="M18 94c-2-10 2-18-2-26M25 94c2-12-2-20 3-28M136 94c-3-10 2-16-1-24M143 94c2-10-1-16 2-22" stroke="#7FA82E" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="114" cy="50" rx="9" ry="12" fill="#8A9BA3"/>' +
    '<ellipse cx="80" cy="52" rx="30" ry="15" fill="#8A9BA3"/>' +
    '<ellipse cx="52" cy="54" rx="12" ry="10" fill="#97A8AF"/>' +
    '<ellipse cx="43" cy="58" rx="7" ry="5.5" fill="#A9B8BE"/>' +
    '<path d="M54 61c14 7 34 8 52 0" stroke="#A9B8BE" stroke-width="2" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="64" cy="65" rx="7" ry="3.5" transform="rotate(35 64 65)" fill="#7A8C94"/>' +
    '<circle cx="49" cy="51" r="1.4" fill="#12303A"/>' +
    '<circle cx="38" cy="46" r="2" fill="none" stroke="#FFFFFF" stroke-width="1.2"/><circle cx="35" cy="39" r="1.5" fill="none" stroke="#FFFFFF" stroke-width="1.2"/><circle cx="37" cy="32" r="1" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>',

  // A Florida bobcat walking beside a sandy trail
  trails:
    '<rect width="160" height="100" fill="#DDF4FA"/>' +
    '<path d="M0 30c10-14 26-16 36-6 10-12 26-12 34 0 10-10 24-10 32 0 10-12 28-12 36 0 10-8 18-8 22-4v14H0z" fill="#7FA82E"/>' +
    '<rect y="32" width="160" height="68" fill="#C4D150"/>' +
    '<path d="M112 100C102 82 126 68 108 52S88 38 94 32h10C100 38 118 46 122 54S116 80 132 100z" fill="#F2E3B3"/>' +
    '<path d="M106 80h3M114 66h2M102 46h2M120 90h3" stroke="#D9C48A" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M14 48l2-7 2 7M18 48l2-5 2 5" stroke="#9BBF3A" stroke-width="1.6" fill="none"/>' +
    '<path d="M22 92l2-7 2 7M26 92l2-5 2 5" stroke="#9BBF3A" stroke-width="1.6" fill="none"/>' +
    '<path d="M140 44l2-7 2 7M144 44l2-5 2 5" stroke="#9BBF3A" stroke-width="1.6" fill="none"/>' +
    '<path d="M146 84l2-7 2 7M150 84l2-5 2 5" stroke="#9BBF3A" stroke-width="1.6" fill="none"/>' +
    '<path d="M60 40l2-7 2 7M64 40l2-5 2 5" stroke="#9BBF3A" stroke-width="1.6" fill="none"/>' +
    '<path d="M84 92l2-7 2 7M88 92l2-5 2 5" stroke="#9BBF3A" stroke-width="1.6" fill="none"/>' +
    '<g transform="translate(10 62) scale(1.0)"><path d="M0 10L12.9 4.5" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L8.7 -1" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L3.1 -3.7" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L-3.2 -3.6" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L-8.8 -0.9" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L-12.7 4" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/></g>' +
    '<g transform="translate(150 58) scale(0.85)"><path d="M0 10L12.9 4.5" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L8.7 -1" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L3.1 -3.7" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L-3.2 -3.6" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L-8.8 -0.9" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/><path d="M0 10L-12.7 4" stroke="#5E8C2A" stroke-width="3" stroke-linecap="round"/></g>' +
    '<g transform="translate(2 0)">' +
    '<ellipse cx="66" cy="81" rx="30" ry="3" fill="#9BBF3A"/>' +
    '<path d="M50 64l-1 15M86 62l2 17" stroke="#9C6A42" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M44 55c-4-3-7-6-8-10" stroke="#C9955B" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M37.2 47.5c-.7-1.4-1.1-2.6-1.2-3.7" stroke="#2E2018" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M37 46c1.5-.5 3 .5 3 1.8" stroke="#F2E3B3" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
    '<path d="M42 58c0-8 10-12 24-12s20 2 24 6c3 4 2 10-2 13-6 4-14 5-24 5s-22-2-22-12z" fill="#C9955B"/>' +
    '<path d="M48 66c6 3 14 4 22 4s14-1 18-4c-5 1-12 2-20 2s-14-1-20-2z" fill="#EBD3A8"/>' +
    '<path d="M56 64l-2 15M80 64l1 15" stroke="#C9955B" stroke-width="5.5" stroke-linecap="round"/>' +
    '<ellipse cx="53.5" cy="80" rx="4" ry="1.8" fill="#B07A4F"/><ellipse cx="81.5" cy="80" rx="4" ry="1.8" fill="#B07A4F"/>' +
    '<ellipse cx="48" cy="80" rx="3.5" ry="1.6" fill="#9C6A42"/><ellipse cx="88.5" cy="80" rx="3.5" ry="1.6" fill="#9C6A42"/>' +
    '<circle cx="52" cy="54" r="1.6" fill="#7A5232"/>' +
    '<circle cx="58" cy="51" r="1.3" fill="#7A5232"/>' +
    '<circle cx="64" cy="55" r="1.7" fill="#7A5232"/>' +
    '<circle cx="70" cy="50" r="1.3" fill="#7A5232"/>' +
    '<circle cx="75" cy="55" r="1.5" fill="#7A5232"/>' +
    '<circle cx="81" cy="52" r="1.3" fill="#7A5232"/>' +
    '<circle cx="60" cy="60" r="1.3" fill="#7A5232"/>' +
    '<circle cx="68" cy="61" r="1.4" fill="#7A5232"/>' +
    '<circle cx="76" cy="60" r="1.2" fill="#7A5232"/>' +
    '<circle cx="50" cy="60" r="1.2" fill="#7A5232"/>' +
    '<path d="M53 70h5M54 74h4M79 70h5M79.5 74h4" stroke="#7A5232" stroke-width="1.3" stroke-linecap="round"/>' +
    '<path d="M82 50c4-4 8-6 11-6l3 12c-4 3-9 4-13 3z" fill="#C9955B"/>' +
    '<path d="M87.5 37.5l1.5-9 5 7.5z" fill="#C9955B"/><path d="M89 28.8l-.2-2.2" stroke="#2E2018" stroke-width="1.2" stroke-linecap="round"/><path d="M88.8 31l.7-2" stroke="#2E2018" stroke-width="1.6"/>' +
    '<circle cx="94" cy="45" r="9" fill="#C9955B"/>' +
    '<path d="M95 37.2l3.5-8.5 3 9z" fill="#C9955B"/><path d="M98.5 29l.2-2.2" stroke="#2E2018" stroke-width="1.2" stroke-linecap="round"/><path d="M98.7 31.2l.5-2" stroke="#2E2018" stroke-width="1.6"/>' +
    '<path d="M96.2 36.6l2.2-5 1.8 5.4z" fill="#EBD3A8"/>' +
    '<path d="M86 48c1 5 4 8 8 9 3 .5 5-.5 6-2l-2 4 -3-1 -2 3 -2-3 -3 1z" fill="#EBD3A8"/>' +
    '<path d="M88 51l3 1M88.5 54l3 .5" stroke="#7A5232" stroke-width="1" stroke-linecap="round"/>' +
    '<ellipse cx="100.5" cy="49" rx="5" ry="3.8" fill="#F2E3B3"/>' +
    '<path d="M103.5 46.6l2.2.4-1.6 1.8z" fill="#7A3F3F"/>' +
    '<path d="M100 51.5c1.2.8 2.6.8 3.6 0" stroke="#7A5232" stroke-width="0.8" fill="none" stroke-linecap="round"/>' +
    '<path d="M95.5 44.2c1.6-1.4 3.6-1.4 5 0-1.4 1.3-3.4 1.4-5 0z" fill="#C4D150" stroke="#2E2018" stroke-width="0.8"/>' +
    '<ellipse cx="98" cy="44.2" rx="0.6" ry="1.2" fill="#12303A"/>' +
    '<path d="M92 39.5l1.5 2.5M95 38.5l.6 2.6M91 45l2-.4" stroke="#7A5232" stroke-width="1" stroke-linecap="round"/>' +
    '</g>',

  // Canoe on a quiet river
  parks:
    '<rect width="160" height="100" fill="#DDF4FA"/>' +
    '<path d="M0 40c15-14 30-14 45-2 12-10 25-10 35 0 12-12 30-12 40 0 14-10 28-10 40 2v12H0z" fill="#7FA82E"/>' +
    '<path d="M0 46c20-6 40-6 60 0s50 6 100 0v6H0z" fill="#5E8C2A"/>' +
    '<rect y="50" width="160" height="50" fill="#127F8E"/>' +
    '<path d="M10 62h24M120 60h26M20 90h30M110 92h34" stroke="#6FD3EC" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M42 82c10 6 66 6 76 0" stroke="#0E6878" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>' +
    '<path d="M98 48l-16 34" stroke="#5B4632" stroke-width="2.5" stroke-linecap="round"/>' +
    '<ellipse cx="81" cy="84" rx="3" ry="6" transform="rotate(25 81 84)" fill="#5B4632"/>' +
    '<rect x="84" y="56" width="10" height="12" rx="3" fill="#EE8FA8"/>' +
    '<circle cx="89" cy="51" r="4.5" fill="#C68B59"/>' +
    '<path d="M83 48h12l-2-3h-8z" fill="#F5CF1E"/>' +
    '<path d="M42 66h76c-6 10-21 14-38 14s-32-4-38-14z" fill="#F5CF1E"/>' +
    '<path d="M42 66h76" stroke="#C99A00" stroke-width="2.4" stroke-linecap="round"/>',

  // Florida burrowing owl at its burrow
  wildlife:
    '<rect width="160" height="100" fill="#DDF4FA"/>' +
    '<circle cx="130" cy="20" r="10" fill="#F5CF1E"/>' +
    '<path d="M0 60c40-6 100-6 160 0v40H0z" fill="#C4D150"/>' +
    '<path d="M8 62l3-8 3 8M20 64l2-6 2 6M140 62l3-9 3 9M150 64l2-6 2 6" stroke="#9BBF3A" stroke-width="2" fill="none"/>' +
    '<ellipse cx="82" cy="84" rx="44" ry="11" fill="#E8C98F"/>' +
    '<ellipse cx="108" cy="82" rx="9" ry="4.5" fill="#5B4632"/>' +
    '<path d="M71 72v10M81 72v10" stroke="#8A6A4A" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M67 82h8M77 82h8" stroke="#8A6A4A" stroke-width="2" stroke-linecap="round"/>' +
    '<ellipse cx="76" cy="57" rx="13" ry="16" fill="#A0784F"/>' +
    '<ellipse cx="76" cy="61" rx="8.5" ry="11.5" fill="#F2E3B3"/>' +
    '<path d="M71 56h4M78 58h4M71 62h4M78 64h4M72 68h3M78 69h3" stroke="#B08A5E" stroke-width="1.6" stroke-linecap="round"/>' +
    '<circle cx="65.5" cy="52" r="1.3" fill="#F2E3B3"/><circle cx="66" cy="58" r="1.3" fill="#F2E3B3"/><circle cx="86.5" cy="53" r="1.3" fill="#F2E3B3"/><circle cx="86" cy="59" r="1.3" fill="#F2E3B3"/>' +
    '<circle cx="76" cy="38" r="12" fill="#A0784F"/>' +
    '<circle cx="70" cy="30" r="1.1" fill="#F2E3B3"/><circle cx="76" cy="28" r="1.1" fill="#F2E3B3"/><circle cx="82" cy="30" r="1.1" fill="#F2E3B3"/>' +
    '<ellipse cx="76" cy="40" rx="9.5" ry="7.5" fill="#D9B98A"/>' +
    '<path d="M67.5 35.5c2.5-2 6-2 7.5 0M77 35.5c1.5-2 5-2 7.5 0" stroke="#FFFFFF" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<circle cx="71.6" cy="39.5" r="3.6" fill="#F5CF1E"/><circle cx="80.4" cy="39.5" r="3.6" fill="#F5CF1E"/>' +
    '<circle cx="71.8" cy="39.5" r="1.7" fill="#12303A"/><circle cx="80.2" cy="39.5" r="1.7" fill="#12303A"/>' +
    '<path d="M74.6 43h2.8L76 46z" fill="#6B5300"/>' +
    '<path d="M70 47c4 2 8 2 12 0" stroke="#FFFFFF" stroke-width="1.6" fill="none" stroke-linecap="round"/>',

  // Pastel cottages along a street by the lake
  towns:
    '<rect width="160" height="100" fill="#FFF5C7"/>' +
    '<circle cx="136" cy="16" r="9" fill="#F5CF1E"/>' +
    '<path d="M0 36c12-6 22-6 30-1 10-6 22-6 32 0 12-5 24-5 34 0 12-6 26-6 36 0 10-4 20-4 28 0v4H0z" fill="#7FA82E"/>' +
    '<rect y="38" width="160" height="24" fill="#0E8A93"/>' +
    '<path d="M8 46h14M128 44h18M10 54h10M136 54h12" stroke="#6FD3EC" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M16 48l6-10v10zM12 49h13l-2 3h-9z" fill="#FFFFFF"/>' +
    '<rect y="60" width="160" height="10" fill="#C4D150"/>' +
    '<rect x="42" y="50" width="22" height="18" fill="#EE8FA8"/><path d="M39 51l14-11 14 11z" fill="#9AA5A8"/>' +
    '<rect x="50" y="58" width="6" height="10" fill="#FFFFFF"/><rect x="44.5" y="53" width="4" height="4" fill="#DDF4FA"/><rect x="57.5" y="53" width="4" height="4" fill="#DDF4FA"/>' +
    '<rect x="69" y="48" width="22" height="20" fill="#F5CF1E"/><path d="M66 49l14-12 14 12z" fill="#9AA5A8"/>' +
    '<rect x="77" y="58" width="6" height="10" fill="#127F8E"/><rect x="71.5" y="52" width="4" height="4" fill="#DDF4FA"/><rect x="84.5" y="52" width="4" height="4" fill="#DDF4FA"/>' +
    '<rect x="96" y="50" width="22" height="18" fill="#8ED8D0"/><path d="M93 51l14-11 14 11z" fill="#9AA5A8"/>' +
    '<rect x="104" y="58" width="6" height="10" fill="#EE8FA8"/><rect x="98.5" y="53" width="4" height="4" fill="#FFFFFF"/><rect x="111.5" y="53" width="4" height="4" fill="#FFFFFF"/>' +
    '<rect y="68" width="160" height="3" fill="#E4E2D4"/>' +
    '<rect y="71" width="160" height="17" fill="#9AA5A8"/>' +
    '<path d="M4 79.5h12M28 79.5h12M52 79.5h12M76 79.5h12M100 79.5h12M124 79.5h12M148 79.5h12" stroke="#F5CF1E" stroke-width="1.8"/>' +
    '<rect y="88" width="160" height="12" fill="#C4D150"/>' +
    '<path d="M140 92V60" stroke="#5B4632" stroke-width="2.5"/>' +
    '<path d="M140 60c-7-3-13 0-16 5M140 60c-2-6-8-9-13-8M140 60c5-5 11-6 16-2M140 60c6 0 10 4 12 8" stroke="#7FA82E" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M24 92V62M24 62h6" stroke="#12303A" stroke-width="1.8" fill="none"/><circle cx="31" cy="63.5" r="2" fill="#F5CF1E"/>',

  // A glass of orange drink and fresh oranges on a table at sunset
  food:
    '<rect width="160" height="100" fill="#F6A08A"/>' +
    '<rect y="30" width="160" height="26" fill="#F7C46C"/>' +
    '<circle cx="132" cy="56" r="14" fill="#FFE38A"/>' +
    '<rect y="56" width="160" height="13" fill="#D9707A"/>' +
    '<path d="M120 60h24M126 64h12" stroke="#FFE38A" stroke-width="1.8" stroke-linecap="round"/>' +
    '<rect y="69" width="160" height="31" fill="#B07A4F"/>' +
    '<path d="M0 78h160M0 88h160" stroke="#9C6A42" stroke-width="1.4"/>' +
    '<ellipse cx="66" cy="71" rx="15" ry="2.5" fill="#8A5A3C" opacity="0.5"/>' +
    '<path d="M62 60L56 22" stroke="#127F8E" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M53 32h26l-3 38H56z" fill="#FFFFFF" opacity="0.55"/>' +
    '<path d="M54.4 42h23.2l-2.3 27H56.7z" fill="#F59E2B"/>' +
    '<rect x="59" y="45" width="6" height="6" rx="1.5" fill="#FFD9A0"/><rect x="67" y="48" width="6" height="6" rx="1.5" fill="#FFD9A0"/>' +
    '<path d="M53 32h26" stroke="#FFFFFF" stroke-width="1.6"/>' +
    '<circle cx="79" cy="34" r="7" fill="#F59E2B"/><circle cx="79" cy="34" r="5.4" fill="#FFC864"/>' +
    '<path d="M79 29v10M74 34h10M75.5 30.5l7 7M82.5 30.5l-7 7" stroke="#F59E2B" stroke-width="0.8"/>' +
    '<ellipse cx="104" cy="71" rx="10" ry="2" fill="#8A5A3C" opacity="0.5"/>' +
    '<circle cx="104" cy="61" r="10" fill="#F59E2B"/><circle cx="100.5" cy="57.5" r="2.2" fill="#FFC864" opacity="0.7"/>' +
    '<path d="M104 51c3-5 9-6 11-4-3 4-7 5-11 4z" fill="#7FA82E"/>' +
    '<path d="M114 70a10 10 0 0 1 20 0z" fill="#F59E2B"/><path d="M115.8 70a8.2 8.2 0 0 1 16.4 0z" fill="#FFC864"/>' +
    '<path d="M124 70v-7M124 70l-5-5M124 70l5-5" stroke="#F59E2B" stroke-width="0.8"/>'
};
function placeArt(p, w, h) {
  return '<svg width="100%" height="' + h + '" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + SCENES[p.cat] + '</svg>';
}

/* =========================================================
   Home hero: one scene per region (350×150)
   ========================================================= */
var HEROES = {
  // South Florida: looking out from a waterfront café pier, with lime umbrellas, colorful stools and the sea
  south:
    '<rect width="350" height="150" fill="#8ED8D0"/>' +
    '<rect y="54" width="350" height="22" fill="#BFEBE5"/>' +
    '<circle cx="292" cy="34" r="26" fill="#F5CF1E" opacity="0.25"/><circle cx="292" cy="34" r="17" fill="#F5CF1E"/>' +
    '<path d="M226 76c10-6 22-7 34-4 8-4 18-4 26 0 10-3 20-2 28 4z" fill="#7FA82E"/>' +
    '<path d="M236 74v-6h6v6M250 72v-9h5v9M268 73v-5h7v5" fill="#FBFAF4"/>' +
    '<rect y="76" width="350" height="40" fill="#0E8A93"/>' +
    '<path d="M20 86c10-4 20-4 30 0M120 92c10-4 20-4 30 0M200 84c10-4 20-4 30 0M280 94c10-4 20-4 30 0M60 102c10-4 20-4 30 0" stroke="#6FD3EC" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M282 80h22M286 86h14" stroke="#F5CF1E" stroke-width="2" stroke-linecap="round" opacity="0.7"/>' +
    '<rect y="96" width="350" height="4" fill="#B07A4F"/>' +
    '<rect x="6" y="100" width="3" height="12" fill="#B07A4F"/><rect x="22" y="100" width="3" height="12" fill="#B07A4F"/><rect x="38" y="100" width="3" height="12" fill="#B07A4F"/><rect x="54" y="100" width="3" height="12" fill="#B07A4F"/><rect x="70" y="100" width="3" height="12" fill="#B07A4F"/><rect x="86" y="100" width="3" height="12" fill="#B07A4F"/><rect x="102" y="100" width="3" height="12" fill="#B07A4F"/><rect x="118" y="100" width="3" height="12" fill="#B07A4F"/><rect x="134" y="100" width="3" height="12" fill="#B07A4F"/><rect x="150" y="100" width="3" height="12" fill="#B07A4F"/><rect x="166" y="100" width="3" height="12" fill="#B07A4F"/><rect x="182" y="100" width="3" height="12" fill="#B07A4F"/><rect x="198" y="100" width="3" height="12" fill="#B07A4F"/><rect x="214" y="100" width="3" height="12" fill="#B07A4F"/><rect x="230" y="100" width="3" height="12" fill="#B07A4F"/><rect x="246" y="100" width="3" height="12" fill="#B07A4F"/><rect x="262" y="100" width="3" height="12" fill="#B07A4F"/><rect x="278" y="100" width="3" height="12" fill="#B07A4F"/><rect x="294" y="100" width="3" height="12" fill="#B07A4F"/><rect x="310" y="100" width="3" height="12" fill="#B07A4F"/><rect x="326" y="100" width="3" height="12" fill="#B07A4F"/><rect x="342" y="100" width="3" height="12" fill="#B07A4F"/>' +
    '<rect y="110" width="350" height="3" fill="#9C6A42"/>' +
    '<rect y="112" width="350" height="38" fill="#E8C98F"/>' +
    '<path d="M-200 150L-31.3 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M-166 150L-12.6 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M-132 150L6.1 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M-98 150L24.8 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M-64 150L43.5 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M-30 150L62.2 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M4 150L80.9 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M38 150L99.6 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M72 150L118.3 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M106 150L137.1 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M140 150L155.8 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M174 150L174.4 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M208 150L193.2 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M242 150L211.8 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M276 150L230.6 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M310 150L249.2 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M344 150L267.9 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M378 150L286.6 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M412 150L305.4 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M446 150L324.1 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M480 150L342.8 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M514 150L361.5 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M548 150L380.1 112" stroke="#D2AE6E" stroke-width="1.6"/>' +
    '<path d="M0 124h350M0 138h350" stroke="#D9B97C" stroke-width="1"/>' +
    '<path d="M84 52V118" stroke="#5B4632" stroke-width="3"/>' +
    '<path d="M32 72Q84 44 136 72q-8.7 6 -17.3 0q-8.7 6 -17.3 0q-8.7 6 -17.3 0q-8.7 6 -17.3 0q-8.7 6 -17.3 0q-8.7 6 -17.3 0z" fill="#C4D150"/>' +
    '<path d="M58 72Q84 52 110 72" stroke="#9BAA2C" stroke-width="1.6" fill="none"/>' +
    '<circle cx="84" cy="49" r="2.5" fill="#9BAA2C"/>' +
    '<path d="M222 64V120" stroke="#5B4632" stroke-width="3"/>' +
    '<path d="M180 84Q222 56 264 84q-7 6 -14 0q-7 6 -14 0q-7 6 -14 0q-7 6 -14 0q-7 6 -14 0q-7 6 -14 0z" fill="#C4D150"/>' +
    '<path d="M201 84Q222 64 243 84" stroke="#9BAA2C" stroke-width="1.6" fill="none"/>' +
    '<circle cx="222" cy="61" r="2.5" fill="#9BAA2C"/>' +
    '<path d="M84 118v22M75 140h18" stroke="#12303A" stroke-width="2.5" opacity="0.7"/>' +
    '<ellipse cx="84" cy="118" rx="22" ry="5" fill="#6FD3EC"/>' +
    '<path d="M222 121v22M213 143h18" stroke="#12303A" stroke-width="2.5" opacity="0.7"/>' +
    '<ellipse cx="222" cy="121" rx="22" ry="5" fill="#F5CF1E"/>' +
    '<path d="M43 126l-2 20M53 126l2 20M42 138h12" stroke="#EE8FA8" stroke-width="2.4"/>' +
    '<ellipse cx="48" cy="126" rx="9" ry="3.2" fill="#EE8FA8"/>' +
    '<path d="M117 126l-2 20M127 126l2 20M116 138h12" stroke="#F5CF1E" stroke-width="2.4"/>' +
    '<ellipse cx="122" cy="126" rx="9" ry="3.2" fill="#F5CF1E"/>' +
    '<path d="M183.2 128l-1.9 19M192.8 128l1.9 19M182.3 139.4h11.4" stroke="#6FD3EC" stroke-width="2.3"/>' +
    '<ellipse cx="188" cy="128" rx="8.5" ry="3" fill="#6FD3EC"/>' +
    '<path d="M253.2 128l-1.9 19M262.8 128l1.9 19M252.3 139.4h11.4" stroke="#EE8FA8" stroke-width="2.3"/>' +
    '<ellipse cx="258" cy="128" rx="8.5" ry="3" fill="#EE8FA8"/>' +
    '<path d="M338 150C336 118 334 92 322 66" stroke="#5B4632" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    '<path d="M322 66c-14-6-28-2-36 8M322 66c-4-12-16-20-28-18M322 66c10-10 26-12 36-4M322 66c14 0 24 8 28 18" stroke="#7FA82E" stroke-width="6" fill="none" stroke-linecap="round"/>',

  // Central Florida: an orange grove on a lake, with a rocket launching from the Space Coast
  central:
    '<rect width="350" height="150" fill="#DDF4FA"/>' +
    '<rect y="58" width="350" height="26" fill="#FFF5C7" opacity="0.75"/>' +
    '<path d="M294 84V50h7v34M294 58h7M294 66h7M294 74h7M294 50l3.5-5 3.5 5" stroke="#4C646B" stroke-width="1.6" fill="none"/>' +
    '<path d="M272 82C272 66 273 54 275 44" stroke="#FFFFFF" stroke-width="11" fill="none" stroke-linecap="round"/>' +
    '<circle cx="254" cy="80" r="10" fill="#FFFFFF"/>' +
    '<circle cx="266" cy="75" r="13" fill="#FFFFFF"/>' +
    '<circle cx="281" cy="77" r="12" fill="#FFFFFF"/>' +
    '<circle cx="294" cy="81" r="9" fill="#FFFFFF"/>' +
    '<circle cx="244" cy="83" r="7" fill="#FFFFFF"/>' +
    '<g transform="rotate(6 276 26)"><path d="M270 40q6 14 12 0z" fill="#F5CF1E"/><path d="M272.5 40q3.5 8 7 0z" fill="#F59E2B"/><rect x="270" y="12" width="12" height="29" rx="4" fill="#FFFFFF" stroke="#12303A" stroke-width="1.2"/><path d="M270 14q6-16 12 0z" fill="#EE8FA8" stroke="#12303A" stroke-width="1.2"/><circle cx="276" cy="21" r="2.4" fill="#6FD3EC" stroke="#12303A" stroke-width="1"/><path d="M270 32l-6 9h6zM282 32l6 9h-6z" fill="#EE8FA8" stroke="#12303A" stroke-width="1"/></g>' +
    '<path d="M150 84c50-4 130-4 200-2v4H150z" fill="#7FA82E"/>' +
    '<rect y="85" width="350" height="65" fill="#0E8A93"/>' +
    '<path d="M266 92h18M268 99h14M270 106h10" stroke="#FFFFFF" stroke-width="2.2" opacity="0.55" stroke-linecap="round"/>' +
    '<path d="M214 118c10-4 20-4 30 0M300 128c10-4 20-4 30 0M236 140c10-4 20-4 30 0" stroke="#6FD3EC" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M0 72c70-8 140-4 196 14 26 8 40 30 44 64H0z" fill="#C4D150"/>' +
    '<path d="M0 94c60-6 120-2 186 14M0 122c60-6 124-2 200 16" stroke="#9BBF3A" stroke-width="3" fill="none"/>' +
    '<path d="M18 84.6v7.7" stroke="#5B4632" stroke-width="2.4"/>' +
    '<circle cx="18" cy="78" r="11" fill="#7FA82E"/>' +
    '<circle cx="15.2" cy="74.7" r="6.1" fill="#9BBF3A"/>' +
    '<circle cx="13.1" cy="79.1" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="21.9" cy="75.2" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="19.6" cy="83" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="24.1" cy="80.8" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="16.9" cy="72.5" r="2.2" fill="#F59E2B"/>' +
    '<path d="M54 82.6v7.7" stroke="#5B4632" stroke-width="2.4"/>' +
    '<circle cx="54" cy="76" r="11" fill="#7FA82E"/>' +
    '<circle cx="51.2" cy="72.7" r="6.1" fill="#9BBF3A"/>' +
    '<circle cx="49" cy="77.1" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="57.9" cy="73.2" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="55.6" cy="81" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="60" cy="78.8" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="52.9" cy="70.5" r="2.2" fill="#F59E2B"/>' +
    '<path d="M90 84.6v7.7" stroke="#5B4632" stroke-width="2.4"/>' +
    '<circle cx="90" cy="78" r="11" fill="#7FA82E"/>' +
    '<circle cx="87.2" cy="74.7" r="6.1" fill="#9BBF3A"/>' +
    '<circle cx="85" cy="79.1" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="93.8" cy="75.2" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="91.7" cy="83" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="96" cy="80.8" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="88.9" cy="72.5" r="2.2" fill="#F59E2B"/>' +
    '<path d="M126 88.6v7.7" stroke="#5B4632" stroke-width="2.4"/>' +
    '<circle cx="126" cy="82" r="11" fill="#7FA82E"/>' +
    '<circle cx="123.2" cy="78.7" r="6.1" fill="#9BBF3A"/>' +
    '<circle cx="121" cy="83.1" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="129.8" cy="79.2" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="127.7" cy="87" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="132.1" cy="84.8" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="124.9" cy="76.5" r="2.2" fill="#F59E2B"/>' +
    '<path d="M160 94.6v7.7" stroke="#5B4632" stroke-width="2.4"/>' +
    '<circle cx="160" cy="88" r="11" fill="#7FA82E"/>' +
    '<circle cx="157.2" cy="84.7" r="6.1" fill="#9BBF3A"/>' +
    '<circle cx="155.1" cy="89.1" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="163.8" cy="85.2" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="161.7" cy="93" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="166.1" cy="90.8" r="2.2" fill="#F59E2B"/>' +
    '<circle cx="158.9" cy="82.5" r="2.2" fill="#F59E2B"/>' +
    '<path d="M10 116.2v11.9" stroke="#5B4632" stroke-width="3.7"/>' +
    '<circle cx="10" cy="106" r="17" fill="#5E8C2A"/>' +
    '<circle cx="5.8" cy="100.9" r="9.4" fill="#7FA82E"/>' +
    '<circle cx="2.3" cy="107.7" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="15.9" cy="101.8" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="12.6" cy="113.7" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="19.4" cy="110.2" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="8.3" cy="97.5" r="3.2" fill="#F59E2B"/>' +
    '<path d="M58 114.2v11.9" stroke="#5B4632" stroke-width="3.7"/>' +
    '<circle cx="58" cy="104" r="17" fill="#5E8C2A"/>' +
    '<circle cx="53.8" cy="98.9" r="9.4" fill="#7FA82E"/>' +
    '<circle cx="50.4" cy="105.7" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="64" cy="99.8" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="60.5" cy="111.7" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="67.3" cy="108.2" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="56.3" cy="95.5" r="3.2" fill="#F59E2B"/>' +
    '<path d="M106 118.2v11.9" stroke="#5B4632" stroke-width="3.7"/>' +
    '<circle cx="106" cy="108" r="17" fill="#5E8C2A"/>' +
    '<circle cx="101.8" cy="102.9" r="9.4" fill="#7FA82E"/>' +
    '<circle cx="98.3" cy="109.7" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="112" cy="103.8" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="108.5" cy="115.7" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="115.3" cy="112.2" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="104.3" cy="99.5" r="3.2" fill="#F59E2B"/>' +
    '<path d="M154 126.2v11.9" stroke="#5B4632" stroke-width="3.7"/>' +
    '<circle cx="154" cy="116" r="17" fill="#5E8C2A"/>' +
    '<circle cx="149.8" cy="110.9" r="9.4" fill="#7FA82E"/>' +
    '<circle cx="146.3" cy="117.7" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="159.9" cy="111.8" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="156.6" cy="123.7" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="163.3" cy="120.2" r="3.2" fill="#F59E2B"/>' +
    '<circle cx="152.3" cy="107.5" r="3.2" fill="#F59E2B"/>',

  // Tampa Bay: a cable-stayed bridge across the bay at sunset
  tampa:
    '<rect width="350" height="150" fill="#FFE3A3"/>' +
    '<rect y="56" width="350" height="40" fill="#F6B08A"/>' +
    '<circle cx="292" cy="94" r="24" fill="#F5CF1E"/>' +
    '<rect y="94" width="350" height="56" fill="#127F8E"/>' +
    '<path d="M272 104h40M280 114h24M286 124h12" stroke="#F5CF1E" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M0 110C80 108 130 86 175 84s95 24 175 26" stroke="#12303A" stroke-width="4" fill="none"/>' +
    '<path d="M20 110v40M60 107v43M100 100v50M250 100v50M290 107v43M330 110v40" stroke="#12303A" stroke-width="3" opacity="0.5"/>' +
    '<rect x="138" y="34" width="7" height="116" fill="#E1E5DA"/><rect x="205" y="34" width="7" height="116" fill="#E1E5DA"/>' +
    '<g stroke="#F5CF1E" stroke-width="1.6">' +
    '<path d="M141 38L96 99M141 38L108 95M141 38L120 91M141 38L132 88M141 38L152 86M141 38L162 85M141 38L172 84"/>' +
    '<path d="M208 38L178 84M208 38L188 85M208 38L198 86M208 38L218 88M208 38L230 91M208 38L242 95M208 38L254 99"/></g>' +
    '<path d="M48 136l10-18v18zM44 138h18l-3 4H47z" fill="#FFFFFF"/>',

  // North Florida: a live oak draped in Spanish moss, a dirt road with a split-rail fence, pines and azaleas
  north:
    '<rect width="350" height="150" fill="#FFF5C7"/>' +
    '<circle cx="306" cy="30" r="15" fill="#F5CF1E" opacity="0.9"/>' +
    '<path d="M186 86l6-18 6 18z" fill="#5E8C2A"/>' +
    '<path d="M199 86l6-25 6 25z" fill="#7FA82E"/>' +
    '<path d="M212 86l6-21 6 21z" fill="#5E8C2A"/>' +
    '<path d="M225 86l6-28 6 28z" fill="#7FA82E"/>' +
    '<path d="M238 86l6-24 6 24z" fill="#5E8C2A"/>' +
    '<path d="M251 86l6-20 6 20z" fill="#7FA82E"/>' +
    '<path d="M264 86l6-27 6 27z" fill="#5E8C2A"/>' +
    '<path d="M277 86l6-23 6 23z" fill="#7FA82E"/>' +
    '<path d="M290 86l6-19 6 19z" fill="#5E8C2A"/>' +
    '<path d="M303 86l6-26 6 26z" fill="#7FA82E"/>' +
    '<path d="M316 86l6-22 6 22z" fill="#5E8C2A"/>' +
    '<path d="M329 86l6-18 6 18z" fill="#7FA82E"/>' +
    '<path d="M342 86l6-25 6 25z" fill="#5E8C2A"/>' +
    '<path d="M0 84c90-6 190-8 350-4v70H0z" fill="#C4D150"/>' +
    '<path d="M0 100c90-6 200-6 350 0" stroke="#B3C24A" stroke-width="6" fill="none"/>' +
    '<path d="M138 150C168 122 220 100 250 84h6C240 102 218 126 228 150z" fill="#E8C98F"/>' +
    '<path d="M188 132c8-10 20-20 34-28" stroke="#D2AE6E" stroke-width="2" fill="none" stroke-dasharray="4 6"/>' +
    '<path d="M244 140v-22" stroke="#8A6A4A" stroke-width="3.1"/>' +
    '<path d="M262 122v-16" stroke="#8A6A4A" stroke-width="2.3"/>' +
    '<path d="M276 109v-12" stroke="#8A6A4A" stroke-width="1.7"/>' +
    '<path d="M287 99v-9" stroke="#8A6A4A" stroke-width="1.3"/>' +
    '<path d="M295 92v-7" stroke="#8A6A4A" stroke-width="1.2"/>' +
    '<path d="M301 87v-5" stroke="#8A6A4A" stroke-width="1.2"/>' +
    '<polyline points="244 132.3 262 116.4 276 104.8 287 95.8 295 89.5 301 85.2" stroke="#8A6A4A" stroke-width="1.8" fill="none"/>' +
    '<polyline points="244 124.6 262 110.8 276 100.6 287 92.7 295 87.1 301 83.5" stroke="#8A6A4A" stroke-width="1.8" fill="none"/>' +
    '<path d="M66 150c6-24 4-46-6-62" stroke="#5B4632" stroke-width="15" fill="none" stroke-linecap="round"/>' +
    '<path d="M60 92c-16-10-38-12-60-4M62 88c20-16 52-22 90-12M64 100c18-4 38-2 56 8" stroke="#5B4632" stroke-width="6" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="8" cy="60" rx="34" ry="15" fill="#5E8C2A"/>' +
    '<ellipse cx="48" cy="46" rx="40" ry="18" fill="#5E8C2A"/>' +
    '<ellipse cx="98" cy="42" rx="42" ry="17" fill="#5E8C2A"/>' +
    '<ellipse cx="140" cy="56" rx="32" ry="14" fill="#5E8C2A"/>' +
    '<ellipse cx="26" cy="74" rx="30" ry="11" fill="#5E8C2A"/>' +
    '<ellipse cx="84" cy="66" rx="36" ry="12" fill="#5E8C2A"/>' +
    '<ellipse cx="126" cy="74" rx="24" ry="9" fill="#5E8C2A"/>' +
    '<ellipse cx="42" cy="40" rx="24" ry="9" fill="#7FA82E"/>' +
    '<ellipse cx="94" cy="36" rx="26" ry="9" fill="#7FA82E"/>' +
    '<ellipse cx="140" cy="50" rx="16" ry="6" fill="#7FA82E"/>' +
    '<ellipse cx="8" cy="54" rx="18" ry="7" fill="#7FA82E"/>' +
    '<path d="M9.5 70c-2 3.9 2 6.8 0 9.8s2 5.8 -0.5 9.8" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M12 70c-2 5.2 2 9.1 0 13s2 7.8 -0.5 13" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M14.5 70c-2 4.4 2 7.7 0 11s2 6.6 -0.5 11" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M13.2 70c-2 3.1 2 5.5 0 7.8s2 4.7 -0.5 7.8" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<path d="M31.5 80c-2 4.5 2 7.9 0 11.2s2 6.8 -0.5 11.2" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M34 80c-2 6 2 10.5 0 15s2 9 -0.5 15" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M36.5 80c-2 5.1 2 8.9 0 12.8s2 7.6 -0.5 12.8" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M35.2 80c-2 3.6 2 6.3 0 9s2 5.4 -0.5 9" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<path d="M55.5 60c-2 3.3 2 5.8 0 8.2s2 5 -0.5 8.2" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M58 60c-2 4.4 2 7.7 0 11s2 6.6 -0.5 11" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M60.5 60c-2 3.7 2 6.5 0 9.3s2 5.6 -0.5 9.3" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M59.2 60c-2 2.6 2 4.6 0 6.6s2 4 -0.5 6.6" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<path d="M69.5 76c-2 5.1 2 8.9 0 12.8s2 7.6 -0.5 12.8" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M72 76c-2 6.8 2 11.9 0 17s2 10.2 -0.5 17" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M74.5 76c-2 5.8 2 10.1 0 14.4s2 8.7 -0.5 14.4" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M73.2 76c-2 4.1 2 7.1 0 10.2s2 6.1 -0.5 10.2" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<path d="M97.5 72c-2 4.2 2 7.3 0 10.5s2 6.3 -0.5 10.5" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M100 72c-2 5.6 2 9.8 0 14s2 8.4 -0.5 14" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M102.5 72c-2 4.8 2 8.3 0 11.9s2 7.1 -0.5 11.9" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M101.2 72c-2 3.4 2 5.9 0 8.4s2 5 -0.5 8.4" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<path d="M115.5 62c-2 2.7 2 4.7 0 6.8s2 4 -0.5 6.8" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M118 62c-2 3.6 2 6.3 0 9s2 5.4 -0.5 9" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M120.5 62c-2 3.1 2 5.4 0 7.6s2 4.6 -0.5 7.6" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M119.2 62c-2 2.2 2 3.8 0 5.4s2 3.2 -0.5 5.4" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<path d="M127.5 80c-2 3.6 2 6.3 0 9s2 5.4 -0.5 9" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M130 80c-2 4.8 2 8.4 0 12s2 7.2 -0.5 12" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M132.5 80c-2 4.1 2 7.1 0 10.2s2 6.1 -0.5 10.2" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M131.2 80c-2 2.9 2 5 0 7.2s2 4.3 -0.5 7.2" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<path d="M147.5 66c-2 3 2 5.2 0 7.5s2 4.5 -0.5 7.5" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M150 66c-2 4 2 7 0 10s2 6 -0.5 10" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M152.5 66c-2 3.4 2 5.9 0 8.5s2 5.1 -0.5 8.5" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M151.2 66c-2 2.4 2 4.2 0 6s2 3.6 -0.5 6" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<path d="M1.5 62c-2 2.7 2 4.7 0 6.8s2 4 -0.5 6.8" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M4 62c-2 3.6 2 6.3 0 9s2 5.4 -0.5 9" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M6.5 62c-2 3.1 2 5.4 0 7.6s2 4.6 -0.5 7.6" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M5.2 62c-2 2.2 2 3.8 0 5.4s2 3.2 -0.5 5.4" stroke="#B9C4B5" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<circle cx="296" cy="128" r="12" fill="#EE8FA8"/>' +
    '<circle cx="314" cy="124" r="13" fill="#EE8FA8"/>' +
    '<circle cx="334" cy="128" r="12" fill="#EE8FA8"/>' +
    '<circle cx="350" cy="124" r="10" fill="#EE8FA8"/>' +
    '<circle cx="286" cy="140" r="10" fill="#EE8FA8"/>' +
    '<circle cx="322" cy="140" r="12" fill="#EE8FA8"/>' +
    '<circle cx="292" cy="124" r="2.2" fill="#FDE6EC"/>' +
    '<circle cx="312" cy="119" r="2.2" fill="#FDE6EC"/>' +
    '<circle cx="333" cy="124" r="2.2" fill="#FDE6EC"/>' +
    '<circle cx="318" cy="136" r="2.2" fill="#FDE6EC"/>' +
    '<circle cx="298" cy="134" r="2.2" fill="#FDE6EC"/>',

  // Panhandle: emerald Gulf water, sugar-white dunes with sea oats and a black-and-white lighthouse
  panhandle:
    '<rect width="350" height="150" fill="#DDF4FA"/>' +
    '<circle cx="236" cy="32" r="15" fill="#F5CF1E"/>' +
    '<path d="M150 56q4-4 8 0q4-4 8 0M172 50q3-3 6 0q3-3 6 0" stroke="#4C646B" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<rect y="64" width="350" height="16" fill="#1E9C86"/>' +
    '<rect y="80" width="350" height="12" fill="#3CBFA8"/>' +
    '<rect y="92" width="350" height="8" fill="#8EE0CF"/>' +
    '<path d="M0 99c18-3 36-3 54 0s36 3 54 0 36-3 54 0 36 3 54 0 36-3 54 0 36 3 54 0 18-2 26 0" stroke="#FFFFFF" stroke-width="3" fill="none"/>' +
    '<path d="M0 104c50-4 120-4 190-2s120 2 160 0v46H0z" fill="#FBF9F2"/>' +
    '<path d="M0 112c30-22 80-26 120-12 22 8 34 22 40 50H0z" fill="#FFFFFF"/>' +
    '<path d="M0 132c40-14 90-14 140-2 10 3 16 10 18 20H0z" fill="#EFE6CF"/>' +
    '<path d="M250 150c10-30 40-50 100-56v56z" fill="#EFE6CF"/>' +
    '<path d="M26 112q-1.2 -18 -6 -30" stroke="#B89650" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="20" cy="82" rx="1.6" ry="4" transform="rotate(-25 20 82)" fill="#C9A55A"/>' +
    '<ellipse cx="17.3" cy="86" rx="1.6" ry="4" transform="rotate(-25 17.3 86)" fill="#C9A55A"/>' +
    '<ellipse cx="14.6" cy="90" rx="1.6" ry="4" transform="rotate(-25 14.6 90)" fill="#C9A55A"/>' +
    '<ellipse cx="11.8" cy="94" rx="1.6" ry="4" transform="rotate(-25 11.8 94)" fill="#C9A55A"/>' +
    '<path d="M34 114q0.8 -21.6 4 -36" stroke="#B89650" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="38" cy="78" rx="1.6" ry="4" transform="rotate(25 38 78)" fill="#C9A55A"/>' +
    '<ellipse cx="40.5" cy="82" rx="1.6" ry="4" transform="rotate(25 40.5 82)" fill="#C9A55A"/>' +
    '<ellipse cx="43" cy="86" rx="1.6" ry="4" transform="rotate(25 43 86)" fill="#C9A55A"/>' +
    '<ellipse cx="45.4" cy="90" rx="1.6" ry="4" transform="rotate(25 45.4 90)" fill="#C9A55A"/>' +
    '<path d="M44 112q1.6 -16.8 8 -28" stroke="#B89650" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="52" cy="84" rx="1.6" ry="4" transform="rotate(25 52 84)" fill="#C9A55A"/>' +
    '<ellipse cx="55" cy="88" rx="1.6" ry="4" transform="rotate(25 55 88)" fill="#C9A55A"/>' +
    '<ellipse cx="57.9" cy="92" rx="1.6" ry="4" transform="rotate(25 57.9 92)" fill="#C9A55A"/>' +
    '<ellipse cx="60.9" cy="96" rx="1.6" ry="4" transform="rotate(25 60.9 96)" fill="#C9A55A"/>' +
    '<path d="M54 116q-0.8 -14.4 -4 -24" stroke="#B89650" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="50" cy="92" rx="1.6" ry="4" transform="rotate(-25 50 92)" fill="#C9A55A"/>' +
    '<ellipse cx="47.5" cy="96" rx="1.6" ry="4" transform="rotate(-25 47.5 96)" fill="#C9A55A"/>' +
    '<ellipse cx="45" cy="100" rx="1.6" ry="4" transform="rotate(-25 45 100)" fill="#C9A55A"/>' +
    '<ellipse cx="42.6" cy="104" rx="1.6" ry="4" transform="rotate(-25 42.6 104)" fill="#C9A55A"/>' +
    '<path d="M108 108q1.2 -18 6 -30" stroke="#B89650" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="114" cy="78" rx="1.6" ry="4" transform="rotate(25 114 78)" fill="#C9A55A"/>' +
    '<ellipse cx="116.7" cy="82" rx="1.6" ry="4" transform="rotate(25 116.7 82)" fill="#C9A55A"/>' +
    '<ellipse cx="119.4" cy="86" rx="1.6" ry="4" transform="rotate(25 119.4 86)" fill="#C9A55A"/>' +
    '<ellipse cx="122.2" cy="90" rx="1.6" ry="4" transform="rotate(25 122.2 90)" fill="#C9A55A"/>' +
    '<path d="M118 110q-1 -14.4 -5 -24" stroke="#B89650" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="113" cy="86" rx="1.6" ry="4" transform="rotate(-25 113 86)" fill="#C9A55A"/>' +
    '<ellipse cx="110.4" cy="90" rx="1.6" ry="4" transform="rotate(-25 110.4 90)" fill="#C9A55A"/>' +
    '<ellipse cx="107.8" cy="94" rx="1.6" ry="4" transform="rotate(-25 107.8 94)" fill="#C9A55A"/>' +
    '<ellipse cx="105.2" cy="98" rx="1.6" ry="4" transform="rotate(-25 105.2 98)" fill="#C9A55A"/>' +
    '<path d="M128 112q1.4 -12 7 -20" stroke="#B89650" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="135" cy="92" rx="1.6" ry="4" transform="rotate(25 135 92)" fill="#C9A55A"/>' +
    '<ellipse cx="137.8" cy="96" rx="1.6" ry="4" transform="rotate(25 137.8 96)" fill="#C9A55A"/>' +
    '<ellipse cx="140.7" cy="100" rx="1.6" ry="4" transform="rotate(25 140.7 100)" fill="#C9A55A"/>' +
    '<ellipse cx="143.5" cy="104" rx="1.6" ry="4" transform="rotate(25 143.5 104)" fill="#C9A55A"/>' +
    '<path d="M281 104L287 44H301L307 104Z" fill="#FFFFFF" stroke="#12303A" stroke-width="1.2"/>' +
    '<path d="M283.8 76L281 104H307L304.2 76Z" fill="#12303A"/>' +
    '<rect x="283" y="40" width="22" height="4" fill="#12303A"/>' +
    '<rect x="288" y="30" width="12" height="10" fill="#F5CF1E" stroke="#12303A" stroke-width="1.2"/>' +
    '<path d="M286 30l8-7 8 7z" fill="#12303A"/>' +
    '<path d="M300 35l30-8M300 35l30 8" stroke="#F5CF1E" stroke-width="2" opacity="0.55"/>' +
    '<rect x="291" y="92" width="6" height="12" fill="#4C646B"/>' +
    '<path d="M264 106c14-4 40-4 56 0" stroke="#EFE6CF" stroke-width="4" fill="none"/>',

  // The Keys: the Overseas Highway stretching across turquoise shallows to a palm-covered key
  keys:
    '<rect width="350" height="150" fill="#8ED8D0"/>' +
    '<rect y="52" width="350" height="28" fill="#BFEBE5"/>' +
    '<circle cx="214" cy="40" r="16" fill="#F5CF1E"/>' +
    '<rect y="80" width="350" height="70" fill="#6FD3EC"/>' +
    '<path d="M120 96c40-4 80-2 130 4s70 10 100 8v42H160c-20-20-50-30-40-54z" fill="#2BB3C9" opacity="0.55"/>' +
    '<path d="M0 132c60-6 130-6 200 2s110 8 150 2v14H0z" fill="#0E8A93"/>' +
    '<path d="M150 118h24M210 124h30M300 112h22M40 142h30" stroke="#DDF4FA" stroke-width="2" stroke-linecap="round" opacity="0.8"/>' +
    '<ellipse cx="300" cy="82" rx="52" ry="6" fill="#F2E3B3"/><ellipse cx="300" cy="79" rx="40" ry="5" fill="#5E8C2A"/>' +
    '<path d="M292 80c0-10.4 2-20.8 -3-26" stroke="#5B4632" stroke-width="2.5" fill="none"/>' +
    '<path d="M289 54c-7-3-13 0-16 5M289 54c-2-6-8-9-13-8M289 54c5-5 11-6 16-2M289 54c6 0 10 4 12 8" stroke="#5E8C2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M312 80c0-8.0 2-16.0 -3-20" stroke="#5B4632" stroke-width="2.5" fill="none"/>' +
    '<path d="M309 60c-7-3-13 0-16 5M309 60c-2-6-8-9-13-8M309 60c5-5 11-6 16-2M309 60c6 0 10 4 12 8" stroke="#5E8C2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
    '<rect x="5.1" y="113.1" width="5.9" height="25.3" fill="#E1E5DA"/>' +
    '<rect x="19.8" y="111.4" width="5.6" height="24.1" fill="#E1E5DA"/>' +
    '<rect x="37.7" y="109.3" width="5.3" height="22.5" fill="#E1E5DA"/>' +
    '<rect x="57.1" y="107.1" width="4.9" height="20.9" fill="#E1E5DA"/>' +
    '<rect x="77.5" y="104.8" width="4.6" height="19.2" fill="#E1E5DA"/>' +
    '<rect x="98.7" y="102.3" width="4.2" height="17.3" fill="#E1E5DA"/>' +
    '<rect x="120.6" y="99.8" width="3.8" height="15.5" fill="#E1E5DA"/>' +
    '<rect x="143" y="97.3" width="3.4" height="13.6" fill="#E1E5DA"/>' +
    '<rect x="165.8" y="94.6" width="3" height="11.6" fill="#E1E5DA"/>' +
    '<rect x="189.2" y="92" width="2.6" height="9.7" fill="#E1E5DA"/>' +
    '<rect x="212.9" y="89.3" width="2.2" height="7.6" fill="#E1E5DA"/>' +
    '<rect x="236.9" y="86.5" width="1.7" height="5.6" fill="#E1E5DA"/>' +
    '<rect x="261.3" y="83.7" width="1.3" height="3.5" fill="#E1E5DA"/>' +
    '<path d="M0 114 L268 83 L268 84.5 L0 120Z" fill="#A6B4B3"/>' +
    '<path d="M0 102 L268 80.5 L268 83 L0 114Z" fill="#FBFAF4"/>' +
    '<path d="M0 108 L268 81.8" stroke="#4C646B" stroke-width="1" stroke-dasharray="6 6"/>' +
    '<path d="M0 100 L268 80" stroke="#FFFFFF" stroke-width="2"/>' +
    '<g transform="translate(58 92)"><rect x="0" y="4" width="22" height="8" rx="3" fill="#EE8FA8"/><path d="M4 4l3-5h8l3 5z" fill="#EE8FA8"/><path d="M7.5 3.5l2-3h3v3zM13.5 3.5v-3h1.5l2 3z" fill="#DDF4FA"/><circle cx="5" cy="12" r="2.4" fill="#12303A"/><circle cx="17" cy="12" r="2.4" fill="#12303A"/></g>' +
    '<path d="M232 128l12-24v24zM226 130h22l-3 5h-16z" fill="#FFFFFF"/>'
};
