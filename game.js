import { gameScenario } from "./scenarios.js";
import * as display from "./display.js";

// =========================
// 1. SELECT MODE
// =========================

display.hideSectionsInitially();

let mode = null;
let scenario = null;

const modeAdults = document.querySelector("#adult-mode");
const modeKids = document.querySelector("#kids-mode");

modeAdults.addEventListener("click", () => selectMode("adults"));
modeKids.addEventListener("click", () => selectMode("kids"));

function selectMode(selectedMode) {
  console.log("Mode selected:", selectedMode);
  mode = selectedMode;
  scenario = gameScenario[mode];

  localStorage.setItem("gameMode", mode);

  document.getElementById("intro1").style.fontFamily =
    mode === "adults"
      ? '"Oooh Baby", Georgia, "Times New Roman", Times, serif'
      : '"Reenie Beanie", "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif';
  document.getElementById("intro1").innerHTML = scenario.prompts.intro1;
  document.getElementById("intro2").innerHTML = scenario.prompts.intro2;
  document.getElementById("intro3").innerHTML = scenario.prompts.intro3;

  display.transitionToSetup();
}

// =========================
// 2. SETUP GAME
// =========================

// Shows / hides play button section untill a name has been entered
const inputs = document.querySelectorAll('#playersetup input[type="text"]');
const playButtonSection = document.getElementById("startgamebutton");

inputs.forEach((input) => {
  input.addEventListener("input", checkInputs);
});

function checkInputs() {
  const hasValue = Array.from(inputs).some(
    (input) => input.value.trim() !== ""
  );
  if (hasValue) {
    playButtonSection.classList.remove("hidden");
  } else {
    playButtonSection.classList.add("hidden");
  }
}

// Setup mystery - pick random suspect, room and item
function setupMystery() {
  if (!scenario) {
    throw new Error(`Invalid mode: ${mode}`);
  }
  const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const mystery = {
    suspect: randomPick(scenario.suspects),
    room: randomPick(scenario.rooms),
    item: randomPick(scenario.items),
  };

  localStorage.setItem("mystery", JSON.stringify(mystery));
  console.log("Mystery setup: ", mystery);
  return mystery;
}

// Collect player data, set game values & start game
const playButton = document.getElementById("btn-play");

playButton.addEventListener("click", () => {
  const players = Array.from(inputs)
    .filter((input) => input.value.trim() !== "")
    .map((input, index) => {
      const form = input.closest("form");
      const img = form.querySelector("img");
      return {
        id: index + 1,
        name: input.value.trim(),
        avatar: img ? img.src : null,
        position: 0,
        isCurrentTurn: index === 0,
      };
    });
  localStorage.setItem("players", JSON.stringify(players));
  console.log("Players saved: ", players);

  setupMystery();

  document.querySelector("#player-list h2").style.fontFamily =
    mode === "adults"
      ? '"Oooh Baby", Georgia, "Times New Roman", Times, serif'
      : '"Reenie Beanie", "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif';

  display.transitionToGameplay();
});

// =========================
// 3. GAMEPLAY
// =========================

// Shows player list
function showPlayers() {
  const players = JSON.parse(localStorage.getItem("players"));

  const playerListDiv = document.querySelector("#player-list div");

  playerListDiv.innerHTML = "";

  players.forEach((player) => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");

    const img = document.createElement("img");
    img.src = player.avatar;
    img.alt = player.name;
    img.classList.add("avatar");

    const name = document.createElement("h3");
    name.textContent = "Detective " + player.name;

    if (player.isCurrentTurn){
      const arrow = document.createElement("img");
      arrow.src = "media/play.png";
      arrow.alt = "Current turn";
      arrow.classList.add("turn-arrow");
      playerDiv.insertBefore(arrow, img);
    };

    playerDiv.appendChild(img);
    playerDiv.appendChild(name);
    playerListDiv.appendChild(playerDiv);
  });
}

// =========================
// 4. FINISH
// =========================
