const boardSize = 5;
const board = [];
let timerInterval;

function initBoard() 
{
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    for (let row = 0; row < boardSize; row++) 
        {
        board[row] = [];
        for (let col = 0; col < boardSize; col++) 
            {
            const cell = document.createElement('div');
            cell.classList.add('is-off');
            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener('click', () => toggleLights(row, col));

            gameBoard.appendChild(cell);
            board[row][col] = cell;
        }
    }
    randomizeBoard();
    startTimer();
}

function toggleLights(row, col) 
{
    const positions = [
        [row, col],
        [row - 1, col], // Above
        [row + 1, col], // Below
        [row, col - 1], // Left
        [row, col + 1], // Right
    ];

    positions.forEach(([r, c]) => 
        {
        if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) 
            {
            board[r][c].classList.toggle('is-off');
        }
    });

    if (checkWin()) 
        {
        clearInterval(timerInterval);
        setTimeout(() => alert('You win!'), 200);
    }
}

function randomizeBoard() 
{
    for (let i = 0; i < 10; i++) 
    {
        const randomRow = Math.floor(Math.random() * boardSize);
        const randomCol = Math.floor(Math.random() * boardSize);
        toggleLights(randomRow, randomCol);
    }
}

function checkWin() 
{
    return board.flat().every(cell => !cell.classList.contains('is-off'));
}

// Timer Logic
function startTimer() 
{
    let timeElapsed = 0;
    const timerDisplay = document.getElementById('time');
    clearInterval(timerInterval);
    timerInterval = setInterval(() => 
    {
        timeElapsed++;
        timerDisplay.textContent = timeElapsed;
    }, 1000);
}

// Scroll to Addendum Section
document.getElementById('addendum-button').addEventListener('click', () => 
{
    const addendum = document.getElementById('addendum');
    addendum.classList.toggle('show');
});
// New Game Button Logic
document.getElementById('new-game-button').addEventListener('click', () => 
    {
    initBoard();
    document.getElementById('time').textContent = '0';
});

document.addEventListener('DOMContentLoaded', () => 
{
    initBoard();
    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = lastModified;
});
