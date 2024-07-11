import Entity from "../entity.js"
import Configuration from "../configuration.js"
const config = new Configuration();

export default class Grass extends Entity {
    constructor(x, y) {
        super(x, y);

        this.icon = config.icons.grass;
    }
}