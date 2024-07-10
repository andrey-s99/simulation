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

    updateInfo(instances) {
        for (const instance of instances) {
            const className = instance.getClassName();
            this.info[className].amount++;
            this.info[className].instances.push(instance);
        }

        this.updateMap();
    }

    updateMap() {
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
        this.actions = [];
    }

    startSimulation() {
        // Generate random amounts of entities with random positions
        let grass = Grass.generateInstances();
        let rocks = Rock.generateInstances();
        let trees = Tree.generateInstances();
        let herbivores = Herbivore.generateInstances();
        let carnivores = Carnivore.generateInstances();
        // // Update map.info
        this.map.updateInfo([...rocks, ...grass, ...trees, ...herbivores, ...carnivores]);
        // // Display 
        this.renderer.renderSimulation(this.map.map);
    }
}

const simulation = new Simulation();

simulation.startSimulation();