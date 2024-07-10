import Creature from "../creature.js"
import Configuration from "../configuration.js";
const config = new Configuration();

const carnivoreSpeed = config.carnivoreSpeed;
const carnivoreHp = config.carnivoreHp;
const carnivoreDmg = config.carnivoreDmg;

export default class Carnivore extends Creature {
    constructor(x, y) {
        super(x, y, carnivoreSpeed, carnivoreHp);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🐅" : "🐈";

        this.attackDmg = carnivoreDmg;
    }

    makeMove() {
        console.log("Carnivore makes a move");
    }
}