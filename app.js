/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const roll = document.querySelector('.btn-roll');
const hold = document.querySelector('.btn-hold');
const newGame = document.querySelector('.btn-new');
const inputScore = document.querySelector('input');

let scores, roundScore, activePlayer, gamePlaying, winnerScore;
let previousScore = 0;

init();

inputScore.addEventListener('change', function(event) {
	winnerScore = event.target.value;
})

roll.addEventListener('click', function() {
	if (winnerScore === 0) {
		alert('You must enter a score before starting the game')
	} else {
		if (gamePlaying) {
			console.log(previousScore);
			let current = document.querySelector('#current-' + activePlayer);
			const randomNumber1 = Math.floor(Math.random() * 6 + 1);
			const randomNumber2 = Math.floor(Math.random() * 6 + 1);
			const dice1 = document.querySelector('.dice-1');
			const dice2 = document.querySelector('.dice-2');
			dice1.style.display = 'block';
			dice2.style.display = 'block';
			dice1.src = 'dice-' + randomNumber1 + '.png';
			dice2.src = 'dice-' + randomNumber2 + '.png';
			if (previousScore === 6 && randomNumber1 === 6) {
				previousScore = 0;
				nextPlayer()
			} else if(randomNumber1 !== 1 && randomNumber2 !== 1) {
				roundScore += randomNumber1 + randomNumber2;
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
				previousScore = randomNumber1;
			} else {
				nextPlayer();
			}
		}
	}
})

hold.addEventListener('click', function() {
	if (winnerScore === 0) {
		alert('You must enter a score before starting the game')
	} else {
		if(gamePlaying) {
			scores[activePlayer] += roundScore;
			document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
			console.log(winnerScore);
			if (scores[activePlayer] >= winnerScore) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner !';
				document.querySelector('img').style.display = 'none';
				document.querySelector('#current-' + activePlayer).textContent = 0;
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				gamePlaying = false;
			} else {
				nextPlayer();
			}
		}
	}
})

newGame.addEventListener('click', function() {
	init();

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
})

function nextPlayer() {
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	winnerScore = 0;

	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');


	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.querySelector('#current-0').textContent = 0;
	document.querySelector('#current-1').textContent = 0;

	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';
}
