import assert from 'assert';

import { fileToArrayOfLines } from "../util.js";

const transpose = (matrix) => matrix[0].map(
  (col, i) => matrix.map(row => row[i]).reverse()
);

const moveIndividualBoxes = (boxArrays, quantity, to, from) =>
  [...Array(quantity).keys()].map(
    () => boxArrays[to].push(boxArrays[from].pop())
  );

const solve = (data) => (operation) => {
  const parts = data.reduce(
    (acc, line) =>
      (acc.firstPart && line !== '')
        ? { first: [...acc.first, line], second: [...acc.second], firstPart: true }
        : { first: [...acc.first], second: [...acc.second, line], firstPart: false }
    ,
    { first: [], second: [], firstPart: true }
  )

  const stackedBoxes = parts.first.slice(0, -1).map(
    (line) => {
      const positions = (line.length + 1) / 4;
      const charsPerLine = [...Array(positions).keys()].reduce(
        (acc, i) => [...acc, line.charAt(4 * i + 1)],
        []
      );

      return charsPerLine;
    }
  )

  const boxArrays = transpose(stackedBoxes)
    .map((array) => array.filter((e) => e !== ' '));

  parts.second.slice(1).map(
    (line) => {
      const matches = [...line.matchAll(/move (\d+) from (\d+) to (\d+)/g)];
      const quantity = parseInt(matches[0][1]);
      const from = parseInt(matches[0][2]) - 1;
      const to = parseInt(matches[0][3]) - 1;
      operation(boxArrays, quantity, to, from);
    }
  )

  return boxArrays
    .map((array) => array.pop())
    .reduce((acc, box) => acc + box, '');
}

const solve1 = (data) => solve(data)(moveIndividualBoxes);

const moveAllBoxes = (boxArrays, quantity, to, from) => {
  const toMove = boxArrays[from].slice(-quantity);
  const remaining = boxArrays[from].slice(0, boxArrays[from].length - quantity);
  boxArrays[from] = remaining;
  boxArrays[to] = boxArrays[to].concat(toMove);
}

const solve2 = (data) => solve(data)(moveAllBoxes);


const test = fileToArrayOfLines('./2022/day5/test.txt');
const testSolution1 = solve1(test);
console.log(testSolution1);
assert.equal(testSolution1, 'CMZ', "top boxes should be CMZ");

const input = fileToArrayOfLines('./2022/day5/input.txt');
const solution1 = solve1(input);
console.log(solution1);
assert.equal(solution1, 'MQTPGLLDN', "top boxes should be MQTPGLLDN");

const testSolution2 = solve2(test);
console.log(testSolution2);
assert.equal(testSolution2, 'MCD', "top boxes should be MCD");

const solution2 = solve2(input);
console.log(solution2);
assert.equal(solution2, 'LVZPSTTCZ', "top boxes should be LVZPSTTCZ");