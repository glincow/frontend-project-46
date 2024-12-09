import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';
import parse from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResult = 
`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('compare empty objects', () => {
  expect(compare({}, {})).toBe('{\n\n}');
});

test('compare json', () => {
  const json1 = parse(getFixturePath('file1.json'));
  const json2 = parse(getFixturePath('file2.json'));
  expect(compare(json1, json2)).toBe(expectedResult);
});

test('compare yml', () => {
  const yml1 = parse(getFixturePath('file1.yml'));
  const yml2 = parse(getFixturePath('file2.yml'));
  expect(compare(yml1, yml2)).toBe(expectedResult);
});
