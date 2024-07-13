import Creature from "../creature.js"
import BFS from "../BFS.js";
import Configuration from "../configuration.js";
const config = new Configuration();

export default class Herbivore extends Creature {
    constructor(x, y) {
        super(x, y, config.herbivoreSpeed, config.herbivoreHp);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? config.icons.herbivore1 : config.icons.herbivore2;
    }

    makeMove(map) {
        const HerbivoreBFS = new BFS(map.map, this.speed, [config.icons.grass], this.x, this.y);
        const pathToGoal = HerbivoreBFS.findPath();

        // Do nothing if no path
        if (!pathToGoal.length) {
            console.log(`${this.icon} at ${this.x} and ${this.y} did not find path. Found path is ${pathToGoal}`);
            return;
        }

        // Update position
        const newX = pathToGoal[0][0];
        const newY = pathToGoal[0][1];

        // If lands on grass -- eat grass before moving
        if (map.map[newY][newX].icon === config.icons.grass) {
            map.removeInstance(newX, newY, "Grass");
        }

        this.x = newX;
        this.y = newY;
    }
}