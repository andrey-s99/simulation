import Configuration from "../configuration.js";
const config = new Configuration();

const height = config.height;
const width = config.width;
const ground = config.ground;

export default class Map {
    constructor() {
        this.map = [];
        // Keeps track of all instances and their amount
        this.info = {
            Grass: { amount: 0, instances: [] },
            Rock: { amount: 0, instances: [] },
            Tree: { amount: 0, instances: [] },

            Herbivore: { amount: 0, instances: [] },
            Carnivore: { amount: 0, instances: [] }
        }

        // Create an empty map on instantiation
        for (let i = 0; i < height; i++) {
            this.map[i] = []
            for (let j = 0; j < width; j++) {
                this.map[i][j] = ground;
            }
        }
    }

    // Update map info when new instances are added
    updateInfo(instances) {
        for (const instance of instances) {
            const className = instance.getClassName();
            this.info[className].amount++;
            this.info[className].instances.push(instance);
        }

        this.updateMap();
    }

    // Update positions on map matrix
    updateMap() {
        this.clearMap();
        
        for (const value of Object.values(this.info)) {
            for (const instance of value.instances) {
                this.map[instance.y][instance.x] = instance.icon;
            }
        }
    }

    // Clear map
    clearMap() {
        // Fill map with ground only
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.map[i][j] = ground;
            }
        }   
    }

    // Clear info
    clearInfo() {
        this.info = {
            Grass: { amount: 0, instances: [] },
            Rock: { amount: 0, instances: [] },
            Tree: { amount: 0, instances: [] },

            Herbivore: { amount: 0, instances: [] },
            Carnivore: { amount: 0, instances: [] }
        };
    }

    // Reload map
    reloadMap() {
        this.clearMap();
        this.clearInfo();
    }
}