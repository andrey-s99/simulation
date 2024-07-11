import Entity from "../entity.js"
import Configuration from "../configuration.js"
const config = new Configuration();

export default class Tree extends Entity {
    constructor(x, y) {
        super(x, y);

        // Get a random icon for variety
        this.icon = (Math.floor(Math.random() * 2) > 0) ? config.icons.tree1 : config.icons.tree2;
    }
}