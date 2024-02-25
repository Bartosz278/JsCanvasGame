import { Player } from './player';

export function drawCraftingWindow(
  player: Player,
  craftingWindow: HTMLElement
) {
  if (player.isCraftingOpen == true) {
    craftingWindow.style.display = 'flex';
  } else {
    craftingWindow.style.display = 'none';
  }
}
