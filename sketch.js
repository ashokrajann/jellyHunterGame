/*

The Game Project 7

The Game is called Jelly Hunter. Its themed underwater, wherein a jellyfish navigates through obstacles to reach her submarine and successfully complete the level. Along the journey, she collects as many yummy jellies as she can to much through her submarine ride!

Notes on 3 Game Extensions added:

1. SOUND
In order to give a fun gaming experience, I've added various sound effects for different aspects of the game like - Falling off the canyon, Clashing with an enemy, Level completion and also a general game theme background. In doing so, I learnt how to mix different sounds and tune the intensity and durationd of each sound effect. I also got to understand various functions used to play, pause and loop the sound effects within the game. 

The part of trying to put together various sound effects in order to suit an overall theme was a bit challenging. Also, figuring out when to play and pause a sounds effect within the game was an interesting challenge.


2.PLATFORMS
I've added various platforms at various parts of the game making it more challenging and fun for the player. The platforms have been placed and various positions along and the plain and also at varying levels of height. To get the player to move through the platforms, I've added collectibles on top of the platform. Also, in a certain part of the game, jumping over platforms is the only way to get past a long canyon!

I learnt how to land the game character to land properly on a platform after a jump. Figuring out the right positions to place the platform within the game scene was a bit challenging because randomly placing them wouldn't give a fun experience. Hence, I strategically placed the platforms within various parts of the game. This did teach me some aspects of game design as well!


3. ENEMIES
I've incorporated enemies within the game to make the game more challenging. The enemies are supposed to be an evil marine creature. It was quite chellenging to implement the enemies as they had to be placed strategically and also, have a slightly enexpected behvaiour in terms of the movement in the game scene.

I learnt how to create random movements for different enemeies. Figuring out the right positions to place the enemmies was another interesting challenge. Hence, I strategically placed the enemies within various parts of the game, especically near the collectibles so it's more fun and challenging for the player. This too touch me some aspects of game design!


*/
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var trees;
var canyons;
var collectables;
var submarine;

var platforms_data;
var platforms;
var enemies_data;
var enemies;

var game_score;
var lives;

var jumpSound;
var plummetingSound;
var collectableSound;
var levelCompleteSound;
var backgroundSound;
var enemySound;

function preload() {
  soundFormats("mp3", "wav");

  // //load sounds
  jumpSound = loadSound("assets/jump2.wav");
  jumpSound.setVolume(0.5);

  plummetingSound = loadSound("assets/plummeting.wav");
  plummetingSound.setVolume(0.2);

  collectableSound = loadSound("assets/collectable.wav");
  collectableSound.setVolume(0.1);

  levelCompleteSound = loadSound("assets/levelComplete.wav");
  levelCompleteSound.setVolume(0.5);

  backgroundSound = loadSound("assets/underwater2.wav");
  backgroundSound.setVolume(0.1);

  enemySound = loadSound("assets/enemy.wav");
  enemySound.setVolume(2);
}

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  lives = 4;

  startGame();
}

// ------------------------------
// Game start
// ------------------------------

