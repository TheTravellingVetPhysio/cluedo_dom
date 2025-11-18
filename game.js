import { gameScenario } from "./scenarios.js";

// =========================
// 1. SELECT MODE
// =========================

document.getElementById("setup").classList.add("hidden");
document.getElementById("gameplay").classList.add("hidden");
document.getElementById("results").classList.add("hidden");

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
  document.getElementById("intro1").style.fontFamily = mode === "adults" ? '"Oooh Baby", Georgia, "Times New Roman", Times, serif' : '"Reenie Beanie", "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif';
}

// =========================
// 2. SETUP GAME
// =========================


// TO DO: import players

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
