
const story = {
  start: {
    text: "You are hiking in the Coconino National Forest near Flagstaff, AZ. A sudden fog rolls in and the trail markers vanish. You reach a clearing with a weathered sign and two paths.",
    image: "assets/start.svg",
    choices: [
      { label: "Take the left path toward tall pines", goto: "left_path" },
      { label: "Take the right path toward the river sound", goto: "right_path" },
      { label: "Climb a nearby ridge to get signal", goto: "ridge" }
    ]
  },
  left_path: {
    text: "The pine trail is quiet. You spot a ranger tape fluttering and a faint game trail to your left.",
    image: "assets/fork.svg",
    choices: [
      { label: "Follow the ranger tape", goto: "tape" },
      { label: "Try the game trail", goto: "game_trail" },
      { label: "Return to clearing", goto: "start" }
    ]
  },
  right_path: {
    text: "The river is louder now. The bank looks slippery, but you could follow it downstream.",
    image: "assets/fork.svg",
    choices: [
      { label: "Follow the river downstream", goto: "river_down" },
      { label: "Build a marker and stay put", goto: "stay_put" },
      { label: "Cross the river to a visible ridge", goto: "river_cross" }
    ]
  },
  ridge: {
    text: "You climb to a ridge. A faint bar of cell signal flickers. A storm front also approaches fast.",
    image: "assets/fork.svg",
    choices: [
      { label: "Text your location to 911 and stay", goto: "summit_signal" },
      { label: "Run back down to look for shelter", goto: "storm" }
    ]
  },
  tape: {
    text: "The tape leads to an old service road and a small cabin with a woodpile.",
    image: "assets/fork.svg",
    choices: [
      { label: "Knock and wait", goto: "cabin_knock" },
      { label: "Peek inside, then enter", goto: "cabin_enter" }
    ]
  },
  game_trail: {
    text: "Crunch! You startle a bear cub. The brush rustles—mom is near.",
    image: "assets/fork.svg",
    choices: [
      { label: "Back away slowly, avoid eye contact", goto: "bear_backaway" },
      { label: "Run!", goto: "bear_run" }
    ]
  },
  river_down: {
    text: "Following the river you find a downed tree forming a natural bridge and a gravel bar.",
    image: "assets/fork.svg",
    choices: [
      { label: "Cross using the log", goto: "log_cross" },
      { label: "Signal with a mirror from gravel bar", goto: "signal_bar" }
    ]
  },
  stay_put: {
    text: "You build a rock 'SOS', make a small safe camp, and wait.",
    image: "assets/fork.svg",
    choices: [
      { label: "Start a controlled campfire for warmth", goto: "campfire" },
      { label: "Blow whistle every few minutes", goto: "whistle" }
    ]
  },
  river_cross: {
    text: "The current is stronger than it looks. Midway, you slip.",
    image: "assets/fork.svg",
    choices: [
      { label: "Ride with the current, aim for eddy", goto: "river_escape" },
      { label: "Fight upstream to the bank", goto: "wrong_turn" }
    ]
  },
  cabin_knock: {
    text: "A volunteer ranger opens the door and calls dispatch.",
    image: "assets/safe_cabin.svg",
    choices: [],
    ending: true,
    endingKey: "safe_cabin",
    endingText: "Safe! You warm up at the cabin while help arrives."
  },
  cabin_enter: {
    text: "No one is inside, but the radio works. You raise a response and share your GPS.",
    image: "assets/ranger_rescue.svg",
    choices: [],
    ending: true,
    endingKey: "ranger_rescue",
    endingText: "Rescued! A team is dispatched to your location."
  },
  bear_backaway: {
    text: "You speak calmly and increase distance. The mother grunts and the brush settles.",
    image: "assets/storm_shelter.svg",
    choices: [
      { label: "Circle wide back to main trail", goto: "left_path" },
      { label: "Climb a tree to wait it out", goto: "lost_night" }
    ]
  },
  bear_run: {
    text: "The mother bear chases briefly; you drop your pack and zig-zag.",
    image: "assets/bear_encounter.svg",
    choices: [],
    ending: true,
    endingKey: "bear_encounter",
    endingText: "Close call! You escape but lose your gear and wait for daylight."
  },
  log_cross: {
    text: "You shimmy across. On the far side a faint road leads uphill.",
    image: "assets/river_escape.svg",
    choices: [
      { label: "Follow road toward radio tower", goto: "tower" },
      { label: "Rest by the trees", goto: "wrong_turn" }
    ]
  },
  signal_bar: {
    text: "Sun breaks through the fog. You flash a signal in a slow 3-3-3 pattern.",
    image: "assets/summit_signal.svg",
    choices: [],
    ending: true,
    endingKey: "summit_signal",
    endingText: "A helicopter spots you from the air. You're guided to safety."
  },
  storm: {
    text: "Wind rises. You find a rock overhang that could serve as shelter.",
    image: "assets/storm_shelter.svg",
    choices: [
      { label: "Shelter and wait the storm", goto: "storm_shelter" },
      { label: "Press on to the ridge crest", goto: "lost_night" }
    ]
  },
  tower: {
    text: "At the hilltop tower you find an emergency phone.",
    image: "assets/map_master.svg",
    choices: [],
    ending: true,
    endingKey: "map_master",
    endingText: "With directions from dispatch, you hike out confidently."
  },
  campfire: {
    text: "Friendly backpackers spot your smoke and invite you to their camp.",
    image: "assets/campfire_friends.svg",
    choices: [],
    ending: true,
    endingKey: "campfire_friends",
    endingText: "Community saves the day. Hot cocoa and a shared map!"
  },
  whistle: {
    text: "A distant whistle answers yours. It's a search team.",
    image: "assets/ranger_rescue.svg",
    choices: [],
    ending: true,
    endingKey: "ranger_rescue",
    endingText: "Your signaling worked—reunited with the main trail."
  },
  storm_shelter: {
    text: "You stay dry and warm. In the morning, tracks lead to a service road.",
    image: "assets/storm_shelter.svg",
    choices: [],
    ending: true,
    endingKey: "storm_shelter",
    endingText: "Patience pays off. You walk out safely after the storm."
  },
  lost_night: {
    text: "Darkness falls. Without a safe shelter, the cold sets in.",
    image: "assets/lost_night.svg",
    choices: [],
    ending: true,
    endingKey: "lost_night",
    endingText: "A tough night. At dawn, you find your bearings and head back."
  },
  river_escape: {
    text: "You float to the eddy and crawl ashore, exhausted but safe.",
    image: "assets/river_escape.svg",
    choices: [],
    ending: true,
    endingKey: "river_escape",
    endingText: "Water wise! You follow the bank to a ranger bridge."
  },
  wrong_turn: {
    text: "Oops—this path loops into thorny brush and dead ends.",
    image: "assets/wrong_turn.svg",
    choices: [],
    ending: true,
    endingKey: "wrong_turn",
    endingText: "You learned to trust your map. Try another day."
  }
};

