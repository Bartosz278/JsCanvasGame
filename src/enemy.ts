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
  type: string;
  isCollidingWithObstacle: (
    obstacles: Obstacle[],
    x: number,
    y: number,
    collidingType?: string
  ) => boolean;
  method?: () => void;
  closestItem: Obstacle;
  moveFunctionIsCalled: boolean;
  directionIndex: number;

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
    this.type = 'enemy';
    this.moveFunctionIsCalled = true;
  }

  draw() {
    player.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.moveFunctionIsCalled) {
      let newX = this.x;
      let newY = this.y;

      if (Math.abs(player.x - 50) > this.x) {
        newX += this.speed;
      } else if (Math.abs(player.x + 30) < this.x) {
        newX -= this.speed;
      }
      if (Math.abs(player.y + 30) < this.y) {
        newY -= this.speed;
      } else if (Math.abs(player.y - 50) > this.y) {
        newY += this.speed;
      }

      if (
        !this.isCollidingWithObstacle(
          this.interactiveObstacles,
          newX,
          newY,
          'enemy'
        )
      ) {
        this.x = newX;
        this.y = newY;
      } else {
        let alternativeY =
          player.y > this.y ? this.y + this.speed : this.y - this.speed;
        if (
          !this.isCollidingWithObstacle(
            this.interactiveObstacles,
            this.x,
            alternativeY,
            'enemy'
          )
        ) {
          this.y = alternativeY;
        } else {
          let alternativeX =
            player.x > this.x ? this.x + this.speed : this.x - this.speed;
          if (
            !this.isCollidingWithObstacle(
              this.interactiveObstacles,
              alternativeX,
              this.y,
              'enemy'
            )
          ) {
            this.x = alternativeX;
          }
        }
      }
    }
  }
  takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async randomizer() {
    this.moveFunctionIsCalled = false;
    this.directionIndex = Math.floor(Math.random() * 4);
    await this.delay(1500);
    this.moveFunctionIsCalled = true;
    await this.delay(8000);
    this.randomizer();
  }

  randomMove(chance: number) {
    if (Math.random() < chance) {
      let directions = [
        { dx: this.speed, dy: 0 }, // prawo
        { dx: -this.speed, dy: 0 }, // lewo
        { dx: 0, dy: this.speed }, // dół
        { dx: 0, dy: -this.speed } // góra
      ];

      let direction = directions[this.directionIndex];
      let newX = this.x + direction.dx;
      let newY = this.y + direction.dy;

      if (
        !this.isCollidingWithObstacle(
          this.interactiveObstacles,
          newX,
          newY,
          'enemy'
        )
      ) {
        this.x = newX;
        this.y = newY;
      }
    }
  }
}
