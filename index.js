// Set map dimensions
const width = 20;
const height = 20;
const tileSize = 50;
const ground = "🟫";

const herbivoreSpeed = 1;
const herbivoreHp = 10;

const carnivoreSpeed = 2;
const carnivoreHp = 10;
const carnivoreAttack = 5;

const mapCanvas = document.getElementById("map-canvas");
// Setting the height and width of canvas to fit the tiles
mapCanvas.height = height * tileSize + 30; // Adding some padding to prevent cropping on right and bottom edges
mapCanvas.width = width * tileSize + 30; // Very hacky but whatever
const ctx = mapCanvas.getContext("2d");

class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Static method to generate instances of the class with positions
    static generateInstances(min=4,max=7) {
        let instances = [];
        // Get a random number between min and max including both
        const limit = Math.floor(Math.random() * (max + 1 - min) + min);

        for (let i = 0; i < limit; i++) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);

            const newInstance = new this(x, y);
            instances.push(newInstance);
        }

        return instances;
    }

    // Get the class name
    getClassName() {
        return this.constructor.name;
    }
}

class Grass extends Entity {
    constructor(x, y) {
        super(x, y);

        this.icon = "🌿";
    }
}

class Tree extends Entity {
    constructor(x, y) {
        super(x, y);

        // Get a random icon for variety
        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🌳" : "🌲";
    }
}

class Rock extends Entity {
    constructor(x, y) {
        super(x, y);

        this.icon = "⛰️";
    }
}

class Creature extends Entity {
    constructor(x, y, speed, hp) {
        super(x, y);
        this.speed = speed;
        this.hp = hp;
    }

    makeMove(){}
}

class Herbivore extends Creature {
    constructor(x, y) {
        super(x, y, herbivoreSpeed, herbivoreHp);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🐄" : "🐇";;
    }

    makeMove() {
        console.log("Herbivore makes a move");
    }
}

class Carnivore extends Creature {
    constructor(x, y) {
        super(x, y, carnivoreSpeed, carnivoreHp);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🐅" : "🐈";

        this.attackDmg = carnivoreAttack;
    }

    makeMove() {
        console.log("Carnivore makes a move");
    }
}

class Map {
    constructor() {
        this.map = [];
        // Keeps track of all instances and their amount
        this.info = {
            Grass: { amount: 0, instances: [] },
            Rock: { amount: 0, instances: [] },
            Tree: { amount: 0, instances: [] },

            Herbivore: { amount: 0, instances: [] },
            Carnivore: { amount: 0, instances: [] }
        }

        // Create an empty map on instantiation
        for (let i = 0; i < height; i++) {
            this.map[i] = []
            for (let j = 0; j < width; j++) {
                this.map[i][j] = ground;
            }
        }
    }

    // Update map info
    updateInfo(instances) {
        for (const instance of instances) {
            const className = instance.getClassName();
            this.info[className].amount++;
            this.info[className].instances.push(instance);
        }

        this.#updateMap();
    }

    // Update map matrix
    #updateMap() {
        for (const value of Object.values(this.info)) {
            for (const instance of value.instances) {
                this.map[instance.y][instance.x] = instance.icon;
            }
        }
    }
}

class Renderer {
    constructor() {}

    renderSimulation(map) {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.#drawTile(map[i][j], j, i);
            }
        }

        console.log(screen);
    }

    #drawTile(icon, x, y) {
        ctx.font = `${tileSize}px sans-serif`;
        ctx.fillText(icon, x * tileSize, y * tileSize + tileSize);
    }
}

class Simulation {
    constructor() {
        this.map = new Map();
        this.turnCounter = 0;
        this.renderer = new Renderer();
        this.actions = [];
    }

    startSimulation() {
        // Generate random amounts of entities with random positions
        const randomlyGeneratedInstances = this.#generateAllInstances();
        // Update map.info
        this.map.updateInfo(randomlyGeneratedInstances);
        // Display map
        this.renderer.renderSimulation(this.map.map);
    }

    #generateAllInstances() {
        let grass = Grass.generateInstances();
        let rocks = Rock.generateInstances();
        let trees = Tree.generateInstances();
        let herbivores = Herbivore.generateInstances();
        let carnivores = Carnivore.generateInstances();

        return [...rocks, ...grass, ...trees, ...herbivores, ...carnivores];
    }
}

const simulation = new Simulation();

simulation.startSimulation();