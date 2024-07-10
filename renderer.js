import Configuration from "../configuration.js";
const config = new Configuration();

const mapCanvas = document.getElementById("map-canvas");
mapCanvas.height = config.canvasHeight;
mapCanvas.width = config.canvasWidth;
const ctx = mapCanvas.getContext("2d");

const tileSize = config.tileSize;

export default class Renderer {
    constructor() {}

    drawMap(map) {
        for (let i = 0; i < config.height; i++) {
            for (let j = 0; j < config.width; j++) {
                this.#drawTile(map[i][j], j, i);
            }
        }
    }

    #drawTile(icon, x, y) {
        ctx.font = `${tileSize}px sans-serif`;
        ctx.fillText(icon, x * tileSize, y * tileSize + tileSize);
    }
}