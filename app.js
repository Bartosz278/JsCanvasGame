const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const infoBox = document.getElementById("infoBox");
const inventoryEl = document.getElementById("inventory");
var backgroundImage = new Image();
backgroundImage.src = "assets/grass.png";
backgroundImage.onload = function () {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.75;

const playerImg = new Image();
const treeImg = new Image();
playerImg.src = "assets/character.png";
treeImg.src = "assets/tree.webp";

let player = {
  x: canvas.width / 2 - 15,
  y: canvas.height / 2 - 15,
  width: 30,
  height: 30,
  speed: 8,
};

const interactiveObstacles = [];
const inventory = Array(10).fill(null);

function createObstacles() {
  for (let i = 0; i < 15; i++) {
    const obstacle = {
      x: Math.random() * (canvas.width - 20),
      y: Math.random() * (canvas.height - 20),
      size: 40,
      color: "green",
      digTime: 1000,
      interactive: true,
    };
    interactiveObstacles.push(obstacle);
  }
}

function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  interactiveObstacles.forEach(function (obstacle) {
    ctx.drawImage(
      treeImg,
      obstacle.x,
      obstacle.y,
      obstacle.size,
      obstacle.size,
    );
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame() {
  clearCanvas();
  drawPlayer();
  drawObstacles();
  checkCollectibleProximity();
  requestAnimationFrame(updateGame);
}

function collectItem(index) {
  const item = interactiveObstacles.splice(index, 1)[0];
  let added = false;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] && inventory[i].color === item.color) {
      inventory[i].count++;
      added = true;
      break;
    } else if (!inventory[i]) {
      inventory[i] = { ...item, count: 1 };
      added = true;
      break;
    }
  }
  if (!added) {
    alert("Ekwipunek pełny!");
  }
  updateInventory();
}

function updateInventory() {
  inventoryEl.innerHTML = "";
  inventory.forEach(function (item, index) {
    const slot = document.createElement("div");
    slot.className = "slot";
    if (item) {
      const itemCount = document.createElement("span");
      itemCount.className = "itemCount";
      itemCount.textContent = item.count;
      slot.appendChild(itemCount);
      slot.style.backgroundImage = "url('assets/log.png')";
    }
    inventoryEl.appendChild(slot);
  });
}
function showCollectInfo(show, x, y) {
  const infoBox = document.getElementById("collectInfo");
  if (show) {
    infoBox.style.display = "block";
    infoBox.style.left = x + "px";
    infoBox.style.top = y + "px";
  } else {
    infoBox.style.display = "none";
  }
}
function checkCollision(newX, newY) {
  for (let obstacle of interactiveObstacles) {
    if (
      newX < obstacle.x + obstacle.size &&
      newX + player.width > obstacle.x &&
      newY < obstacle.y + obstacle.size &&
      newY + player.height > obstacle.y
    ) {
      return true;
    }
  }

  return false;
}
function isCollidingWithObstacle(newX, newY) {
  return interactiveObstacles.some((obstacle) => {
    return (
      newX < obstacle.x + obstacle.size &&
      newX + player.width > obstacle.x &&
      newY < obstacle.y + obstacle.size &&
      newY + player.height > obstacle.y
    );
  });
}
function checkCollectibleProximity() {
  let isNearCollectible = false;
  for (let i = 0; i < interactiveObstacles.length; i++) {
    let obstacle = interactiveObstacles[i];
    let distance = Math.sqrt(
      (player.x - obstacle.x) ** 2 + (player.y - obstacle.y) ** 2,
    );
    if (distance < 50) {
      showCollectInfo(true, player.x + 20, player.y - 20);
      isNearCollectible = true;
      break;
    }
  }
  if (!isNearCollectible) {
    showCollectInfo(false);
  }
}

let isCollecting = false;

document.addEventListener("keydown", function (event) {
  let newX = player.x;
  let newY = player.y;
  switch (event.key) {
    case "w":
    case "ArrowUp":
      newY -= player.speed;
      break;
    case "s":
    case "ArrowDown":
      newY += player.speed;
      break;
    case "a":
    case "ArrowLeft":
      newX -= player.speed;
      break;
    case "d":
    case "ArrowRight":
      newX += player.speed;
      break;
  }

  if (!isCollidingWithObstacle(newX, newY)) {
    player.x = newX;
    player.y = newY;
  }

  if (event.key === " " && !isCollecting) {
    for (let i = interactiveObstacles.length - 1; i >= 0; i--) {
      let obstacle = interactiveObstacles[i];
      let distance = Math.sqrt(
        Math.pow(player.x - obstacle.x, 2) + Math.pow(player.y - obstacle.y, 2),
      );
      if (distance < 50) {
        isCollecting = true;
        showCollectInfo(true,"collecting...", player.x + 20, player.y - 20);
        setTimeout(function () {
          collectItem(i);
          isCollecting = false;
          showCollectInfo(false,"collecting...", player.x + 20, player.y - 20);
        }, obstacle.digTime); // Użyj czasu wykopania zdefiniowanego dla obiektu
        break;
      }
    }
  }
});

function checkCollectibleProximity() {
  let isNearCollectible = false;
  for (let i = 0; i < interactiveObstacles.length; i++) {
    let obstacle = interactiveObstacles[i];
    let distance = Math.sqrt(
      (player.x - obstacle.x) ** 2 + (player.y - obstacle.y) ** 2,
    );
    if (distance < 50 ) {
      // Zakładając, że "50" to zasięg zbierania
    //   showCollectInfo(true,"space to collect", player.x + 20, player.y - 20); // Pokaż okienko obok gracza
      isNearCollectible = true;
      break;
    }
  }
  if (!isNearCollectible) {
    showCollectInfo(false); // Ukryj okienko, gdy gracz jest daleko od przedmiotów
  }
}

function showCollectInfo(show, text, x, y) {
    let infoBox = document.getElementById('collectInfo');
    if (show) {
        infoBox.textContent = text; 
        infoBox.style.display = 'block';
        infoBox.style.left = `${x}px`;
        infoBox.style.top = `${y}px`;
    } else {
        infoBox.style.display = 'none';
    }
}
createObstacles();
updateInventory();
updateGame();
