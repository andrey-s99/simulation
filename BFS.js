import Configuration from "../configuration.js";
const config = new Configuration();

export default class BFS {
    constructor (map, maxStep, goal, startX, startY) {
        this.map = map;
        this.maxStep = maxStep;
        this.goal = goal;
        this.start = this.map[startY][startX]
    }

    // Reset map before every search
    resetMap() {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                this.map[y][x].visited = false;
                this.map[y][x].parent = null;
            }
        }
    }

    // Find path to goal
    findPath() {
        this.resetMap();
        // Queue to keep the nodes
        let queue = [];

        // Push the start node to the queue
        queue.push(this.start);

        // Pull nodes from queue until it is empty
        while(queue.length) {
            // Pop the node from queue to check it
            let node = queue.shift();

            // Return path if reached the goal
            if (this.goal.includes(node.icon)) {
                return this.getPath(node);
            }
            this.map[node.y][node.x].visited = true;

            // Check all children of the current node
            for (const child of this.findChildren(node)) {
                // Look through unvisited nodes
                if (!this.map[child.y][child.x].visited) {
                    this.map[child.y][child.x].parent = node;
                    this.map[child.y][child.x].visited = true;
                    queue.push(child);
                }
            }
        }

        // Return empty path if goal is not found
        return [];
    }

    // Find all children of a given node in vertical and horizontal direction with different step lengths
    findChildren (node) {
        let children = [];

        // Check all moves that are possible with the current maxStep
        for (let step = this.maxStep; step > 0; step--) {
            let potentialMoves = [
                {y: node.y - step, x: node.x}, // up
                {y: node.y, x: node.x + step}, // right
                {y: node.y + step, x: node.x}, // bottom
                {y: node.y, x: node.x - step}, // left
            ];

            for (const move of potentialMoves) {
                if (move.y >= 0 && move.y < config.height &&
                    move.x >= 0 && move.x < config.width &&
                    !this.isOtherEntity(this.map[move.y][move.x].icon)) 
                {
                    children.push(this.map[move.y][move.x]);
                }
            }
        }
        
        return children;
    }

    // Check for icons on the path of the algorithm to avoid rocks, trees, etc.
    isOtherEntity (iconToCheck) {
        let allIcons = Object.values(config.icons);

        // Do not check against the goal because it should not be avoided
        const allIconsExceptGoals = allIcons.filter((el) => !this.goal.includes(el));

        return allIconsExceptGoals.includes(iconToCheck);
    }

    // Get path to a goal node from a start node by looking through its parents
    getPath (node) {
        let path = [];

        let currentNode = node;

        // Start node has no parents
        while (currentNode.parent) {
            path.unshift([currentNode.x, currentNode.y]);
            currentNode = currentNode.parent;
        }

        return path;
    } 
}