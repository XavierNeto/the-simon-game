var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;

var level = 1;

// Detect click
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    console.log(userClickedPattern);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);


});

// Detect keyboard
$(document).on("keydown", function() {
    if (gameStarted === false) {
        gameStarted = true;
        nextSequence();
    }
});

// Calculate the next sequence
function nextSequence() {
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];

    userClickedPattern = [];

    $("#level-title").text("Level " + level);

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level += 1;


}

// Play the sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animation of pressioning the button
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

// Checking the answer
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();

            }, 1000);
        }

    } else {

        var audio = new Audio("sounds/wrong.mp3");
        audio.play()

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game OVer, Press Any Key to Restart");

        startOver();
    }

}

// Restart the game
function startOver() {
    level = 1;
    gamePattern = [];
    gameStarted = false;
}