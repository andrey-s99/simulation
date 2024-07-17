import Tree from "../tree.js"
import Grass from "../grass.js"
import Rock from "../rock.js"
import Carnivore from "../carnivore.js"
import Herbivore from "../herbivore.js"

export default class ActionInit {
    constructor() {}

    fillMapWithEntities(map) {
        const entities = this.generateAllInstances();
        map.updateInfo(entities);
    }
    
    generateAllInstances() {
        let grass = Grass.generateInstances();
        let rocks = Rock.generateInstances();
        let trees = Tree.generateInstances();
        let herbivores = Herbivore.generateInstances();
        let carnivores = Carnivore.generateInstances();

        return [...rocks, ...grass, ...trees, ...herbivores, ...carnivores];
    }
}