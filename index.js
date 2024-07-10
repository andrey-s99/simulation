// Set map dimensions
const width = 20;
const height = 20;
const ground = "🟫";

class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Static method to generate instances of the class with positions
    static generateInstances(min=2,max=5) {
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
    constructor(x, y) {
        super(x, y);
    }

    makeMove(){}
}

class Herbivore extends Creature {
    constructor(x, y) {
        super(x, y);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🐄" : "🐂";;
    }

    makeMove() {
        console.log("Herbivore makes a move");
    }
}

class Carnivore extends Creature {
    constructor(x, y) {
        super(x, y);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🐅" : "🐈";;
    }

    makeMove() {
        console.log("Carnivore makes a move");
    }
}

class Map {
    constructor() {
        this.map = [];
        // Keeps track of the amount of instances and positions of each instance
        this.info = {
            grass: { amount: 0, position: []},
            rocks: { amount: 0, position: []},
            // trees: { amount: 0, position: []},

            // herbivores: { amount: 0, position: []},
            // carnivores: { amount: 0, position: []}
        }

        // Create an empty map on instantiation
        for (let i = 0; i < height; i++) {
            this.map[i] = []
            for (let j = 0; j < width; j++) {
                this.map[i][j] = ground;
            }
        }
    }

    updateGrass(grass) {
        for (const inst of grass) {
            this.info.grass.position.push([inst.x, inst.y]);

            this.info.grass.amount++;
        }

        this.updateMap();
    }

    updateRocks(rocks) {
        for (const inst of rocks) {
            this.info.rocks.position.push([inst.x, inst.y]);

            this.info.rocks.amount++;
        }

        this.updateMap();
    }

    updateMap() {
        for (const value of Object.values(this.info)) {
            for (const pos of value.position) {
                this.map[pos[1]][pos[0]] = "🌿";
            }
        }
    }
}

class Renderer {
    constructor() {}

    renderSimulation(map) {
        console.log(map);
        let screen = "";
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                screen += map[i][j];
            }
            screen += "\n";
        }

        console.log(screen);
    }
}

class Simulation {
    constructor() {
        this.map = new Map();
        this.turnCounter = 0;
        this.renderer = new Renderer();
    }

    startSimulation() {
        // Generate random amounts of entities with random positions
        let grass = Grass.generateInstances();
        console.log(grass);
        let rocks = Rock.generateInstances();
        console.log(rocks);
        // // Update map.info
        this.map.updateGrass(grass);
        this.map.updateRocks(rocks);
        // // Display 
        this.renderer.renderSimulation(this.map.map);
    }
}

const simulation = new Simulation();

simulation.startSimulation();