import { player } from './game.js';
export class Enemy {
    constructor(name, x, y, height, width, image, health, speed, interactiveObstacles, isCollidingWithObstacle) {
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
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
        }
    }
}
