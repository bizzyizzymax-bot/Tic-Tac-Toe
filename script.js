const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector(".status");
const resetBtn = document.querySelector(".reset");

// GAMEBOARD

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

// CREATE PLAYER OBJECTS

const Player = (playerName, marker) => {
  const getPlayerMarker = () => marker;
  const getPlayerName = () => playerName;

  return { getPlayerMarker, getPlayerName };
};

// CHECK IF THE PLAYER HAS WON

const checkWin = (player, player1) => {
  const gameboard = Gameboard.getGameboard();
  const m = player.getPlayerMarker();

  if (
    (gameboard[0] === m && gameboard[1] === m && gameboard[2] === m) ||
    (gameboard[3] === m && gameboard[4] === m && gameboard[5] === m) ||
    (gameboard[6] === m && gameboard[7] === m && gameboard[8] === m) ||
    (gameboard[6] === m && gameboard[4] === m && gameboard[2] === m) ||
    (gameboard[0] === m && gameboard[4] === m && gameboard[8] === m) ||
    (gameboard[0] === m && gameboard[3] === m && gameboard[6] === m) ||
    (gameboard[1] === m && gameboard[4] === m && gameboard[7] === m) ||
    (gameboard[2] === m && gameboard[5] === m && gameboard[8] === m)
  ) {
    if (player === player1) {
      alert("Player 1 Wins!");
      gameStatus.textContent = "Player 1 Wins!";
    } else {
      alert("Player 2 Wins!");
      gameStatus.textContent = "Player 2 Wins!";
    }
    return player;
  }

  return false;
};

// PLAY AGAIN

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

// RESET GAME

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

// GAME LOGIC

const gameLogic = (() => {
  let gameRunning = true;
  const gameboard = Gameboard.getGameboard();
  const player1 = Player("Player1", "X");
  const player2 = Player("Player2", "O");
  let currentPlayer = player1;

  cells.forEach((cell) => {
    cell.addEventListener("click", function () {
      const mark = currentPlayer.getPlayerMarker();
      const index = parseInt(cell.id) - 1;

      if (gameRunning) {
        if (index >= 0 && index < gameboard.length) {
          if (gameboard[index] === "X" || gameboard[index] === "O") {
            alert("This spot is already taken! Please select another one.");
          } else {
            gameboard[index] = mark;
            cell.textContent = mark;
            if (!checkWin(currentPlayer, player1, player2)) {
              if (currentPlayer === player1) {
                currentPlayer = player2;
                cell.classList.add("X");
                gameStatus.textContent = "Player 2's Turn";
              } else {
                currentPlayer = player1;
                cell.classList.add("O");
                gameStatus.textContent = "Player 1's Turn";
              }
            } else {
              if (currentPlayer === player1) {
                cell.classList.add("X");
              } else {
                cell.classList.add("O");
              }
              gameRunning = false;
            }
          }
        }
      }
    });
  });

  resetBtn.addEventListener("click", () => {
    window.location.reload();
  });
})();

//NOTES

// Gameboard is an object that contains the gameboard array.
// Player is an object that contains the player's name and marker.
// checkWin is a function that checks if the player has won.
// playAgain is a function that asks the player if they want to play again.
// resetGame is a function that resets the gameboard.
// gameLogic is a function that contains the game logic.
