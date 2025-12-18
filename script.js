document.addEventListener('DOMContentLoaded', () => {
    // Game state variables
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let xWins = 0;
    let oWins = 0;
    let draws = 0;
    
    // Winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    // DOM elements
    const gameBoardElement = document.getElementById('game-board');
    const playerTurnElement = document.getElementById('player-turn');
    const currentPlayerElement = document.getElementById('current-player');
    const gameStatusElement = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-btn');
    const themeToggleButton = document.getElementById('theme-toggle');
    const xWinsElement = document.getElementById('x-wins');
    const oWinsElement = document.getElementById('o-wins');
    const drawsElement = document.getElementById('draws');
    
    // Initialize the game board
    function initializeGameBoard() {
        gameBoardElement.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.setAttribute('role', 'gridcell');
            cell.setAttribute('tabindex', '0');
            cell.setAttribute('aria-label', `Cell ${i + 1}, empty`);
            
            // Add click event
            cell.addEventListener('click', () => handleCellClick(i));
            
            // Add keyboard event for accessibility
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleCellClick(i);
                }
            });
            
            gameBoardElement.appendChild(cell);
        }
    }
    
    // Handle cell click
    function handleCellClick(index) {
        // Check if cell is empty and game is active
        if (gameBoard[index] !== '' || !gameActive) {
            return;
        }
        
        // Update game board
        gameBoard[index] = currentPlayer;
        
        // Update UI
        const cellElement = document.querySelector(`.cell[data-index="${index}"]`);
        cellElement.textContent = currentPlayer;
        cellElement.classList.add(currentPlayer.toLowerCase());
        cellElement.setAttribute('aria-label', `Cell ${index + 1}, ${currentPlayer}`);
        
        // Check for win or draw
        if (checkWin()) {
            handleWin();
        } else if (checkDraw()) {
            handleDraw();
        } else {
            // Switch player
            switchPlayer();
        }
    }
    
    // Check for win
    function checkWin() {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            
            if (
                gameBoard[a] && 
                gameBoard[a] === gameBoard[b] && 
                gameBoard[a] === gameBoard[c]
            ) {
                // Highlight winning cells
                combination.forEach(index => {
                    const cellElement = document.querySelector(`.cell[data-index="${index}"]`);
                    cellElement.classList.add('winning-cell');
                });
                
                return true;
            }
        }
        
        return false;
    }
    
    // Check for draw
    function checkDraw() {
        return !gameBoard.includes('');
    }
    
    // Handle win
    function handleWin() {
        gameActive = false;
        gameStatusElement.textContent = `Player ${currentPlayer} wins!`;
        gameStatusElement.style.backgroundColor = '#1e5128';
        
        // Update win stats
        if (currentPlayer === 'X') {
            xWins++;
            xWinsElement.textContent = xWins;
        } else {
            oWins++;
            oWinsElement.textContent = oWins;
        }
        
        // Update status for screen readers
        gameStatusElement.setAttribute('aria-label', `Player ${currentPlayer} wins the game`);
    }
    
    // Handle draw
    function handleDraw() {
        gameActive = false;
        gameStatusElement.textContent = "It's a draw!";
        gameStatusElement.style.backgroundColor = '#f39c12';
        
        // Update draw stats
        draws++;
        drawsElement.textContent = draws;
        
        // Update status for screen readers
        gameStatusElement.setAttribute('aria-label', 'The game ended in a draw');
    }
    
    // Switch player
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerElement.textContent = currentPlayer;
        playerTurnElement.setAttribute('aria-label', `Current player: ${currentPlayer}`);
    }
    
    // Reset game
    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        
        // Reset UI
        currentPlayerElement.textContent = currentPlayer;
        gameStatusElement.textContent = "Game in progress";
        gameStatusElement.style.backgroundColor = '#1e5128';
        playerTurnElement.setAttribute('aria-label', `Current player: ${currentPlayer}`);
        gameStatusElement.setAttribute('aria-label', 'Game in progress');
        
        // Clear board
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
            cell.setAttribute('aria-label', `Cell ${parseInt(cell.getAttribute('data-index')) + 1}, empty`);
        });
    }
    
    // Toggle theme
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        const themeIcon = themeToggleButton.querySelector('i');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeToggleButton.setAttribute('aria-label', 'Switch to dark theme');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeToggleButton.setAttribute('aria-label', 'Switch to light theme');
        }
    }
    
    // Event listeners
    restartButton.addEventListener('click', resetGame);
    themeToggleButton.addEventListener('click', toggleTheme);
    
    // Initialize game
    initializeGameBoard();
    
    // Add keyboard shortcuts for accessibility
    document.addEventListener('keydown', (e) => {
        // R key to restart
        if (e.key === 'r' || e.key === 'R') {
            restartButton.focus();
            resetGame();
        }
        
        // T key to toggle theme
        if (e.key === 't' || e.key === 'T') {
            themeToggleButton.focus();
            toggleTheme();
        }
    });
    
    // Announce game start for screen readers
    setTimeout(() => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.classList.add('sr-only');
        announcement.textContent = 'ZAY TIK game loaded. Player X starts. Use arrow keys to navigate cells and Enter or Space to select.';
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 3000);
    }, 500);
});

// Add CSS for screen reader only content
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);