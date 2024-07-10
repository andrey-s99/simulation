import Entity from "../entity.js"

export default class Rock extends Entity {
    constructor(x, y) {
        super(x, y);

        this.icon = "⛰️";
    }
}