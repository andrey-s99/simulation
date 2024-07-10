import Configuration from "../configuration.js";
const config = new Configuration();

export default class Renderer {
    constructor() {
        this.mapCanvas = document.getElementById("map-canvas");
        this.mapCanvas.height = config.canvasHeight;
        this.mapCanvas.width = config.canvasWidth;
        this.ctx = this.mapCanvas.getContext("2d");
        this.tileSize = config.tileSize;
    }

    drawMap(map) {
        // Clear screen before drawing the next frame
        this.#clearScreen();

        for (let i = 0; i < config.height; i++) {
            for (let j = 0; j < config.width; j++) {
                this.#drawTile(map[i][j], j, i);
            }
        }
    }

    #drawTile(icon, x, y) {
        this.ctx.font = `${this.tileSize}px sans-serif`;

        this.ctx.fillText(icon, x * this.tileSize, y * this.tileSize + this.tileSize);
    }

    // Clear the whole canvas
    #clearScreen() {
        this.ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight)
    }
}