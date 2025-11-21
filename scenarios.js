export const gameScenario = {
  adults: {
    suspects: [
      "Miss Scarlett",
      "Reverend Green",
      "Colonel Mustard",
      "Doctor Orchid",
      "Miss Peacock",
      "Professor Plum",
    ],
    rooms: [
      "Library",
      "Study",
      "Hall",
      "Lounge",
      "Dining Room",
      "Kitchen",
      "Ball Room",
      "Conservatory",
      "Billiard Room",
    ],
    items: ["Candlestick", "Dagger", "Lead Pipe", "Revolver", "Rope", "Wrench"],

    prompts: {
      intro1:
        "I left you a clue... Or a body. Either way, I'm just getting started...",
      intro2: "A murder! Who? Where? How?",
      intro3: "It's your job to find out before another murder happens!",
      /* turn_research_suspect:
        "Use your detective skills to research a suspect and the room you are in.",
      turn_research_item:
        "Use your detective skills to research a weapon and the room you are in.",
      turn_solve_mystery:
        "Solve the mystery (but BEWARE! if your guess is wrong you are out)...", */
      guess_item: "What do you think the murder weapon was?",
      guess_suspect: "Who do you think did the deed?",
      correct_two: "Your detective skills are pristine!",
      correct_room: (roomName) => `The crime happened in the ${roomName} and `,
      correct_suspect: (suspectName) => `the culprit was ${suspectName}.`,
      correct_item: (itemName) => `the murder weapon used was ${itemName}.`,
      correct_one:
        "You're onto something - one detail lines up with the truth, but further investigation seems necessary...",
      correct_none:
        "Whoops.. Seems your hunch was completely off. Better luck next time!",
      final_room: "Where do you think the murder happened?",
      final_suspect: "Who do you believe committed the crime?",
      final_item: "Which weapon do you think is the murder weapon?",
      list_rooms: "Possible crime scenes: ",
      list_suspects: "Lineup of suspects in the mansion: ",
      list_items: "Weapons found on the premises: ",
      eliminate_player:
        "Ouch! I guess your detective skills could use some more ... refinement... You're out!",
      all_eliminated:
        "All detectives have been eliminated... The mystery remains unsolved and the murderer/murderess goes free...",
      mystery_solved: (winnerName, suspectName, roomName, itemName) =>
        `YAY! Detective ${winnerName} solved the mystery! It was ${suspectName} in the ${roomName} with the ${itemName}.`,
      new_crime:
        "Time slipped through your fingers... and the killer didn't waste a second. Another body lies cold, and the mansion trembles with fear. A new mystery begins — will you stop the murderer before they strike again?",
    },
  },

  kids: {
    suspects: [
      "Miss Scarlett",
      "Reverend Green",
      "Colonel Mustard",
      "Doctor Orchid",
      "Miss Peacock",
      "Professor Plum",
    ],
    rooms: [
      "Library",
      "Study",
      "Hall",
      "Lounge",
      "Dining Room",
      "Kitchen",
      "Ball Room",
      "Conservatory",
      "Billiard Room",
    ],
    items: [
      "Dinosaur",
      "Football",
      "Potato Head",
      "Racecar",
      "Teddy Bear",
      "Xylophone",
    ],

    prompts: {
      intro1: "Sorry, I broke the toy! I didn't mean to...",
      intro2: "What toy? Where is it? Who broke it?",
      intro3: "It's your job to find out before another toy is broken!",
      /* turn_research_suspect:
        "Use your detective skills to research a suspect and the room you are in.",
      turn_research_item:
        "Use your detective skills to research a toy and the room you are in.",
      turn_solve_mystery:
        "Solve the mystery (but BEWARE! if your guess is wrong you are out)...", */
      guess_item: "Which toy do you think got broken?",
      guess_suspect: "Who do you think caused the mischief?",
      correct_two: "Your detective skills are pristine!",
      correct_room: (roomName) => `The crime happened in the ${roomName} and `,
      correct_suspect: (suspectName) => `the culprit was ${suspectName}.`,
      correct_item: (itemName) => `the broken toy was ${itemName}.`,
      correct_one:
        "Nice try detective! One clue matches the truth, but the mystery isn't cracked just yet...",
      correct_none:
        "Oops! None of those were correct, but on the bright side you now know which ones to cross off your list.",
      final_room: "Where do you think the crime happened?",
      final_suspect: "Who do you think caused this mess?",
      final_item: "Which toy met an untimely end?",
      list_rooms: "Possible places of the crime: ",
      list_suspects: "Suspects spotted nearby: ",
      list_items: "Toys in the house: ",
      eliminate_player:
        "Oh no! That guess sent you on a wild goose chase. Time to let other detectives take the lead.",
      all_eliminated:
        "All detectives have been eliminated... The mystery remains unsolved...",
      mystery_solved: (winnerName, suspectName, roomName, itemName) =>
        `YAY! Detective ${winnerName} solved the mystery! It was ${suspectName} in the ${roomName} who broke ${itemName}.`,
      new_crime:
        "You ran out of time, detective! While you were thinking, another toy got smashed. Grab your magnifying glass — there's a new case to crack!",
    },
  },
};
