const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startButton.addEventListener('click', handleStart);
stopButton.addEventListener('click', handleStop);

stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerID;

function handleStart() {
    timerID = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function handleStop() {
    clearInterval(timerID);
    startButton.disabled = false;
    stopButton.disabled = true;
}