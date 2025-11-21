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

  /*   localStorage.clear(); make it more specific
   */ localStorage.setItem("gameMode", mode);

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

  document.querySelector("#players-section h2").style.fontFamily =
    mode === "adults"
      ? '"Oooh Baby", Georgia, "Times New Roman", Times, serif'
      : '"Reenie Beanie", "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif';

  display.transitionToGameplay();

  showPlayers();
  placeAvatars();
});

// =========================
// 3. GAMEPLAY
// =========================

// SHOWS PLAYER LIST
function showPlayers() {
  const players = JSON.parse(localStorage.getItem("players")) || [];

  const playerListDiv = document.querySelector("#player-list");

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

    const arrow = document.createElement("img");
    arrow.classList.add("turn-arrow");

    if (player.isCurrentTurn) {
      arrow.src = "media/play.png";
      arrow.alt = "Current turn";
    } else {
      arrow.style.width = "30px";
    }

    playerDiv.append(arrow);
    playerDiv.appendChild(img);
    playerDiv.appendChild(name);
    playerListDiv.appendChild(playerDiv);
  });
}

// PLACE AVATARS ON GAME BOARD
function placeAvatars() {
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const container = document.getElementById("avatars-container");
  container.innerHTML = "";

  // Group players by position
  const playerGroups = {};
  for (let i = 0; i < players.length; i++) {
    const playerPosition = players[i].position;
    if (!playerGroups[playerPosition]) playerGroups[playerPosition] = [];
    playerGroups[playerPosition].push(players[i]);
  }

  // Render avatars with offsets
  for (const playerPosition in playerGroups) {
    const group = playerGroups[playerPosition];
    for (let i = 0; i < group.length; i++) {
      const player = group[i];
      const avatar = document.createElement("img");
      avatar.src = player.avatar;
      avatar.alt = player.name;
      avatar.classList.add("avatar");
      avatar.style.position = "absolute";

      if (playerPosition === "0") {
        const centerX = 50;
        const centerY = 50;
        const radius = 35;
        const angle = (i / group.length) * 2 * Math.PI;
        avatar.style.left = `calc(${centerX}% + ${Math.cos(angle) * radius}px)`;
        avatar.style.top = `calc(${centerY}% + ${Math.sin(angle) * radius}px)`;
        avatar.style.transform = "translate(-50%,-50%)";
      } else {
        const roomDiv = document.querySelector(
          `[data-room="${playerPosition}"]`
        );
        if (roomDiv) {
          const roomDivDimensions = roomDiv.getBoundingClientRect();
          const boardDimensions = document
            .getElementById("gameboard")
            .getBoundingClientRect();
          const roomCenterX =
            roomDivDimensions.left -
            boardDimensions.left +
            roomDivDimensions.width / 2;
          const roomCenterY =
            roomDivDimensions.top -
            boardDimensions.top +
            roomDivDimensions.height / 2;
          const radius = 30;
          const angle = (i / group.length) * 2 * Math.PI;

          avatar.style.left = `${roomCenterX + Math.cos(angle) * radius}px`;
          avatar.style.top = `${roomCenterY + Math.sin(angle) * radius}px`;
          avatar.style.transform = "translate(-50%, -50%)";
        }
      }
      container.appendChild(avatar);
    }
  }
}

// MOVE TO ROOM
function moveToRoom(roomName) {
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const currentPlayerIndex = players.findIndex(
    (player) => player.isCurrentTurn
  );
  players[currentPlayerIndex].position = roomName;
  localStorage.setItem("players", JSON.stringify(players));
  console.log(`Player moved to: ${roomName}`);
  placeAvatars();
  handleTurn();
}

