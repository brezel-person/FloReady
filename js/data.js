/* FloReady: data.js
 * All of the app's content lives here: regions, places, tips, checklists, quiz questions and links.
 * To add a place or a tip, edit this file; no other code needs to change.
 */

/* =========================================================
   Demo data
   ========================================================= */
var REGIONS = [
  { id: 'south', name: 'South Florida', cities: 'Miami · Fort Lauderdale · West Palm',
    intro: 'Fast-paced, international and bilingual, with a strong Caribbean and Latin American influence.',
    facts: [['chat', 'Language', 'Spanish is everywhere. Many shops and services are bilingual; a few words go a long way.'],
            ['clock', 'Pace & style', 'City energy. Dinners start late, traffic is heavy, and people dress up more than elsewhere in Florida.'],
            ['cup', 'Eat like a local', 'A cafecito from a ventanita, a Cuban sandwich, and stone crab claws in season (October – May).'],
            ['car', 'Getting around', 'I-95 and the Turnpike are the backbone. Get a SunPass; many tolls are cashless.']],
    pace: 'Big-city, fast', winters: 'Warm, rarely cold', language: 'English & Spanish', weekends: 'Beaches, nightlife' },
  { id: 'central', name: 'Central Florida', cities: 'Orlando · Kissimmee · Lakeland',
    intro: 'Suburbs, lakes and the theme parks, plus a fast-growing mix of people from everywhere.',
    facts: [['chat', 'Language', 'English, with a large Puerto Rican community around Orlando and Kissimmee.'],
            ['clock', 'Pace & style', 'Relaxed suburban life with tourist crowds nearby. Locals learn which days to avoid the parks.'],
            ['cup', 'Eat like a local', 'Puerto Rican bakeries, lakeside fish camps, and a Publix sub before any outing.'],
            ['car', 'Getting around', 'I-4 is the main artery and often jammed. Many toll roads around Orlando; get a SunPass.'],
            ['alert', 'Sinkholes', 'Limestone underground means sinkholes are more common here, especially in the counties north of Tampa. Ask about sinkhole coverage when you buy home insurance.']],
    pace: 'Suburban, busy', winters: 'Mild; a few chilly nights', language: 'English & Spanish', weekends: 'Lakes, springs, parks' },
  { id: 'tampa', name: 'Tampa Bay', cities: 'Tampa · St. Petersburg · Clearwater',
    intro: 'Laid-back Gulf Coast living with a real city, sunsets over the water and a beach culture.',
    facts: [['chat', 'Language', 'Mostly English, with a long Cuban, Spanish and Italian history in Ybor City.'],
            ['clock', 'Pace & style', 'Casual. Flip-flops are acceptable almost everywhere.'],
            ['cup', 'Eat like a local', 'A Tampa-style Cuban sandwich and a grouper sandwich by the water.'],
            ['car', 'Getting around', 'Bridges connect the bay; plan around rush hour on the Howard Frankland.']],
    pace: 'Laid-back city', winters: 'Mild and dry', language: 'Mostly English', weekends: 'Gulf beaches, boating' },
  { id: 'north', name: 'North Florida', cities: 'Jacksonville · Tallahassee · Gainesville',
    intro: 'Slower and more Southern, with college towns, the state capital and real (short) winters.',
    facts: [['chat', 'Language', 'Mostly English, with a Southern accent you won’t hear much in Miami.'],
            ['clock', 'Pace & style', 'Friendly and unhurried. Strangers say hello, and college football Saturdays are sacred.'],
            ['cup', 'Eat like a local', 'Boiled peanuts from a roadside stand, Southern barbecue and shrimp.'],
            ['car', 'Getting around', 'I-10 and I-75 cross the region; you’ll drive more between towns.']],
    pace: 'Slower, Southern', winters: 'Cool; occasional frost', language: 'Mostly English', weekends: 'Springs, college football' },
  { id: 'panhandle', name: 'Panhandle', cities: 'Pensacola · Destin · Panama City',
    intro: 'White-sand beaches on the Gulf with a Deep South feel. Part of it is even in a different time zone.',
    facts: [['clock', 'Time zone', 'Most of the Panhandle west of the Apalachicola River is on Central Time, an hour behind Miami.'],
            ['chat', 'Pace & style', 'Small-town and Southern, with crowded beaches in summer.'],
            ['cup', 'Eat like a local', 'Gulf seafood and Apalachicola oysters.'],
            ['car', 'Getting around', 'US-98 runs along the coast; I-10 runs inland.']],
    pace: 'Small-town, Southern', winters: 'Cool; occasional frost', language: 'Mostly English', weekends: 'Beaches, fishing' },
  { id: 'keys', name: 'The Keys', cities: 'Key Largo · Marathon · Key West',
    intro: 'Island time. A chain of small islands connected by one highway, with reefs and sunsets.',
    facts: [['clock', 'Pace & style', 'Very casual. Things move slowly, and that’s the point.'],
            ['bolt', 'Storm season', 'There’s one road out, so evacuations start early. Leave when told to.'],
            ['cup', 'Eat like a local', 'Key lime pie and conch fritters.'],
            ['car', 'Getting around', 'US-1, the Overseas Highway, is the only road. Mile markers are used as addresses.']],
    pace: 'Island time', winters: 'Warmest in the state', language: 'English & Spanish', weekends: 'Snorkeling, boating' }
];

var STAGES = [{ id: 'planning', label: 'Planning' }, { id: 'arrived', label: 'Just arrived' }, { id: 'settling', label: 'Settling in' }];

var KIT = [
  { id: 'water', title: 'Water', detail: '1 gallon per person, per day, for 7 days' },
  { id: 'food', title: 'Non-perishable food', detail: '7-day supply, plus a manual can opener' },
  { id: 'meds', title: 'Medications', detail: 'At least a 2-week supply of prescriptions' },
  { id: 'docs', title: 'Important documents', detail: 'IDs, insurance, deeds in a waterproof bag' },
  { id: 'light', title: 'Flashlights & batteries', detail: 'Skip candles; they’re a fire risk' },
  { id: 'cash', title: 'Cash', detail: 'ATMs and card readers go down with the power' },
  { id: 'firstaid', title: 'First aid kit', detail: 'Bandages, antiseptic, any personal items' },
  { id: 'power', title: 'Power banks & chargers', detail: 'Charge everything when a watch is issued' },
  { id: 'pets', title: 'Pet supplies', detail: 'Food, water, carrier, vaccination records' },
  { id: 'gas', title: 'Full gas tank', detail: 'Gas stations get long lines before a storm' }
];

