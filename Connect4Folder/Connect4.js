var joueurRouge = "R";
var joueurJaune = "Y";
var actuelJoueur = joueurRouge;

var jeuTerminer = false;
var grille1;

var lignes = 6;
var colonnes = 7;
var actuelColonnes = [];
var modeJeu = "2-players"; // Default mode: 2 players

window.onload = function () {
    preparerOptions();
    preparerJeu();
    initialiserModal(); // Initialize modal logic
};

// Modal logic
function initialiserModal() {
    const modal = document.getElementById("Rules-Modal");
    const openButton = document.getElementById("Rules");
    const closeButton = modal.querySelector(".close-button");

    // Open the modal when the button is clicked
    openButton.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Close the modal when the "X" button is clicked
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });


}

function preparerOptions() {
    const modeSelection = document.createElement("div");
    modeSelection.innerHTML = `
        <label for="mode">Game mode:</label>
        <select id="mode">
            <option value="2-players">2 Players</option>
            <option value="player-vs-ai">Player vs AI</option>
        </select>
        <button onclick="changerMode(); resetJeu()">Game on!</button>
    `;
    document.getElementById("options").append(modeSelection);
}

function changerMode() {
    modeJeu = document.getElementById("mode").value;
    resetJeu();
}

function resetJeu() {
    document.getElementById("grille1").innerHTML = "";
    document.getElementById("gagnant").innerText = "";
    jeuTerminer = false;
    actuelJoueur = joueurRouge;
    preparerJeu();
}

function preparerJeu() {
    grille1 = [];
    actuelColonnes = [5, 5, 5, 5, 5, 5, 5];

    for (let l = 0; l < lignes; l++) {
        let ligne = [];
        for (let c = 0; c < colonnes; c++) {
            ligne.push(" ");

            let tuile = document.createElement("div");
            tuile.id = l.toString() + "-" + c.toString();
            tuile.classList.add("tuile");
            tuile.addEventListener("click", preparerPiece);
            document.getElementById("grille1").append(tuile);
        }
        grille1.push(ligne);
    }
}

function preparerPiece() {
    if (jeuTerminer || (modeJeu === "player-vs-ai" && actuelJoueur == joueurJaune)) {
        return;
    }

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);
    let l = actuelColonnes[c];

    if (l < 0) {
        return;
    }

    grille1[l][c] = actuelJoueur;
    let tuile = document.getElementById(l.toString() + "-" + c.toString());
    tuile.classList.add(actuelJoueur == joueurRouge ? "rouge-piece" : "jaune-piece");

    l -= 1;
    actuelColonnes[c] = l;

    verifierGagnant();

    if (!jeuTerminer) {
        if (modeJeu === "player-vs-ai" && actuelJoueur == joueurRouge) {
            actuelJoueur = joueurJaune;
            setTimeout(aiMove, 500); // Delay AI move
        } else {
            actuelJoueur = actuelJoueur == joueurRouge ? joueurJaune : joueurRouge;
        }
    }
}

function aiMove() {
    if (jeuTerminer) {
        return;
    }

    // Step 1: Check for a winning move for the AI
    for (let c = 0; c < colonnes; c++) {
        let l = actuelColonnes[c];
        if (l >= 0) {
            grille1[l][c] = joueurJaune; // Temporarily place the AI's piece
            if (checkWinningMove(joueurJaune)) {
                playMove(l, c, joueurJaune);
                return;
            }
            grille1[l][c] = " "; // Undo the move
        }
    }

    // Step 2: Block the opponent's winning move
    for (let c = 0; c < colonnes; c++) {
        let l = actuelColonnes[c];
        if (l >= 0) {
            grille1[l][c] = joueurRouge; // Temporarily place the opponent's piece
            if (checkWinningMove(joueurRouge)) {
                grille1[l][c] = joueurJaune; // Block with AI's piece
                playMove(l, c, joueurJaune);
                return;
            }
            grille1[l][c] = " "; // Undo the move
        }
    }

    // Step 3: Default to a random valid column (fallback move)
    let availableColumns = actuelColonnes.map((val, index) => (val >= 0 ? index : -1)).filter((val) => val >= 0);
    let c = availableColumns[Math.floor(Math.random() * availableColumns.length)];
    let l = actuelColonnes[c];
    playMove(l, c, joueurJaune);
}

