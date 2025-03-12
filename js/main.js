const focusBTN = document.querySelector(".focus");
const shortBreakBTN = document.querySelector(".short-break");
const longBreakBTN = document.querySelector(".long-break");

const timer = document.querySelector(".timer");

const startBTN = document.querySelector(".start");
const pauseBTN = document.querySelector(".pause");
const resetBTN = document.querySelector(".reset");

const audio = new Audio("../assets/audio/alarm.mp3");
audio.volume = 0.15;

let duration = 10;
let seconds = duration;
let countdown = null;

timer.textContent = formatTimer(duration);

focusBTN.addEventListener("click", function() {
    changeDuration(10);
});

shortBreakBTN.addEventListener("click", function() {
    changeDuration(300);
});

longBreakBTN.addEventListener("click", function() {
    changeDuration(900);
});

function changeDuration(time) {
    duration = time;
    clearInterval(countdown);
    countdown = null;
    seconds = duration;
    timer.textContent = formatTimer(duration);
}

startBTN.addEventListener("click", function () {
    if(!countdown) {
        countdown = setInterval(() => {
            seconds--;
            timer.textContent = formatTimer(seconds);

            if (seconds === 0) {
                clearInterval(countdown);
                audio.play();
            }
        }, 1000);
    }
});

pauseBTN.addEventListener("click", function () {
    if (seconds !== 0) {
        clearInterval(countdown);
        countdown = null;
    }
});

resetBTN.addEventListener("click", function () {
    clearInterval(countdown);
    countdown = null;
    seconds = duration;
    timer.textContent = formatTimer(duration);
});

function formatTimer(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = (time - (hours * 3600) - (minutes * 60)) ;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
