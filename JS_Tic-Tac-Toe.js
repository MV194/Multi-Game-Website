//In Development



//Modal function
var rules_modal = document.getElementById("Rules-Modal");
var rules_button = document.getElementById("Rules");
var closebutton = document.getElementsByClassName("close-button")[0];

rules_button.onclick = function() {
    rules_modal.style.display = "block"; // Corrected: added quotes around "block"
}

closebutton.onclick = function() {
    rules_modal.style.display = "none"; // Corrected: added quotes around "none"
}

window.onclick = function(event) {
    if (event.target == rules_modal) {
        rules_modal.style.display = "none";
    }
}
