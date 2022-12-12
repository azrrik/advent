import assert from 'assert';

import { fileToArrayOfLines, range } from "../util.js";


const solve = (data) => {
  const matrix = data
    .map(
      (line) => (
        line
          .split('')
          .map((height) => parseInt(height)))
    );

  const size = matrix.length - 1;

  const check = (x, y, height, acc) =>
    (matrix[y][x] >= height)
      ? acc || true
      : acc;

  const checkX = (y, height) => (acc, x) => check(x, y, height, acc);
  const checkY = (x, height) => (acc, y) => check(x, y, height, acc);

  const checkTree = (x, y, height, matrix) => {
    const beforeX = range(0, x - 1);
    const afterX = range(x + 1, size);

    const beforeY = range(0, y - 1);
    const afterY = range(y + 1, size);

    const hidden = beforeX.reduce(checkX(y, height), false)
      && afterX.reduce(checkX(y, height), false)
      && beforeY.reduce(checkY(x, height), false)
      && afterY.reduce(checkY(x, height), false);

    return hidden;
  }

  const isTreeHidden = (x, y, height, matrix) =>
    (x === 0 || x === size || y === 0 || y === size)
      ? false
      : checkTree(x, y, height, matrix);

  const hiddenMatrix = matrix.map(
    (line, y) => line.map(
      (height, x) => isTreeHidden(x, y, height, matrix)
    )
  );

  const hiddenTrees = hiddenMatrix.reduce(
    (acc, curr) =>
      curr.reduce(
        (_acc, _curr) => (_curr) ? _acc + 1 : _acc, 0
      ) + acc,
    0
  );

  const solution1 = (matrix.length ** 2) - hiddenTrees;


  const getScore = (x, y, height, acc) =>
    (acc.blocked)
      ? { ...acc }
      : (matrix[y][x] >= height)
        ? { score: acc.score + 1, blocked: true }
        : { score: acc.score + 1, blocked: false }

  const getHorizontalScore = (y, height) => (acc, _x) => getScore(_x, y, height, acc);
  const getVerticalScore = (x, height) => (acc, _y) => getScore(x, _y, height, acc);

  const getScenicScore = (x, y, height, matrix) => {
    const leftTrees = range(0, x - 1).reverse();
    const rightTrees = range(x + 1, size);
    const upTrees = range(0, y - 1).reverse();
    const downTrees = range(y + 1, size);

    const left = leftTrees.reduce(getHorizontalScore(y, height), { score: 0, blocked: false });
    const right = rightTrees.reduce(getHorizontalScore(y, height), { score: 0, blocked: false });
    const up = upTrees.reduce(getVerticalScore(x, height), { score: 0, blocked: false });
    const down = downTrees.reduce(getVerticalScore(x, height), { score: 0, blocked: false });

    return left.score * right.score * up.score * down.score;
  }

  const scenicScores = matrix.map(
    (line, y) => line.map(
      (height, x) => getScenicScore(x, y, height, matrix)
    )
  );

  const maxRows = scenicScores.map((row) => Math.max(...row));
  const solution2 = Math.max(...maxRows);

  return { solution1, solution2 }
}


const test = fileToArrayOfLines('./2022/day8/test.txt');
const { solution1: testSolution1, solution2: testSolution2 } = solve(test);
console.log(testSolution1);
assert.equal(testSolution1, '21', "total hidden trees should be 21");

console.log(testSolution2);
assert.equal(testSolution2, '8', "total scenic score should be 8");


const input = fileToArrayOfLines('./2022/day8/input.txt');
const { solution1, solution2 } = solve(input);
console.log(solution1);
assert.equal(solution1, '1679', "total hidden trees should be 1679");

console.log(solution2);
assert.equal(solution2, '536625', "total scenic score should be 536625");