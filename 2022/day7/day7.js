import assert from 'assert';

import { fileToArrayOfLines } from "../util.js";


const cdUp = (dir) => dir.slice(0, dir.lastIndexOf("/"));

const processCD = (acc, command) =>
  command[1] === '..'
    ? { ...acc, location: cdUp(acc.location) }
    : { ...acc, location: acc.location + '/' + command[1] };

const processCommand = (acc, command) =>
  command[0] === 'ls'
    ? { ...acc }
    : processCD(acc, command);

const addFile = (acc, line) => {
  const split = line.split(' ');
  const size = parseInt(split[0]);
  const name = split[1];
  const curr = acc.contents[acc.location] || [];
  const newArray = [...curr, { size, name }]

  return { ...acc, contents: { ...acc.contents, [acc.location]: newArray } }
};

const isCommand = /^\$ .*$/;
const isFile = /^[0-9].*/;

const solve = (data) => {
  const groupedByDirectory = data
    .reduce(
      (acc, line) =>
        (line.match(isCommand))
          ? processCommand(acc, line.substring(2).split(' '))
          : addFile(acc, line)
      ,
      { location: '', contents: {} }
    );

  const getScores = (key) =>
    groupedByDirectory.contents[key].reduce(
      (acc, item) =>
        (isNaN(item.size))
          ? acc + getScores(key + '/' + item.name)
          : acc + item.size,
      0
    );

  const scores = Object.keys(groupedByDirectory.contents)
    .map((key) => getScores(key));

  const solution1 = scores
    .filter((score) => (score <= 100000))
    .reduce((acc, curr) => (acc + curr), 0);

  const max = scores.sort((a, b) => b - a)[0];
  const free = 70000000 - max;
  const needed = 30000000 - free;
  const solution2 = scores
    .filter((score) => (score >= needed))
    .slice(-1)[0];

  return { solution1, solution2 };
}


const test = fileToArrayOfLines('./2022/day7/test.txt');
const { solution1: testSolution1, solution2: testSolution2 } = solve(test);
console.log(testSolution1);
assert.equal(testSolution1, '95437', "total size should be 95437");

console.log(testSolution2);
assert.equal(testSolution2, '24933642', "total size should be 24933642");


const input = fileToArrayOfLines('./2022/day7/input.txt');
const { solution1, solution2 } = solve(input);
console.log(solution1);
assert.equal(solution1, '1307902', "total size should be 1307902");

console.log(solution2);
assert.equal(solution2, '7068748', "total size should be 7068748");