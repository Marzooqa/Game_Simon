let buttonColors = ["red", "blue", "yellow", "green"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).on("keydown", function () {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  //   console.log(randomChosenColor);
}

$(".btn").on("click", function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      if (level == 7) {
        playSound("green");
        $("body").addClass("game-won");
        setTimeout(function () {
          $("body").removeClass("game-won");
        }, 400);
        $("h1").text("You win!! , Press SpaceBar to Restart");
        setTimeout(startOver, 1000);
      } else {
        setTimeout(nextSequence, 600);
      }
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press SpaceBar to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  userClickedPattern = [];
  gamePattern = [];
}
