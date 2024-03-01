const interactiveObstacles = [];
export function showCollectInfo(elementId, show, text, x, y) {
    let infoBox = document.getElementById(elementId);
    if (show) {
        infoBox.textContent = text;
        infoBox.style.display = 'block';
        infoBox.style.left = `${x}px`;
        infoBox.style.top = `${y}px`;
    }
    else {
        infoBox.style.display = 'none';
    }
}
// export function isCollidingWithObstacle(
//   interactiveObstacles: any[],
//   newX: number,
//   newY: number
// ): boolean {
//   return interactiveObstacles.some((obstacle) => {
//     return (
//       newX < obstacle.x + obstacle.width &&
//       newX + this.width > obstacle.x &&
//       newY < obstacle.y + obstacle.height &&
//       newY + this.height > obstacle.y
//     );
//   });
// }
export function isCollidingWithObstacle(interactiveObstacles, newX, newY, cameraX, // Dodajemy przesunięcie kamery jako argumenty
cameraY) {
    return interactiveObstacles.some((obstacle) => {
        // Przesunięcie pozycji obiektu o wartości kamery
        let obstacleX = obstacle.x - cameraX;
        let obstacleY = obstacle.y - cameraY;
        return (newX < obstacleX + obstacle.width &&
            newX + this.width > obstacleX &&
            newY < obstacleY + obstacle.height &&
            newY + this.height > obstacleY);
    });
}
export function checkCollectibleProximity(interactiveObstacles, player) {
    let isNearCollectible = false;
    interactiveObstacles.forEach((obstacle) => {
        let distance = Math.sqrt(Math.pow((player.x - obstacle.x), 2) + Math.pow((player.y - obstacle.y), 2));
        if (distance < 50) {
            isNearCollectible = true;
        }
    });
    if (!isNearCollectible) {
    }
}
export const dragElement = (element, dragzone) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragMouseUp = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        element.classList.remove('drag');
    };
    const dragMouseMove = (event) => {
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        element.style.top = `${element.offsetTop - pos2}px`;
        element.style.left = `${element.offsetLeft - pos1}px`;
    };
    const dragMouseDown = (event) => {
        event.preventDefault();
        pos3 = event.clientX;
        pos4 = event.clientY;
        element.classList.add('drag');
        document.onmouseup = dragMouseUp;
        document.onmousemove = dragMouseMove;
    };
    dragzone.onmousedown = dragMouseDown;
};
export function drawBackground(ctx, image, player) {
    ctx.drawImage(image, player.x - 500, player.y - 500, 1000, 600);
}
