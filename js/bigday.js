// ===== ULTIMATE TIC-TAC-TOE =====
let utttState = {
    boards: Array(9).fill(null).map(() => Array(9).fill(null)),
    boardWinners: Array(9).fill(null),
    currentPlayer: 'X',
    activeBoard: -1, // -1 means any board
    gameOver: false,
    scoreX: 0,
    scoreO: 0
};

function initUTTT() {
    const container = document.getElementById('utttBoard');
    if (!container) return;
    container.innerHTML = '';

    for (let b = 0; b < 9; b++) {
        const bigCell = document.createElement('div');
        bigCell.className = 'uttt-big-cell';
        bigCell.id = `bigcell-${b}`;

        const miniBoard = document.createElement('div');
        miniBoard.className = 'uttt-mini-board';
        miniBoard.id = `miniboard-${b}`;

        for (let c = 0; c < 9; c++) {
            const cell = document.createElement('div');
            cell.className = 'uttt-play-cell';
            cell.dataset.board = b;
            cell.dataset.cell = c;
            cell.addEventListener('click', () => handleUTTTClick(b, c));
            miniBoard.appendChild(cell);
        }

        bigCell.appendChild(miniBoard);
        container.appendChild(bigCell);
    }

    highlightActiveBoards();
}

function handleUTTTClick(boardIdx, cellIdx) {
    if (utttState.gameOver) return;
    if (utttState.boardWinners[boardIdx]) return;
    if (utttState.boards[boardIdx][cellIdx]) return;
    if (utttState.activeBoard !== -1 && utttState.activeBoard !== boardIdx) return;

    utttState.boards[boardIdx][cellIdx] = utttState.currentPlayer;

    // Render cell
    const cell = document.querySelector(`.uttt-play-cell[data-board="${boardIdx}"][data-cell="${cellIdx}"]`);
    cell.textContent = utttState.currentPlayer;
    cell.classList.add(utttState.currentPlayer === 'X' ? 'cell-x' : 'cell-o');

    // Check mini-board winner
    const miniWinner = checkWinner(utttState.boards[boardIdx]);
    if (miniWinner) {
        utttState.boardWinners[boardIdx] = miniWinner;
        const bigCell = document.getElementById(`bigcell-${boardIdx}`);
        bigCell.classList.add('won', miniWinner === 'X' ? 'won-x' : 'won-o');
        bigCell.dataset.winner = miniWinner;
    } else if (utttState.boards[boardIdx].every(c => c !== null)) {
        utttState.boardWinners[boardIdx] = 'D'; // Draw
        const bigCell = document.getElementById(`bigcell-${boardIdx}`);
        bigCell.classList.add('won', 'won-draw');
    }

    // Check overall winner
    const overallWinner = checkWinner(utttState.boardWinners.map(w => w === 'D' ? null : w));
    if (overallWinner) {
        utttState.gameOver = true;
        const status = document.getElementById('utttStatus');
        status.textContent = `🎉 Player ${overallWinner} wins! 🎉`;
        status.style.color = overallWinner === 'X' ? '#ff6b6b' : '#6bb5ff';
        if (overallWinner === 'X') utttState.scoreX++;
        else utttState.scoreO++;
        document.getElementById('scoreX').textContent = utttState.scoreX;
        document.getElementById('scoreO').textContent = utttState.scoreO;
        clearHighlights();
        return;
    }

    // Check overall draw
    if (utttState.boardWinners.every(w => w !== null)) {
        utttState.gameOver = true;
        document.getElementById('utttStatus').textContent = "It's a draw! 🤝";
        clearHighlights();
        return;
    }

    // Determine next active board
    if (utttState.boardWinners[cellIdx]) {
        utttState.activeBoard = -1; // free choice
    } else {
        utttState.activeBoard = cellIdx;
    }

    // Switch player
    utttState.currentPlayer = utttState.currentPlayer === 'X' ? 'O' : 'X';
    const status = document.getElementById('utttStatus');
    status.textContent = `${utttState.currentPlayer === 'X' ? '❤️' : '💙'} Player ${utttState.currentPlayer}'s turn`;

    highlightActiveBoards();
}

function checkWinner(board) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function highlightActiveBoards() {
    for (let b = 0; b < 9; b++) {
        const bigCell = document.getElementById(`bigcell-${b}`);
        bigCell.classList.remove('active-board');
        if (!utttState.boardWinners[b]) {
            if (utttState.activeBoard === -1 || utttState.activeBoard === b) {
                bigCell.classList.add('active-board');
            }
        }
    }
}

function clearHighlights() {
    for (let b = 0; b < 9; b++) {
        document.getElementById(`bigcell-${b}`).classList.remove('active-board');
    }
}

function resetUTTT() {
    utttState.boards = Array(9).fill(null).map(() => Array(9).fill(null));
    utttState.boardWinners = Array(9).fill(null);
    utttState.currentPlayer = 'X';
    utttState.activeBoard = -1;
    utttState.gameOver = false;

    const status = document.getElementById('utttStatus');
    status.textContent = "❤️ Player X's turn";
    status.style.color = '';

    initUTTT();
}


// ===== LOVE-O-METER =====
let loveSpinning = false;

