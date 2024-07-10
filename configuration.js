export default class Configuration {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.tileSize = 50;
        this.ground = "🟫"

        this.canvasWidth = this.width * this.tileSize + 20;
        this.canvasHeight = this.height * this.tileSize + 20;
        
        this.herbivoreSpeed = 1;
        this.herbivoreHp = 20;

        this.carnivoreSpeed = 1;
        this.carnivoreHp = 20;
        this.carnivoreDmg = 5;
    }
}