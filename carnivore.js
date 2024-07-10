import Creature from "../creature.js"
import Configuration from "../configuration.js";
const config = new Configuration();

export default class Carnivore extends Creature {
    constructor(x, y) {
        super(x, y, config.carnivoreSpeed, config.carnivoreHp);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🐅" : "🐈";

        this.attackDmg = config.carnivoreDmg;
    }

    makeMove() {
        console.log("Carnivore makes a move");
    }
}