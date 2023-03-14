
var buttonColours = ["red", "blue", "green", "yellow"];


var userClickedPattern = [];
var gamePattern = [];


var started = false;
var level = 0;
$("h1").click(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence() {

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var newColour = "#" + randomChosenColour;
    $(newColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
};



$(".btn").click(function handler() {

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);

});

function makeSound(key) {

    var fileName = "sounds/" + key + ".mp3";
    var key = new Audio(fileName);
    key.play();
};

$(".btn").click(function animatePress(currentColor) {
    var bntPressed = $(this);
    bntPressed.addClass("pressed");
    setTimeout(function () { bntPressed.removeClass("pressed"); }, 100);
    checkAnswer(userClickedPattern.length - 1);
});




function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];

        }

    } else {

        var deFault = new Audio("sounds/wrong.mp3");
        deFault.play();
        var bodyElement = $("body");
        bodyElement.addClass("game-over");
        setTimeout(function () { bodyElement.removeClass("game-over"); }, 200);
        $("h1").text("Game Over, Press HERE to Restart");
        startOver();
    }

}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
    userClickedPattern = [];
}

