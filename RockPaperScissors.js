function Choice1() {
  var rock = document.getElementById("rock_button");
  this.rock = rock;

  let resultText;
  let max = 4;
  let min = 1;
  let computer = Math.floor(Math.random() * (max - min) + min);
  console.log(computer);
  if (computer == 1) {
    console.log("Tie!");
    resultText = "Tie!";
  } else if (computer == 2) {
    console.log("Computer Won!");
    resultText = "Computer Won!";
  } else {
    console.log("Player Won!");
    resultText = "Player Won!";
  }

  DisableButtons();
  Result(resultText);
}

function Choice2() {
  var paper = document.getElementById("paper_button");
  this.paper = paper;

  let resultText;
  let max = 4;
  let min = 1;
  let computer = Math.floor(Math.random() * (max - min) + min);
  console.log(computer);
  if (computer == 1) {
    console.log("Player Won!");
    resultText = "Player Won!";
  } else if (computer == 2) {
    console.log("Tie!");
    resultText = "Tie!";
  } else {
    console.log("Computer Won!");
    resultText = "Computer Won!";
  }

  DisableButtons();
  Result(resultText);
}

function Choice3() {
  var scissors = document.getElementById("scissors_button");
  this.scissors = scissors;

  let resultText;
  let max = 4;
  let min = 1;
  let computer = Math.floor(Math.random() * (max - min) + min);
  console.log(computer);
  if (computer == 1) {
    console.log("Computer Won!");
    resultText = "Computer Won!";
  } else if (computer == 2) {
    console.log("Player Won!");
    resultText = "Player Won!";
  } else {
    console.log("Tie!");
    resultText = "Tie!";
  }

  DisableButtons();
  Result(resultText);
}

function Result(resultText) {
  const resultIconElement = document.getElementById("Result");
  const resultContainer = document.getElementById("result-container");

  if (resultText === "Player Won!") {
    resultIconElement.innerHTML = `${resultText} 🏆`;
    resultContainer.style.background =
      "linear-gradient(to right, #ff9f5f94, #feb47b68)";
  } else if (resultText === "Computer Won!") {
    resultIconElement.innerHTML = `${resultText} 💔`;
    resultContainer.style.background =
      "linear-gradient(to right, #ff6e61c6, #de1d276d)";
  } else {
    resultIconElement.innerHTML = `${resultText} 🤝`;
    resultContainer.style.background =
      "linear-gradient(to right, #d9d9d98d, #f0f0f056)";
  }

  document.getElementById("result-container").style.display = "flex";
}

function DisableButtons() {
  document.querySelectorAll("input[type='image']").forEach(function (img) {
    img.style.pointerEvents = "none";
    img.style.animation = "none";
  });
}

function RestartGame() {
  document.getElementById("result-container").style.display = "none";

  document.querySelectorAll("input[type='image']").forEach(function (img) {
    img.style.pointerEvents = "auto";
    img.style.animation = "";
  });
}
