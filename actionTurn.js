import Tree from "../tree.js"
import Grass from "../grass.js"
import Rock from "../rock.js"
import Carnivore from "../carnivore.js"
import Herbivore from "../herbivore.js"

export default class ActionTurn {
    constructor() {}

    makeMoves(map) {
        // Iterate over every Creature and invoke makeMove method for each
        for (const obj of Object.keys(map.info)) {
            if (obj === "Herbivore" || obj === "Carnivore") {
                for (const instance of map.info[obj].instances) {
                    instance.makeMove(map);
                    // Update map after every move
                    map.updateMap();
                }
            }
        }
    }
}