var GUIDES = [
  { icon: 'people', title: 'Family communication plan', meta: 'Who to call, where to meet',
    points: ['Pick one out-of-state contact everyone checks in with.', 'Choose a meeting spot near home and one outside your neighborhood.', 'Write numbers on paper too; phones die.'] },
  { icon: 'house', title: 'Protect your home', meta: 'Shutters, yard, renters vs. owners',
    points: ['Bring in or tie down anything outside that could fly: patio furniture, grills, plants.', 'Put up shutters or plywood if you have them. Tape on windows does not help.', 'Renting? Ask your landlord now who handles shutters.'] },
  { icon: 'bolt', title: 'After the storm', meta: 'Power outages, generators, flooding',
    points: ['Never run a generator indoors or in a garage. Carbon monoxide kills.', 'Stay out of floodwater; it can hide downed power lines.', 'Take photos of any damage before cleaning up, for insurance.'] }
];

/* Heat & sun, Water and Wildlife: each topic has a short summary and plain Do / Don't lists */
var SUN = { bg: 'var(--sun-pale)', fg: 'var(--sun-ink)' }, SEA = { bg: 'var(--lagoon-pale)', fg: 'var(--lagoon-ink)' },
    LEAF = { bg: 'var(--lime-pale)', fg: 'var(--lime-ink)' }, HOT = { bg: 'var(--coral-pale)', fg: 'var(--coral-ink)' };
function topic(style, o) { o.bg = style.bg; o.fg = style.fg; return o; }
var OUTDOORS = [
  { label: 'Heat & sun', keys: ['heat'] },
  { label: 'Water', keys: ['water'] },
  { label: 'The ground', keys: ['ground'] }
];
var PREP_OTHER = {
  heat: [
    topic(HOT, { icon: 'sun', title: 'Heat index', summary: 'The “feels like” temperature, combining heat and humidity. In Florida summers it is often well above the actual temperature.',
      scale: [['Caution', '80–90°F', 'var(--lime-pale)'], ['Extreme caution', '90–103°F', 'var(--sun-pale)'], ['Danger', '103–124°F', 'var(--coral-pale)'], ['Extreme danger', '125°F+', 'var(--coral)', '#FFFFFF']],
      do: ['Check the heat index, not just the temperature, before going out', 'Plan yard work and exercise for early morning', 'Take breaks in shade or AC'],
      dont: ['Leave kids, older adults or pets in a parked car, even for a minute'] }),
    topic(SUN, { icon: 'sun', title: 'UV index', summary: 'How strong the sun’s burning rays are. Florida often hits 10–11+ around midday in summer, enough to burn in about 15 minutes.',
      scale: [['Low', '0–2', 'var(--lime-pale)'], ['Moderate', '3–5', 'var(--sun-pale)'], ['High', '6–7', 'var(--orange-pale)'], ['Very high', '8–10', 'var(--coral-pale)'], ['Extreme', '11+', 'var(--coral)', '#FFFFFF']],
      do: ['Wear SPF 30+ sunscreen, even on cloudy days', 'Reapply every 2 hours and after swimming', 'Wear a hat and sunglasses; seek shade from 10 am to 4 pm'] }),
    topic(SEA, { icon: 'drop', title: 'Handling humidity and heat', summary: 'Humid air stops sweat from cooling you, so your body overheats faster than you expect. Newcomers need a week or two to adjust.',
      do: ['Drink water all day, not just when thirsty', 'Add electrolytes on long, sweaty days', 'Wear loose, light-colored, breathable clothes', 'Ease into outdoor activity over your first few weeks'],
      dont: ['Rely on soda, alcohol or energy drinks to rehydrate'],
      urgent: 'Heavy sweating, dizziness or nausea can mean heat exhaustion: get cool and drink water. Hot skin, confusion or fainting can mean heat stroke: call 911.' }),
    topic(LEAF, { icon: 'bolt', title: 'Lightning', summary: 'Summer afternoons bring almost daily thunderstorms, and Florida is one of the most lightning-prone states.',
      do: ['Go indoors as soon as you hear thunder', 'Wait 30 minutes after the last thunder to go back out'],
      dont: ['Stay on the beach, in the pool or on a golf course during a storm'] })
  ],
  water: [
    topic(SEA, { icon: 'drop', title: 'Freshwater safety', summary: 'Lakes, rivers and springs are beautiful, but they come with risks the ocean doesn’t.',
      do: ['Swim only in designated areas, during daylight', 'Keep your head above water or wear a nose clip in warm freshwater', 'Keep kids and pets well back from the water’s edge'],
      dont: ['Swim near thick plants or at dusk and night, when alligators are most active', 'Touch or swim in water with green, scummy algae', 'Let water go up your nose in warm lakes, ponds or springs'],
      urgent: 'A rare but deadly amoeba can live in warm freshwater and enters through the nose. Severe headache, fever or stiff neck after swimming: see a doctor right away.' }),
    topic(SEA, { icon: 'drop', title: 'Rip currents', summary: 'Strong currents that pull you away from shore. They cause most beach rescues.',
      do: ['Swim near a lifeguard', 'If caught, stay calm and swim parallel to the shore until free', 'Float and wave for help if you can’t swim out'],
      dont: ['Fight the current by swimming straight back'] }),
    topic(SUN, { icon: 'info', title: 'Beach flags', summary: 'Check the flag at the lifeguard stand before you get in.',
      scale: [['Green', 'Low hazard', 'var(--lime-pale)'], ['Yellow', 'Medium hazard', 'var(--sun-pale)'], ['Red', 'High hazard', 'var(--coral-pale)'], ['Double red', 'Water closed', 'var(--coral)', '#FFFFFF'], ['Purple', 'Dangerous marine life', 'var(--pink-pale)']] }),
    topic(HOT, { icon: 'car', title: 'Flooded roads', summary: 'Turn around, don’t drown. Just 12 inches of moving water can carry away most cars, and 6 inches can knock you off your feet.',
      dont: ['Drive or walk through floodwater; it can hide holes and downed power lines'] })
  ],
  ground: [
    topic(SUN, { icon: 'alert', title: 'Sinkholes', summary: 'Florida sits on limestone that slowly dissolves, so the ground can sink or open up. They are most common in Central Florida and the counties north of Tampa, often after heavy rain or drought.',
      do: ['Watch for new cracks in walls or floors, doors and windows that suddenly stick, or a round dip in the yard', 'Ask about sinkhole coverage when you buy home insurance; standard policies only cover catastrophic collapse', 'Report a sinkhole on a road to local authorities'],
      dont: ['Walk up to the edge of a sinkhole; the ground around it can give way', 'Fill it with trash or yard waste'],
      urgent: 'If a hole opens near your home or the ground is shifting, get everyone out, stay back and call 911.' })
  ],
  wildlife: [
    topic(LEAF, { icon: 'eye', title: 'Alligators', summary: 'Found in almost every freshwater lake, pond and canal in Florida. Attacks are rare, but they do happen.',
      do: ['Keep your distance and never approach one', 'Keep pets on a leash and away from the water’s edge'],
      dont: ['Feed them; it’s illegal and teaches them to approach people', 'Swim at dusk or night in freshwater'],
      urgent: 'Report a gator that threatens people or pets to the FWC Nuisance Alligator Hotline: 1-866-392-4286.' }),
    topic(HOT, { icon: 'alert', title: 'Snakes', summary: 'Florida has six venomous species, including rattlesnakes, cottonmouths and coral snakes. Most snakes you’ll see are harmless.',
      do: ['Watch where you step and reach, especially in tall grass and wood piles', 'Wear closed shoes on trails'],
      dont: ['Try to catch, kill or handle a snake'],
      urgent: 'If bitten, call 911 right away. Keep still and calm, hold the bitten limb at about heart level and take off rings or tight clothing. Don’t cut the bite, use ice or apply a tourniquet. Poison Control: 1-800-222-1222.' }),
    topic(SEA, { icon: 'drop', title: 'Stingrays and jellyfish', summary: 'Common in warm, shallow Gulf and Atlantic water.',
      do: ['Do the “stingray shuffle”: slide your feet along the sand', 'Check for purple beach flags'],
      dont: ['Touch jellyfish on the sand; they can still sting'] }),
    topic(SUN, { icon: 'info', title: 'Bugs', summary: 'Mosquitoes, fire ants and no-see-ums are the ones that bite. Love bugs and palmetto bugs are just annoying.',
      do: ['Empty standing water around your home weekly', 'Use bug spray at dawn and dusk'],
      dont: ['Stand on fire ant mounds (look for loose, sandy hills)'] }),
    topic(LEAF, { icon: 'eye', title: 'Black bears', summary: 'Florida black bears live in forests across the state and are drawn to trash and pet food.',
      do: ['Secure trash cans and bring pet food indoors'],
      dont: ['Approach or feed a bear'] })
  ]
};

