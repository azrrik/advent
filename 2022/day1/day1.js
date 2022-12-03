import * as fs from 'fs';

const solve = (data) => {
    const reduced = data.split('\n').reduce(
        (acc, curr) => {
            const value = parseInt(curr);
            if (isNaN(value)) {
                acc[0] += 1;
            } else {
                acc[acc[0]] = (acc[acc[0]]) ? acc[acc[0]] + value : value;
            }
            return acc;
        },
        [1] // acc[0] holds the index of the current elf's total
    );
    const sums = reduced.splice(1).sort((a, b) => b - a);
    console.log(sums[0]);
    console.log(sums[0] + sums[1] + sums[2]);
}

fs.readFile('./2022/day1/input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    solve(data);
});