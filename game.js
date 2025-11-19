import { gameScenario } from "./scenarios.js";
import * as display from "./display.js";

// =========================
// 1. SELECT MODE
// =========================

display.hideSectionsInitially();

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

  display.transitionToSetup();
}

// =========================
// 2. SETUP GAME
// =========================

// TO DO: import players

const inputs = document.querySelectorAll('#playersetup input[type="text"]');
const playButton = document.getElementById("startgamebutton");

function checkInputs() {
  const hasValue = Array.from(inputs).some(
    (input) => input.value.trim() !== ""
  );
  if (hasValue) {
    playButton.classList.remove("hidden");
  } else {
    playButton.classList.add("hidden");
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", checkInputs);
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
