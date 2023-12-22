// Get score from local storage
let score = JSON.parse(localStorage.getItem('score')) || 0;

// Initiate score from local storage
document.querySelector('.current-score').innerHTML = score;

const gameContainer = document.querySelector('.game-container');
const picksContainer = document.querySelector('.picks-container');
const gameStatusContainer = document.querySelector('.game-status-container');

const paperButton = document.querySelector('.paper-choice');
const scissorsButton = document.querySelector('.scissors-choice');
const rockButton = document.querySelector('.rock-choice');

const rulesButton = document.querySelector('.rules-button');
const closeButton = document.querySelector('.close-button');
const resetButton = document.querySelector('.reset-button');
const playAgainButton = document.querySelector('.play-again-button');

let playerMove = document.querySelector('.player-move');
let computerMove = document.querySelector('.computer-move');

showGameRules();

// Get player input
paperButton.addEventListener('click', () => {
  let playerChoice = 'paper';
  playerMove.classList.add('paper-choice');
  compareResults(playerChoice);
});

scissorsButton.addEventListener('click', () => {
  let playerChoice = 'scissors';
  playerMove.classList.add('scissors-choice');
  compareResults(playerChoice);
});

rockButton.addEventListener('click', () => {
  let playerChoice = 'rock';
  playerMove.classList.add('rock-choice');
  compareResults(playerChoice);
});

// Reset style when starting new game
playAgainButton.addEventListener('click', () => {
  playerMove.classList.remove('paper-choice', 'scissors-choice', 'rock-choice');
  playerMove.classList.remove('is-winner');

  computerMove.style.backgroundColor = 'var(--header-outline)';
  computerMove.style.boxShadow = 'unset';
  computerMove.classList.remove('is-winner');

  gameContainer.style.display = 'grid';
  picksContainer.style.display = 'none';
  gameStatusContainer.style.display = 'none';
});

// Reset score and empty local storage when clicked
resetButton.addEventListener('click', () => {
  score = 0;
  localStorage.removeItem('score');
  updateScore();
});

// To display game rules
function showGameRules() {
  let displayingRules = false;
  const rulesContainer = document.querySelector('.rules-container');

  rulesButton.addEventListener('click', () => {
    if (displayingRules === false) {
      rulesContainer.style.display = 'flex';
      displayingRules = true;
    } else {
      
      rulesContainer.style.display = 'none';
      displayingRules = false;
    }
  });

  closeButton.addEventListener('click', () => {
    rulesContainer.style.display = 'none';
    displayingRules = false;
  });
}

// Allow computer to pick a randomized move
function computerGameMove() {
  let computerChoice = '';
  let randomNumber = Math.random();

  computerMove.classList.remove('paper-choice', 'scissors-choice', 'rock-choice');
  
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerChoice = 'paper';
  
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerChoice = 'scissors';
  
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerChoice = 'rock';
  
    }  

  return computerChoice;
}

// Compare the moves between player and computer
function compareResults(playerChoice) {
  let result = '';
  const computerChoice = computerGameMove();

  gameContainer.style.display = 'none';
  picksContainer.style.display = 'flex';

  setTimeout(() => {
    computerMove.style.backgroundColor = 'var(--white)';
    computerMove.style.boxShadow = 'inset 0 5px var(--header-outline)';

    if (computerChoice === 'paper') {
      computerMove.classList.add('paper-choice');
    } else if (computerChoice === 'scissors') {
      computerMove.classList.add('scissors-choice');
    } else if (computerChoice === 'rock') {
      computerMove.classList.add('rock-choice');
    }
  }, 1000);
  

  if (playerChoice === 'paper') {
    if (computerChoice === 'scissors') {
      result = 'lose';
    } else if (computerChoice === 'rock') {
      result = 'win';
    } else {
      result = 'draw';
    }

  } else if (playerChoice === 'scissors') {
    if (computerChoice === 'rock') {
      result = 'lose';
    } else if (computerChoice === 'paper') {
      result = 'win';
    } else {
      result = 'draw';
    }

  } else if (playerChoice === 'rock') {
    if (computerChoice === 'paper') {
      result = 'lose';
    } else if (computerChoice === 'scissors') {
      result = 'win';
    } else {
      result = 'draw';
    }

  }

  updateScore(result);
}

// Update the score 
function updateScore(result) {
  let gameMessage = document.querySelector('.game-message');

  if (result === 'win') {
    score++;
    gameMessage.innerHTML = 'You win';
  } else if (result === 'lose') {
    gameMessage.innerHTML = 'You lose';
  } else if (result === 'draw') {
    gameMessage.innerHTML = 'Draw';
  }

  localStorage.setItem('score', JSON.stringify(score));

  setTimeout(() => {
    gameStatusContainer.style.display = 'block';
    document.querySelector('.current-score').innerHTML = score;
  }, 2000);

  setTimeout(() => {
    if (result === 'win') {
      playerMove.classList.add('is-winner');
    } else if (result === 'lose') {
      computerMove.classList.add('is-winner');
    }
  }, 2500);
}