import Simulation from "../simulation.js"

const simulation = new Simulation();

const playPauseBtn = document.getElementById("play-pause-button");
const restartBtn = document.getElementById("restart-button");

// Disable restart button on first launch
restartBtn.disabled = true;

const processPlayPauseButton = (e) => {

    if (playPauseBtn.classList.contains("fa-play")) {
        playPauseBtn.classList.remove("fa-play");
        playPauseBtn.classList.add("fa-pause");

        if (restartBtn.disabled) {
            restartBtn.disabled = false;
        }
        simulation.startSimulation();
    } else {
        playPauseBtn.classList.remove("fa-pause");
        playPauseBtn.classList.add("fa-play");

        simulation.pauseSimulation();
    }
}

const processRestartButton = () => {
    simulation.restartSimulation();

    // Change play button to pause button
    if (playPauseBtn.classList.contains("fa-play")) {
        playPauseBtn.classList.remove("fa-play");
        playPauseBtn.classList.add("fa-pause");
    }
}

playPauseBtn.addEventListener("click", processPlayPauseButton);
restartBtn.addEventListener("click", processRestartButton);