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
let cursorItems:Item;
let isHoldingItem:boolean = false;

export function takeItem(item:Item,slot:HTMLElement,inventory:any){
  if(isHoldingItem == false && inventory[slot.id] != null){
    cursorItems = inventory[slot.id];
    document.getElementById(`${slot.id}`).textContent = '';
    slot.style.backgroundImage = null;
    inventory[slot.id]=null;
    isHoldingItem = true;
    updateInventory();
    return;
  }
  if(isHoldingItem == true && inventory[slot.id]==null){
    document.getElementById(`${slot.id}`).textContent = cursorItems.count.toString();
    slot.style.backgroundImage = `url("assets/eqIcons/${cursorItems.name}Eq.png")`;
    inventory[slot.id]=cursorItems;
    isHoldingItem = false;
    updateInventory();
    return;
  }
  if(isHoldingItem == true && inventory[slot.id]!=null && inventory[slot.id].name == cursorItems.name){
    inventory[slot.id].count = inventory[slot.id].count + cursorItems.count;
    isHoldingItem = false;
    updateInventory();
    return;
  }
  if(isHoldingItem == true && inventory[slot.id]!=null && inventory[slot.id].name != cursorItems.name){
    let temp: Item = cursorItems;
    cursorItems = inventory[slot.id];
    document.getElementById(`${slot.id}`).textContent = '';
    slot.style.backgroundImage = null;
    inventory[slot.id]=null;
    document.getElementById(`${slot.id}`).textContent = temp.count.toString();
    slot.style.backgroundImage = `url("assets/eqIcons/${temp.name}Eq.png")`;
    inventory[slot.id]=temp;
    isHoldingItem = true;
    updateInventory();
    return;
  }

}

