import Entity from "../entity.js"
import Configuration from "../configuration.js"
const config = new Configuration();

export default class Rock extends Entity {
    constructor(x, y) {
        super(x, y);

        this.icon = config.icons.rock;
    }
}