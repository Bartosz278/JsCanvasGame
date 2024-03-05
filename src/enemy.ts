import { player } from './game.js';
import { isCollidingWithObstacle } from './utils.js';
import { interactiveObstacles } from './objects.js';
import { Obstacle } from './player.js';
export class Enemy {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  digTime: number;
  interactive: boolean;
  count: number;
  image: HTMLImageElement;
  health: number;
  speed: number;
  canPlace: boolean;
  canCollect: boolean;
  interactiveObstacles: Obstacle[];
  isCollidingWithObstacle: (
    obstacles: Obstacle[],
    x: number,
    y: number
  ) => boolean;
  method?: () => void;

  constructor(
    name: string,
    x: number,
    y: number,
    height: number,
    width: number,
    image: HTMLImageElement,
    health: number,
    speed: number,
    interactiveObstacles: Obstacle[],
    isCollidingWithObstacle: (
      obstacles: Obstacle[],
      x: number,
      y: number
    ) => boolean
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.health = health;
    this.speed = speed;
    this.canCollect = false;
    this.interactiveObstacles = interactiveObstacles;
    this.isCollidingWithObstacle = isCollidingWithObstacle;
  }

  draw() {
    player.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    let newX = this.x;
    let newY = this.y;
    if (Math.abs(player.x - 50) > this.x) {
      newX += this.speed;
    }
    if (Math.abs(player.x + 30) < this.x) {
      newX -= this.speed;
    }
    if (Math.abs(player.y + 30) < this.y) {
      newY -= this.speed;
    }
    if (Math.abs(player.y - 50) > this.y) {
      newY += this.speed;
    }
    if (!this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }

  takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
    }
  }
}
