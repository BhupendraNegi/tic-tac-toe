let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function handleMove(cell) {
  const cellIndex = parseInt(cell.dataset.index);

  if (board[cellIndex] !== "" || !gameActive) {
    return;
  }

  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  
  if (checkWin()) {
    document.getElementById('status').textContent = `Player ${currentPlayer} wins! 🎉`;
    document.getElementById('status').style.color = 'green';
    gameActive = false;
    return;
  }
  
  if (board.includes("") === false) {
    document.getElementById('status').textContent = `It's a draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById('status').textContent = `Current player: ${currentPlayer}`;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  document.getElementById('status').textContent = `Current player: ${currentPlayer}`;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    handleMove(cell);
  });
});

document.getElementById('resetButton').addEventListener('click', resetGame);
