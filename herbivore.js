import Creature from "../creature.js"
import Configuration from "../configuration.js";
const config = new Configuration();

export default class Herbivore extends Creature {
    constructor(x, y) {
        super(x, y, config.herbivoreSpeed, config.herbivoreHp);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🐄" : "🐇";;
    }

    makeMove() {
        console.log("Herbivore makes a move");
    }
}