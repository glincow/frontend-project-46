import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

const parse = (inputPath) => {
  let result = {};
  switch (path.extname(inputPath)) {
    case '.yml':
    case '.yaml':
      result = yaml.load(readFileSync(inputPath));
      break;
    case '.json':
      result = JSON.parse(readFileSync(inputPath));
      break;
    default:
      console.log('This file format is not supported');
  }
  return result;
};

export default parse;
