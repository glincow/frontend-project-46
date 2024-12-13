import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

const parse = (inputPath) => {
  switch (path.extname(inputPath)) {
    case '.yml':
    case '.yaml':
      return yaml.load(readFileSync(inputPath));
    case '.json':
      return JSON.parse(readFileSync(inputPath));
    default:
      throw new Error(`Unknown extension name: ${path.extname(inputPath)}!`);
  }
};

export default parse;