var CATS = [
  { id: 'all', label: 'All' }, { id: 'springs', label: 'Springs' }, { id: 'parks', label: 'State parks' },
  { id: 'beaches', label: 'Beaches' }, { id: 'trails', label: 'Trails' }, { id: 'wildlife', label: 'Wildlife' }, { id: 'towns', label: 'Small towns' }, { id: 'food', label: 'Local food' }
];
var PLACES = [
  { id: 'bluespring', name: 'Blue Spring State Park', cat: 'springs', region: 'central', best: 'Best Nov – Mar', short: 'Manatees in winter', body: 'In cold months, hundreds of manatees shelter in the warm spring run. Go early on a chilly morning and walk the boardwalk.' },
  { id: 'ichetucknee', name: 'Ichetucknee Springs', cat: 'springs', park: true, region: 'north', best: 'Best May – Sep', short: 'Tubing in summer', body: 'Float down a crystal-clear river on a tube. A classic North Florida summer day.' },
  { id: 'weeki', name: 'Weeki Wachee Springs', cat: 'springs', park: true, region: 'tampa', best: 'Year-round', short: 'Kayaking, mermaid show', body: 'Kayak the spring-fed river or catch the famous underwater mermaid show, a Florida tradition since 1947.' },
  { id: 'rainbow', name: 'Rainbow Springs', cat: 'springs', park: true, region: 'central', best: 'Best Apr – Oct', short: 'Swimming, waterfalls', body: 'Swim in one of the state’s largest springs and walk past small man-made waterfalls in the gardens. Reserve a day pass online before you go.' },
  { id: 'myakka', name: 'Myakka River State Park', cat: 'parks', region: 'tampa', best: 'Best Nov – Apr', short: 'River, prairie and gators', body: 'Spot alligators along the river from a safe distance and explore miles of trails through prairie and wetlands.' },
  { id: 'paynes', name: 'Paynes Prairie Preserve', cat: 'parks', region: 'north', best: 'Best Oct – Apr', short: 'Wild horses, bison and cranes', body: 'A huge open prairie near Gainesville where you might spot wild horses, bison, sandhill cranes and alligators. Climb the observation tower for the view.' },
  { id: 'bahiahonda', name: 'Bahia Honda State Park', cat: 'parks', art: 'beaches', region: 'keys', best: 'Year-round', short: 'Beaches, old bridge', body: 'Calm, clear water, sandy beaches and a view of the historic Bahia Honda Rail Bridge.' },
  { id: 'fortdesoto', name: 'Fort De Soto Park', cat: 'beaches', region: 'tampa', best: 'Year-round', short: 'County park beaches', body: 'Wide Gulf beaches, a historic fort and a dog beach, all in one county park.' },
  { id: 'siesta', name: 'Siesta Beach', cat: 'beaches', region: 'tampa', best: 'Year-round', short: 'Soft white sand', body: 'Famous for its fine, cool, quartz sand. Busy on weekends, so go early.' },
  { id: 'standrews', name: 'St. Andrews State Park', cat: 'beaches', region: 'panhandle', best: 'Best Apr – Oct', short: 'Emerald water', body: 'Panhandle beaches with clear green water and a calm jetty area that’s good for snorkeling.' },
  { id: 'withlacoochee', name: 'Withlacoochee State Trail', cat: 'trails', region: 'central', best: 'Best Oct – Apr', short: 'Long paved rail-trail', body: 'A long, paved former rail line through small towns and forest. Great for biking.' },
  { id: 'sharkvalley', name: 'Shark Valley, Everglades', cat: 'trails', region: 'south', best: 'Best Dec – Apr', short: 'Bike or tram loop', body: 'A paved loop deep into the Everglades with an observation tower. Expect to see gators and wading birds.' },
  { id: 'merritt', name: 'Merritt Island Refuge', cat: 'wildlife', region: 'central', best: 'Best Nov – Mar', short: 'Birding, wildlife drive', body: 'Drive the Black Point Wildlife Drive for herons, spoonbills and gators, next to the Space Coast.' },
  { id: 'corkscrew', name: 'Corkscrew Swamp Sanctuary', cat: 'wildlife', region: 'south', best: 'Best Dec – Apr', short: 'Old-growth boardwalk', body: 'A long boardwalk through ancient bald cypress swamp, run by Audubon.' },
  { id: 'mountdora', name: 'Mount Dora', cat: 'towns', region: 'central', best: 'Year-round', short: 'Lakeside antiques', body: 'A hilly lakeside town with antique shops, festivals and a small-town downtown.' },
  { id: 'apalachicola', name: 'Apalachicola', cat: 'towns', region: 'panhandle', best: 'Year-round', short: 'Historic oyster town', body: 'A historic fishing town on the Forgotten Coast, known for its oysters and old brick buildings.' },
  { id: 'cedarkey', name: 'Cedar Key', cat: 'towns', region: 'north', best: 'Year-round', short: 'Quiet Gulf village', body: 'A tiny island fishing village with clam farms, sunsets and Old Florida charm.' },
  // Springs
  { id: 'wekiwa', name: 'Wekiwa Springs State Park', cat: 'springs', region: 'central', best: 'Best Apr – Oct', short: 'Swim, then paddle the run', body: 'A cool, clear swimming area near Orlando. Rent a kayak and paddle the spring run to spot turtles and herons. Reserve a day pass online before you go.' },
  { id: 'silver', name: 'Silver Springs State Park', cat: 'springs', region: 'central', best: 'Year-round', short: 'Glass-bottom boats', body: 'Ride the famous glass-bottom boats over the springs. Keep an eye out for the wild monkeys that live along the river.' },
  { id: 'threesisters', name: 'Three Sisters Springs', cat: 'springs', region: 'central', best: 'Best Nov – Mar', short: 'Manatees up close', body: 'In Crystal River, hundreds of manatees gather in winter. Watch them from the boardwalk; in winter the springs are closed to swimmers and paddlers to protect them.' },
  { id: 'wakulla', name: 'Wakulla Springs State Park', cat: 'springs', region: 'north', best: 'Year-round', short: 'River boat tours', body: 'One of the largest and deepest freshwater springs in the world, south of Tallahassee. Take the river boat tour for gators and birds.' },
  { id: 'ginnie', name: 'Ginnie Springs', cat: 'springs', region: 'north', best: 'Best May – Sep', short: 'Tubing and diving', body: 'A privately run spring park on the Santa Fe River, popular for tubing, snorkeling and cave diving.' },
  // State & national parks
  { id: 'pennekamp', name: 'John Pennekamp Coral Reef SP', cat: 'parks', region: 'keys', best: 'Best Apr – Sep', short: 'Snorkel a coral reef', body: 'The first undersea park in the U.S. Take a glass-bottom boat or snorkel trip out to the reef off Key Largo.' },
  { id: 'drytortugas', name: 'Dry Tortugas National Park', cat: 'parks', region: 'keys', best: 'Best Nov – Apr', short: 'Remote island fort', body: 'A huge 1800s fort on a tiny island, 70 miles past Key West. Reachable only by boat or seaplane, so book a ferry or flight ahead.' },
  { id: 'biscayne', name: 'Biscayne National Park', cat: 'parks', region: 'south', best: 'Best Nov – Apr', short: 'A park that’s mostly water', body: 'Almost all of this park is underwater. Paddle the mangroves or take a boat out to the keys and reefs.' },
  { id: 'jdickinson', name: 'Jonathan Dickinson State Park', cat: 'parks', region: 'south', best: 'Best Oct – Apr', short: 'Wild Loxahatchee River', body: 'Paddle one of Florida’s wild and scenic rivers, hike through rare sand pine scrub and bike miles of sandy trails.' },
  { id: 'hillsborough', name: 'Hillsborough River State Park', cat: 'parks', region: 'tampa', best: 'Best Oct – Apr', short: 'River trails and small rapids', body: 'Shady trails along a river with small rapids, plus canoe and kayak rentals.' },
  { id: 'torreya', name: 'Torreya State Park', cat: 'parks', region: 'panhandle', best: 'Best Nov', short: 'Bluffs and fall color', body: 'High bluffs over the Apalachicola River and some of the best fall leaf color in Florida.' },
  { id: 'fortclinch', name: 'Fort Clinch State Park', cat: 'parks', region: 'north', best: 'Year-round', short: '1800s brick fort', body: 'Walk through a well-preserved 1800s fort, then hit the beach and trails on Amelia Island.' },
  // Beaches
  { id: 'caladesi', name: 'Caladesi Island State Park', cat: 'beaches', region: 'tampa', best: 'Best Mar – Oct', short: 'Island beach by ferry', body: 'Take a short ferry or kayak over to a quiet barrier island with soft white sand and no road traffic.' },
  { id: 'grayton', name: 'Grayton Beach State Park', cat: 'beaches', region: 'panhandle', best: 'Best Apr – Oct', short: 'Dunes and coastal lakes', body: 'Sugar-white sand and rare coastal dune lakes that sometimes flow right into the Gulf.' },
  { id: 'canaveral', name: 'Canaveral National Seashore', cat: 'beaches', region: 'central', best: 'Year-round', short: 'Undeveloped Atlantic coast', body: 'Miles of wild beach with no high-rises. On launch days, you can sometimes see rockets lift off nearby.' },
  { id: 'anastasia', name: 'Anastasia State Park', cat: 'beaches', region: 'north', best: 'Best Apr – Oct', short: 'Beach near St. Augustine', body: 'A wide Atlantic beach, tall dunes and a lagoon for paddleboarding, minutes from historic St. Augustine.' },
  { id: 'capeflorida', name: 'Bill Baggs Cape Florida SP', cat: 'beaches', region: 'south', best: 'Year-round', short: 'Lighthouse beach', body: 'A calm beach on Key Biscayne with a historic lighthouse you can climb on guided tours.' },
  { id: 'gulfislands', name: 'Gulf Islands National Seashore', cat: 'beaches', region: 'panhandle', best: 'Best Apr – Oct', short: 'Emerald water near Pensacola', body: 'Quiet beaches, clear green water and historic forts along the barrier islands near Pensacola.' },
  // Trails
  { id: 'ocala', name: 'Ocala National Forest', cat: 'trails', region: 'central', best: 'Best Oct – Apr', short: 'Hikes, springs, scrub', body: 'Hike part of the Florida Trail through sand pine scrub, then cool off at one of the forest’s springs.' },
  { id: 'pinellas', name: 'Pinellas Trail', cat: 'trails', region: 'tampa', best: 'Best Oct – Apr', short: 'Long paved bike trail', body: 'A long paved trail linking St. Petersburg to Tarpon Springs, with towns and coffee stops along the way.' },
  { id: 'stmarkstrail', name: 'Tallahassee–St. Marks Trail', cat: 'trails', region: 'north', best: 'Best Oct – Apr', short: 'Shady paved rail-trail', body: 'A flat, paved former railroad route heading south from Tallahassee toward the coast.' },
  // Wildlife
  { id: 'wakodahatchee', name: 'Wakodahatchee Wetlands', cat: 'wildlife', region: 'south', best: 'Best Dec – Apr', short: 'Free birding boardwalk', body: 'A short boardwalk in Delray Beach where nesting herons, gators and turtles are often just feet away.' },
  { id: 'keydeer', name: 'National Key Deer Refuge', cat: 'wildlife', region: 'keys', best: 'Year-round', short: 'Tiny endangered deer', body: 'See the small Key deer on Big Pine Key. Drive slowly and never feed them.' },
  { id: 'stmarks', name: 'St. Marks Wildlife Refuge', cat: 'wildlife', region: 'north', best: 'Best Oct – Nov', short: 'Lighthouse, fall monarchs', body: 'A coastal refuge with a historic lighthouse. In fall, migrating monarch butterflies stop here on their way south.' },
  // Small towns
  { id: 'staugustine', name: 'St. Augustine', cat: 'towns', region: 'north', best: 'Best Oct – May', short: 'Oldest city in the continental U.S.', body: 'Founded in 1565. Walk the old streets, visit the Castillo de San Marcos and climb the lighthouse.' },
  { id: 'tarpon', name: 'Tarpon Springs', cat: 'towns', region: 'tampa', best: 'Year-round', short: 'Greek sponge docks', body: 'A Greek-American town famous for its sponge docks, bakeries and seafood.' },
  { id: 'dunedin', name: 'Dunedin', cat: 'towns', region: 'tampa', best: 'Year-round', short: 'Walkable waterfront town', body: 'A small, walkable downtown with Scottish roots, a marina and easy access to the Pinellas Trail.' },
  { id: 'micanopy', name: 'Micanopy', cat: 'towns', region: 'north', best: 'Best Oct – Apr', short: 'Oaks and antique shops', body: 'A tiny old town under huge live oaks and Spanish moss, with antique shops and bookstores.' },
  { id: 'fernandina', name: 'Fernandina Beach', cat: 'towns', region: 'north', best: 'Year-round', short: 'Victorian downtown', body: 'A historic downtown on Amelia Island with Victorian buildings, shrimp boats and beaches nearby.' },
  // Local food
  { id: 'versailles', name: 'Versailles Restaurant', cat: 'food', region: 'south', best: 'Year-round', short: 'Cuban classics, Little Havana', body: 'A Miami institution since 1971. Order a cafecito at the walk-up window, then sit down for a Cuban sandwich.' },
  { id: 'columbia', name: 'Columbia Restaurant', cat: 'food', region: 'tampa', best: 'Year-round', short: 'Spanish-Cuban, since 1905', body: 'A historic Ybor City restaurant known for its 1905 salad and tiled dining rooms.' },
  { id: 'joes', name: 'Joe’s Stone Crab', cat: 'food', region: 'south', best: 'Best Oct – May', short: 'Stone crab claws', body: 'A Miami Beach landmark for stone crab claws and key lime pie. Expect a wait in season.' },
  { id: 'tedpeters', name: 'Ted Peters Smoked Fish', cat: 'food', region: 'tampa', best: 'Year-round', short: 'Old-school smoked fish', body: 'A St. Petersburg classic since the 1950s. Try the smoked mullet spread.' },
  { id: 'blueheaven', name: 'Blue Heaven', cat: 'food', region: 'keys', best: 'Year-round', short: 'Key West garden dining', body: 'Eat in a shady courtyard in Key West while roosters wander between the tables. Save room for key lime pie.' },
  { id: 'yoders', name: 'Yoder’s Restaurant', cat: 'food', region: 'tampa', best: 'Year-round', short: 'Amish cooking and pies', body: 'Home-style Amish cooking in Sarasota, famous for its pies.' },
  // More springs
  { id: 'juniper', name: 'Juniper Springs', cat: 'springs', region: 'central', best: 'Best Apr – Oct', short: 'Canoe a winding spring run', body: 'In the Ocala National Forest. Swim in the stone-walled pool, then paddle a narrow, shady run through the woods.' },
  { id: 'alexander', name: 'Alexander Springs', cat: 'springs', region: 'central', best: 'Best Apr – Oct', short: 'Sandy-bottom swimming', body: 'A wide, clear spring with a sandy beach, great for snorkeling and a first swim in a Florida spring.' },
  { id: 'rocksprings', name: 'Rock Springs at Kelly Park', cat: 'springs', region: 'central', best: 'Best May – Sep', short: 'Tubing near Orlando', body: 'Float a short, cool spring run on a tube. It fills up fast on summer weekends, so go early.' },
  { id: 'madisonblue', name: 'Madison Blue Spring State Park', cat: 'springs', region: 'north', best: 'Best May – Sep', short: 'Deep blue swimming hole', body: 'A limestone basin of bright blue water on the Withlacoochee River, popular with swimmers and cave divers.' },
  { id: 'manateesprings', name: 'Manatee Springs State Park', cat: 'springs', region: 'north', best: 'Year-round', short: 'Swim in summer, manatees in winter', body: 'A first-magnitude spring flowing into the Suwannee River. Swim in summer; spot manatees from the boardwalk in winter.' },
  // More parks
  { id: 'everglades', name: 'Everglades National Park', cat: 'parks', region: 'south', best: 'Best Dec – Apr', short: 'The river of grass', body: 'The largest subtropical wilderness in the U.S. Walk the Anhinga Trail for gators and birds up close.' },
  { id: 'bigcypress', name: 'Big Cypress National Preserve', cat: 'parks', region: 'south', best: 'Best Dec – Apr', short: 'Cypress swamp scenic drive', body: 'Drive the Loop Road or stop at the boardwalks to see cypress domes, wading birds and gators.' },
  { id: 'highlands', name: 'Highlands Hammock State Park', cat: 'parks', region: 'central', best: 'Best Oct – Apr', short: 'Old-growth hammock trails', body: 'One of Florida’s oldest state parks, near Sebring. Shady trails wind past a cypress swamp and huge old oaks.' },
  { id: 'blackwater', name: 'Blackwater River State Park', cat: 'parks', region: 'panhandle', best: 'Best May – Sep', short: 'Tea-colored river, white sandbars', body: 'Paddle or tube a dark, sandy-bottomed river and stop on bright white sandbars along the way.' },
  { id: 'oscarscherer', name: 'Oscar Scherer State Park', cat: 'parks', region: 'tampa', best: 'Best Oct – Apr', short: 'Scrub-jays and paddling', body: 'Look for the Florida scrub-jay, found only in Florida, then paddle South Creek near Sarasota.' },
  // More trails
  { id: 'vanfleet', name: 'Van Fleet State Trail', cat: 'trails', region: 'central', best: 'Best Oct – Apr', short: 'Quiet rural rail-trail', body: 'A long, straight, paved trail through farmland and woods in Polk County, with very few road crossings.' },
  { id: 'westorange', name: 'West Orange Trail', cat: 'trails', region: 'central', best: 'Best Oct – Apr', short: 'Paved trail through Winter Garden', body: 'A busy, paved trail that runs right through downtown Winter Garden, with bike rentals and cafés.' },
  { id: 'timpoochee', name: 'Timpoochee Trail', cat: 'trails', region: 'panhandle', best: 'Best Mar – May', short: 'Bike along Scenic 30A', body: 'A paved path along the Gulf coast connecting beach towns, dune lakes and state parks.' },
  { id: 'gainesvillehawthorne', name: 'Gainesville–Hawthorne Trail', cat: 'trails', region: 'north', best: 'Best Oct – Apr', short: 'Paynes Prairie by bike', body: 'A paved rail-trail from Gainesville past the edge of Paynes Prairie, with overlooks for gators and birds.' },
  { id: 'overseasheritage', name: 'Overseas Heritage Trail', cat: 'trails', region: 'keys', best: 'Best Nov – Apr', short: 'Bike over the water', body: 'A long trail through the Keys that uses old bridges, with ocean views on both sides.' },
  // More small towns
  { id: 'winterpark', name: 'Winter Park', cat: 'towns', region: 'central', best: 'Best Oct – May', short: 'Park Avenue and a lake boat tour', body: 'Brick streets, shops and a scenic boat tour through a chain of lakes and canals.' },
  { id: 'deland', name: 'DeLand', cat: 'towns', region: 'central', best: 'Year-round', short: 'Historic downtown, near springs', body: 'A walkable historic downtown with murals and local restaurants, close to Blue Spring.' },
  { id: 'seaside', name: 'Seaside', cat: 'towns', region: 'panhandle', best: 'Best Mar – Oct', short: 'Pastel beach town on 30A', body: 'A small planned beach town of pastel cottages, picket fences and food trucks by the Gulf.' },
  { id: 'islamorada', name: 'Islamorada', cat: 'towns', region: 'keys', best: 'Year-round', short: 'Sportfishing village', body: 'Known for sportfishing, bayside sunsets and feeding the tarpon at the docks.' },
  { id: 'safetyharbor', name: 'Safety Harbor', cat: 'towns', region: 'tampa', best: 'Year-round', short: 'Bayfront small town', body: 'A small downtown on Old Tampa Bay with a waterfront park, local shops and a historic spa.' },
  // More local food
  { id: 'kermits', name: 'Kermit’s Key Lime Shoppe', cat: 'food', region: 'keys', best: 'Year-round', short: 'Key lime pie, many ways', body: 'A Key West favorite for key lime pie, including frozen slices dipped in chocolate.' },
  { id: 'peglegpetes', name: 'Peg Leg Pete’s', cat: 'food', region: 'panhandle', best: 'Year-round', short: 'Oysters on Pensacola Beach', body: 'A casual beach spot known for Gulf oysters, raw or baked, steps from the sand.' },
  { id: 'frenchys', name: 'Frenchy’s Original Café', cat: 'food', region: 'tampa', best: 'Year-round', short: 'Grouper sandwiches', body: 'A small Clearwater Beach café famous for its grouper sandwich.' },
  { id: 'okeechobeesteak', name: 'Okeechobee Steakhouse', cat: 'food', region: 'south', best: 'Year-round', short: 'Old-school steakhouse', body: 'A family-run West Palm Beach steakhouse that has been serving since the 1940s.' },
  { id: 'beefyking', name: 'Beefy King', cat: 'food', region: 'central', best: 'Year-round', short: 'Orlando classic since 1968', body: 'A tiny Orlando landmark for steamed roast beef sandwiches and tater tots.' },
  // More beaches
  { id: 'honeymoon', name: 'Honeymoon Island State Park', cat: 'beaches', region: 'tampa', best: 'Best Mar – Oct', short: 'Shelling and osprey nests', body: 'A causeway island near Dunedin with quiet beaches, shelling and a nature trail with osprey nests.' },
  { id: 'henderson', name: 'Henderson Beach State Park', cat: 'beaches', region: 'panhandle', best: 'Best Apr – Oct', short: 'Dunes and emerald water in Destin', body: 'A protected stretch of white dunes and clear green water right in Destin.' },
  { id: 'stgeorge', name: 'St. George Island State Park', cat: 'beaches', region: 'panhandle', best: 'Best Apr – Oct', short: 'Quiet barrier island', body: 'Miles of undeveloped beach on the Forgotten Coast, with great birding and stargazing.' },
  { id: 'sebastian', name: 'Sebastian Inlet State Park', cat: 'beaches', region: 'central', best: 'Year-round', short: 'Surfing and fishing', body: 'One of Florida’s best-known surf breaks, plus a busy fishing jetty on the Atlantic coast.' },
  { id: 'sombrero', name: 'Sombrero Beach', cat: 'beaches', region: 'keys', best: 'Year-round', short: 'Palm-lined Keys beach', body: 'A calm, family-friendly beach in Marathon with palms, shade and a playground.' }
];


