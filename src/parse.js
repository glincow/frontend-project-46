import { readFileSync } from 'node:fs';

export const parse = (path) => {
    return JSON.parse(readFileSync(path));
}