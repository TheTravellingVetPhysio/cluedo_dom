// =============================
// 0. HIDDEN ELEMENTS FROM START
// =============================

export function hideSectionsInitially() {
      document.getElementById("welcome").classList.add("hidden");
  document.getElementById("setup").classList.add("hidden");
/*   document.getElementById("gameplay").classList.add("hidden");
 */  document.getElementById("results").classList.add("hidden");
  document.getElementById("intro2").classList.add("hidden");
  document.getElementById("intro3").classList.add("hidden");
  document.getElementById("playersetup").classList.add("hidden");
  document.getElementById("startgamebutton").classList.add("hidden");
}

// =============================
// 1. SELECT
// =============================

export function transitionToSetup() {
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
  console.log("transitionToSetup called");
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("gameplay").classList.remove("hidden");
}