var LINGO = [
  ['Snowbirds', 'Seasonal residents who come south for winter. Expect busier roads and restaurants January – April.', 'Traffic’s bad again. The snowbirds are back.'],
  ['Pub sub', 'A sub sandwich from the Publix deli. A statewide favorite.', 'Grab a pub sub on the way to the beach?'],
  ['Palmetto bug', 'A polite name for a very large (sometimes flying) cockroach.', 'It’s not a roach, it’s a palmetto bug.'],
  ['Love bugs', 'Slow-flying bugs that swarm in late spring and late summer. Harmless, but wash them off your car.', 'My windshield is covered in love bugs again.'],
  ['No-see-ums', 'Tiny biting midges, common at dusk near water. You’ll feel them before you see them.', 'Bring bug spray, the no-see-ums are out.'],
  ['Cone of uncertainty', 'The forecast map showing where a hurricane’s center might go. Impacts reach far outside the cone.', 'We’re outside the cone, but still stocking up.'],
  ['Red tide', 'An algae bloom along the coast that can kill fish and make the beach air irritating to breathe.', 'Let’s skip the Gulf beaches today, there’s red tide.'],
  ['SunPass', 'Florida’s toll transponder. Many tolls are cashless, so it saves money and hassle.', 'Get a SunPass before you hop on the Turnpike.']
];

