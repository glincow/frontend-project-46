import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';
import parse from '../src/parse.js';
import getFormatter from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResultStylish = `{
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

const expectedResultPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('compare empty objects stylish', () => {
  expect(compare({}, {}, getFormatter('stylish'))).toBe('{\n\n}');
});

test('compare json stylish', () => {
  const json1 = parse(getFixturePath('file1.json'));
  const json2 = parse(getFixturePath('file2.json'));
  expect(compare(json1, json2, getFormatter('stylish'))).toBe(expectedResultStylish);
});

test('compare yml stylish', () => {
  const yml1 = parse(getFixturePath('file1.yml'));
  const yml2 = parse(getFixturePath('file2.yml'));
  expect(compare(yml1, yml2, getFormatter('stylish'))).toBe(expectedResultStylish);
});

test('compare json plain', () => {
  const json1 = parse(getFixturePath('file1.json'));
  const json2 = parse(getFixturePath('file2.json'));
  expect(compare(json1, json2, getFormatter('plain'))).toBe(expectedResultPlain);
});

test('compare yml plain', () => {
  const yml1 = parse(getFixturePath('file1.yml'));
  const yml2 = parse(getFixturePath('file2.yml'));
  expect(compare(yml1, yml2, getFormatter('plain'))).toBe(expectedResultPlain);
});
