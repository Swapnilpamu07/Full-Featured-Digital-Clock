let time = document.getElementsByClassName("time")[0];
var audio = new Audio('./alarm_sound.wav');
let amodel = document.getElementById("amodel");
let timer1 = document.getElementById("timer1");
let timer = document.getElementsByClassName("timer")[0];
let timerset = document.getElementById("timerset");
let timerdis=document.getElementsByClassName("timerdis")[0];
let day = document.getElementsByClassName("day")[0];
let arr = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
let arr2 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

setInterval(() => {
  let date = new Date();
  let hours = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  time.innerHTML = `${hours}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec} ${ampm}`;

  let storedAlarm = JSON.parse(localStorage.getItem('alarmTime'));
  if (storedAlarm) {
    let alarmHour = storedAlarm.hour;
    if (storedAlarm.ampm === "PM" && alarmHour !== 12) alarmHour += 12;
    if (storedAlarm.ampm === "AM" && alarmHour === 12) alarmHour = 0;

    if (alarmHour === date.getHours() && storedAlarm.minute === date.getMinutes() && sec === 0) {
      audio.play();
      localStorage.removeItem('alarmTime'); 
    }
  }
}, 1000);

let d = new Date();
let today = d.getDate();
let day1 = d.getDay();
let month = d.getMonth();
let year = d.getFullYear();
day.innerHTML = `${arr2[day1]}-${arr[month]}  ${today} ${year}`;

let button = document.getElementById("button");
button.addEventListener('click', alarm);
let modal = document.getElementsByClassName('modal')[0];
let set = document.getElementById("set");
let hour = document.getElementById("hour");
let minutes = document.getElementById("minutes");

let amCheckbox = document.getElementById("AM");
let pmCheckbox = document.getElementById("PM");

amCheckbox.addEventListener('change', () => {
  if (amCheckbox.checked) pmCheckbox.checked = false;
});

pmCheckbox.addEventListener('change', () => {
  if (pmCheckbox.checked) amCheckbox.checked = false;
});

function alarm() {
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
}

amodel.onclick = function(event) {
  event.preventDefault();  
  modal.style.display = "flex";  
  modal.style.flexDirection = 'column';
}

timer1.onclick = function(event) {
  event.preventDefault();  
  timer.style.display = "flex";  
  timer.style.flexDirection = 'column';
}

set.onclick = () => {
  let setHour = parseInt(hour.value, 10);
  let setMinute = parseInt(minutes.value, 10);
  let setAmpm = amCheckbox.checked ? 'AM' : 'PM';

  localStorage.setItem('alarmTime', JSON.stringify({ hour: setHour, minute: setMinute, ampm: setAmpm }));

  console.log(`Alarm set for ${setHour}:${setMinute} ${setAmpm}`);

  modal.style.display = 'none';
};

timerset.onclick = () => {
  timer.style.display = 'none';
};

// Timer functionality
let hourTimer = document.getElementById("hourTimer");
let minutesTimer = document.getElementById("minutesTimer");
let secondsTimer = document.getElementById("secondsTimer");
let startTimer = document.getElementById("startTimer");

let timerInterval;

startTimer.onclick = () => {
  let setHour = parseInt(document.getElementById("hourTimer").value, 10) || 0;
  let setMinute = parseInt(document.getElementById("minutesTimer").value, 10) || 0;
  let setSecond = parseInt(document.getElementById("secondsTimer").value, 10) || 0;

  let totalSeconds = setHour * 3600 + setMinute * 60 + setSecond;

  if (totalSeconds > 0) {
    clearInterval(timerInterval); // Clear any existing timer
    timerInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        audio.play();
        timer.style.display='none';
      } else {
        totalSeconds--;
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
        
        // Update timer display
        timerdis.innerHTML = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      }
    }, 1000);

    // timer.style.display = 'none'; // Hide the timer input
  }
};

// Function to stop the timer manually
timerset.onclick = () => {
  clearInterval(timerInterval); // Stop the timer

  timer.style.display = 'none';
};

let stopwatch = document.getElementById("stopwatchModal");
let startStopwatch = document.getElementById("startStopwatch");
let stopStopwatch = document.getElementById("stopStopwatch");
let resetStopwatch = document.getElementById("resetStopwatch");
let stopwatchDisplay = document.getElementById("stopwatchDisplay");
let stw = document.getElementById("stw");
let stwclose = document.getElementById("stwclose");

let stopwatchInterval;
let elapsedSeconds = 0;
let stopwatchRunning = false;

// Convert seconds to HH:MM:SS format
function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    return `${hrs < 10 ? '0' + hrs : hrs}:${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
}

// Update the stopwatch display
function updateStopwatchDisplay() {
    stopwatchDisplay.innerHTML = formatTime(elapsedSeconds);
}

// Start the stopwatch
startStopwatch.onclick = function () {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(() => {
            elapsedSeconds++;
            updateStopwatchDisplay();
        }, 1000);
        stopwatchRunning = true;
    }
};

// Stop the stopwatch
stopStopwatch.onclick = function () {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
    }
};
 

// Reset the stopwatch
resetStopwatch.onclick = function () {
    clearInterval(stopwatchInterval);
    elapsedSeconds = 0;
    updateStopwatchDisplay();
    stopwatchRunning = false;
};

// Show the stopwatch modal
stw.onclick = function (event) {
    event.preventDefault();
    stopwatch.style.display = "flex";
    stopwatch.style.flexDirection="column";
  };
  stwclose.onclick=()=>{
    stopwatch.style.display = "none";
}