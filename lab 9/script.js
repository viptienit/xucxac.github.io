'use strict';
let number, currents, scores, player;
const max = 100;
const dice = document.querySelector('.dice');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
player0.classList.add('player--active');
player1.classList.remove('player--active');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const newGame = function () {
  number = Math.trunc(Math.random() * 6) + 1;
  currents = [0, 0];
  scores = [0, 0];
  player = 0;
  document.querySelector('.score--0').textContent = scores[0];
  document.querySelector('.score--1').textContent = scores[1];
  document.querySelector('.current--0').textContent = currents[0];
  document.querySelector('.current--1').textContent = currents[1];

  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
newGame();

dice.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (scores[0] < max && scores[1] < max) {
    const current = document.querySelector(`.current--${player}`);
    dice.classList.remove('hidden');

    number = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${number}.png`;

    if (number !== 1) {
      currents[player] = currents[player] + number;
      current.textContent = currents[player];
    } else {
      currents[player] = 0;
      current.textContent = currents[player];
      player = player === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  const current = document.querySelector(`.current--${player}`);
  const score = document.querySelector(`.score--${player}`);
  scores[player] = scores[player] + currents[player];
  currents[player] = 0;
  current.textContent = currents[player];
  score.textContent = scores[player];

  if (scores[player] >= max) {
    dice.classList.add('hidden');

    document.querySelector('.player--active').classList.add('player--winner');
  } else {
    player = player === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});
btnNew.addEventListener('click', newGame);
