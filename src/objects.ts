export const interactiveObstacles: { x: number, y: number, size: number, digTime: number, interactive: boolean, color: string, count: number, image: HTMLImageElement }[] = [];
import { Block, blocks } from './blocks.js';


// export function createObstacles(canvas: HTMLCanvasElement, quantity:number, block: Block): void {
//   for (let i: number = 0; i < quantity; i++) {
//     const obstacle: { x: number, y: number, size: number, digTime: number, interactive: boolean, color: string, count: number } = {
//       x: Math.random() * (window.innerWidth * 0.9 - 20),
//       y: Math.random() * (window.innerHeight * 0.75 - 20),
//       size: 40,
//       digTime: block.diggingTime,
//       interactive: block.interactive,
//       color: "",
//       count: 0,
//     };
//     interactiveObstacles.push(obstacle);
//   }
  
// }
export function createObstacles(canvas: HTMLCanvasElement, quantity: number): void {
  for (let i: number = 0; i < quantity; i++) {
    // Losowanie liczby od 0 do 99
    const randomNumber = Math.floor(Math.random() * 100);
    let chosenBlock: Block | undefined;

    // Wybierz blok na podstawie losowej liczby
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
        color: "",
        count: 0,
        image: new Image(),
      };
      obstacle.image.src = `assets/${obstacle.name}.png`
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
      obstacle.size,
    );
  });
}

console.log(interactiveObstacles);
