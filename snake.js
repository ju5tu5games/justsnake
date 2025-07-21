const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let velocity = { x: 0, y: 0 };
let score = 0;

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": if (velocity.y === 0) velocity = { x: 0, y: -1 }; break;
    case "ArrowDown": if (velocity.y === 0) velocity = { x: 0, y: 1 }; break;
    case "ArrowLeft": if (velocity.x === 0) velocity = { x: -1, y: 0 }; break;
    case "ArrowRight": if (velocity.x === 0) velocity = { x: 1, y: 0 }; break;
  }
});

function gameLoop() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  // Game over
  if (head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount || snake.some(seg => seg.x === head.x && seg.y === head.y)) {
    alert("💀 GAME OVER 💀");
    snake = [{ x: 10, y: 10 }];
    velocity = { x: 0, y: 0 };
    score = 0;
    updateScore();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function updateScore() {
  document.getElementById("score").textContent = "Score: " + score;
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  snake.forEach(seg => ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize, gridSize));

  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

setInterval(gameLoop, 150);
