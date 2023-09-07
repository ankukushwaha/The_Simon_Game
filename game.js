
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];

var level = 0;
var start = false;

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game over, Press any Key to ReStart");
        start = false;
        level = 0;
        gamePattern.length = 0;
    }
}

$(document).keypress(function(){
    if(!start){
        nextSequence();
        start = true;
    }
});


$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern.length = 0;

    level++;
    $("h1").text("Level "+level);

    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+ currentColour).removeClass("pressed");
    },100);
}