// Helper function to play a move
function playMove(l, c, player) {
    grille1[l][c] = player;

    let tuile = document.getElementById(l.toString() + "-" + c.toString());
    tuile.classList.add(player == joueurRouge ? "rouge-piece" : "jaune-piece");

    l -= 1;
    actuelColonnes[c] = l;

    verifierGagnant();
    if (!jeuTerminer) {
        actuelJoueur = joueurRouge;
    }
}

// Helper function to check if a move leads to a win
function checkWinningMove(player) {
    // Horizontal check
    for (let l = 0; l < lignes; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (
                grille1[l][c] == player &&
                grille1[l][c + 1] == player &&
                grille1[l][c + 2] == player &&
                grille1[l][c + 3] == player
            ) {
                return true;
            }
        }
    }

    // Vertical check
    for (let c = 0; c < colonnes; c++) {
        for (let l = 0; l < lignes - 3; l++) {
            if (
                grille1[l][c] == player &&
                grille1[l + 1][c] == player &&
                grille1[l + 2][c] == player &&
                grille1[l + 3][c] == player
            ) {
                return true;
            }
        }
    }

    // Diagonal checks
    for (let l = 0; l < lignes - 3; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (
                grille1[l][c] == player &&
                grille1[l + 1][c + 1] == player &&
                grille1[l + 2][c + 2] == player &&
                grille1[l + 3][c + 3] == player
            ) {
                return true;
            }
        }
    }

    for (let l = 3; l < lignes; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (
                grille1[l][c] == player &&
                grille1[l - 1][c + 1] == player &&
                grille1[l - 2][c + 2] == player &&
                grille1[l - 3][c + 3] == player
            ) {
                return true;
            }
        }
    }

    return false;
}


function verifierGagnant() {
    // Horizontal check
    for (let l = 0; l < lignes; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (
                grille1[l][c] != " " &&
                grille1[l][c] == grille1[l][c + 1] &&
                grille1[l][c + 1] == grille1[l][c + 2] &&
                grille1[l][c + 2] == grille1[l][c + 3]
            ) {
                preparerGagnant(l, c);
                return;
            }
        }
    }

    // Vertical check
    for (let c = 0; c < colonnes; c++) {
        for (let l = 0; l < lignes - 3; l++) {
            if (
                grille1[l][c] != " " &&
                grille1[l][c] == grille1[l + 1][c] &&
                grille1[l + 1][c] == grille1[l + 2][c] &&
                grille1[l + 2][c] == grille1[l + 3][c]
            ) {
                preparerGagnant(l, c);
                return;
            }
        }
    }

    // Diagonal checks
    for (let l = 0; l < lignes - 3; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (
                grille1[l][c] != " " &&
                grille1[l][c] == grille1[l + 1][c + 1] &&
                grille1[l + 1][c + 1] == grille1[l + 2][c + 2] &&
                grille1[l + 2][c + 2] == grille1[l + 3][c + 3]
            ) {
                preparerGagnant(l, c);
                return;
            }
        }
    }

    for (let l = 3; l < lignes; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (
                grille1[l][c] != " " &&
                grille1[l][c] == grille1[l - 1][c + 1] &&
                grille1[l - 1][c + 1] == grille1[l - 2][c + 2] &&
                grille1[l - 2][c + 2] == grille1[l - 3][c + 3]
            ) {
                preparerGagnant(l, c);
                return;
            }
        }
    }
}

function preparerGagnant(l, c) {
    let gagnant = document.getElementById("gagnant");
    
    if (modeJeu === "player-vs-ai") {
        // AI vs Player mode
        if (grille1[l][c] === joueurRouge) {
            gagnant.innerText = "Player Wins !!!";
        } else if (grille1[l][c] === joueurJaune) {
            gagnant.innerText = "Computer Wins !!!";
        }
    } else {
        // Player vs Player mode
        gagnant.innerText =
            grille1[l][c] === joueurRouge
                ? "Red Player Wins !!!"
                : "Yellow Player Wins !!!";
    }
    
    jeuTerminer = true;
}


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
