import assert from 'assert';

import { fileToArrayOfLines, range } from '../util.js';


const solve = (data) => {

  // const moveTail = (pos, headPos) => {
  //   if (pos.x === headPos.x) {
  //     return (pos.y > headPos.y)
  //       ? { x: pos.x, y: pos.y - 1 }
  //       : { x: pos.x, y: pos.y + 1 }
  //   }
  //   if (pos.y === headPos.y) {
  //     return (pos.x > headPos.x)
  //       ? { x: pos.x - 1, y: pos.y }
  //       : { x: pos.x + 1, y: pos.y }
  //   }
  //   if (pos.x - headPos.x === 1) {
  //     if (pos.x > headPos.x) {
  //       return (pos.y > headPos.y)
  //         ? { x: pos.x - 1, y: pos.y - 1 }
  //         : { x: pos.x + 1, y: pos.y + 1 }
  //     } else {
  //       return (pos.y > headPos.y)
  //         ? { x: pos.x - 1, y: pos.y - 1 }
  //         : { x: pos.x + 1, y: pos.y + 1 }
  //     }
  //   }
  //   if (pos.y - headPos.y === 1) {
  //     return (pos.x > headPos.x)
  //       ? { x: pos.x - 1, y: pos.y - 1 }
  //       : { x: pos.x + 1, y: pos.y + 1 }
  //   }
  //   throw 'invalid positions';
  // }

  // moveTail[headX - tailX][headY - tailY]
  const moveTail =
  {
    '-1': {
      '-1': {
        // ..T
        // .H.
        // ...
        dx: 1, dy: -1
      },
      '0': {

      },
      '1': {

      }
    },

    '0': {

    },

    '1': {

    }
  }


  const distance = (pos1, pos2) =>
    Math.max(
      Math.abs(pos1.x - pos2.x),
      Math.abs(pos1.y - pos2.y)
    )

  const updateTail = (pos, headPos) =>
    (distance(pos, headPos) >= 2)
      ? moveTail(pos, headPos)
      : pos

  const moveHead = {
    'U': (pos) => ({ x: pos.x, y: pos.y + 1 }),
    'D': (pos) => ({ x: pos.x, y: pos.y - 1 }),
    'L': (pos) => ({ x: pos.x + 1, y: pos.y }),
    'R': (pos) => ({ x: pos.x - 1, y: pos.y }),
  }

  const process = (acc, step) => {
    console.log(acc, step)
    range(1, step.length).reduce(
      (_acc) => {
        const head = moveHead[step.direction](_acc.head)
        console.log(head)
        const tail = updateTail(_acc.tail, head)
        console.log(tail)
        return { head, tail }
      },
      { head: acc.head, tail: acc.tail }
    )

    return { ...acc, head: newPosition }
  }

  const parse = (split) =>
    ({ direction: split[0], length: parseInt(split[1]) });

  data
    .map((line) => parse(line.split(' ')))
    .reduce(
      process,
      {
        ground: [[]],
        head: { x: 0, y: 0 },
        tail: { x: 0, y: 0 },
      }
    )


  const solution1 = 0
  const solution2 = 0

  return { solution1, solution2 }
}


const test = fileToArrayOfLines('./2022/day9/test.txt');
const { solution1: testSolution1, solution2: testSolution2 } = solve(test);
console.log(testSolution1);
// assert.equal(testSolution1, '21', "total hidden trees should be 21");

// console.log(testSolution2);
// assert.equal(testSolution2, '8', "total scenic score should be 8");


// const input = fileToArrayOfLines('./2022/day8/input.txt');
// const { solution1, solution2 } = solve(input);
// console.log(solution1);
// assert.equal(solution1, '1679', "total hidden trees should be 1679");

// console.log(solution2);
// assert.equal(solution2, '536625', "total scenic score should be 536625");