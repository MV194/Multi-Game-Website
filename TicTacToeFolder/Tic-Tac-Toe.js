//In Development

// Choice of symbol for the player
let player = prompt('Choose "X" or "O"').toUpperCase();
let computer = player === "X" ? "O" : "X";
let currentPlayer = "X"; // Always start with "X"
let gameboard = ["", "", "", "", "", "", "", "", ""]; // Track moves
let isGameActive = true; // Track game state
const gridItems = document.getElementsByClassName("grid-item");

// Initialize the game board and add click listeners
function initializeGame() {
    Array.from(gridItems).forEach((cell, index) => {
        cell.addEventListener("click", () => handlePlayerMove(cell, index));
    });
    
    if (player === "O") {
        handleComputerMove();
    }
}

// Handle player's move
function handlePlayerMove(cell, index) {
    if (gameboard[index] === "" && isGameActive && currentPlayer === player) { // Ensure cell is empty, game is active, and it's player's turn
        gameboard[index] = player;
        cell.textContent = player;
        
        // Delay win check to allow the board to update visually
        setTimeout(() => {
            if (checkWin(player)) {
                alert("Player wins!");
                endGame();
                return;
            } else if (!gameboard.includes("")) {
                alert("It's a draw!");
                endGame();
                return;
            }

            currentPlayer = computer; 
            handleComputerMove(); 
        }, 100); // Small delay to let the browser update
    }
}

// Simple AI
function handleComputerMove() {
    if (!isGameActive) return;

    let emptyCells = gameboard.map((val, index) => val === "" ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

   
    gameboard[randomIndex] = computer;
    gridItems[randomIndex].textContent = computer;

    // Delay win check to allow the board to update visually
    setTimeout(() => {
        if (checkWin(computer)) {
            alert("Computer wins!");
            endGame();
        } else if (!gameboard.includes("")) {
            alert("It's a draw!");
            endGame();
        } else {
            currentPlayer = player;
        }
    }, 100); // Small delay to let the browser update
}

// Check for winning combinations
function checkWin(symbol) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => gameboard[index] === symbol)
    );
}

// End game and prompt for restart
function endGame() {
    isGameActive = false;
    setTimeout(() => {
        if (confirm("Do you want to play again?")) {
            resetGame();
        }
    }, 500);
}

// Reset the game
function resetGame() {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    Array.from(gridItems).forEach(cell => cell.textContent = "");
    isGameActive = true;
    currentPlayer = "X"; // Always start with "X" again
    if (player === "O") handleComputerMove(); 
}

// Initialize on page load
window.onload = initializeGame;

// Modal for Rules
const rules_modal = document.getElementById("Rules-Modal");
const rules_button = document.getElementById("Rules");
const closebutton = document.getElementsByClassName("close-button")[0];

rules_button.onclick = function() {
    rules_modal.style.display = "block"; 
}

closebutton.onclick = function() {
    rules_modal.style.display = "none"; 
}

window.onclick = function(event) {
    if (event.target === rules_modal) {
        rules_modal.style.display = "none";
    }
}
