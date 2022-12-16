import assert from "assert";

import { fileToArrayOfLines, range } from "../util.js";

const solve = (data) => {
  // moveTail[head.x - tail.x][head.y - tail.y]
  const moveTail = {
    "-2": {
      // ..T    ...
      // ...    .T.
      // H.. => H..
      "-2": { x: -1, y: -1 },
      // ..T    ...
      // H.. => HT.
      "-1": { x: -1, y: -1 },
      // H.T => HT.
      0: { x: -1, y: 0 },
      // H..    .TH
      // ..T => ...
      1: { x: -1, y: 1 },
      // H..    H..
      // ...    .T.
      // ..T => ...
      2: { x: -1, y: 1 }
    },
    "-1": {
      // .T    ..
      // ..    T.
      // H. => H.
      "-2": { x: -1, y: -1 },
      // .T    .T
      // H. => H.
      "-1": { x: 0, y: 0 },
      // HT => HT
      0: { x: 0, y: 0 },
      // H.    H.
      // .T => .T
      1: { x: 0, y: 0 },
      // H.    H.
      // ..    T.
      // .T => ..
      2: { x: -1, y: 1 },
    },
    0: {
      // T    .
      // .    T
      // H => H
      "-2": { x: 0, y: -1 },
      // T    T
      // H => H
      "-1": { x: 0, y: 0 },
      0: { x: 0, y: 0 },
      // H    H
      // T => T
      1: { x: 0, y: 0 },
      // H    H
      // .    T
      // T => .
      2: { x: 0, y: 1 },
    },
    1: {
      // T.    ..
      // ..    .T
      // .H => .H
      "-2": { x: 1, y: -1 },
      // T.    T.
      // .H => .H
      "-1": { x: 0, y: 0 },
      // TH => TH
      0: { x: 0, y: 0 },
      // .H    .H
      // T. => T.
      1: { x: 0, y: 0 },
      // .H    .H
      // ..    .T
      // T. => ..
      2: { x: 1, y: 1 },
    },
    2: {
      // T..    ...
      // ...    .T.
      // ..H => ..H
      "-2": { x: 1, y: -1 },
      // T..    ...
      // ..H => .TH
      "-1": { x: 1, y: -1 },
      // T.H => .TH
      0: { x: 1, y: 0 },
      // ..H    .TH
      // T.. => ...
      1: { x: 1, y: 1 },
      // ..H    ..H
      // ...    .T.
      // T.. => ...
      2: { x: 1, y: 1 }
    },
  };

  const updateTail = (tailPos, headPos) => {
    const d = moveTail[headPos.x - tailPos.x][headPos.y - tailPos.y];
    return { x: tailPos.x + d.x, y: tailPos.y + d.y };
  };
  const moveHead = {
    U: (pos) => ({ x: pos.x, y: pos.y + 1 }),
    D: (pos) => ({ x: pos.x, y: pos.y - 1 }),
    L: (pos) => ({ x: pos.x - 1, y: pos.y }),
    R: (pos) => ({ x: pos.x + 1, y: pos.y }),
  };

  const solve1 = (acc, step) => {
    return range(1, step.length).reduce(
      (_acc) => {
        const head = moveHead[step.direction](_acc.head);
        const tail = updateTail(_acc.tail, head);
        _acc.ground.add(`${tail.x},${tail.y}`);
        return { head, tail, ground: _acc.ground };
      },
      { ground: acc.ground, head: acc.head, tail: acc.tail }
    );
  };

  const solve2 = (acc, step) => {
    return range(1, step.length).reduce(
      (_acc) => {
        _acc.body[0] = moveHead[step.direction](_acc.head);
        range(1, 9).reduce(
          (__acc, i) => {
            __acc.body[i] = updateTail(__acc.body[i], __acc.body[i - 1]);
            return __acc;
          },
          _acc
        )
        const head = _acc.body[0];
        const tail = _acc.body[9];
        _acc.ground.add(`${tail.x},${tail.y}`);
        return { head, body, ground: _acc.ground };
      },
      { ground: acc.ground, head: acc.head, body: acc.body }
    );
  };

  const parse = (split) => ({
    direction: split[0],
    length: parseInt(split[1]),
  });

  const acc = data
    .map((line) => parse(line.split(" ")))
    .reduce(solve1, {
      ground: new Set(),
      head: { x: 0, y: 0 },
      tail: { x: 0, y: 0 },
    });
  const solution1 = acc.ground.size;

  const body = range(0, 9).map(() => ({ x: 0, y: 0 }));
  const acc2 = data
    .map((line) => parse(line.split(" ")))
    .reduce(solve2, {
      ground: new Set(),
      head: { x: 0, y: 0 },
      body: body,
    });
  const solution2 = acc2.ground.size;

  return { solution1, solution2 };
};

const test = fileToArrayOfLines("./2022/day9/test.txt");
const { solution1: testSolution1, solution2: testSolution2 } = solve(test);
console.log(testSolution1);
assert.equal(
  testSolution1,
  "13",
  "total positions tail has visited should be 13"
);

console.log(testSolution2);
assert.equal(testSolution2, '1', "total scenic score should be 1");

const test2 = fileToArrayOfLines("./2022/day9/test2.txt");
const { solution2: testSolution3 } = solve(test2);
console.log(testSolution3);
assert.equal(testSolution3, '36', "total scenic score should be 36");

const input = fileToArrayOfLines("./2022/day9/input.txt");
const { solution1, solution2 } = solve(input);
console.log(solution1);
assert.equal(
  solution1,
  "6464",
  "total positions tail has visited should be 6464"
);

console.log(solution2);
assert.equal(solution2, '2604', "total scenic score should be 2604");
