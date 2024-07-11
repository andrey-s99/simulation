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
                    visited: false,
                    parent: null
                }

                allNodes[y][x] = node;
            }
        }

        const isTreeOrRock = (icon) => {
            return icon === "🌳" || icon === "🌲" || icon === "⛰️";
        }

        // Find all children of the node
        const findChildren = (node) => {
            let children = [];

            // Check all moves that are possible with the current speed
            let step = 1;
            while (step <= this.speed && this.speed !== 0) {
                // Go in clockwise direction
                // Avoid trees and rocks as it is not possible to step on them
                if (node.y - step >= 0 && !isTreeOrRock(allNodes[node.y - step][node.x].icon)) {
                    children.push(allNodes[node.y - step][node.x]);
                }
                
                if (node.x + step < config.width && !isTreeOrRock(allNodes[node.y][node.x + step].icon)) {
                    children.push(allNodes[node.y][node.x + step]);
                }

                if (node.y + step < config.height && !isTreeOrRock(allNodes[node.y + step][node.x].icon)) {
                    children.push(allNodes[node.y + step][node.x]);
                }
                
                if (node.x - step >= 0 && !isTreeOrRock(allNodes[node.y][node.x - step].icon)) {
                    children.push(allNodes[node.y][node.x - step]);
                }

                // Increase step by 1
                step++;
            }
            
            return children;
        }

        // Get path to a node by looking through its parents
        const getPath = (node) => {
            // If parent is null then we did not find the goal
            if (node.parent === null) {
                // return an empty path
                return [];
            }

            let path = [];

            let currentNode = node;
            while (currentNode.parent) {
                path.unshift([currentNode.x, currentNode.y]);
                currentNode = currentNode.parent;
            }

            return path;
        } 

        // Breadth-first search algorithm to help herbivores find the nearest grass
        // Find a path and return a list of nodes that lead to it
        const BFS = (start, goal) => {
            // Queue to keep the nodes
            let queue = [];

            // Push the start node to the queue
            queue.push(start);

            // Pull nodes from queue until it is empty
            while(queue.length) {
                // Pop the node from queue to check it
                let node = queue.shift();

                // Return path if reached the goal
                if (node.icon === goal) {
                    return getPath(node);
                }
                allNodes[node.y][node.x].visited = true;

                // Check all children of the current node
                for (const child of findChildren(node)) {
                    // Look only on unvisited ones
                    if (!allNodes[child.y][child.x].visited) {
                        allNodes[child.y][child.x].parent = node;
                        allNodes[child.y][child.x].visited = true;
                        queue.push(child);
                    }
                }
            }

            // Return empty path if goal is not found
            return [];
        }

        let pathToGoal = BFS(allNodes[this.y][this.x], "🌿");

        // Update position
        this.x = pathToGoal[0][0];
        this.y = pathToGoal[0][1];
    }
}