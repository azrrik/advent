import * as fs from 'fs';

const scores = {
    rock : 1,
    paper : 2,
    scissors : 3,
    loss : 0,
    draw: 3,
    win: 6
}

const decode = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
}

const fromOutcomes = {
    rock : {
        rock : 'draw',
        paper : 'win',
        scissors : 'loss'
    },
    paper : {
        rock : 'loss',
        paper : 'draw',
        scissors : 'win'
    },
    scissors : {
        rock : 'win',
        paper : 'loss',
        scissors : 'draw'
    }
}

const getScore = (line) => {
    const split = line.replace('\r','').split(" ");
    const oppMove = decode[split[0]];
    const myMove = decode[split[1]];
    const outcomeScore = scores[fromOutcomes[oppMove][myMove]];
    const selectionScore = scores[myMove];
    return outcomeScore + selectionScore;
}

const solve = (data) => {
    const totalScore = data
        .split('\n')
        .reduce((acc, curr) => acc + getScore(curr), 0);
    console.log(totalScore);
}

fs.readFile('./2022/day2/input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    solve(data);
});