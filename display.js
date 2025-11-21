// =============================
// 0. HIDDEN ELEMENTS FROM START
// =============================

import { gameScenario } from "./scenarios.js";

function setCurrentSection(section) {
  localStorage.setItem("currentSection", section);
}

export function hideSectionsInitially() {
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("gameplay").classList.add("hidden");
  document.getElementById("intro2").classList.add("hidden");
  document.getElementById("intro3").classList.add("hidden");
  document.getElementById("playersetup").classList.add("hidden");
  document.getElementById("startgamebutton").classList.add("hidden");
  document.getElementById("popup").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
}

// =============================
// 1. SELECT
// =============================

export function transitionToSetup() {
  setCurrentSection("setup");
  console.log("transitionToSetup called");
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("setup").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("intro2").classList.remove("hidden");
  }, 2000);
  setTimeout(() => {
    document.getElementById("intro3").classList.remove("hidden");
  }, 3500);
  setTimeout(() => {
    document.getElementById("playersetup").classList.remove("hidden");
  }, 5000);

}

// =============================
// 2. SETUP
// =============================

export function transitionToGameplay() {
  setCurrentSection("gameplay");
  console.log("transitionToSetup called");
    document.getElementById("welcome").classList.add("hidden");
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("gameplay").classList.remove("hidden");
}