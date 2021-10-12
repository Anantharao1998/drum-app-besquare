// nested objects of sounds
const sounds = {
  boom: {
    key: "g",
    audio: "boom.wav",
  },

  clap: {
    key: "a",
    audio: "clap.wav",
  },

  hi_hat: {
    key: "s",
    audio: "hi_hat.wav",
  },

  kick: {
    key: "d",
    audio: "kick.wav",
  },

  open_hat: {
    key: "f",
    audio: "open_hat.wav",
  },

  ride: {
    key: "h",
    audio: "ride.wav",
  },

  snare: {
    key: "j",
    audio: "snare.wav",
  },

  tink: {
    key: "l",
    audio: "tink.wav",
  },

  tom: {
    key: "k",
    audio: "tom.wav",
  },
};

// play sound according to chosen key or button
const playSound = (sound) => {
  let audio = new Audio(`sounds/${sounds[sound].audio}`);
  audio.play();
};

// event listening when key press
document.addEventListener("keypress", (event) => {
  let keyInput = event.key;

  // loop through the sounds object
  for (const sound in sounds) {
    if (keyInput === sounds[sound].key) {
      playSound(sound);
    }
  }
});

// event listener when button click
let keyBox = document.getElementById("key-box");
let keyBoxChildren = Array.from(keyBox.children);

for (const sound in keyBoxChildren) {
  keyBoxChildren[sound].addEventListener("click", () => {
    keyClick = keyBoxChildren[sound].id;
    // loop through the sounds object
    for (const sound in sounds) {
      if (keyClick === sound) {
        playSound(sound);
      }
    }
  });
}

// generate random sequence of sound
// insert keys of sounds into an array
const soundKeys = [];
for (const sound in sounds) {
  soundKeys.push(sounds[sound].key);
}

// function to shuffle the array
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

let targetCards = document.querySelectorAll(".target-card");
let targetParent = document.querySelector(".target-box");
let soundKeyIndex = 0;
let interval_id;

// events when start game is clicked
// shuffles and inserts sequence of keys
document.getElementById("start").addEventListener("click", () => {
  console.log("Game Started!!!");
  console.log(interval_id);
  clearInterval(interval_id);
  console.log(interval_id);
  startTime(360);

  shuffle(soundKeys);
  soundKeyIndex = 0;
  for (let i = 3; i > -1; i--) {
    targetParent.children[i].textContent =
      soundKeys[soundKeyIndex].toUpperCase();
    soundKeyIndex += 1;
  }

  for (let i = 6; i > 3; i--) {
    targetParent.children[i].classList.remove("correct");
    targetParent.children[i].classList.remove("wrong");
    targetParent.children[i].textContent = "";
  }

  // initialize score
  score = 0;
  score_id.textContent = 0;
  // add event listener keypress
  document.addEventListener("keypress", arrangeTargetContent);
});

let score_id = document.getElementById("score");
let score = 0;

function rotateRight(arr) {
  let last = arr.pop();
  arr.unshift(last);
  return arr;
}

// change the arrangment of the target-card
// determine if key input is the same with the active target-card value
const arrangeTargetContent = (event) => {
  if (event.key.toUpperCase() === targetParent.children[3].textContent) {
    targetParent.children[3].classList.add("correct");

    score = score + 1;
    score_id.textContent = score;
  } else {
    targetParent.children[3].classList.add("wrong");
  }
  targetParent.children[3].classList.remove("active");
  temp = Array.from(targetParent.children);
  rotateRight(temp).forEach((value, index) => {
    if (index < 3) {
      value.classList.remove(...value.classList);
      value.classList.add("target-card");
      value.textContent =
        shuffle(soundKeys)[
          Math.floor(Math.random() * soundKeys.length)
        ].toUpperCase();
    }
    targetParent.appendChild(value);
  });
  targetParent.children[3].classList.add("active");
};

//timer
function startTime(duration) {
  let current_time = 30;
  interval_id = setInterval(() => {
    current_time--;
    const timer_id = document.getElementById("timer");
    timer_id.textContent = formatTime(current_time);
    if (current_time === 0) {
      clearInterval(interval_id);
      document.removeEventListener("keypress", arrangeTargetContent);
    }
  }, 1000);
}

function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);
  return `${minutes}:${seconds}`;
}
