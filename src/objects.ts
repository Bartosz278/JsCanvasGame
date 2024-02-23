export const interactiveObstacles: {
  name: string;
  x: number;
  y: number;
  size: number;
  digTime: number;
  interactive: boolean;
  count: number;
  image: HTMLImageElement;
  canPlace: boolean;
}[] = [];
import { Block, blocks } from './blocks.js';

export function createObstacles(
  canvas: HTMLCanvasElement,
  quantity: number
): void {
  for (let i: number = 0; i < quantity; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    let chosenBlock: Block | undefined;
    let accumulatedSpawnChance = 0;
    for (const block of blocks) {
      accumulatedSpawnChance += block.spawnChance;
      if (randomNumber < accumulatedSpawnChance) {
        chosenBlock = block;
        break;
      }
    }

    if (chosenBlock) {
      const obstacle = {
        name: chosenBlock.name,
        x: Math.random() * (window.innerWidth * 0.9 - 20),
        y: Math.random() * (window.innerHeight * 0.75 - 20),
        size: 40,
        digTime: chosenBlock.diggingTime,
        interactive: chosenBlock.interactive,
        count: 0,
        image: new Image(),
        canPlace: chosenBlock.canPlace
      };
      obstacle.image.src = `assets/${obstacle.name}.png`;
      interactiveObstacles.push(obstacle);
    }
  }
}

export function drawObstacles(ctx: CanvasRenderingContext2D): void {
  interactiveObstacles.forEach(function (obstacle) {
    ctx.drawImage(
      obstacle.image,
      obstacle.x,
      obstacle.y,
      obstacle.size,
      obstacle.size
    );
  });
}
