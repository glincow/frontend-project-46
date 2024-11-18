import { readFileSync } from 'node:fs';

const parse = (path) => JSON.parse(readFileSync(path));

export default parse;
