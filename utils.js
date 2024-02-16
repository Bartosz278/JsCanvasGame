// import { interactiveObstacles } from "./objects.js";
const interactiveObstacles = [];

export function showCollectInfo(elementId, show, text, x, y) {
    const infoBox = document.getElementById(elementId);
    if (show) {
        infoBox.textContent = text; 
        infoBox.style.display = 'block';
        infoBox.style.left = `${x}px`;
        infoBox.style.top = `${y}px`;
    } else {
        infoBox.style.display = 'none';
    }
}

// export function isCollidingWithObstacle(player,interactiveObstacles,newX, newY) {
//     return interactiveObstacles.some((obstacle) => {
//       return (
//         newX < obstacle.x + obstacle.size &&
//         newX + player.width > obstacle.x &&
//         newY < obstacle.y + obstacle.size &&
//         newY + player.height > obstacle.y
//       );
//     });
//   }

export function checkCollectibleProximity(interactiveObstacles, player) {
    let isNearCollectible = false;
    interactiveObstacles.forEach(obstacle => {
        let distance = Math.sqrt(
            (player.x - obstacle.x) ** 2 + (player.y - obstacle.y) ** 2,
        );
        if (distance < 50) { // collect range
            isNearCollectible = true;
        }
    });
    if (!isNearCollectible) {
        
    }
}
