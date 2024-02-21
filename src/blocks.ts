
export interface Block {
    name: string;
    diggingTime: number;
    interactive: boolean;
    image: HTMLImageElement;
    spawnChance: number;
    canPlace: boolean;
  }
  
  export const blocks: Block[] = [
    { name: 'tree', diggingTime: 1000, interactive: true , image: new Image(), spawnChance:65,canPlace:true},
    { name: 'stone', diggingTime: 2000, interactive: true, image: new Image(), spawnChance:35,canPlace:true },
    { name: 'wall', diggingTime: 3000, interactive: false, image: new Image(), spawnChance:0 ,canPlace:true}
  ];
  