/* Florida 101: everyday tips. Ones based on a law or deadline name their official source. */
var TIP_TOPICS = [
  { id: 'all', label: 'All' }, { id: 'weather', label: 'Weather' }, { id: 'road', label: 'Getting around' },
  { id: 'home', label: 'Home & money' }, { id: 'outdoors', label: 'Outdoors' }, { id: 'life', label: 'Everyday life' }, { id: 'habits', label: 'Florida habits' }
];
var TIPS = [
  { topic: 'weather', title: 'Afternoon storms', body: 'In summer, a sunny morning often turns into a thunderstorm by 3 or 4 pm. Plan beach days and yard work for the morning.' },
  { topic: 'weather', title: 'When thunder roars, go indoors', body: 'Florida is one of the most lightning-prone places in the U.S. Get off the beach, out of the pool and off the golf course.' },
  { topic: 'weather', title: 'Two seasons, not four', body: 'Roughly June through October is hot and rainy; November through May is drier and milder. That dry season is when locals do everything outdoors.' },
  { topic: 'weather', title: 'Sunscreen, always', body: 'The Florida sun is strong year-round, even on cloudy days. Reapply after swimming.' },
  { topic: 'weather', title: 'Love bug season', body: 'Twice a year, in late spring and late summer, love bugs swarm the roads. They’re harmless, but wash them off your car quickly; they can damage the paint.' },
  { topic: 'road', title: 'Switch your driver’s license', deadline: '30 days', source: 'FLHSMV', body: 'New residents must get a Florida driver’s license after establishing residency. Bring proof of identity, proof of your Social Security number and two proofs of your Florida address.' },
  { topic: 'road', title: 'Register your car', deadline: '10 days', source: 'FLHSMV', body: 'Title and register your vehicle once you start a job, enroll kids in school, or become a resident.' },
  { topic: 'road', title: 'Get a SunPass', body: 'Many Florida tolls are cashless. A SunPass transponder saves money and the hassle of toll-by-plate bills.' },
  { topic: 'road', title: 'Wipers on, headlights on', source: 'FLHSMV', body: 'Florida law requires headlights in rain, smoke or fog, so a simple rule is: wipers on, headlights on. Hazard lights while driving are only allowed in extremely low visibility on roads with a speed limit of 55 mph or more.' },
  { topic: 'road', title: 'Move over', source: 'FLHSMV', body: 'Move over a lane, or slow to 20 mph under the limit (5 mph if the limit is 20 or less), for stopped emergency, service and disabled vehicles.' },
  { topic: 'road', title: 'Phones down in school and work zones', source: 'FLHSMV', body: 'Texting while driving is illegal in Florida. In school zones and active work zones, you can’t hold your phone at all, so use hands-free.' },
  { topic: 'road', title: 'Turn around, don’t drown', body: 'Never drive through flooded roads. Just 12 inches of moving water can carry away most cars, and 6 inches can knock you off your feet.' },
  { topic: 'home', title: 'Get insurance quotes early', body: 'Home insurance can cost more than you expect. Flood insurance is a separate policy and usually has a 30-day waiting period.' },
  { topic: 'home', title: 'No state income tax', source: 'Florida Dept. of Revenue', body: 'Florida doesn’t tax personal income. Sales tax and property tax still apply.' },
  { topic: 'home', title: 'Homestead exemption', deadline: 'By March 1', source: 'Florida Dept. of Revenue: property tax', body: 'Own your home as your main residence? Apply with your county property appraiser to lower your property taxes.' },
  { topic: 'home', title: 'Keep the AC on', body: 'Humidity breeds mold fast. When you travel, set the thermostat higher instead of turning the AC off.' },
  { topic: 'outdoors', title: 'Don’t feed wildlife', source: 'FWC', body: 'Feeding wild alligators is illegal and dangerous; it teaches them to approach people. Keep pets away from the water’s edge.' },
  { topic: 'outdoors', title: 'Fishing license', source: 'FWC', body: 'Most residents ages 16–64 need a license for freshwater or saltwater fishing.' },
  { topic: 'outdoors', title: 'Do the stingray shuffle', body: 'Slide your feet along the sand when wading so stingrays swim away instead of getting stepped on.' },
  { topic: 'outdoors', title: 'Sea turtle season', body: 'During nesting season (roughly spring through fall), keep beach lights off at night, fill in holes and knock down sandcastles before you leave.' },
  { topic: 'outdoors', title: 'Read the beach flags', body: 'Red means high hazard; double red means the water is closed. Purple means dangerous marine life like jellyfish.' },
  { topic: 'life', title: 'Snowbird season', body: 'From about January to April, seasonal residents arrive. Expect busier roads and longer waits at restaurants.' },
  { topic: 'life', title: 'Update your voter registration', source: 'Florida Division of Elections', body: 'Register at your new Florida address. You can do it online.' },
  { topic: 'life', title: 'Publix is a way of life', body: 'Florida’s favorite grocery chain. The deli subs have a fan club, and the weekly BOGO deals are worth checking.' },
  { topic: 'home', title: 'Sinkholes', body: 'Florida sits on limestone, so sinkholes happen, most often in Central Florida and the counties north of Tampa. Standard policies cover only catastrophic collapse; full sinkhole coverage costs extra.' },
  { topic: 'habits', title: 'Always carry water', body: 'Locals keep a refillable bottle in the car and in their bag. If you feel thirsty, you are already behind.' },
  { topic: 'habits', title: 'Tap water is fine', body: 'Most Florida tap water is treated and safe to drink, though it can taste of minerals; many people use a filter. After storms or main breaks, watch for boil-water notices.' },
  { topic: 'habits', title: 'Errands early, indoors at noon', body: 'In summer, locals run errands and exercise in the morning and stay inside during the hottest part of the day.' },
  { topic: 'habits', title: 'Sunshade in the windshield', body: 'Cars heat up fast. A foldable windshield sunshade keeps the steering wheel and seats from burning you.' },
  { topic: 'habits', title: 'Umbrella in the car', body: 'Afternoon downpours come out of nowhere and usually pass in under an hour.' },
  { topic: 'habits', title: 'Half a tank in hurricane season', body: 'From June to November, keep your gas tank at least half full and your phone charged, just in case.' },
  { topic: 'habits', title: 'Shake out your shoes', body: 'Shoes left outside or in the garage can collect frogs, lizards and bugs.' },
  { topic: 'life', title: 'Shoes off, flip-flops on', body: 'Dress codes are relaxed almost everywhere outside South Florida’s nicer restaurants. Flip-flops count as real shoes.' }
];

