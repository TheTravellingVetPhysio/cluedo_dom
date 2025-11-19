// =============================
// 0. HIDDEN ELEMENTS FROM START
// =============================

export function hideSectionsInitially() {
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("gameplay").classList.add("hidden");
  document.getElementById("results").classList.add("hidden");
  document.getElementById("intro2").classList.add("hidden");
  document.getElementById("intro3").classList.add("hidden");
  document.getElementById("playersetup").classList.add("hidden");
  document.getElementById("startgamebutton").classList.add("hidden");
}

// =============================
// 1. SELECT
// =============================

export function transitionToSetup() {
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

// =============================
// 2. SETUP
// =============================
