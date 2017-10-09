var root = document.getElementById('root');
var trial = {
	circleA: 0,
	circleB: 0,
	limit: 1
};

function addKeydown(fn) {
	document.addEventListener('keydown', fn);
}

function removeKeydown(fn) {
	document.removeEventListener('keydown', fn);
}

function getRandomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

function makeIntro() {
	removeKeydown(makeIntro);

	var instructions = '<h1>In this experiment, a cross will appear on the center of the screen. When it disappears, choose either the <b>blue circle by pressing F</b>, or the <b>orange circle by pressing J</b>.</h1><h1>Press any key to begin</h1>';

	root.innerHTML = instructions;

	addKeydown(showCross);
}

function showCross() {
	removeKeydown(showCross);

	var numberRange = getRandomNumber(0.5, 1.5) * 1000;
	var circles = document.getElementById('circles');
	var cross = document.getElementById('cross');
	var circle1 = document.getElementById('circle1');
	var circle2 = document.getElementById('circle2');

	root.innerHTML = '';
	circles.style.display = 'block';
	cross.style.display = 'block';

	setTimeout(function () {
		cross.style.display = 'none';
		circle1.style.display = 'block';
		circle2.style.display = 'block';

		addKeydown(listenForCircleSelection);
	}, numberRange);
}

function listenForCircleSelection(e) {
	if (e.key === 'f') {
		trial.circleA += 1;
	} else if (e.key === 'j') {
		trial.circleB += 1;
	} else {
		return;
	}

	if (trial.circleA + trial.circleB === trial.limit) {
		concludeExperiment();
	}

	circle1.style.display = 'none';
	circle2.style.display = 'none';

	setTimeout(showCross, 1000);
}

function concludeExperiment() {
	document.body.innerHTML = '<h1>The experiment has concluded. Thank you for your participation.</h1>';
}

// show cross for 0.5-1.5 seconds
// then once it disappears show the blue/orange circles

document.addEventListener('keydown', makeIntro);