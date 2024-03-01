import { Player } from './player.js';
//prettier-ignore
import {interactiveObstacles,createObstacles,drawObstacles} from './objects.js';
//prettier-ignore
import {collectItem,updateInventory,useItem,isHoldingItem,cursorItems,inventory,setIsHoldingItem,setCursorItems,getCursorItems} from './inventory.js';
//prettier-ignore
import {checkCollectibleProximity,showCollectInfo,isCollidingWithObstacle, dragElement, drawBackground} from './utils.js';
//prettier-ignore
import { Block, blocks } from './blocks.js';
//prettier-ignore
import { drawCraftingWindow, moveWindow } from './crafting.js';

let canvas: HTMLCanvasElement = document.getElementById(
  'gameCanvas'
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
const infoBox: HTMLElement = document.getElementById('infoBox');
export const inventoryEl: HTMLElement = document.getElementById('inventory');
const backgroundImage: HTMLImageElement = new Image();
const crafingIcon: HTMLElement = document.querySelector('#crafting');
export const craftingWindow: HTMLElement =
  document.querySelector('#craftingWindow');
const closeCraftingButton: HTMLElement = document.querySelector(
  '#closeCraftingButton'
);
backgroundImage.src = 'assets/grass.webp';

// canvas.width = window.innerWidth * 1.2;
// canvas.height = window.innerHeight * 1.1;
canvas.width = 2000;
canvas.height = 1000;
const playerImg: HTMLImageElement = new Image();
playerImg.src = 'assets/character.webp';

export let player: Player = new Player(
  ctx,
  playerImg,
  canvas,
  isCollidingWithObstacle,
  interactiveObstacles,
  showCollectInfo,
  collectItem,
  updateInventory,
  setIsHoldingItem,
  setCursorItems,
  getCursorItems,
  cursorItems
);

function clearCanvas(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame(): void {
  debugger;
  updateCamera();
  clearCanvas();
  // drawBackground(ctx, backgroundImage, player);
  player.move(keysPressed);
  player.drawPlayer();
  player.drawBuildRange();
  player.isHoldingItem = isHoldingItem;
  player.cursorItems = getCursorItems();
  player.cameraX = cameraX;
  player.cameraY = cameraY;
  drawObstacles(ctx, cameraX, cameraY);
  drawCraftingWindow(player, craftingWindow);
  checkCollectibleProximity(interactiveObstacles, player);
  requestAnimationFrame(updateGame);
}

let keysPressed = {};
document.addEventListener('keypress', (event: KeyboardEvent) => {
  keysPressed[event.key] = true;
  player.drawBuildRange();
});
document.addEventListener('keyup', (event: KeyboardEvent) => {
  delete keysPressed[event.key];
});
canvas.addEventListener('mousemove', (event) => {
  player.mouseX = event.offsetX;
  player.mouseY = event.offsetY;
});
canvas.addEventListener('mousedown', (event) => {
  player.build(getCursorItems());
});
crafingIcon.addEventListener('click', () => {
  if (player.isCraftingOpen == false) {
    player.isCraftingOpen = true;
  } else {
    player.isCraftingOpen = false;
  }
});

closeCraftingButton.addEventListener('click', () => {
  player.isCraftingOpen = false;
});

document.addEventListener('contextmenu', (event) => event.preventDefault());

let cameraX = 0;
let cameraY = 0;
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
function updateCamera() {
  // Centruj kamerę na graczu, z ograniczeniami, aby nie wychodziła poza granice świata gry
  cameraX = Math.max(
    0,
    Math.min(player.x - viewportWidth / 2, canvas.width - viewportWidth)
  );
  cameraY = Math.max(
    0,
    Math.min(player.y - viewportHeight / 2, canvas.height - viewportHeight)
  );
}

dragElement(craftingWindow, craftingWindow);
createObstacles(canvas, 100);
updateInventory();
updateGame();
