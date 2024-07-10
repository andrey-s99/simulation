import Entity from "../entity.js"

export default class Tree extends Entity {
    constructor(x, y) {
        super(x, y);

        // Get a random icon for variety
        this.icon = (Math.floor(Math.random() * 2) > 0) ? "🌳" : "🌲";
    }
}