function spinLoveMeter() {
    if (loveSpinning) return;
    loveSpinning = true;

    const heart = document.getElementById('loveMeterHeart');
    const result = document.getElementById('loveMeterResult');
    result.textContent = '';
    heart.classList.add('spinning');

    const messages = [
        { pct: '100%', msg: "I love you infinity% — the meter broke! 💥❤️" },
        { pct: '99.9%', msg: "So close to 100%... just kidding, it's actually ∞% 😘" },
        { pct: '1000%', msg: "Off the charts! This thing can't even measure us! 📈💕" },
        { pct: '99%', msg: "The missing 1%? That's the part where you steal my hoodies 😂❤️" },
        { pct: '∞%', msg: "Infinity! Math doesn't go high enough for us 💖" },
        { pct: '101%', msg: "We broke the meter, Bujji! 🔥💗" },
        { pct: '100%', msg: "Maximum love detected. System overload! 💘🤯" },
    ];

    const pick = messages[Math.floor(Math.random() * messages.length)];

    setTimeout(() => {
        heart.classList.remove('spinning');
        result.innerHTML = `<div class="love-pct">${pick.pct}</div><div class="love-msg">${pick.msg}</div>`;
        loveSpinning = false;
    }, 1500);
}


// ===== EMOJI CATCHER GAME =====
let catcherScore = 0;
let catcherTimer = 20;
let catcherInterval = null;
let catcherSpawnInterval = null;
let catcherActive = false;

function startCatcher() {
    if (catcherActive) return;
    catcherActive = true;
    catcherScore = 0;
    catcherTimer = 20;
    document.getElementById('catcherScore').textContent = '0';
    document.getElementById('catcherTimer').textContent = '20';
    document.getElementById('catcherStart').style.display = 'none';

    const area = document.getElementById('catcherArea');
    // Remove old emojis
    area.querySelectorAll('.catcher-emoji').forEach(e => e.remove());

    catcherInterval = setInterval(() => {
        catcherTimer--;
        document.getElementById('catcherTimer').textContent = catcherTimer;
        if (catcherTimer <= 0) {
            endCatcher();
        }
    }, 1000);

    catcherSpawnInterval = setInterval(spawnCatcherEmoji, 600);
}

function spawnCatcherEmoji() {
    const area = document.getElementById('catcherArea');
    const rect = area.getBoundingClientRect();
    const emojis = ['❤️', '💕', '💖', '💗', '💘', '🍫', '🌹', '💝'];
    const emoji = document.createElement('div');
    emoji.className = 'catcher-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = (Math.random() * (rect.width - 40)) + 'px';
    emoji.style.top = (Math.random() * (rect.height - 60)) + 'px';
    emoji.addEventListener('click', (e) => {
        e.target.classList.add('caught');
        catcherScore++;
        document.getElementById('catcherScore').textContent = catcherScore;
        setTimeout(() => e.target.remove(), 200);
    });
    area.appendChild(emoji);
    // Remove if not clicked after 1.5s
    setTimeout(() => {
        if (emoji.parentNode) {
            emoji.classList.add('missed');
            setTimeout(() => emoji.remove(), 300);
        }
    }, 1500);
}

function endCatcher() {
    clearInterval(catcherInterval);
    clearInterval(catcherSpawnInterval);
    catcherActive = false;

    const area = document.getElementById('catcherArea');
    area.querySelectorAll('.catcher-emoji').forEach(e => e.remove());

    const btn = document.getElementById('catcherStart');
    btn.style.display = '';

    let msg = '';
    if (catcherScore >= 20) msg = `${catcherScore} hearts! You're a love machine! 💕🔥`;
    else if (catcherScore >= 12) msg = `${catcherScore} hearts! Amazing, Bujji! 💖`;
    else if (catcherScore >= 6) msg = `${catcherScore} hearts! Not bad! 😊❤️`;
    else msg = `${catcherScore} hearts! Try again, Nana! 🥰`;

    btn.textContent = `${msg} — Play Again?`;
}


// ===== COMPLIMENT GENERATOR =====
const compliments = [
    "You have the most beautiful eyes I've ever seen 🌟",
    "Your laugh is my favorite sound in the whole world 😂❤️",
    "You make even the boring days feel magical ✨",
    "I fall for you more every single day 💘",
    "You're the cutest person on the planet 🥰",
    "Your smile could literally cure anything 😊💖",
    "I'm the luckiest person alive because of you 🍀",
    "You're stronger than you know, Bujji 💪❤️",
    "Everything is better when you're around 🌈",
    "You deserve all the chocolates in the world 🍫💕",
    "Your voice is my favorite notification sound 📱❤️",
    "You make long distance feel like nothing 🌍💗",
    "I'd cross every ocean just to see you smile 🌊😊",
    "You're my favorite person, today and always 💖",
    "Even your stubbornness is adorable to me 😤❤️",
    "You're the reason I believe in soulmates 🫶",
];

let lastComplimentIdx = -1;

function generateCompliment() {
    const box = document.getElementById('complimentBox');
    const text = document.getElementById('complimentText');

    box.classList.add('compliment-pop');

    let idx;
    do {
        idx = Math.floor(Math.random() * compliments.length);
    } while (idx === lastComplimentIdx);
    lastComplimentIdx = idx;

    text.textContent = compliments[idx];

    setTimeout(() => box.classList.remove('compliment-pop'), 400);
}


// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initUTTT();
});