const storyEl = document.getElementById('story');
const choicesEl = document.getElementById('choices');
const imageEl = document.getElementById('image');

let currentKey = 'start';

function render(key) {
  const node = story[key];
  if (!node) return;
  currentKey = key;

  imageEl.innerHTML = '';
  const img = document.createElement('img');
  img.src = node.image;
  img.alt = 'Scene image';
  imageEl.appendChild(img);

  storyEl.textContent = node.text;

  choicesEl.innerHTML = '';
  if (node.ending) {
    const p = document.createElement('p');
    p.className = 'small fade-in';
    p.textContent = node.endingText + '  ';
    storyEl.appendChild(p);

    const restart = document.createElement('button');
    restart.className = 'choice secondary';
    restart.textContent = 'Restart Adventure';
    restart.addEventListener('click', () => render('start'));
    choicesEl.appendChild(restart);
  } else {
    node.choices.forEach((c, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice fade-in' + (idx % 2 ? ' secondary' : '');
      btn.textContent = (idx + 1) + '. ' + c.label;
      btn.addEventListener('click', () => render(c.goto));
      choicesEl.appendChild(btn);
    });
  }
}

document.addEventListener('keydown', (e) => {
  const n = parseInt(e.key, 10);
  if (!isNaN(n) && n >= 1 && n <= choicesEl.children.length) {
    choicesEl.children[n - 1].click();
  }
});

window.addEventListener('DOMContentLoaded', () => render('start'));
