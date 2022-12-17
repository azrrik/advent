import assert from 'assert';

import { fileToArrayOfLines, range } from '../util.js';


const process = (isAdd) => (acc, line) => {
  const delta = (isAdd)
    ? parseInt(line.split(' ')[1])
    : 0;
  const x = acc.x + delta;
  const cycle = acc.cycle + ((isAdd) ? 2 : 1);
  const signal = x * cycle;
  const _markers =
    [20, 60, 100, 140, 180, 220].includes(cycle)
      ? [...acc.markers, { cycle, signal }]
      : acc.markers;
  const _cycle = cycle - 1;
  const _signal = _cycle * acc.x;
  const markers =
    [21, 61, 101, 141, 181, 221].includes(cycle)
      ? [..._markers, { cycle: _cycle, signal: _signal }]
      : _markers;

  return { cycle, signal, x, markers };
};

const solve1 = (data) => {
  const acc = data.reduce(
    (acc, line) =>
      (line === 'noop')
        ? process(false)(acc, line)
        : process(true)(acc, line)
    ,
    { cycle: 1, signal: 0, x: 1, markers: [] }
  );

  const markerEquals = (curr, index, array) =>
    array.findIndex(
      _curr =>
        _curr.cycle === curr.cycle &&
        _curr.signal === curr.signal
    ) === index;
  const unique = acc.markers.filter(markerEquals);

  return unique.reduce((_, curr) => curr.signal + _, 0);
};

const draw = (isAdd) => (acc, line) => {
  const totalCycles = (isAdd) ? 2 : 1;

  const curr = range(1, totalCycles)
    .reduce(
      (_acc, d) => {
        const cycle = acc.cycle + d;
        const pixel =
          ([acc.x, acc.x + 1, acc.x + 2].includes(cycle % 40))
            ? '#'
            : '.';
        const markers = [..._acc.markers, pixel];

        return { cycle, x: acc.x, markers };
      },
      acc
    );

  const delta = (isAdd)
    ? parseInt(line.split(' ')[1])
    : 0;
  const x = acc.x + delta;

  return { ...curr, x };
};

const solve2 = (data) => {
  const screen = data.reduce(
    (acc, line) =>
      (line === 'noop')
        ? draw(false)(acc, line)
        : draw(true)(acc, line)
    ,
    { cycle: 0, x: 1, markers: [] }
  );

  return [40, 80, 120, 160, 200, 240]
    .reduce(
      (acc, curr) => [...acc, screen.markers.slice(curr - 40, curr)],
      []
    )
    .map((line) => line.join(''))
    .reduce((acc, line) => acc + line + '\n', '');
};


const test = fileToArrayOfLines('./2022/day10/test.txt');
const testSolution1 = solve1(test);
console.log(testSolution1);
assert.equal(
  testSolution1,
  13140,
  'sum of six signal strengths should be 13140'
);

const testSolution2 = solve2(test);
console.log(testSolution2);
assert.equal(testSolution2,
  '##..##..##..##..##..##..##..##..##..##..\n' +
  '###...###...###...###...###...###...###.\n' +
  '####....####....####....####....####....\n' +
  '#####.....#####.....#####.....#####.....\n' +
  '######......######......######......###.\n' +
  '#######.......#######.......#######.....\n',
  'should be ^'
);

const input = fileToArrayOfLines('./2022/day10/input.txt');
const solution1 = solve1(input);
console.log(solution1);
assert.equal(
  solution1,
  17380,
  'sum of six signal strengths should be 17380'
);

const solution2 = solve2(input);
console.log(solution2);
// FGCUZREC
assert.equal(solution2,
  '####..##...##..#..#.####.###..####..##..\n' +
  '#....#..#.#..#.#..#....#.#..#.#....#..#.\n' +
  '###..#....#....#..#...#..#..#.###..#...#\n' +
  '#....#.##.#....#..#..#...###..#....#....\n' +
  '#....#..#.#..#.#..#.#....#.#..#....#..#.\n' +
  '#.....###..##...##..####.#..#.####..##..\n',
  'should be ^'
);
