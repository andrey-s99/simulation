import Tree from "../tree.js"
import Grass from "../grass.js"
import Rock from "../rock.js"
import Carnivore from "../carnivore.js"
import Herbivore from "../herbivore.js"

import Renderer from "../renderer.js"
import Map from "../map.js"

export default class Simulation {
    constructor() {
        this.map = new Map();
        this.turnCounter = 0;
        this.renderer = new Renderer();
        this.actions = [];
        this.running = true;

        this.timeoutId = null;
    }

    initSimulation() {
        // Generate random amounts of entities with random positions
        const randomlyGeneratedInstances = this.#generateAllInstances();
        // Update map.info
        this.map.updateInfo(randomlyGeneratedInstances);
        // Display map
        this.renderer.drawMap(this.map.map);
    }

    startSimulation() {
        if (!this.running) {
            console.log("Simulation continues")
            this.running = true;
        } else { // Running is true only of first launch or on restart
            console.log("Simulation started")
            this.initSimulation();
        }

        this.runSimulation();
    }

    pauseSimulation() {
        console.log("Simulation paused");
        this.running = false;

        this.clearScheduledTimeouts();
    }

    restartSimulation() {
        console.log("Simulation restarted");
        this.clearScheduledTimeouts();
        
        this.map.clearMap();
        this.turnCounter = 0;

        this.running = true;
        this.startSimulation();
    }

    runSimulation() {
        if (this.running) {
            console.log(`Turn ${this.turnCounter}`);

            this.nextTurn();

            this.timeoutId = setTimeout(() => {
                this.runSimulation();
                }, 2000);

            this.turnCounter++;
        }
    }

    clearScheduledTimeouts() {
        clearTimeout(this.timeoutId);
    }

    nextTurn() {
        for (const obj of Object.keys(this.map.info)) {
            if (obj === "Herbivore" || obj === "Carnivore") {
                for (const instance of this.map.info[obj].instances) {
                    instance.makeMove();
                }
            }
        }

        this.renderer.drawMap(this.map.map);
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