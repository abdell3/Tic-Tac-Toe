const boardEl = document.getElementById("board");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const sizeInput = document.getElementById("boardSize");
const winSize = document.getElementById("winSize");

const scoreP1El = document.getElementById("scoreP1");
const scoreP2El = document.getElementById("scoreP2");

let board = [];
let currentPlayer = 1;
let size = 3;
let win = 3;
let scores = { 1: 0, 2: 0 };

startBtn.addEventListener("click", initGame);
resetBtn.addEventListener("click", resetGame);

function initGame() {
    size = parseInt(sizeInput.value, 10);
    win = parseInt(winSize.value, 10);
    if (isNaN(size) || size < 3 || size > 10) {
        alert("Please enter a valid board size between 3 and 10.");
        return;
    }

    if (isNaN(win) || win < 3 || win > size) {
        alert("enter a valid number, less then the size chosen, except for 3, for more chance to win!");
        return ;
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

    if (board[row][col]) {
        return
    }; 

    board[row][col] = currentPlayer;
    cell.classList.add(currentPlayer === 1 ? "p1" : "p2");
    cell.textContent = currentPlayer === 1 ? "⬤" : "◆"; 

    if (checkWin(row, col)) {
        alert(`🎉 Player ${currentPlayer} wins!`);
        scores[currentPlayer]++;
        updateScore();
        initGame();
        return;
    }

    if (isBoardFull()) {
        alert("🤝 It's a draw!");
        initGame();
        return;
    }
    
    currentPlayer = currentPlayer === 1 ? 2 : 1
}

function checkWin(r, c) {
    r = parseInt(r);
    c = parseInt(c);
    
    function hasK(arr) {
        let count = 0;
        for (let val of arr) {
            if (val === currentPlayer) {
                count++;
                if (count >= win){
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }
    if (hasK(board[r])){
        return true;
    }
    
    if (hasK(board.map(row => row[c]))){ 
        return true;
    }
    if (r === c) {
        const diag = board.map((row, i) => row[i]);
        if (diag.every(cell => cell === currentPlayer) || hasK(diag)) {
            return true;
        }
    }
    if (r + c === size - 1) {
        const antiDiag = board.map((row, i) => row[size - 1 - i]);
        if (antiDiag.every(cell => cell === currentPlayer) || hasK(antiDiag)) {
            return true;
        }
    }

    let diag1 = [];
    for (let i = 0; i < size; i++) {
        let row = r - c + i;
        if (row >= 0 && row < size) {
            diag1.push(board[row][i]);
        }
    }
    if (hasK(diag1)) return true;

    let diag2 = [];
    for (let i = 0; i < size; i++) {
        let row = r + c - i;
        if (row >= 0 && row < size) {
            diag2.push(board[row][i]);
        }
    }
    if (hasK(diag2)) return true;


    return false;
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
