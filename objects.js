export const interactiveObstacles = [];

export function createObstacles(canvas) {
  for (let i = 0; i < 15; i++) {
    const obstacle = {
      x: Math.random() * ((window.innerWidth * 0.9) - 20),
      y: Math.random() * ((window.innerHeight * 0.75) - 20),
      size: 40,
      digTime: 1000,
      interactive: true,
    };
    interactiveObstacles.push(obstacle);
  }
}

export function drawObstacles(ctx, treeImg) {
  interactiveObstacles.forEach(function (obstacle) {
    ctx.drawImage(treeImg, obstacle.x, obstacle.y, obstacle.size, obstacle.size);
  });
}
