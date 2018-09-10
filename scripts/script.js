var setButton = document.querySelector('.set');
var startButton = document.querySelector('.start');
var pauseButton = document.querySelector('.pause');
var resetButton = document.querySelector('.reset');

var workTimer = document.querySelector('.work-timer');
var restTimer = document.querySelector('.rest-timer');
var cycleCounter = document.querySelector('.cycles');

var workMinutes = 25;
var setWorkMinutes = 25
var workSeconds = 0;
var restMinutes = 5;
var setRestMinutes = 5;
var restSeconds = 0;
var timerID;
var workTimerID;
var restTimerID;

var cyclesCompleted = 0;

workTimer.textContent = `Work: ${workMinutes}:0${workSeconds}`;
restTimer.textContent = `Rest: ${restMinutes}:0${restSeconds}`;
cycleCounter.textContent = `Cycles Completed: ${cyclesCompleted}`


function setTimers () {
	pauseTimers();
	workMinutes = parseInt(prompt('Work Minutes'));
	setWorkMinutes = workMinutes;
	workSeconds = 0;
	restMinutes = parseInt(prompt('Rest Minutes'));
	setRestMinutes = restMinutes;
	restSeconds = 0;

	workTimer.textContent = `Work: ${workMinutes}:0${workSeconds}`;
	restTimer.textContent = `Rest: ${restMinutes}:0${restSeconds}`;
}

function nextCycle () {
	cyclesCompleted++
	cycleCounter.textContent = `Cycles Completed: ${cyclesCompleted}`

	workMinutes = setWorkMinutes;
	workSeconds = 0;
	restMinutes = setRestMinutes;
	restSeconds = 0;

	workTimer.textContent = `Work: ${workMinutes}:0${workSeconds}`;
	restTimer.textContent = `Rest: ${restMinutes}:0${restSeconds}`;

	runWorkTimer()
}

var runRestTimer = function() {
	restTimerID = setInterval(function() {
		if (restSeconds == 0) {
			restSeconds = 60;
			restMinutes--
		}

		restSeconds--

		if (restSeconds < 10) {
			restTimer.textContent = `Rest: ${restMinutes}:0${restSeconds}`;
			document.title = `Rest: ${restMinutes}:0${restSeconds}`;
		} else {
			restTimer.textContent = `Rest: ${restMinutes}:${restSeconds}`;
			document.title = `Rest: ${restMinutes}:${restSeconds}`;
		}

		if (restMinutes == 0 && restSeconds == 0) {
			clearInterval(restTimerID);
			nextCycle();
		}

	}, 1000)
}

var runWorkTimer = function() {

	startButton.disabled = true;

	workTimerID = setInterval(function() {

		if (workSeconds == 0) {
			workSeconds = 60;
			workMinutes--
		}

		workSeconds--

		if (workSeconds < 10) {
			workTimer.textContent = `Work: ${workMinutes}:0${workSeconds}`;
			document.title = `Work: ${workMinutes}:0${workSeconds}`;
		} else {
			workTimer.textContent = `Work: ${workMinutes}:${workSeconds}`;
			document.title = `Work: ${workMinutes}:${workSeconds}`;
		}

		if (workMinutes == 0 && workSeconds == 0) {
			runRestTimer();
			clearInterval(workTimerID);
		}

	}, 1000)
};

function pauseTimers() {
	startButton.disabled = false;
	clearInterval(workTimerID);
	clearInterval(restTimerID);
}

function resetTimer() {
	pauseTimers()

	cyclesCompleted = 0;
	cycleCounter.textContent = `Cycles Completed: ${cyclesCompleted}`


	workMinutes = setWorkMinutes;
	workSeconds = 0;
	restMinutes = setRestMinutes;
	restSeconds = 0;

	workTimer.textContent = `Work: ${workMinutes}:0${workSeconds}`;
	restTimer.textContent = `Rest: ${restMinutes}:0${restSeconds}`;
	document.title = 'Pomodoro Timer'

}

setButton.addEventListener('click', setTimers);
startButton.addEventListener('click', runWorkTimer);
pauseButton.addEventListener('click', pauseTimers);
resetButton.addEventListener('click', resetTimer);

