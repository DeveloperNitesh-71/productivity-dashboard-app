//focus time update
const focustime = document.querySelector(".FocusTime")

//calender functionality

const Calenderdate = document.querySelector(".Calenderdate");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const date = document.querySelector(".date")

function Calender() {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    let today = new Date();

    let dt = today.getDate();
    let dy = today.getDay();
    let mm = today.getMonth();
    let yy = today.getFullYear();

    Calenderdate.textContent = dt;
    day.textContent = days[dy];
    month.textContent = months[mm];
    year.textContent = yy;
    date.textContent = `${days[dy]}, ${dt}-${months[mm]}-${yy}`
}
Calender()

//pomodoro funtionality

const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const timer = document.querySelector(".timer");
const startIcon = document.querySelector(".fa-play");
let time = null;
let focusTime = null;
start.addEventListener("click", (e) => {
    e.target.classList.toggle("fa-play");
    e.target.classList.toggle("fa-pause");
    if (e.target.classList.contains("fa-play")) {
        clearInterval(time);
        clearInterval(focusTime)
    }
    else {
        pomo();
    }
})

reset.addEventListener("click", () => {
    startIcon.classList.remove("fa-pause");
    startIcon.classList.add("fa-play");
    clearInterval(time);
    min = 25;
    sec = 0;
    timer.textContent = min + ":" + "0" + sec;
})


let min = 25;
let sec = 0;
let focusTimeData = JSON.parse(localStorage.getItem("focusTime"))
let focusSeconds = focusTimeData[0].FocusSeconds || 0;
let focusMinutes = focusTimeData[0].FocusMinutes || 0;
let focushours = focusTimeData[0].FocusHours || 0;

if (focusMinutes < 1) {
    focustime.textContent = focusSeconds + "s"
}
else if (focusMinutes < 60 && focusMinutes > 1 && focushours < 1) {
    focustime.textContent = focusMinutes + "min"
}
else if (focushours > 1) {
    focustime.textContent = focushours + "Hrs"
}

function pomo() {
    time = setInterval(() => {
        if (sec === 0) {
            sec = 59;
            min--;
            timer.textContent = min + ":" + sec;
        }
        else if (sec < 11) {
            sec--;
            timer.textContent = min + ":" + "0" + sec;
        }
        else if (min < 10 && sec < 11) {
            sec--;
            timer.textContent = "0" + min + ":" + "0" + sec;
        }
        else if (min < 10) {
            sec--;
            timer.textContent = "0" + min + ":" + sec;
        }
        else if (min === 0 && sec === 0) {
            min = 25;
            sec = 0;
            clearInterval(time);
            clearInterval(focusTime)
            startIcon.classList.remove("fa-pause")
            startIcon.classList.add("fa-play");
            timer.textContent = min + ":" + "0" + sec;
        }
        else {
            sec--;
            timer.textContent = min + ":" + sec;
        }
    }, 1000)

    focusTime = setInterval(() => {
        focusSeconds++
        if (focusMinutes < 1) {
            focustime.textContent = focusSeconds + "s"
        }
        else if (focusMinutes < 60 && focusMinutes > 1 && focushours < 1) {
            focustime.textContent = focusMinutes + "min"
        }
        else if (focushours > 1) {
            focustime.textContent = focushours + "Hrs"
        }
        if (focusSeconds / 60 === 1 && focushours < 1) {
            focusMinutes++;
            focusSeconds = 0
            focustime.textContent = focusMinutes + "min"
        }
        else if (focusMinutes < 1) {
            focustime.textContent = focusSeconds + "s"
        }
        else if (focusMinutes >= 60) {
            focushours++;
            focusMinutes = 0;
            focustime.textContent = focushours + "Hrs"
        }
        storeFocusTime(focusSeconds, focusMinutes, focushours)

    }, 1000)
}

//clock functionality

const second = document.getElementById("second")
const minute = document.getElementById("minute")
const hour = document.getElementById("hour")

function showTime() {
    let presentTime = new Date();

    let hours = presentTime.getHours()
    let minutes = presentTime.getMinutes()
    let seconds = presentTime.getSeconds();

    let hoursRotation = 30 * hours + (minutes / 2)
    let minutesRotation = 6 * minutes;
    let secondsRotation = 6 * seconds;
    second.style.transform = `rotate(calc(${secondsRotation}deg))`
    minute.style.transform = `rotate(calc(${minutesRotation}deg))`
    hour.style.transform = `rotate(calc(${hoursRotation}deg))`
}

setInterval(showTime, 1000)


function storeFocusTime(focsec, focmin, fochrs) {
    let focTime = [];
    let foctim = {
        FocusSeconds: focsec,
        FocusMinutes: focmin,
        FocusHours: fochrs
    }
    focTime.push(foctim)
    localStorage.setItem("focusTime", JSON.stringify(focTime))
}

