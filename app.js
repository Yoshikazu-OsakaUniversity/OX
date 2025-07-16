const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');

let currentPlayer = '○';
let gameOver = false;
let cells = Array(9).fill(null);

// マスを作成
function initBoard() {
  board.innerHTML = '';
  cells = Array(9).fill(null);
  gameOver = false;
  message.textContent = 'プレイヤー ○ の番です';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  if (gameOver) return;
  const index = e.target.dataset.index;
  if (cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    message.textContent = `プレイヤー ${currentPlayer} の勝ち！`;
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    message.textContent = '引き分け！';
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === '○' ? '×' : '○';
    message.textContent = `プレイヤー ${currentPlayer} の番です`;
  }
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // 横
    [0,3,6],[1,4,7],[2,5,8], // 縦
    [0,4,8],[2,4,6]          // 斜め
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

resetBtn.addEventListener('click', initBoard);

// 初期化
initBoard();

// PWA: Service Worker登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
