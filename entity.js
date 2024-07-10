import Configuration from "../configuration.js";
const config = new Configuration();

const height = config.height;
const width = config.width;

export default class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Static method to generate instances of the class with positions
    static generateInstances(min=4,max=7) {
        let instances = [];
        // Get a random number between min and max including both
        const limit = Math.floor(Math.random() * (max + 1 - min) + min);

        for (let i = 0; i < limit; i++) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);

            const newInstance = new this(x, y);
            instances.push(newInstance);
        }

        return instances;
    }

    // Get the class name
    getClassName() {
        return this.constructor.name;
    }
}