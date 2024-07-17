import Tree from "../tree.js"
import Grass from "../grass.js"
import Rock from "../rock.js"
import Carnivore from "../carnivore.js"
import Herbivore from "../herbivore.js"

import Renderer from "../renderer.js"
import Map from "../map.js"

import ActionInit from "../actionInit.js"
import ActionTurn from "../actionTurn.js"

export default class Simulation {
    constructor() {
        this.map = new Map();
        this.turnCounter = 0;
        this.renderer = new Renderer();
        this.initActions = [new ActionInit()];
        this.turnActions = [new ActionTurn()];
        this.isRunning = true;

        this.timeoutId = null;
    }

    initSimulation() {
        // Generate random amounts of entities with random positions and update map
        this.initActions[0].fillMapWithEntities(this.map);
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
        // Iterate over every Creature and invoke makeMove method for each
        this.turnActions[0].makeMoves(this.map);

        // Redraw map on the turn end
        this.renderer.drawMap(this.map.map);
    }
}