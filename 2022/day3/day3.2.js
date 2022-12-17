import assert from 'assert';

import { fileToArrayOfLines } from '../util.js';

const intersection = (a, b) => a.filter(e => b.includes(e));

const getValue = (char) => {
  const unicodeValue = char.charCodeAt(0);
  // az comes after AZ in unicode, but before AZ in our scoring scheme
  return (unicodeValue <= 90)
    ? unicodeValue - 64 + 26
    : unicodeValue - 96;
};

const solve = (data) => {
  const priorities = data.reduce(
    (acc, line) =>
      (acc[0].length < 3)
        ? [[...acc[0], line], ...acc.filter((e, i) => i !== 0)]
        : [[line], ...acc]
    ,
    [[]]
  );

  return priorities
    .map((triplet) => [triplet[0].split(''), triplet[1].split(''), triplet[2].split('')])
    .map((triplet) => intersection(intersection(triplet[0], triplet[1]), triplet[2]))
    .map((dedupe) => [...new Set(dedupe)][0])
    .map((badge) => getValue(badge))
    .reduce((acc, score) => acc + score, 0);
};


const test = solve(fileToArrayOfLines('./2022/day3/test.txt'));
console.log(test);
assert(test === 70, 'sum of the badge priorities should be 70');

const input = solve(fileToArrayOfLines('./2022/day3/input.txt'));
console.log(input);
assert(input === 2620, 'sum of the badge priorities should be 2620');
