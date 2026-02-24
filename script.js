const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");

const Gameboard = (() => {
  let gameboard = [
    //Gameboard visual
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const getGameboard = () => gameboard;
  const setGameboard = (newBoard) => {
    gameboard = newBoard;
  };

  return { getGameboard, setGameboard };
})();

const styleGameboard = () => {
  const gameboard = Gameboard.getGameboard();
  const newStyle = `
  ${gameboard[0]} ${gameboard[1]} ${gameboard[2]} \n
  ${gameboard[3]} ${gameboard[4]} ${gameboard[5]} \n
  ${gameboard[6]} ${gameboard[7]} ${gameboard[8]}
  `;

  const getGameboardStyle = () => newStyle;

  return { getGameboardStyle };
};

const Player = (playerName, marker) => {
  const getPlayerMarker = () => marker;
  const getPlayerName = () => playerName;

  return { getPlayerMarker, getPlayerName };
};

const checkWin = (playerMarker) => {
  const gameboard = Gameboard.getGameboard();
  const m = playerMarker;

  return (
    (gameboard[0] === m && gameboard[1] === m && gameboard[2] === m) ||
    (gameboard[3] === m && gameboard[4] === m && gameboard[5] === m) ||
    (gameboard[6] === m && gameboard[7] === m && gameboard[8] === m) ||
    (gameboard[6] === m && gameboard[4] === m && gameboard[2] === m) ||
    (gameboard[0] === m && gameboard[4] === m && gameboard[8] === m) ||
    (gameboard[0] === m && gameboard[3] === m && gameboard[6] === m) ||
    (gameboard[1] === m && gameboard[4] === m && gameboard[7] === m) ||
    (gameboard[2] === m && gameboard[5] === m && gameboard[8] === m)
  );
};

const placeMarkerFunc = (position, playerMarker) => {
  const gameboard = Gameboard.getGameboard();
  const index = parseInt(position) - 1;
  if (!(index >= 0 && index <= 8)) {
    //Checking to see if the player's input is through 1-9
    alert("Invalid input");
    return false;
  }
  if (gameboard[index] === "X" || gameboard[index] === "O") {
    alert("This spot is already taken!");
    return false;
  }

  gameboard[index] = playerMarker;
  return true;
};

function playAgain() {
  const playAgain = prompt("Would you like to play again? (y: yes, n: no)");
  if (playAgain === "y") {
    return true;
  } else if (playAgain === "n") {
    return false;
  } else {
    alert("Please enter a valid answer.");
    playAgain();
  }
}

function resetGame() {
  const newGameboard = [
    //Gameboard visual
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  Gameboard.setGameboard(newGameboard);
}

function gameLogic() {
  let gameOver = false;
  const player1Name = prompt("What is player1's name?: ");
  const player2Name = prompt("What is player2's name?: ");
  const player1 = Player(player1Name, "X");
  const player2 = Player(player2Name, "O");

  while (gameOver === false) {
    //Player 1's Turn

    let gameboardStyle1 = styleGameboard().getGameboardStyle();
    let player1MarkerPosition = prompt(
      `${gameboardStyle1}\n ${player1.getPlayerName()} Place a marker (Enter: 1-9)`
    );
    while (!placeMarkerFunc(player1MarkerPosition, player1.getPlayerMarker())) {
      player1MarkerPosition = prompt("Try again:");
    }

    //Check if the player won
    if (checkWin(player1.getPlayerMarker())) {
      alert(`${player1.getPlayerName()} wins!`);
      gameOver = true;
      break;
    }

    //Player 2's Turn

    let gameboardStyle2 = styleGameboard().getGameboardStyle();

    let player2MarkerPosition = prompt(
      `${gameboardStyle2}\n ${player2.getPlayerName()} Place a marker (Enter: 1-9)`
    );
    while (!placeMarkerFunc(player2MarkerPosition, player2.getPlayerMarker())) {
      player2MarkerPosition = prompt("Try again:");
    }

    //Check if the player won
    if (checkWin(player2.getPlayerMarker())) {
      alert(`${player2.getPlayerName()} wins!`);
      gameOver = true;
      break;
    }
  }

  if (playAgain()) {
    resetGame();
    gameLogic();
  }
}

gameLogic();

//NOTES

//Reset the game once it finishes
//Stop the game from promting once someone wins.
