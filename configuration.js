export default class Configuration {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.tileSize = 50;
        this.ground = "🟫"

        this.canvasWidth = this.width * this.tileSize + 12;
        this.canvasHeight = this.height * this.tileSize + 12;
        
        this.herbivoreSpeed = 1;
        this.herbivoreHp = 20;

        this.carnivoreSpeed = 1;
        this.carnivoreHp = 20;
        this.carnivoreDmg = 5;

        this.icons = {
            tree1: "🌲",
            tree2: "🌳",
            grass: "🌿",
            rock: "⛰️",

            herbivore1: "🐄",
            herbivore2: "🐇",

            carnivore1: "🐅",
            carnivore2: "🐈"
        }
    }
}