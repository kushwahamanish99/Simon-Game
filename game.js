var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var sequenceCount = 0;

function nextSequence(){
  userClickedPattern = [];
  sequenceCount++;
  $("#level-title").text("Level "+sequenceCount);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  // setTimeout(playSound(userChosenColour), 0);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
  $(".btn").removeClass("pressed");
  }, 10);
}

var started = false;
$(document).keypress(function(){
  if(started == false){
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});

$(".manish").click(function(){
  if(started == false){
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  sequenceCount=0;
  gamePattern=[];
  started = false;
}
