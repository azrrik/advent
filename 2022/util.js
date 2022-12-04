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