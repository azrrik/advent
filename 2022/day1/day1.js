import assert from 'assert';

import { fileToArrayOfLines } from "../util.js";

const solve = (data) => {
  const totals = data.reduce(
    (acc, curr) => {
      const index = acc[0];
      const value = parseInt(curr);
      if (isNaN(value)) {
        acc[0] += 1;
      } else {
        acc[index] = (acc[index]) ? acc[index] + value : value;
      }

      return acc;
    },
    [1] // acc[0] holds the index of the current elf's total
  );

  return totals.splice(1).sort((a, b) => b - a);
}


const test = solve(fileToArrayOfLines('./2022/day1/test.txt'));
console.log(test);
assert(test[0] === 24000, 'max total should be 24000');

const input = solve(fileToArrayOfLines('./2022/day1/input.txt'));
console.log(input);
const answer = input[0];
assert(answer === 65912, 'max total should be 65912');
const answer2 = input[0] + input[1] + input[2];
assert(answer2 === 195625, 'max total should be 195625');