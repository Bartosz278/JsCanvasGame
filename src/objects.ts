export const interactiveObstacles: { x: number, y: number, size: number, digTime: number, interactive: boolean, color: string, count: number }[] = [];

export function createObstacles(canvas: HTMLCanvasElement): void {
  for (let i: number = 0; i < 15; i++) {
    const obstacle: { x: number, y: number, size: number, digTime: number, interactive: boolean, color: string, count: number } = {
      x: Math.random() * (window.innerWidth * 0.9 - 20),
      y: Math.random() * (window.innerHeight * 0.75 - 20),
      size: 40,
      digTime: 1000,
      interactive: true,
      color: "",
      count: 0,
    };
    interactiveObstacles.push(obstacle);
  }
}

export function drawObstacles(ctx: CanvasRenderingContext2D, treeImg: HTMLImageElement): void {
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