import assert from 'assert';

import { fileToArrayOfLines } from '../util.js';

const hasDupes = (array) => (new Set(array)).size !== array.length;

const fill = (acc, char) => (
  {
    pos: acc.pos + 1,
    buff: [...acc.buff, char],
    done: false
  }
);

const next = (acc, char) => (
  {
    pos: acc.pos + 1,
    buff: [...acc.buff.slice(1), char],
    done: false
  }
);

const done = (acc) => (
  {
    pos: acc.pos,
    buff: acc.buff,
    done: true
  }
);

const process = (acc, char, len) =>
  (acc.buff.length < len)
    ? fill(acc, char)
    : hasDupes(acc.buff)
      ? next(acc, char)
      : done(acc, char);

const solve = (data) => (len) => {
  const solution = data[0]
    .split('')
    .reduce(
      (acc, char) => acc.done ? acc : process(acc, char, len),
      { pos: 0, buff: [], done: false }
    );
  return solution.pos;
};

const solve1 = (data) => solve(data)(4);
const solve2 = (data) => solve(data)(14);

const test = fileToArrayOfLines('./2022/day6/test.txt');
const testSolution1 = solve1(test);
console.log(testSolution1);
assert.equal(testSolution1, '7', 'first marker should be after pos 7');

const input = fileToArrayOfLines('./2022/day6/input.txt');
const solution1 = solve1(input);
console.log(solution1);
assert.equal(solution1, '1287', 'first marker should be after pos ');

const testSolution2 = solve2(test);
console.log(testSolution2);
assert.equal(testSolution2, '19', 'first marker should be after pos 19');

const solution2 = solve2(input);
console.log(solution2);
assert.equal(solution2, '3716', 'first marker should be after pos 3716');