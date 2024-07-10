import Creature from "../creature.js"
import Configuration from "../configuration.js";
const config = new Configuration();

const herbivoreSpeed = config.herbivoreSpeed;
const herbivoreHp = config.herbivoreHp;

export default class Herbivore extends Creature {
    constructor(x, y) {
        super(x, y, herbivoreSpeed, herbivoreHp);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🐄" : "🐇";;
    }

    makeMove() {
        console.log("Herbivore makes a move");
    }
}