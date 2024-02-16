import { interactiveObstacles } from "/modules/objects.js";
import { inventoryEl } from "/game.js";

export const inventory = Array(10).fill(null);
export function collectItem(index) {
  const item = interactiveObstacles.splice(index, 1)[0];
  let added = false;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] && inventory[i].color === item.color) {
      inventory[i].count++;
      added = true;
      break;
    } else if (!inventory[i]) {
      inventory[i] = { ...item, count: 1 };
      added = true;
      break;
    }
  }
  if (!added) {
    alert("Ekwipunek pełny!");
  }
  updateInventory();
}

export function updateInventory() {
  inventoryEl.innerHTML = "";
  inventory.forEach(function (item, index) {
    const slot = document.createElement("div");
    slot.className = "slot";
    if (item) {
      const itemCount = document.createElement("span");
      itemCount.className = "itemCount";
      itemCount.textContent = item.count;
      slot.appendChild(itemCount);
      slot.style.backgroundImage = "url('assets/log.png')";
    }
    inventoryEl.appendChild(slot);
  });
}
