const game = document.querySelector('.game');
const modalAll = document.querySelectorAll('.modal');
const modal = document.querySelector('.modal-content');
const modalTwo = document.querySelector('.modal-content-two');
const modalResults = document.querySelector('.modal-content-results');
const btnNG = document.querySelector('.new-game');
const btnNGR = document.querySelector('.new-game-results');
const exit = document.querySelectorAll('.exit');
const btnMore = document.querySelector('.more');
const result = document.querySelector('.result');
const scoreBoard = document.querySelector('.score');
const playerName = document.querySelector('.player-name');
const btnStart = document.querySelector('.start');
const clouds = document.querySelectorAll('.cloud');
const pinguin = document.querySelectorAll('.pinguin');
let lastCloud;
let score = 0;
let timeUp = false;
let usersArray = [];



//start game
function startGame() {
	game.style.display = "flex";
	scoreBoard.textContent = 0; 
	score = 0;
	timeUp = false;
	result.textContent = 0;
	showHide();
	setTimeout(() => {
		timeUp = true;
		if (timeUp === true) {
			game.style.display = "none";
			modalTwo.style.display = "block";
		}
	}, 12000); 
}

//the appearance and disappearance of the penguin
function showHide() {
	const cloud = randomHole(clouds);
	cloud.classList.add('up');
	let time = randomTime(300, 1100);

	setTimeout(() => {
		cloud.classList.remove('up');
		if (!timeUp){
			showHide();
		} 
	}, time);
}

//random time
function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

//the appearance of a penguin in a random cloud
function randomHole(clouds) {
	let id = Math.floor(Math.random() * clouds.length);
	let cloud = clouds[id];
	if (cloud === lastCloud) {
		return randomHole(clouds);
	}
	lastCloud = cloud;
	return cloud;
}

// click on pinguin
function shot(e) {
	if (!e.isTrusted) return;
	score++;
	this.classList.remove('up');
	document.querySelector('.whack-sound').play();
	result.textContent = scoreBoard.textContent = score;
}

//local Storage save list of results   
function init() {
	if (localStorage.usersRecord) {
		usersArray = JSON.parse(localStorage.usersRecord);
		for (var i = 0; i < usersArray.length; i++) {
			prepareTable(usersArray[i].name, usersArray[i].score);
		}
	}
}

//localStorage save results
function saveOnClick() {
	let firstNameVal = playerName.value;
	let scoreVal = score;

	let usersObj = {
		name: firstNameVal,
		score: scoreVal
	};

	let sort = usersArray.sort(function (a, b) {
		if (a.score < b.score)
			return 1;
		else
			return -1;
	});

	sort.push(usersObj);

	localStorage.usersRecord = JSON.stringify(sort);

	prepareTable(firstNameVal, scoreVal);
}

//creates a new table with the name and result
function prepareTable(firstNameVal, scoreVal) {
	let table = document.querySelector('.results-table');
	let row = table.insertRow();
	let firstNameCell = row.insertCell(0);
	let scoreCell = row.insertCell(1);

	firstNameCell.innerHTML = firstNameVal;
	scoreCell.innerHTML = scoreVal;
}

// disappear the windows with the result and the window appears with all the results of the game
function resultsDisplay() {
	modalTwo.style.display = "none";
	modalResults.style.display = "block";
}




//start game
btnNG.onclick = function () {
	document.querySelector('.intro').play(); 
	setTimeout(() => {
		modal.style.display = "block";
		this.style.display = "none";
	}, 400); 
}

//btn exit -exit the game, causing the modal windows to close and return to the start page 
exit.forEach(exit => exit.onclick = function () {
	modalAll.forEach(modal => modal.style.display = "none");
	btnNG.style.display = "block";
	document.querySelector('.type').innerHTML = '';
	scoreBoard.style.display = "none";
})

//btn new game - the new game starts after saving the results
btnNGR.onclick = function () {
	modalResults.style.display = "none";
	startGame();
}

//btn start - starts the game after entering your name
btnStart.addEventListener('click', function(){
	modal.style.display = "none";
	btnNG.style.display = "none";
	scoreBoard.style.display = "inline-block";
	game.style.display = "flex";
	startGame();
});
//entering the name into the input field
playerName.addEventListener('keyup', function(){
	document.querySelector('.type').innerHTML = playerName.value;
});


//btn again  
btnMore.addEventListener('click', function(){
	modalTwo.style.display = "none";
	startGame();
});





pinguin.forEach(pinguin => pinguin.addEventListener('click', shot));