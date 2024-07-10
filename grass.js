import Entity from "../entity.js"

export default class Grass extends Entity {
    constructor(x, y) {
        super(x, y);

        this.icon = "🌿";
    }
}