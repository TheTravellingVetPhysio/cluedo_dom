import { gameScenario } from "./scenarios.js";

// =========================
// 0. HIDDEN ELEMENTS
// =========================

document.getElementById("setup").classList.add("hidden");
document.getElementById("gameplay").classList.add("hidden");
document.getElementById("results").classList.add("hidden");
document.getElementById("intro2").classList.add("hidden");
document.getElementById("intro3").classList.add("hidden");
document.getElementById("playersetup").classList.add("hidden");
document.getElementById("startgamebutton").classList.add("hidden");

// =========================
// 1. SELECT MODE
// =========================

let mode = null;
let config = null;

const modeAdults = document.querySelector("#adult-mode");
const modeKids = document.querySelector("#kids-mode");

modeAdults.addEventListener("click", () => selectMode("adults"));
modeKids.addEventListener("click", () => selectMode("kids"));

function selectMode(selectedMode) {
  console.log("Mode selected:", selectedMode);
  mode = selectedMode;
  config = gameScenario[mode];

  localStorage.setItem("gameMode", mode);

  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("setup").classList.remove("hidden");
  document.getElementById("intro1").innerHTML = config.prompts.intro1;
  document.getElementById("intro1").style.fontFamily =
    mode === "adults"
      ? '"Oooh Baby", Georgia, "Times New Roman", Times, serif'
      : '"Reenie Beanie", "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif';
  setTimeout(() => {
    document.getElementById("intro2").innerHTML = config.prompts.intro2;
    document.getElementById("intro2").classList.remove("hidden");
  }, 2000);
  setTimeout(() => {
    document.getElementById("intro3").innerHTML = config.prompts.intro3;
    document.getElementById("intro3").classList.remove("hidden");
  }, 3500);
  setTimeout(() => {
    document.getElementById("playersetup").classList.remove("hidden");
  }, 5000);
}

// =========================
// 2. SETUP GAME
// =========================

// TO DO: import players

const inputs = document.querySelectorAll('#playersetup input[type="text"]');
const playButton = document.getElementById('startgamebutton');

function checkInputs() {
  const hasValue = Array.from(inputs).some(input => input.value.trim() !== '');
  if (hasValue) {
    playButton.classList.remove('hidden');
  }
  else {
    playButton.classList.add('hidden')
  }
}

inputs.forEach(input => {
  input.addEventListener('input', checkInputs);
});

/* function startGame() {
  const game = new CluedoGame(config, players);
  game.start();
  document.getElementById("setup").style.display = "none";
  document.getElementById("gameplay").style.display = "block";
} */

// =========================
// 3. GAMEPLAY
// =========================

// =========================
// 4. FINISH
// =========================
