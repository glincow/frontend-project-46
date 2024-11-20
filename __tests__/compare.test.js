import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';
import parse from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare empty objects', () => {
  expect(compare({}, {})).toBe('{\n \n}');
});

test('compare json', () => {
  const json1 = parse(getFixturePath('file1.json'));
  const json2 = parse(getFixturePath('file2.json'));
  const expectedResult = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;
  expect(compare(json1, json2)).toBe(expectedResult);
});

test('compare yml', () => {
  const yml1 = parse(getFixturePath('file1.yml'));
  const yml2 = parse(getFixturePath('file2.yml'));
  const expectedResult = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;
  expect(compare(yml1, yml2)).toBe(expectedResult);
});
