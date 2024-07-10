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
    }

    startSimulation() {
        console.log("Simulation started!")
        // Generate random amounts of entities with random positions
        const randomlyGeneratedInstances = this.#generateAllInstances();
        // Update map.info
        this.map.updateInfo(randomlyGeneratedInstances);
        // Display map
        this.renderer.drawMap(this.map.map);
    }

    pauseSimulation() {
        console.log("Simulation paused!");
    }

    restartSimulation() {
        console.log("Simulation restarted!");
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