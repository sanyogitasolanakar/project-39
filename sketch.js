var bird;
var pipes = [];

var gameState = "initialState";
var initialBg, playBg;
var playButton, gameOverButton;
var obstacleBottom, obstacleTop
var flyingPeppa;
var backgroundSong;
var jumpSound;
var collidedSound;
var score = 0
function preload() {
  collidedSound = loadSound('assets/collided.wav');
  jumpSound = loadSound('assets/jump.wav');
  backgroundSong = loadSound('assets/backgroundSong.mp3');
  initialBg = loadImage("assets/initialBg.jpg")
  peppaLogo = loadImage("assets/peppaLogo.png");
  playBg = loadImage("assets/playBg.jpeg");
  obstacleBottom = loadImage("assets/obstacleBottom.png")
  obstacleTop = loadImage("assets/obstacleTop.png")
  flyingPeppa = loadImage("assets/flyingPeppa.png");
}

function setup() {
  createCanvas(windowWidth-5, windowHeight-5);
  bird = new Bird();
  pipes.push(new Pipe());
  playButton = createButton('Play the Game');
  playButton.style("visibility","hidden")
  
  gameOverButton = createButton('Game Over');
  gameOverButton.style("visibility","hidden")
  backgroundSong.setVolume(0.2);
  backgroundSong.loop()
  backgroundSong.play();
  backgroundSong.jump(10);
  
}

function draw() {
  getUi()
}

function keyPressed() {
  if (key == ' ') {
    if(gameState === "play"){
      jumpSound.play()
      score+=5
    }
    bird.up();
  }
}


function getUi() {
  if (gameState === "initialState") {

    background(initialBg)
    image(peppaLogo, width / 2 - 50, height / 2 - 100, 200, 200)
    playButton.style("visibility", "visible")
    playButton.position(width / 2 - 45, height / 2 + 130);
    playButton.class("playButton");
    playButton.mousePressed(() => {
      gameState = "play"
      playButton.style("visibility", "hidden")
    });

  }
  
  else if(gameState === "gameOver"){
      playButton.style("visibility", "hidden")
      image(peppaLogo, width / 2 - 50, height / 2 - 100, 200, 200)
      gameOverButton.style("visibility","visible");
      gameOverButton.position(width / 2 - 45, height / 2 + 130);
      gameOverButton.class("playButton");
      gameOverButton.mousePressed(() => {
        score = 0
        gameState = "initialState"
        gameOverButton.style("visibility", "hidden")
      });
  }
  else {
    background(playBg);
    fill("red")
    textSize(20)
    textStyle("bold")
    text("Score: " + score,200, 100)
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        collidedSound.play()
        
        gameOver()

      }
    }

    bird.update();
    bird.show();

    if (frameCount % 75 == 0) {
      pipes.push(new Pipe());
    }

  }

}

function gameOver() {
  pipes = []
  bird = new Bird();
  pipes.push(new Pipe());
  playButton = createButton('Play the Game');
  gameState = "gameOver"
}


function windowResized() {
  resizeCanvas(windowWidth-5, windowHeight-5);
}