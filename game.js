import { gameScenario } from "./scenarios.js";

//
// Variables
//

const modeAdults = document.querySelector("#adult-mode");
const modeKids = document.querySelector("#kids-mode");
let mode = null;

//
// Methods & Functions
//


function startGame(version) {
    const config = gameScenario[version];
    const game = new CluedoGame(config, players);
    game.start();
}

//
// Inits & Event Listeners
//

versionAdults.addEventListener("click", () => {
    startGame('adult');
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('setup').style.display = 'block';
});

versionKids.addEventListener("click", () => {
    startGame('kids');
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('setup').style.display = 'block';
});