const colors = ["red", "blue", "green", "yellow"];
let lights = [],
  userSequence = [],
  round = 0,
  score = 0,
  gameStarted = false;

$(document).keydown((event) => {
  if (event.key === "a" && !gameStarted) {
    startNewGame();
  }
});

$(".btn").click((event) => {
  const color = $(event.target).attr("id");
  userSequence.push(color);
  animateAndPlaySound(color);
  if (userSequence[round] !== lights[round]) {
    playSound("wrong");
    resetGame();
  } else if (++round === lights.length) {
    $("#level-title").text(`Score: ${++score}`);
    round = userSequence.length = 0; //reset round and userSequence
    setTimeout(nextRound, 1000);
  }
});

function nextRound() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  lights.push(randomColor);
  animateAndPlaySound(randomColor);
}

function animateAndPlaySound(color) {
  $(`#${color}`).addClass("pressed");
  setTimeout(
    () => $(`#${color}`).removeClass("pressed"),
    color === "wrong" ? 200 : 100
  );
  playSound(color);
}

function playSound(name) {
  new Audio(`sounds/${name}.mp3`).play();
}

function resetGame() {
  lights.length = userSequence.length = round = score = 0; //reset all to zero
  gameStarted = false;
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(() => $("body").removeClass("game-over"), 200);

  // After game is over, watch for any key press to restart the game
  $(document).keydown(startNewGame);
}

function startNewGame() {
  // unbind the keydown event handler to prevent unwanted behavior
  $(document).off("keydown", startNewGame);

  gameStarted = true;
  nextRound();
  $("#level-title").text(`Score: ${score}`);
}