// POPUP FOR DIFFERENT ACTIONS
function showPopup(type) {
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");

  const title = document.getElementById("popup-title");
  const content = document.getElementById("popup-content");
  content.innerHTML = "";

  // Partial guess on suspect
  if (type === "suspects") {
    title.textContent = scenario.prompts.guess_suspect;
    const suspectListLabel = document.createElement("p");
    suspectListLabel.textContent = scenario.prompts.list_suspects;
    content.appendChild(suspectListLabel);

    for (let i = 0; i < scenario.suspects.length; i++) {
      const suspect = scenario.suspects[i];
      const div = document.createElement("div");
      div.classList.add("guess-display");
      div.dataset.suspect = suspect;
      div.innerHTML = `
    <img src="media/${suspect
      .toLowerCase()
      .replace(/\s+/g, "_")}.png" alt="${suspect}">
      <h3>${suspect}</h3>`;
      content.appendChild(div);
      div.addEventListener("click", () => guessSuspect(suspect));
    }
  }

  // Partial guess on item
  else if (type === "items") {
    title.textContent = scenario.prompts.guess_item;
    const itemListLabel = document.createElement("p");
    itemListLabel.textContent = scenario.prompts.list_items;
    content.appendChild(itemListLabel);

    for (let i = 0; i < scenario.items.length; i++) {
      const item = scenario.items[i];
      const div = document.createElement("div");
      div.classList.add("guess-display");
      div.dataset.item = item;
      div.innerHTML = `
      <img src="media/${item
        .toLowerCase()
        .replace(/\s+/g, "_")}.png" alt="${item}">
      <h3>${item}</h3>`;
      content.appendChild(div);
      div.addEventListener("click", () => guessItem(item));
    }
  }

  // If both elements of partial guesses are correct
  else if (type === "correcttwo") {
    title.innerHTML = scenario.prompts.correct_two;
    let details = "";

    if (correctRoom) {
      details += scenario.prompts.correct_room(mystery.room);
    }

    if (correctSuspect) {
      details += scenario.prompts.correct_suspect(mystery.suspect);
    }

    if (correctItem) {
      details += scenario.prompts.correct_item(mystery.item);
    }

    content.innerHTML = `<img src="media/correcttwo.png" alt="Two correct">
    <p>${details}</p>`;
  }

  // If one element of partial guess is correct
  else if (type === "correctone") {
    title.textContent = scenario.prompts.correct_one;
    content.innerHTML = `<img src="media/correctone.png" alt="One correct">`;
  }

  // If no elements of partial guess is correct
  else if (type === "correctnone") {
    title.textContent = scenario.prompts.correct_none;
    content.innerHTML = `<img src="media/correctnone.png" alt="One correct">`;
  }

  // Submit final guess popup
  else if (type === "finalguess") {
    content.innerHTML = "";
    localStorage.removeItem("finalGuessSuspect");
    localStorage.removeItem("finalGuessItem");

    title.textContent = "Make your final guess!";
    const disclaimer = document.createElement("p");
    disclaimer.textContent =
      "You only have ONE final guess! Choose carefully...";
    content.appendChild(disclaimer);

    // Add submit button
    const submit = document.createElement("img");
    submit.src = "media/play.png";
    submit.alt = "Press to submit your final guess";
    submit.id = "final-guess-submit-btn";
    submit.classList.add("hidden");

    function showSubmitButton() {
      const suspectSelected = localStorage.getItem("finalGuessSuspect");
      const itemSelected = localStorage.getItem("finalGuessItem");
      if (suspectSelected && itemSelected) {
        submit.classList.remove("hidden");
      } else {
        submit.classList.add("hidden");
      }
    }

    // Render suspects
    const suspectsContainer = document.createElement("div");
    suspectsContainer.classList.add("final-guess-grid");

    const suspectListLabel = document.createElement("p");
    suspectListLabel.textContent = scenario.prompts.list_suspects;
    suspectsContainer.appendChild(suspectListLabel);
    content.appendChild(suspectsContainer);

    for (let i = 0; i < scenario.suspects.length; i++) {
      const suspect = scenario.suspects[i];
      const suspectDiv = document.createElement("div");
      suspectDiv.classList.add("guess-display");
      suspectDiv.dataset.suspect = suspect;
      suspectDiv.innerHTML = `
      <img src="media/${suspect
        .toLowerCase()
        .replace(/\s+/g, "_")}.png" alt="${suspect}">
        <h3>${suspect}</h3>`;

      suspectDiv.addEventListener("click", () => {
        const suspectList =
          suspectsContainer.querySelectorAll(".guess-display");
        for (let j = 0; j < suspectList.length; j++) {
          // Removes the selected from any other suspects, that might have been selected earlier
          suspectList[j].classList.remove("selected");
        }

        suspectDiv.classList.add("selected");
        localStorage.setItem("finalGuessSuspect", suspect);
        showSubmitButton();
      });
      suspectsContainer.appendChild(suspectDiv);
    }

    // Render items
    const itemsContainer = document.createElement("div");
    itemsContainer.classList.add("final-guess-grid");

    const itemListLabel = document.createElement("p");
    itemListLabel.textContent = scenario.prompts.list_items;
    itemsContainer.appendChild(itemListLabel);

    for (let i = 0; i < scenario.items.length; i++) {
      const item = scenario.items[i];
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("guess-display");
      itemDiv.dataset.item = item;
      itemDiv.innerHTML = `
      <img src="media/${item
        .toLowerCase()
        .replace(/\s+/g, "_")}.png" alt="${item}">
        <h3>${item}</h3>`;

      itemDiv.addEventListener("click", () => {
        const itemList = itemsContainer.querySelectorAll(".guess-display");
        for (let j = 0; j < itemList.length; j++) {
          // Removes the selected from any other items, that might have been selected earlier
          itemList[j].classList.remove("selected");
        }

        itemDiv.classList.add("selected");
        localStorage.setItem("finalGuessItem", item);
        showSubmitButton();
      });
      itemsContainer.appendChild(itemDiv);
    }

    content.appendChild(itemsContainer);
    content.appendChild(submit);
    submit.addEventListener("click", () => handleFinalGuess());
  }

  // Final guess wrong
  else if (type === "final-guess-wrong") {
    title.textContent = scenario.prompts.eliminate_player;
    content.innerHTML = `<img src="media/no.png">`;

    let countdown = 5;
    const timerText = document.createElement("p");
    timerText.textContent = `Next turn in ${countdown} seconds...`;
    content.appendChild(timerText);

    const interval = setInterval(() => {
      countdown--;
      timerText.textContent = `Next turn in ${countdown} seconds...`;
      if (countdown === 0) clearInterval(interval);
    }, 1000);

    setTimeout(() => {
      handleTurn();
      popup.classList.add("hidden");
    }, 5000);
  }

  // All players eliminated
  else if (type === "all-eliminated") {
    title.textContent = scenario.prompts.all_eliminated;

    const replayDiv = document.createElement("p");
    replayDiv.textContent = "Do you want to try again? Press the button below!";
    const replay = document.createElement("img");
    replay.src = "media/reset.png";
    replay.alt = "Reset the game";
    replayDiv.appendChild(replay);
    content.appendChild(replayDiv);

    replay.addEventListener("click", () => resetGame());
  }

  // Mystery solved
  else if (type === "mystery-solved") {
    title.textContent = scenario.prompts.mystery_solved(
      winnerName,
      suspectName,
      roomName,
      itemName
    );

    content.classList.add("confetti");

    const confettiDiv = document.createElement("div");
    const confetti = document.createElement("img");
    confetti.src = "media/confetti.png";
    confetti.alt = "Confetti because you won the game!";
    confettiDiv.appendChild(confetti);
    content.appendChild(confettiDiv);

    const replayDiv = document.createElement("h3");
    replayDiv.textContent =
      "Do you wish to play again? Press the button below!";
    const replay = document.createElement("img");
    replay.src = "media/reset.png";
    replay.alt = "Reset the game";
    replayDiv.appendChild(replay);
    content.appendChild(replayDiv);

    replay.addEventListener("click", () => resetGame());
  }

  // Reset confirmation
  else if (type === "reset") {
    title.textContent =
      "Are you sure you want to reset the game & lose your progress?";
    const resetDiv = document.createElement("div");
    resetDiv.classList.add("flex-row");
    const yes = document.createElement("img");
    yes.src = "media/yes.png";
    yes.alt = "Yes, reset the game";
    const no = document.createElement("img");
    no.src = "media/no.png";
    no.alt = "No, keep the game";
    resetDiv.appendChild(yes);
    resetDiv.appendChild(no);
    content.appendChild(resetDiv);

    yes.addEventListener("click", () => resetGame());
    no.addEventListener("click", () => {
      popup.classList.add("hidden");
    });
  }

  // Times up
  else if (type === "times-up") {
    title.textContent = "Time is up!";

    const newcrime = document.createElement("p");
    newcrime.textContent = scenario.prompts.new_crime;

    content.appendChild(newcrime);

    const replay = document.createElement("img");
    replay.src = "media/reset.png";
    replay.alt = "Reset the game";
    content.appendChild(replay);

    replay.addEventListener("click", () => resetGame());
  }
}

function guessSuspect() {}
function guessItem() {}
function handleFinalGuess() {}

function resetGame() {
  // Reset variables, classes etc.
  window.location.reload();

  // TO-DO Clear localStorage
}

function handleTurn() {
  const players = JSON.parse(localStorage.getItem("players")) || [];
  if (players.length === 0) {
    showPopup("all-eliminated");
    return;
  };

  let currentPlayerIndex = -1;

  for (let i = 0; i < players.length; i++) {
    if (players[i].isCurrentTurn) {
      currentPlayerIndex = i;
      break;
    }
  }

  if (currentPlayerIndex !== -1) {
    players[currentPlayerIndex].isCurrentTurn = false;
  }

  let nextPlayerIndex;

  if (players.length === 1) {
    nextPlayerIndex = 0;
  } else {
    nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  }

  players[nextPlayerIndex].isCurrentTurn = true;

  localStorage.setItem("players", JSON.stringify(players));
  showPlayers();
};


// =========================
// 4. CLICK-EVENTS
// =========================

document.querySelectorAll("[data-room]").forEach((el) => {
  el.addEventListener("click", (e) => {
    moveToRoom(e.target.dataset.room);
  });
});