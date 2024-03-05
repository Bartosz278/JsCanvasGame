export const blocks = [
    {
        name: 'tree',
        height: 40,
        width: 40,
        diggingTime: 1000,
        interactive: false,
        image: new Image(),
        spawnChance: 50,
        canPlace: false,
        canCollect: true
    },
    {
        name: 'stone',
        height: 40,
        width: 40,
        diggingTime: 2000,
        interactive: false,
        image: new Image(),
        spawnChance: 30,
        canPlace: false,
        canCollect: true
    },
    {
        name: 'wall',
        height: 48,
        width: 33,
        diggingTime: 500,
        interactive: false,
        image: new Image(),
        spawnChance: 20,
        canPlace: true,
        canCollect: true
    }
];
