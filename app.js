// ================================
// 1. Game State & Variables
// ================================

// Board array to track X and O; empty string "" means an unused cell
let board = ["", "", "", "", "", "", "", "", ""];

// Current player: 'X' or 'O'
let currentPlayer = "X";

// Flag to track if game is active
let gameActive = true;

// Possible winning combinations (indices of the board array)
const winningConditions = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

// DOM Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

// ================================
// 2. Initialization
// ================================

window.addEventListener("DOMContentLoaded", () => {
  updateStatus(`${currentPlayer}'s Turn`);
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
  restartBtn.addEventListener("click", restartGame);
});

// ================================
// 3. Functions
// ================================

function handleCellClick(e) {
  const clickedCell = e.target;
  const cellIndex = parseInt(clickedCell.getAttribute("data-index"));

  // If cell is not empty or game ended, ignore click
  if (board[cellIndex] !== "" || !gameActive) {
    return;
  }

  // Update board state
  board[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  // Check for a win or draw
  if (checkWin()) {
    updateStatus(`${currentPlayer} Wins!`);
    gameActive = false;
  } else if (board.every((cell) => cell !== "")) {
    updateStatus("It's a Draw!");
    gameActive = false;
  } else {
    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`${currentPlayer}'s Turn`);
  }
}

function checkWin() {
  // Check each winning condition
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
}

function updateStatus(message) {
  statusText.textContent = message;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach((cell) => (cell.textContent = ""));
  updateStatus(`${currentPlayer}'s Turn`);
}

