'use strict';

// Selecting elements :
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



// Starting conditions :
let scores, currentScore, activePlayer, playing;

const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    diceElement.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

init();

const switchPlayer = () => {   
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    player1.classList.toggle('player--active');
    player0.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0; 
}

// Rolling dice
btnRoll.addEventListener('click', function() {
    if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    if (dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
}
})

// Holding scores
btnHold.addEventListener('click', function() {
    if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100){
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceElement.classList.add('hidden');
    }else {
    switchPlayer();}
}
})

// Reseting the game
btnNew.addEventListener('click', init);