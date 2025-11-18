//
// Variables
//



//
// Methods & Functions
//

import { gameScenario } from "./scenarios";

function startGame(version) {
    const config = gameScenario[version];
    const game = new CluedoGame(config, players);
    game.start();
}

//
// Inits & Event Listeners
//