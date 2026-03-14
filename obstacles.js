
let obstacles = [];
let spawnTimer = 0;
let spawnRate = 150;
let scrollSpeed = 2;
let gap = 200; // space between top and bottom pipes
let score = 0;
let newScore = 0;

function init() {
  spawnTimer = 0;
  spawnRate = 150;
  scrollSpeed = 2;
  gap = 200; // space between top and bottom pipes
  score = 0;
  newScore = 0;
}
/* Create a new obstacle */
function spawnObstacle() {
  const topHeight = Math.random() * 200 + 40;
  obstacles.push({
    x: canvas.width,
    width: 60,
    topHeight,
    gap
  });
}

/* Update obstacles */
function updateObstacles() {
  spawnTimer++;

  if (spawnTimer >= spawnRate) {
    spawnTimer = 0;
    spawnObstacle();
  }

  obstacles.forEach(o => o.x -= scrollSpeed);

  // Remove off-screen obstacles
  obstacles = obstacles.filter(o => o.x + o.width > 0);

}

/* Draw obstacles */
function drawObstacles() {
  ctx.fillStyle = "#44aa55";

  obstacles.forEach(o => {
    // Top pipe

    ctx.fillRect(o.x, 0, o.width, o.topHeight);
    ctx.fillStyle = 'green';
    ctx.fillRect(o.x - 5, 0, 60, o.topHeight); // Pipe body
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(o.x - 10, o.topHeight - 20, 70, 20); // Cap

    // Bottom pipe
    const bottomY = o.topHeight + o.gap;
    ctx.fillRect(o.x, bottomY, o.width, canvas.height - bottomY);
    ctx.fillStyle = 'green';
    ctx.fillRect(o.x - 5, bottomY, 60, 450 - bottomY); // Pipe body
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(o.x - 10, bottomY, 70, 20); // Cap

  });

  obstacles.forEach(o => {
    if (!o.passed && o.x + o.width < player.x && player.y + player.height > o.topHeight && player.y < o.topHeight + o.gap) {
      o.passed = true;
      score++;
      scoreElmt.textContent = score;
    }

    const topPipe = {
      x: o.x,
      y: 0,
      width: o.width,
      height: o.topHeight
    };

    const bottomPipe = {
      x: o.x,
      y: o.topHeight + o.gap,
      width: o.width,
      height: canvas.height
    };

    if (isColliding(player, topPipe) ||
      isColliding(player, bottomPipe)) {
      gameState = "gameover";
    }

    if (newScore != score) {
      if (score > 0 && score % 5 === 0) {
        scrollSpeed += 0.3;
      } else if (score > 0 && score % 20 === 0) {
        spawnRate += 20;
      } else if (score > 0 && score % 10 === 0) {
        gap -= 10;
      }
      newScore = score;
    }
  });

}

const scoreElmt = document.getElementById('score');

let gameState = "start"; // start | playing | gameover

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}