import { interactiveObstacles } from "./objects.js";
import { inventoryEl } from "./game.js";
import { player } from "./game.js";
interface Item {
    name: string;
    x: number;
    y: number;
    size: number;
    digTime: number;
    interactive: boolean;
    count: number;
    canPlace: boolean;
  }
  
export const inventory: Item[] = Array(10).fill(null);

export function collectItem(index: number): void {
  const item: Item = {...interactiveObstacles.splice(index, 1)[0]};
  let added: boolean = false;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] && inventory[i].name== item.name) {
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
    slot.id = `${index}`;
    slot.addEventListener('click',()=>{
      takeItem(item,slot,inventory);
      useItem(item,slot,inventory);
    });
    if (item) {
      const itemCount = document.createElement("span");
      itemCount.className = "itemCount";
      itemCount.id = `${index}`
      itemCount.textContent = item.count.toString();
      slot.appendChild(itemCount);
      slot.style.backgroundImage = `url("assets/eqIcons/${item.name}Eq.png")`;
    }
    inventoryEl.appendChild(slot);
  });
  
}
export function takeItem(item:Item,slot:HTMLElement,inventory:any){
  if(slot.style.backgroundImage != null && player.isHoldingItem == false){
    document.getElementById(`${slot.id}`).textContent = '';
    slot.style.backgroundImage = null;
    inventory[slot.id]=null;
    player.isHoldingItem = true;
  }
}

export function useItem(item:Item,slot:HTMLElement,inventory:any){
  if(player.isHoldingItem == true){
    player.isHoldingItem = false;
  }
}
