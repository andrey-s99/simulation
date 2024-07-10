import Simulation from "../simulation.js"

const simulation = new Simulation();

const playPauseBtn = document.getElementById("play-pause-button");
const restartBtn = document.getElementById("restart-button");

const processPlayPauseButton = (e) => {
    const btn = e.target;

    if (btn.classList.contains("fa-play")) {
        btn.classList.remove("fa-play");
        btn.classList.add("fa-pause");

        simulation.startSimulation();
    } else {
        btn.classList.remove("fa-pause");
        btn.classList.add("fa-play");

        simulation.pauseSimulation();
    }
}

const processRestartButton = () => {
    simulation.restartSimulation();
}

simulation.startSimulation();

playPauseBtn.addEventListener("click", processPlayPauseButton);
restartBtn.addEventListener("click", processRestartButton);