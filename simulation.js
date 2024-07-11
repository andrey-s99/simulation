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
        this.isRunning = true;

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
        if (!this.isRunning) {
            console.log("Simulation continues")
            this.isRunning = true;
        } else { // isRunning is true only of first launch or on restart
            console.log("Simulation started")
            this.initSimulation();
        }

        this.runSimulation();
    }

    pauseSimulation() {
        console.log("Simulation paused");
        this.isRunning = false;

        this.clearScheduledTimeouts();
    }

    restartSimulation() {
        console.log("Simulation restarted");
        this.clearScheduledTimeouts();

        this.map.reloadMap();
        this.turnCounter = 0;

        this.isRunning = true;
        this.startSimulation();
    }

    runSimulation() {
        if (this.isRunning) {
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
        // Find and iterate over every herbivore and carnivore and invoke makeMove method for each
        for (const obj of Object.keys(this.map.info)) {
            if (obj === "Herbivore" || obj === "Carnivore") {
                for (const instance of this.map.info[obj].instances) {
                    instance.makeMove(this.map);
                }
            }
        }
        // Update map after moves are made
        this.map.updateMap();
        // Redraw map on the turn end
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