var joueurRouge = "R";
var joueurJaune = "Y";
var actuelJoueur = joueurRouge;

var jeuTerminer = false;
var grille1;

var lignes = 6;
var colonnes = 7;
var actuelColonnes = [];

window.onload = function() {
    preparerJeu();
}

function preparerJeu() {
    grille1 = [];
    actuelColonnes = [5, 5, 5, 5, 5, 5, 5];

    for (let l = 0; l < lignes; l++) {
        let ligne = [];
        for (let c = 0; c < colonnes; c++){
            ligne.push(' ');

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
    if (jeuTerminer) {
        return;
    }

    let coords = this.id.split("-");
    let l = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    l = actuelColonnes[c];

    if (l < 0) { 
        return;
    }

    grille1[l][c] = actuelJoueur;
    let tuile = document.getElementById(l.toString() + "-" + c.toString());
    if (actuelJoueur == joueurRouge) {
        tuile.classList.add("rouge-piece");
        actuelJoueur = joueurJaune;
    }
    else {
        tuile.classList.add("jaune-piece");
        actuelJoueur = joueurRouge;
    }

    l -= 1;
    actuelColonnes[c] = l;

    verifierGagnant();
}

function verifierGagnant() {
    for (let l = 0; l < lignes; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (grille1[l][c] != ' ') {
                if (grille1[l][c] == grille1[l][c+1] && grille1[l][c+1] == grille1[l][c+2] && grille1[l][c+2] == grille1[l][c+3]) {
                    preparerGagnant(l, c);
                    return;
                }
            }
        }
    }

    for (let c = 0; c < colonnes; c++) {
        for (let l = 0; l < lignes - 3; l++){
            if (grille1[l][c] != ' '){
                if (grille1[l][c] == grille1[l+1][c] && grille1[l+1][c] == grille1[l+2][c] && grille1[l+2][c] == grille1[l+3][c]) {
                    preparerGagnant(l, c);
                    return;
                }
            }
        }
    }

    for (let l = 0; l < lignes - 3; l++) {
        for (let c = 0; c < colonnes - 3; c++){
            if (grille1[l][c] != ' '){
                if (grille1[l][c] == grille1[l+1][c+1] && grille1[l+1][c+1] == grille1[l+2][c+2] && grille1[l+2][c+2] == grille1[l+3][c+3]) {
                    preparerGagnant(l, c);
                    return;
                }
            }
        }
    }

    for (let l = 3; l < lignes; l++) {
        for (let c = 0; c < colonnes - 3; c++){
            if (grille1[l][c] != ' '){
                if (grille1[l][c] == grille1[l-1][c+1] && grille1[l-1][c+1] == grille1[l-2][c+2] && grille1[l-2][c+2] == grille1[l-3][c+3]) {
                    preparerGagnant(l, c);
                    return;
                }
            }
        }
    }
}

function preparerGagnant(l, c) {
    let gagnant = document.getElementById("gagnant");
    if (grille1[l][c] == joueurRouge) {  
        gagnant.innerText = "Joueur Rouge a gagné !!!";
    } 
    else {
        gagnant.innerText = "Joueur Jaune a gagné !!!";
    }
    jeuTerminer = true;
}
