import Entity from "../entity.js"

export default class Creature extends Entity {
    constructor(x, y, speed, hp) {
        super(x, y);
        this.speed = speed;
        this.hp = hp;
    }

    makeMove(){}
}