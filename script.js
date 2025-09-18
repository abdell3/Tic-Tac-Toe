const boardEl = document.getElementById("board");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const sizeInput = document.getElementById("boardSize");

const scoreP1El = document.getElementById("scoreP1");
const scoreP2El = document.getElementById("scoreP2");

let board = [];
let currentPlayer = 1;
let size = 3;
let scores = { 1: 0, 2: 0 };

startBtn.addEventListener("click", initGame);
resetBtn.addEventListener("click", resetGame);

function initGame() {
  size = parseInt(sizeInput.value);
    if (isNaN(size) || size < 3 || size > 10) {
        alert("Please enter a valid board size between 3 and 10.");
        return;
    }
  board = Array(size).fill(null).map(() => Array(size).fill(null));
  boardEl.style.gridTemplateColumns = `repeat(${size}, 70px)`;
  boardEl.innerHTML = "";

  board.forEach((row, i) => {
    row.forEach((_, j) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", handleMove);
      boardEl.appendChild(cell);
    });
  });

  currentPlayer = 1;
}

function handleMove(e) {
  const cell = e.target;
  const row = cell.dataset.row;
  const col = cell.dataset.col;

  if (board[row][col]) return; 

  board[row][col] = currentPlayer;
  cell.classList.add(currentPlayer === 1 ? "p1" : "p2");
  cell.textContent = currentPlayer === 1 ? "⬤" : "◆"; 

  
  if (isBoardFull()) {
    alert("🤝 It's a draw!");
    initGame();
    return;
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
}



function isBoardFull() {
  return board.flat().every(cell => cell !== null);
}

function updateScore() {
  scoreP1El.textContent = scores[1];
  scoreP2El.textContent = scores[2];
}

function resetGame() {
  scores = { 1: 0, 2: 0 };
  updateScore();
  initGame();
}
initGame();
