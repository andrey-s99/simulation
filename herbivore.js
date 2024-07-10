import Creature from "../creature.js"
import Configuration from "../configuration.js";
const config = new Configuration();

export default class Herbivore extends Creature {
    constructor(x, y) {
        super(x, y, config.herbivoreSpeed, config.herbivoreHp);

        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🐄" : "🐇";;
    }

    makeMove(map) {
        // Remake the map as an array of nodes for the search algorithm
        let allNodes = []
        for (let y = 0; y < config.height; y++) {
            allNodes[y] = [];
            for (let x = 0; x < config.width; x++) {
                let node = {
                    x: x,
                    y: y,
                    icon: map[y][x],
                    visited: false
                }

                allNodes[y][x] = node;
            }
        }

        // Find all children of the node
        const findChildren = (node) => {
            let children = [];

            // Go in clockwise direction
            if (node.y - 1 >= 0) {
                children.push(allNodes[node.y - 1][node.x]);
            }
            
            if (node.x + 1 < config.width) {
                children.push(allNodes[node.y][node.x + 1]);
            }

            if (node.y + 1 < config.height) {
                children.push(allNodes[node.y + 1][node.x]);
            }
            
            if (node.x - 1 >= 0) {
                children.push(allNodes[node.y][node.x - 1]);
            }

            return children;
        }

        // Breadth-first search algorithm to help herbivores find the nearest grass
        // Find a path and return a list of nodes that lead to it
        const BFS = (start, goal) => {
            // Queue to keep the nodes
            let queue = [];

            // Push the start node to the queue
            queue.push(start);

            // Store path that consists of nodes
            let path = [];

            // Push the start node to the path
            path.push(start);

            // Pull nodes from queue until it is empty
            while(queue.length) {
                // Pop the node from queue to check it
                let node = queue.shift();
                
                // Push node to the path
                path.push(node);

                // Return path if reached the goal
                if (node.icon === goal) {
                    return node;
                }
                allNodes[node.y][node.x].visited = true;

                // Check all children of the current node
                for (const child of findChildren(node)) {
                    // Look only on unvisited ones
                    if (!allNodes[child.y][child.x].visited) {
                        queue.push(child);
                        allNodes[child.y][child.x].visited = true;
                    }
                }
            }

            // Return one node path if no grass is find
            return node;
        }

        console.log(`${this.icon} from ${this.x}:${this.y} has found` + JSON.stringify(BFS(allNodes[this.y][this.x], "🌿")));
    }
}