var MOVE = [
  { stage: 'Before the move', items: [
    { id: 'movers', title: 'Book movers or a truck', detail: 'Summer is peak season; book early.' },
    { id: 'insurance', title: 'Get insurance quotes', detail: 'Flood insurance is separate from home or renters, and often has a 30-day wait.' },
    { id: 'mail', title: 'Forward your mail', detail: 'Set it up with USPS online.' } ] },
  { stage: 'First 10 days', items: [
    { id: 'utilities', title: 'Set up power, water and internet', detail: 'Ask whether your power lines are underground or overhead.' },
    { id: 'zone', title: 'Find your evacuation zone', detail: 'Takes 2 minutes in Prepare.', action: 'zone' },
    { id: 'vehicle', title: 'Register your vehicle', detail: 'Due within 10 days of becoming a resident, starting a job or enrolling kids in school. Get Florida car insurance first.' } ] },
  { stage: 'First 30 days', items: [
    { id: 'license', title: 'Get your Florida driver’s license', detail: 'Book an appointment at your county tax collector’s office.', due: 'Within 30 days of residency' },
    { id: 'vote', title: 'Register to vote at your new address', detail: 'You can do it online.' },
    { id: 'doctor', title: 'Find a primary care doctor', detail: 'Check which ones are in your insurance network.' } ] },
  { stage: 'First 90 days', items: [
    { id: 'homestead', title: 'File for homestead exemption', detail: 'Homeowners only. Deadline is March 1.' },
    { id: 'kit', title: 'Finish your storm kit', detail: 'Do it before the next hurricane season.', action: 'kit' },
    { id: 'park', title: 'Visit your first state park', detail: 'Tap “I’ve been here” on a state or national park in Explore.', action: 'explore' } ] }
];

