import { interactiveObstacles } from "./objects.js";
import { inventoryEl } from "./game.js";

interface Item {
    x: number;
    y: number;
    size: number;
    digTime: number;
    interactive: boolean;
    color: string;
    count: number;
  }
  
export const inventory: Item[] = Array(10).fill(null);

export function collectItem(index: number): void {
  const item: Item = interactiveObstacles.splice(index, 1)[0];
  let added: boolean = false;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i]) {
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

export function updateInventory(): void {
  inventoryEl.innerHTML = "";
  inventory.forEach(function (item: Item, index: number) {
    const slot = document.createElement("div");
    slot.className = "slot";
    if (item) {
      const itemCount = document.createElement("span");
      itemCount.className = "itemCount";
      itemCount.textContent = item.count.toString();
      slot.appendChild(itemCount);
      slot.style.backgroundImage = "url('assets/log.png')";
    }
    inventoryEl.appendChild(slot);
  });
}