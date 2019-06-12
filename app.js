let scores, roundScore, activePlayer, gamePlaying, winnerScore
let previousScore = 0

init()

// save the user input to set the score
document.querySelector('input').addEventListener('change', function() {
	winnerScore = this.value;
})

document.querySelector('.btn-roll').addEventListener('click', () => {
	// check if the user has entered a score
	if (winnerScore <= 0) {
		alert('You must enter a score before starting the game')
	} else {
		if (gamePlaying) {
			const current = document.querySelector('#current-' + activePlayer)
			// generate a random number for both dices
			const randomNumber1 = Math.floor(Math.random() * 6 + 1)
			const randomNumber2 = Math.floor(Math.random() * 6 + 1)
			const dice1 = document.querySelector('.dice-1')
			const dice2 = document.querySelector('.dice-2')
			dice1.style.display = 'block'
			dice2.style.display = 'block'
			// change the dice image depending on the random number
			dice1.src = 'dice-' + randomNumber1 + '.png'
			dice2.src = 'dice-' + randomNumber2 + '.png'
			if (previousScore === 6 && randomNumber1 === 6) {
				previousScore = 0
				nextPlayer()
			} else if(randomNumber1 !== 1 && randomNumber2 !== 1) {
				roundScore += randomNumber1 + randomNumber2
				current.textContent = roundScore
				previousScore = randomNumber1
			} else {
				nextPlayer()
			}
		}
	}
})

document.querySelector('.btn-hold').addEventListener('click', () => {
	// check if the user has entered a score
	if (winnerScore <= 0) {
		alert('You must enter a score before starting the game')
	} else {
		if(gamePlaying) {
			scores[activePlayer] += roundScore
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
			// check if the player has won
			if (scores[activePlayer] >= winnerScore) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner !'
				document.querySelector('img').style.display = 'none'
				document.querySelector('#current-' + activePlayer).textContent = 0
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
				gamePlaying = false
			} else {
				nextPlayer()
			}
		}
	}
})

document.querySelector('.btn-new').addEventListener('click', () => {
	init();
	document.querySelector('.player-0-panel').classList.remove('winner')
	document.querySelector ('.player-1-panel').classList.remove('winner')
})

function nextPlayer() {
	roundScore = 0
	document.querySelector('#current-' + activePlayer).textContent = 0
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active')
}

// launch a new game and reset everything
function init() {
	scores = [0, 0]
	roundScore = 0
	activePlayer = 0
	gamePlaying = true
	winnerScore = 0

	document.querySelector('#name-0').textContent = 'Player 1'
	document.querySelector('#name-1').textContent = 'Player 2'

	document.querySelector('.player-0-panel').classList.remove('active')
	document.querySelector('.player-1-panel').classList.remove('active')
	document.querySelector('.player-0-panel').classList.add('active')

	document.querySelector('#score-0').textContent = 0
	document.querySelector('#score-1').textContent = 0
	document.querySelector('#current-0').textContent = 0
	document.querySelector('#current-1').textContent = 0

	document.querySelector('.dice-1').style.display = 'none'
	document.querySelector('.dice-2').style.display = 'none'
}