/* =========================================================
   Quiz: "Am I a Floridian yet?"
   ========================================================= */
var QUIZ = [
  { q: 'When is hurricane season?', options: ['August – October', 'June 1 – November 30', 'January – April', 'All year'], answer: 1,
    why: 'Season runs June 1 – Nov 30. The peak is mid-August through October.' },
  { q: 'A hurricane WARNING means…', options: ['Conditions are possible within 48 hours', 'The storm has passed', 'Conditions are expected, usually within 36 hours', 'It only applies to the Keys'], answer: 2,
    why: 'A watch means possible; a warning means expected. During a warning, follow evacuation orders.' },
  { q: 'A rip current is pulling you out. What do you do?', options: ['Swim straight back to shore', 'Swim parallel to the shore', 'Dive under the waves'], answer: 1,
    why: 'Swim parallel to the beach until you’re out of the current, then head back in.' },
  { q: 'How long do new residents have to get a Florida driver’s license?', options: ['10 days', '30 days', '6 months', '1 year'], answer: 1,
    why: 'You have 30 days after becoming a resident. Vehicle registration is due even sooner.' },
  { q: 'What’s a “snowbird”?', options: ['A seasonal resident who comes south for winter', 'A rare Florida bird', 'A frozen drink', 'A winter storm'], answer: 0,
    why: 'Snowbirds arrive for the winter, so roads and restaurants get busier January – April.' },
  { q: 'What’s the deadline to file for homestead exemption?', options: ['January 1', 'March 1', 'June 1', 'December 31'], answer: 1,
    why: 'Apply with your county property appraiser by March 1.' },
  { q: 'Part of the Panhandle is in which time zone?', options: ['Eastern', 'Central', 'Mountain', 'Atlantic'], answer: 1,
    why: 'Most of the Panhandle west of the Apalachicola River is on Central Time, an hour behind Miami.' },
  { q: 'What is the “stingray shuffle”?', options: ['A dance in Key West', 'Sliding your feet along the sand as you walk in the water', 'A fishing technique', 'A beach volleyball move'], answer: 1,
    why: 'Shuffling warns stingrays so they swim away instead of getting stepped on.' }
];

