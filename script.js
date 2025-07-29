let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

const timeDisplay = document.getElementById("time");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    running = true;
    startStopBtn.textContent = "Pause";
    startStopBtn.style.backgroundColor = "#ffc107"; // Yellow
  } else {
    clearInterval(interval);
    running = false;
    startStopBtn.textContent = "Start";
    startStopBtn.style.backgroundColor = "#28a745"; // Green
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  elapsedTime = 0;
  running = false;
  timeDisplay.textContent = "00:00:00.000";
  startStopBtn.textContent = "Start";
  startStopBtn.style.backgroundColor = "#28a745";
  lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(li);
  }
});
