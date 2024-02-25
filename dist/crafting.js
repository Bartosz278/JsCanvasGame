export function drawCraftingWindow(player, craftingWindow) {
    if (player.isCraftingOpen == true) {
        craftingWindow.style.display = 'flex';
    }
    else {
        craftingWindow.style.display = 'none';
    }
}
