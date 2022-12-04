import assert from 'assert';

import { fileToArrayOfLines } from "../util.js";

const intersection = (a, b) => a.filter(e => b.includes(e));

const getValue = (char) => {
  const unicodeValue = char.charCodeAt(0);
  // az comes after AZ in unicode, but before AZ in our scoring scheme
  return (unicodeValue <= 90)
    ? unicodeValue - 64 + 26
    : unicodeValue - 96
}

const solve = (data) => {
  const priorities = data.map(
    (line) => {
      const chars = line.split('');
      const left = chars.slice(0, chars.length / 2);
      const right = chars.slice(chars.length / 2, chars.length);
      const common = new Set(intersection(left, right));

      return [...common].map((entry) => getValue(entry));
    }
  )

  return priorities.reduce((acc, curr) => acc + curr[0], 0);
}


const test = solve(fileToArrayOfLines('./2022/day3/test.txt'));
console.log(test);
assert(test === 157, 'sum of the priorities should be 157');

const input = solve(fileToArrayOfLines('./2022/day3/input.txt'));
console.log(input);
assert(input === 8123, 'sum of the priorities should be 8123');