function startGame() {
  gameChar_x = 100;
  gameChar_y = floorPos_y;

  // Variable to control the background scrolling.
  scrollPos = 0;

  //Play background sound
  backgroundSound.stop();
  backgroundSound.loop();

  // Variable to store the real position of the gameChar in the game
  // world. Needed for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  // Initialise arrays of scenery objects.
  clouds = [
    {
      x_pos: 200,
      y_pos: 80,
      width: 120,
      current_pos: 80,
      increment: 0.2,
    },
    {
      x_pos: 700,
      y_pos: 150,
      width: 120,
      current_pos: 150,
      increment: 0.2,
    },
    {
      x_pos: 2000,
      y_pos: 100,
      width: 120,
      current_pos: 100,
      increment: 0.2,
    },
    {
      x_pos: 2500,
      y_pos: 320,
      width: 120,
      current_pos: 320,
      increment: 0.2,
    },
    {
      x_pos: 3500,
      y_pos: 120,
      width: 120,
      current_pos: 120,
      increment: 0.2,
    },
    {
      x_pos: 4200,
      y_pos: 80,
      width: 120,
      current_pos: 80,
      increment: 0.2,
    },
    {
      x_pos: 4900,
      y_pos: 140,
      width: 120,
      current_pos: 140,
      increment: 0.2,
    },
    {
      x_pos: 5500,
      y_pos: 80,
      width: 120,
      current_pos: 80,
      increment: 0.2,
    },
  ];

  mountains = [
    {
      x_pos: -100,
      y_pos: floorPos_y - 64,
      current_pos: -100,
      increment: 0.2,
    },
    {
      x_pos: 900,
      y_pos: floorPos_y - 64,
      current_pos: 900,
      increment: 0.2,
    },
    {
      x_pos: 3100,
      y_pos: floorPos_y - 64,
      current_pos: 3100,
      increment: 0.2,
    },
    {
      x_pos: 4300,
      y_pos: floorPos_y - 64,
      current_pos: 4300,
      increment: 0.2,
    },
  ];

  trees = [
    {
      x_pos: 500,
      current_pos: 500,
      increment: 0.3,
    },
    {
      x_pos: 1100,
      current_pos: 1100,
      increment: 0.3,
    },
    {
      x_pos: 1800,
      current_pos: 1800,
      increment: 0.3,
    },
    {
      x_pos: 3400,
      current_pos: 3400,
      increment: 0.3,
    },
    {
      x_pos: 4100,
      current_pos: 4100,
      increment: 0.3,
    },
    {
      x_pos: 4700,
      current_pos: 4700,
      increment: 0.3,
    },
    {
      x_pos: 5300,
      current_pos: 5300,
      increment: 0.3,
    },
  ];

  canyons = [
    {
      x_pos: 250,
      width: 180,
    },
    {
      x_pos: 1500,
      width: 200,
    },
    {
      x_pos: 2000,
      width: 800,
    },
    {
      x_pos: 3800,
      width: 200,
    },
    {
      x_pos: 5000,
      width: 200,
    },
  ];

  platforms_data = [
    {x: 700, y: 300, width: 180},
    {x: 920, y: 180, width: 150},
    {x: 1200, y: 280, width: 160},
    {x: 2000, y: 300, width: 190},
    {x: 2250, y: 180, width: 310},
    {x: 2700, y: 280, width: 160},
  ];
  platforms = [];

  //create the plaftorms
  for (var i = 0; i != platforms_data.length; i++) {
    platforms.push(
      createPlatform(
        platforms_data[i].x,
        platforms_data[i].y,
        platforms_data[i].width
      )
    );
  }

  collectables = [
    {
      x_pos: 770,
      y_pos: 250,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 1130,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 1270,
      y_pos: 230,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 1900,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 2080,
      y_pos: 250,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 2400,
      y_pos: 120,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 2500,
      y_pos: 120,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 2750,
      y_pos: 240,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 3000,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 3500,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 3600,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 3700,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 4200,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 4500,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 4800,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 5400,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 5500,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
    {
      x_pos: 5600,
      y_pos: 380,
      size: 25,
      isFound: false,
    },
  ];

  submarine = {
    x_pos: 5800,
    y_pos: floorPos_y - 90,
    isReached: false,
  };

  enemies_data = [
    {x: 900, y: floorPos_y - 25, range: 200},
    {x: 1200, y: floorPos_y - 25, range: 300},
    {x: 2800, y: floorPos_y - 25, range: 200},
    {x: 3100, y: floorPos_y - 25, range: 200},
    {x: 4100, y: floorPos_y - 25, range: 200},
    {x: 4400, y: floorPos_y - 25, range: 300},
    {x: 4800, y: floorPos_y - 25, range: 200},
  ];
  enemies = [];

  //Construct the enemies
  for (var i = 0; i != enemies_data.length; i++) {
    enemies.push(
      new Enemy(enemies_data[i].x, enemies_data[i].y, enemies_data[i].range)
    );
  }

  lives--;
  game_score = 0;
}

// ------------------------------
// Draw Game
// ------------------------------

function draw() {
  background(49, 47, 81); //fill the sky

  noStroke();
  fill(63, 63, 101);
  rect(0, floorPos_y, width, height / 4); // draw some ground

  push();
  translate(scrollPos, 0);
  // Draw clouds.
  for (var cloud = 0; cloud < clouds.length; ++cloud) {
    drawCloud(clouds[cloud]);
  }
  // Draw mountains.
  for (var mountain = 0; mountain != mountains.length; ++mountain) {
    drawMountain(mountains[mountain]);
  }
  // Draw trees.
  for (var tree = 0; tree != trees.length; ++tree) {
    drawTree(trees[tree]);
  }

  // Draw canyons.
  for (var canyon = 0; canyon != canyons.length; ++canyon) {
    checkCanyon(canyons[canyon]);
    drawCanyon(canyons[canyon]);
  }

  //Draw platforms
  for (var platform = 0; platform != platforms.length; ++platform) {
    platforms[platform].draw();
  }

  // Draw collectable items.
  for (var collectable = 0; collectable != collectables.length; ++collectable) {
    var currentCollectable = collectables[collectable];

    if (!currentCollectable.isFound) {
      drawCollectable(currentCollectable);
      checkCollectable(currentCollectable);
    }
  }

  //Draw enemies
  for (var enemy = 0; enemy != enemies.length; ++enemy) {
    var currentEnemy = enemies[enemy];
    currentEnemy.draw();

    var inContact = currentEnemy.checkContact(gameChar_world_x, gameChar_y);

    if (inContact && lives > 0) {
      enemySound.play();
      startGame();
      break;
    }
  }

  //Draw submarine / submarine
  if (!submarine.isReached) {
    checkSubmarine();
  }
  renderSubmarine();

  //No Entrey Banner
  drawStopperBoard();

  pop();

  // Draw game character.
  drawGameChar();

  //Display game score
  gameScore();
  livesLeft();

  //Game over and Level complete
  if (lives < 1) {
    fill(237, 105, 109);
    stroke(237, 105, 109);
    textSize(64);
    text("GAME OVER", width / 2 - 200, height / 2 - 100);
    fill(255);
    textSize(24);
    text("Press 'space' to continue", width / 2 - 120, height / 2 - 40);
    return;
  }

  if (submarine.isReached) {
    fill(133, 229, 205);
    stroke(133, 229, 205);
    textSize(64);
    text("LEVEL COMPLETE", width / 2 - 270, height / 2 - 100);
    fill(255);
    textSize(24);
    text("Press 'space' to continue", width / 2 - 120, height / 2 - 40);
    return;
  }

  //Player lives left
  checkPlayerDie();

  // // Logic to make the game character move or the background scroll.
  if (isLeft) {
    if (gameChar_world_x < mountains[0].x_pos) {
      gameChar_x -= 0;
    } else if (gameChar_x > width * 0.3) {
      gameChar_x -= 10;
    } else {
      scrollPos += 10;
    }
  }

  if (isRight) {
    if (gameChar_x < width * 0.7) {
      gameChar_x += 10;
    } else {
      scrollPos -= 10; // negative for moving against the background
    }
  }

  // Logic to make the game character rise and fall.
  if (gameChar_y < floorPos_y) {
    var inContact = false;
    for (var platform = 0; platform != platforms.length; ++platform) {
      if (platforms[platform].checkContact(gameChar_world_x, gameChar_y)) {
        inContact = true;
        isFalling = false;
        break;
      }
    }

    if (!inContact) {
      gameChar_y += 3;
      isFalling = true;
    }
  } else {
    isFalling = false;
  }

  if (isPlummeting) {
    gameChar_y += 15;
  }

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  if ((lives < 1 || submarine.isReached) && keyCode == 32) {
    lives = 4;
    startGame();
  }

  if (key == "a" || keyCode == LEFT_ARROW) {
    isLeft = true;
  }

  if (key == "d" || keyCode == RIGHT_ARROW) {
    isRight = true;
  }

  if (
    (key == "w" || keyCode == 32 || keyCode == UP_ARROW) &&
    !isFalling &&
    !isPlummeting
  ) {
    gameChar_y -= 180;
    jumpSound.play();
  }
}

function keyReleased() {
  if (key == "a" || keyCode == 37) {
    isLeft = false;
  }

  if (key == "d" || keyCode == 39) {
    isRight = false;
  }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.
function drawGameChar() {
  // draw game character
  if (isLeft && isFalling) {
    //legs
    push();
    fill(61, 175, 202);
    rect(gameChar_x - 18, gameChar_y - 29, 36, 6);
    stroke(61, 175, 202);
    strokeWeight(8);
    line(gameChar_x - 18, gameChar_y - 38, gameChar_x - 6, gameChar_y - 1);
    line(gameChar_x - 6, gameChar_y - 38, gameChar_x + 8, gameChar_y - 4);
    line(gameChar_x + 10, gameChar_y - 38, gameChar_x + 18, gameChar_y - 14);
    pop();

    //head
    fill(82, 217, 249);
    angleMode(DEGREES);
    arc(gameChar_x, gameChar_y - 32, 46, 46, 180, 0);
    rect(gameChar_x - 23, gameChar_y - 34, 46, 5, 10);

    //eyes
    fill(49, 47, 81);
    ellipse(gameChar_x - 14, gameChar_y - 39, 10, 10);
    ellipse(gameChar_x + 2, gameChar_y - 39, 10, 10);
  } else if (isRight && isFalling) {
    // add your jumping-right code
    //legs
    push();
    fill(61, 175, 202);
    rect(gameChar_x - 18, gameChar_y - 29, 36, 6);
    stroke(61, 175, 202);
    strokeWeight(8);
    line(gameChar_x - 10, gameChar_y - 38, gameChar_x - 20, gameChar_y - 14);
    line(gameChar_x + 6, gameChar_y - 38, gameChar_x - 10, gameChar_y - 4);
    line(gameChar_x + 18, gameChar_y - 34, gameChar_x + 4, gameChar_y - 1);
    pop();

    //head
    fill(82, 217, 249);
    angleMode(DEGREES);
    arc(gameChar_x, gameChar_y - 32, 46, 46, 180, 0);
    rect(gameChar_x - 23, gameChar_y - 34, 46, 5, 10);

    //eyes
    fill(49, 47, 81);
    ellipse(gameChar_x - 2, gameChar_y - 39, 10, 10);
    ellipse(gameChar_x + 14, gameChar_y - 39, 10, 10);
  } else if (isLeft) {
    // add your walking left code
    //legs
    push();
    fill(61, 175, 202);
    rect(gameChar_x - 18, gameChar_y - 29, 36, 6);
    stroke(61, 175, 202);
    strokeWeight(8);
    line(gameChar_x - 16, gameChar_y - 38, gameChar_x - 16, gameChar_y - 1);
    line(gameChar_x, gameChar_y - 38, gameChar_x, gameChar_y - 1);
    line(gameChar_x + 16, gameChar_y - 38, gameChar_x + 16, gameChar_y - 1);
    pop();

    //head
    fill(82, 217, 249);
    angleMode(DEGREES);
    arc(gameChar_x, gameChar_y - 32, 46, 46, 180, 0);
    rect(gameChar_x - 23, gameChar_y - 34, 46, 5, 10);

    //eyes
    fill(49, 47, 81);
    ellipse(gameChar_x - 14, gameChar_y - 39, 10, 10);
    ellipse(gameChar_x + 2, gameChar_y - 39, 10, 10);
  } else if (isRight) {
    // add your walking right code
    //legs
    push();
    fill(61, 175, 202);
    rect(gameChar_x - 18, gameChar_y - 29, 36, 6);
    stroke(61, 175, 202);
    strokeWeight(8);
    line(gameChar_x - 16, gameChar_y - 38, gameChar_x - 16, gameChar_y - 1);
    line(gameChar_x, gameChar_y - 38, gameChar_x, gameChar_y - 1);
    line(gameChar_x + 16, gameChar_y - 38, gameChar_x + 16, gameChar_y - 1);
    pop();

    //head
    fill(82, 217, 249);
    angleMode(DEGREES);
    arc(gameChar_x, gameChar_y - 32, 46, 46, 180, 0);
    rect(gameChar_x - 23, gameChar_y - 34, 46, 5, 10);

    //eyes
    fill(49, 47, 81);
    ellipse(gameChar_x - 2, gameChar_y - 39, 10, 10);
    ellipse(gameChar_x + 14, gameChar_y - 39, 10, 10);
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    //legs
    push();
    fill(61, 175, 202);
    rect(gameChar_x - 18, gameChar_y - 29, 36, 6);
    stroke(61, 175, 202);
    strokeWeight(8);
    line(gameChar_x - 16, gameChar_y - 38, gameChar_x - 16, gameChar_y - 6);
    line(gameChar_x, gameChar_y - 38, gameChar_x, gameChar_y - 1);
    line(gameChar_x + 16, gameChar_y - 38, gameChar_x + 16, gameChar_y - 6);
    pop();

    //head
    fill(82, 217, 249);
    angleMode(DEGREES);
    arc(gameChar_x, gameChar_y - 32, 46, 46, 180, 0);
    rect(gameChar_x - 23, gameChar_y - 34, 46, 5, 10);

    //eyes
    fill(49, 47, 81);
    ellipse(gameChar_x - 8, gameChar_y - 39, 10, 10);
    ellipse(gameChar_x + 8, gameChar_y - 39, 10, 10);
  } else {
    // add your standing front facing code
    //legs
    push();
    fill(61, 175, 202);
    rect(gameChar_x - 18, gameChar_y - 14, 36, 6);
    stroke(61, 175, 202);
    strokeWeight(8);
    line(gameChar_x - 16, gameChar_y - 18, gameChar_x - 16, gameChar_y - 1);
    line(gameChar_x, gameChar_y - 18, gameChar_x, gameChar_y - 1);
    line(gameChar_x + 16, gameChar_y - 18, gameChar_x + 16, gameChar_y - 1);
    pop();

    //head
    fill(82, 217, 249);
    angleMode(DEGREES);
    arc(gameChar_x, gameChar_y - 17, 46, 46, 180, 0);
    rect(gameChar_x - 23, gameChar_y - 19, 46, 5, 10);

    //eyes
    fill(49, 47, 81);
    ellipse(gameChar_x - 8, gameChar_y - 24, 10, 10);
    ellipse(gameChar_x + 8, gameChar_y - 24, 10, 10);
  }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawCloud(t_cloud) {
  updateDirection(t_cloud, 15, "y");

  stroke(71, 200, 245, 128);
  strokeWeight(5);
  noFill();
  ellipse(t_cloud.x_pos, t_cloud.current_pos, 50, 50);
  ellipse(t_cloud.x_pos + 30, t_cloud.current_pos + 60, 30, 30);
  ellipse(t_cloud.x_pos + 90, t_cloud.current_pos + 20, 40, 40);
}

// Function to draw mountains objects.
function drawMountain(t_mountain) {
  updateDirection(t_mountain, 10, "x");

  noStroke();
  fill(255, 104, 132, 100);
  rect(t_mountain.current_pos, t_mountain.y_pos, 284, 64, 10, 10, 0, 0);
  fill(255, 104, 132, 80);
  rect(
    t_mountain.current_pos + 25,
    t_mountain.y_pos - 63,
    232,
    64,
    10,
    10,
    0,
    0
  );
  fill(255, 104, 132, 60);
  rect(
    t_mountain.current_pos + 43,
    t_mountain.y_pos - 126,
    198,
    64,
    10,
    10,
    0,
    0
  );
  fill(255, 104, 132, 40);
  rect(
    t_mountain.current_pos + 58,
    t_mountain.y_pos - 189,
    168,
    64,
    10,
    10,
    0,
    0
  );
  fill(255, 104, 132, 20);
  rect(
    t_mountain.current_pos + 74,
    t_mountain.y_pos - 253,
    136,
    64,
    10,
    10,
    0,
    0
  );
}

// Function to draw trees objects.
function drawTree(t_tree) {
  updateDirection(t_tree, 30, "x");

  noStroke();
  fill(54, 104, 132);
  rect(t_tree.current_pos, height / 2 - 36, 45, 180, 25, 25, 0, 0);
  fill(38, 77, 106);
  rect(t_tree.current_pos + 25, height / 2 + 27, 45, 118, 25, 25, 0, 0);
  fill(54, 104, 132);
  rect(t_tree.current_pos + 60, height / 2 + 7, 45, 137, 25, 25, 0, 0);
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
function drawCanyon(t_canyon) {
  noStroke();
  fill(49, 47, 81);
  rect(t_canyon.x_pos, floorPos_y, t_canyon.width, 144);
  fill(88, 88, 131);
  rect(t_canyon.x_pos, floorPos_y, 40, 144, 0, 20, 0, 0);
  rect(t_canyon.x_pos + t_canyon.width - 20, floorPos_y, 40, 144, 20, 0, 0, 0);
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon) {
  if (
    gameChar_world_x > t_canyon.x_pos + 20 &&
    gameChar_world_x < t_canyon.x_pos + t_canyon.width - 20 &&
    gameChar_y == floorPos_y
  ) {
    isPlummeting = true;
    if (lives == 1) {
      enemySound.play();
    } else {
      plummetingSound.play();
    }
  }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectable(t_collectable) {
  push();
  noStroke();
  fill(255, 143, 78);
  stroke(255, 215, 89);
  strokeWeight(5);
  rect(
    t_collectable.x_pos,
    t_collectable.y_pos,
    t_collectable.size,
    t_collectable.size,
    4
  );
  pop();
}

// Function to check character has collected an item.
function checkCollectable(t_collectable) {
  var checkDist = isFalling ? 20 : 50;
  if (
    dist(
      gameChar_world_x,
      gameChar_y,
      t_collectable.x_pos + 12,
      t_collectable.y_pos + 12
    ) < checkDist
  ) {
    t_collectable.isFound = true;
    collectableSound.play();
    game_score++;
  }
}

// ----------------------------------
// Submarine render and check functions
// ----------------------------------

// Function to draw Submarine
function renderSubmarine() {
  if (submarine.isReached) {
    //body
    push();
    fill(82, 217, 249);
    rect(submarine.x_pos, submarine.y_pos, 160, 80, 40);
    fill(63, 63, 101);
    rect(submarine.x_pos, submarine.y_pos, 116, 80, 40, 0, 0, 40);
    rect(submarine.x_pos + 60, submarine.y_pos - 15, 52, 15, 8, 8, 0, 0);
    //viewer
    rect(submarine.x_pos + 80, submarine.y_pos - 40, 15, 40, 10);
    rect(submarine.x_pos + 80, submarine.y_pos - 45, 30, 15, 10);
    //window
    fill(254, 197, 112);
    ellipse(submarine.x_pos + 80, submarine.y_pos + 40, 35);
    //light
    beginShape();
    fill(254, 197, 112, 100);
    vertex(submarine.x_pos + 110, submarine.y_pos - 42);
    vertex(submarine.x_pos + width, submarine.y_pos - 80);
    vertex(submarine.x_pos + width, submarine.y_pos + 40);
    vertex(submarine.x_pos + 110, submarine.y_pos - 32);
    endShape(CLOSE);
    //propeller
    fill(254, 197, 112);
    stroke(63, 63, 101);
    strokeWeight(8);
    rect(submarine.x_pos - 30, submarine.y_pos + 4, 70, 20, 10);
    rect(submarine.x_pos - 18, submarine.y_pos + 30, 60, 20, 10);
    rect(submarine.x_pos, submarine.y_pos + 56, 50, 20, 10);
    pop();
  } else {
    push();
    //body
    fill(123, 123, 178);
    rect(submarine.x_pos, submarine.y_pos, 160, 80, 40);
    fill(63, 63, 101);
    rect(submarine.x_pos, submarine.y_pos, 116, 80, 40, 0, 0, 40);
    rect(submarine.x_pos + 60, submarine.y_pos - 15, 52, 15, 8, 8, 0, 0);
    //window
    fill(123, 123, 178);
    ellipse(submarine.x_pos + 80, submarine.y_pos + 40, 35);
    //propeller
    stroke(63, 63, 101);
    strokeWeight(8);
    rect(submarine.x_pos - 30, submarine.y_pos + 4, 70, 20, 10);
    rect(submarine.x_pos - 18, submarine.y_pos + 30, 60, 20, 10);
    rect(submarine.x_pos, submarine.y_pos + 56, 50, 20, 10);
    pop();
  }
}

// Function to check character has reached Submarine
function checkSubmarine() {
  if (gameChar_world_x > submarine.x_pos) {
    levelCompleteSound.play();
    submarine.isReached = true;
    submarine.y_pos = floorPos_y - 120;
    gameChar_y = floorPos_y;
  }
}

// ----------------------------------
// Platform factory function
// ----------------------------------

function createPlatform(x, y, width) {
  var platform = {
    x_pos: x,
    y_pos: y,
    width: width,
    draw: function () {
      fill(63, 63, 101);
      rect(this.x_pos, this.y_pos, this.width, 40, 10);
      fill(133, 229, 205);
      rect(this.x_pos, this.y_pos, this.width, 12, 6, 6, 0, 0);
    },
    checkContact: function (gc_x, gc_y) {
      if (gc_x > this.x_pos && gc_x < this.x_pos + this.width) {
        var distance = this.y_pos - gc_y;
        if (distance >= 0 && distance < 5) {
          return true;
        }
      }
      return false;
    },
  };
  return platform;
}

// ----------------------------------
// Lives left
// ----------------------------------

function checkPlayerDie() {
  if (gameChar_y > height && lives > 0) {
    startGame();
  }
}

function livesLeft() {
  push();
  fill(255);
  noStroke();
  textSize(24);
  text("Lives: ", 20, 80);
  for (var life = 0; life != lives; ++life) {
    //head
    fill(82, 217, 249);
    angleMode(DEGREES);
    arc(115 + life * 50, 78, 40, 40, 180, 0);
    rect(115 + life * 50 - 20, 76, 40, 5, 10);
    //eyes
    fill(49, 47, 81);
    ellipse(118 + life * 50 - 10, 72, 10, 10);
    ellipse(118 + life * 50 + 4, 72, 10, 10);
  }
  pop();
}

// ----------------------------------
// Game score
// ----------------------------------
function gameScore() {
  push();
  fill(255);
  noStroke();
  textSize(24);
  text("Score: " + game_score, 20, 40);
  pop();
}

// ----------------------------------
// Enemies Constructor
// ----------------------------------

function Enemy(x, y, range) {
  this.x_pos = x;
  this.y_pos = y;
  this.range = range;
  this.increment = 1;

  this.current_xpos = this.x_pos;

  this.update = function () {
    this.current_xpos += this.increment;

    if (
      this.current_xpos < this.x_pos ||
      this.current_xpos > this.x_pos + this.range
    ) {
      this.increment *= -1;
    }
  };

  this.draw = function () {
    this.update();
    fill(237, 105, 109);
    triangle(
      this.current_xpos - 24,
      this.y_pos - 5,
      this.current_xpos - 15,
      this.y_pos - 40,
      this.current_xpos,
      this.y_pos - 5
    );
    triangle(
      this.current_xpos,
      this.y_pos - 5,
      this.current_xpos + 15,
      this.y_pos - 40,
      this.current_xpos + 24,
      this.y_pos - 5
    );
    ellipse(this.current_xpos, this.y_pos, 50);
    fill(49, 47, 81);
    angleMode(DEGREES);
    arc(this.current_xpos - 10, this.y_pos, 18, 20, 40, 220, CHORD);
    arc(this.current_xpos + 10, this.y_pos, 18, 20, 315, 140, CHORD);
  };

  this.checkContact = function (gc_x, gc_y) {
    var distance = dist(gc_x, gc_y, this.current_xpos, this.y_pos + 10);
    return distance < 45 ? true : false;
  };
}

// ----------------------------------
// Update Element Direction
// ----------------------------------

function updateDirection(element, range, direction) {
  element.current_pos += element.increment;

  var initalPos = direction == "x" ? element.x_pos : element.y_pos;

  if (
    element.current_pos < initalPos ||
    element.current_pos > initalPos + range
  ) {
    element.increment *= -1;
  }
}

// ---------------------
// Stopper Board
// ---------------------

function drawStopperBoard() {
  push();
  fill(63, 63, 101);
  rect(-200, 252, 100, 100, 10);
  rect(-160, 352, 20, 100);
  stroke(237, 105, 109);
  strokeWeight(8);
  ellipse(-150, 300, 60, 60);
  line(-180, 330, -120, 270);
  pop();
}