/* Apps & websites: grouped, with an "Official" tag on government sources */
var LINKS = [
  { group: 'Hurricanes & weather', items: [
    { name: 'National Hurricane Center', url: 'https://www.nhc.noaa.gov', type: 'Website', official: true, desc: 'Official forecasts, cones and advisories for every tropical storm.' },
    { name: 'National Weather Service', url: 'https://www.weather.gov', type: 'Website', official: true, desc: 'Local forecasts, heat advisories and severe weather warnings.' },
    { name: 'WeatherBug', url: 'https://www.weatherbug.com', type: 'App', desc: 'Weather app with lightning alerts, popular for Florida’s afternoon storms.' },
    { name: 'FEMA', url: 'https://www.fema.gov/about/news-multimedia/mobile-products', type: 'App', official: true, desc: 'Alerts, shelter locations and disaster recovery help.' } ] },
  { group: 'Emergencies & evacuation', items: [
    { name: 'FloridaDisaster.org', url: 'https://www.floridadisaster.org', type: 'Website', official: true, desc: 'Florida Division of Emergency Management: Know Your Zone, shelters and storm updates.' },
    { name: 'Red Cross Emergency', url: 'https://www.redcross.org/mobileapps', type: 'App', desc: 'Weather alerts, open shelters and first-aid steps.' },
    { name: 'Florida Department of Health', url: 'https://www.floridahealth.gov', type: 'Website', official: true, desc: 'Health alerts, including beach water quality and algae advisories.' } ] },
  { group: 'Driving & tolls', items: [
    { name: 'FL511', url: 'https://fl511.com', type: 'App', official: true, desc: 'Live traffic, crashes and evacuation routes from the Florida Department of Transportation.' },
    { name: 'SunPass', url: 'https://www.sunpass.com', type: 'App', official: true, desc: 'Manage your toll transponder and pay tolls.' },
    { name: 'FLHSMV', url: 'https://www.flhsmv.gov', type: 'Website', official: true, desc: 'Driver’s licenses, vehicle registration and appointments.' } ] },
  { group: 'Outdoors & wildlife', items: [
    { name: 'Florida State Parks', url: 'https://www.floridastateparks.org', type: 'Website', official: true, desc: 'Park hours, fees, camping and capacity closures.' },
    { name: 'Florida Fish & Wildlife (FWC)', url: 'https://myfwc.com', type: 'Website', official: true, desc: 'Fishing licenses, red tide status and wildlife safety.' },
    { name: 'Fish|Hunt FL', url: 'https://myfwc.com/license/', type: 'App', official: true, desc: 'FWC’s app for licenses and fishing rules on the go.' } ] },
  { group: 'Government & services', items: [
    { name: 'Register to vote', url: 'https://registertovoteflorida.gov', type: 'Website', official: true, desc: 'Register or update your address with the Florida Division of Elections.' },
    { name: 'MyFlorida.com', url: 'https://www.myflorida.com', type: 'Website', official: true, desc: 'The State of Florida’s portal to agencies and services.' } ] }
];

/* Phone numbers. `label` is shown on Resources; `name` and `desc` appear in the "Call?" box.
   Checked against official sources (October 2026): 911; 211 (local 211 agencies); Poison Help (America's Poison Centers);
   FWC Wildlife Alert and Nuisance Alligator Hotline (myfwc.com). */
var PHONES = {
  '911': { tel: '911', label: 'Life-threatening emergency', name: 'Emergency services', desc: 'Police, fire and ambulance. Call when a life or property is in danger.' },
  '2-1-1': { tel: '211', label: 'Community help, shelters, recovery', name: '211', desc: 'Free help finding shelters, food, disaster recovery and other services, answered by local agencies in your area. You can also text your ZIP code to 898211.' },
  '1-800-222-1222': { tel: '18002221222', label: 'Poison Control', name: 'Poison Control', desc: 'Free, confidential, 24/7 expert help for poisonings, bites and stings.' },
  '1-888-404-3922': { tel: '18884043922', label: 'FWC Wildlife Alert (report violations)', name: 'FWC Wildlife Alert', desc: 'Report fish, wildlife and boating law violations, 24/7. You can stay anonymous.' },
  '1-866-392-4286': { tel: '18663924286', label: 'FWC Nuisance Alligator Hotline', name: 'FWC Nuisance Alligator Hotline', desc: 'Report an alligator that threatens people, pets or property.' }
};
// The numbers on the Resources screen, in order (the first one is shown large)
var SOS_NUMBERS = ['911', '2-1-1', '1-800-222-1222', '1-888-404-3922', '1-866-392-4286'];

/* Official websites for the tips that are based on a law or deadline */
var SOURCE_URLS = {
  'FLHSMV': 'https://www.flhsmv.gov',
  'Florida Dept. of Revenue': 'https://floridarevenue.com',
  'Florida Dept. of Revenue: property tax': 'https://floridarevenue.com/property/',
  'FWC': 'https://myfwc.com',
  'Florida Division of Elections': 'https://registertovoteflorida.gov'
};
