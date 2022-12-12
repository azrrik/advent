import * as fs from 'fs';

export const fileToArrayOfLines = (filename) => {
  try {

    return fs
      .readFileSync(filename, 'utf8')
      .split('\n')
      .map(line => line.replace('\r', ''));
  } catch (err) {
    console.error(err);
  }
}

export const range = (start, stop, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));