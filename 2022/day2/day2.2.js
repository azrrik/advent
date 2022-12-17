import assert from 'assert';

import { fileToArrayOfLines } from '../util.js';

const scores = {
  rock: 1,
  paper: 2,
  scissors: 3,
  loss: 0,
  draw: 3,
  win: 6
};

const decode = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'loss',
  Y: 'draw',
  Z: 'win'
};

const fromOutcomes = {
  rock: {
    rock: 'draw',
    paper: 'win',
    scissors: 'loss'
  },
  paper: {
    rock: 'loss',
    paper: 'draw',
    scissors: 'win'
  },
  scissors: {
    rock: 'win',
    paper: 'loss',
    scissors: 'draw'
  }
};

const toAchieve = {
  win: {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock'
  },
  loss: {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  },
  draw: {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
  }
};

const getScore = (line) => {
  const split = line.replace('\r', '').split(' ');
  const oppMove = decode[split[0]];
  const outcome = decode[split[1]];
  const myMove = toAchieve[outcome][oppMove];
  const outcomeScore = scores[fromOutcomes[oppMove][myMove]];
  const selectionScore = scores[myMove];

  return outcomeScore + selectionScore;
};


const solve = (data) => data.reduce((acc, curr) => acc + getScore(curr), 0);

const test = solve(fileToArrayOfLines('./2022/day2/test.txt'));
console.log(test);
assert(test === 12, 'total score should be 12');

const input = solve(fileToArrayOfLines('./2022/day2/input.txt'));
console.log(input);
assert(input === 11696, 'max total should be 11696');
