import Creature from "../creature.js"
import Configuration from "../configuration.js";
const config = new Configuration();

import BFS from "../BFS.js";

export default class Carnivore extends Creature {
    constructor(x, y) {
        super(x, y, config.carnivoreSpeed, config.carnivoreHp);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? config.icons.carnivore1 : config.icons.carnivore2;

        this.attackDmg = config.carnivoreDmg;
    }

    makeMove(map) {
        const CarnivoreBFS = new BFS(map.map, this.speed, [config.icons.herbivore1], this.x, this.y);
        const pathToGoal = CarnivoreBFS.findPath();

        // Do nothing if no path
        if (!pathToGoal.length) {
            console.log(`${this.icon} at ${this.x} and ${this.y} did not find path`);
            return;
        }

        // Update position
        const newX = pathToGoal[0][0];
        const newY = pathToGoal[0][1];

        // If lands on goal -- attack goal before moving
        if ([config.icons.herbivore1].includes(map.map[newY][newX].icon)) {
            this.makeAttack(map.getInstance(newX, newY, "Herbivore"), map);
        }

        this.x = newX;
        this.y = newY;
    }

    makeAttack(prey, map) {
        console.log(`${this.icon} attacks ${prey.icon} for ${this.attackDmg} damage`);
        prey.hp -= this.attackDmg;
        if (prey.hp <= 0) {
            map.removeInstance(prey.x, prey.y, "Herbivore");
        }
    }
}