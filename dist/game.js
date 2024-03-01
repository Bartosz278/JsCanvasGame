import { Player } from './player.js';
//prettier-ignore
import { interactiveObstacles, createObstacles, drawObstacles } from './objects.js';
//prettier-ignore
import { collectItem, updateInventory, isHoldingItem, cursorItems, setIsHoldingItem, setCursorItems, getCursorItems } from './inventory.js';
//prettier-ignore
import { checkCollectibleProximity, showCollectInfo, isCollidingWithObstacle, dragElement } from './utils.js';
//prettier-ignore
import { drawCraftingWindow } from './crafting.js';
let canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const infoBox = document.getElementById('infoBox');
export const inventoryEl = document.getElementById('inventory');
const backgroundImage = new Image();
const crafingIcon = document.querySelector('#crafting');
export const craftingWindow = document.querySelector('#craftingWindow');
const closeCraftingButton = document.querySelector('#closeCraftingButton');
backgroundImage.src = 'assets/grass.webp';
// canvas.width = window.innerWidth * 1.2;
// canvas.height = window.innerHeight * 1.1;
canvas.width = 2000;
canvas.height = 1000;
const playerImg = new Image();
playerImg.src = 'assets/character.webp';
export let player = new Player(ctx, playerImg, canvas, isCollidingWithObstacle, interactiveObstacles, showCollectInfo, collectItem, updateInventory, setIsHoldingItem, setCursorItems, getCursorItems, cursorItems);
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function updateGame() {
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
document.addEventListener('keypress', (event) => {
    keysPressed[event.key] = true;
    player.drawBuildRange();
});
document.addEventListener('keyup', (event) => {
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
    }
    else {
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
    cameraX = Math.max(0, Math.min(player.x - viewportWidth / 2, canvas.width - viewportWidth));
    cameraY = Math.max(0, Math.min(player.y - viewportHeight / 2, canvas.height - viewportHeight));
}
dragElement(craftingWindow, craftingWindow);
createObstacles(canvas, 100);
updateInventory();
updateGame();
