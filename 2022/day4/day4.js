import assert from 'assert';

import { fileToArrayOfLines } from '../util.js';

const solve = (data) => (operation) => {
  return data
    .map((line) => line.split(','))
    .map((pair) => [pair[0].split('-'), pair[1].split('-')])
    .map((pair) => [
      [parseInt(pair[0][0]), parseInt(pair[0][1])],
      [parseInt(pair[1][0]), parseInt(pair[1][1])]
    ])
    .map((pair) => operation(pair[0], pair[1]) || operation(pair[1], pair[0]))
    .reduce((acc, contains) => contains ? acc + 1 : acc);
};

const contains = (a, b) => b[0] <= a[0] && b[1] >= a[1];

const solve1 = (data) => solve(data)(contains);

const overlaps = (a, b) =>
  (a[0] >= b[0] && a[0] <= b[1]) ||
  (a[1] >= b[0] && a[1] <= b[1]);

const solve2 = (data) => solve(data)(overlaps);

const test = fileToArrayOfLines('./2022/day4/test.txt');
const testSolution = solve1(test);
console.log(testSolution);
assert(testSolution === 2, 'should find 2 contained ranges');

const input = fileToArrayOfLines('./2022/day4/input.txt');
const solution1 = solve1(input);
console.log(solution1);
assert(solution1 === 584, 'should find 584 contained ranges');

const testSolution2 = solve2(test);
console.log(testSolution2);
assert(testSolution2 === 4, 'should find 4 overlapping ranges');

const solution2 = solve2(input);
console.log(solution2);
assert(solution2 === 933, 'should find 933 overlapping ranges');