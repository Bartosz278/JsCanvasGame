export function drawCraftingWindow(player, craftingWindow) {
    if (player.isCraftingOpen == true) {
        craftingWindow.style.display = 'flex';
    }
    else {
        craftingWindow.style.display = 'none';
    }
}
export function moveWindow(window, player) {
    window.style.bottom = `${player.mouseY}px`;
    console.log(player.mouseY);
    console.log(player.mouseX);
    window.style.left = `${player.mouseX}px`;
}
