import { Player } from "./player.js";
import {
  interactiveObstacles,
  createObstacles,
  drawObstacles,
} from "./objects.js";
import { collectItem, updateInventory } from "./inventory.js";
import {
  checkCollectibleProximity,
  showCollectInfo,
  isCollidingWithObstacle,
} from "./utils.js";

let canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const infoBox = document.getElementById("infoBox");
export const inventoryEl = document.getElementById("inventory");
const backgroundImage = new Image();
backgroundImage.src = "assets/grass.png";
backgroundImage.onload = function () {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.75;
const playerImg = new Image();
playerImg.src = "assets/character.png";

let player = new Player(
  ctx,
  playerImg,
  canvas,
  isCollidingWithObstacle,
  interactiveObstacles,
  showCollectInfo,
  collectItem,
);

const treeImg = new Image();
treeImg.src = "assets/tree.webp";

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame() {
  clearCanvas();
  player.drawPlayer();
  drawObstacles(ctx, treeImg);
  checkCollectibleProximity(interactiveObstacles, player);
  requestAnimationFrame(updateGame);
}

document.addEventListener("keydown", (event) => {
  player.move(event);
});

createObstacles();
updateInventory();
updateGame();
