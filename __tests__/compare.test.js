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

const expectedResultJson = `[
  {
    "key": "common",
    "type": "nested",
    "children": [
      {
        "key": "follow",
        "type": "added",
        "value": false
      },
      {
        "key": "setting1",
        "type": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "type": "removed",
        "value": 200
      },
      {
        "key": "setting3",
        "type": "changed",
        "oldValue": true,
        "newValue": null
      },
      {
        "key": "setting4",
        "type": "added",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "type": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "type": "nested",
        "children": [
          {
            "key": "doge",
            "type": "nested",
            "children": [
              {
                "key": "wow",
                "type": "changed",
                "oldValue": "",
                "newValue": "so much"
              }
            ]
          },
          {
            "key": "key",
            "type": "unchanged",
            "value": "value"
          },
          {
            "key": "ops",
            "type": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "type": "nested",
    "children": [
      {
        "key": "baz",
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "key": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "type": "changed",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "key": "group2",
    "type": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "key": "group3",
    "type": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`;

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

test('compare json json', () => {
  const json1 = parse(getFixturePath('file1.json'));
  const json2 = parse(getFixturePath('file2.json'));
  expect(compare(json1, json2, getFormatter('json'))).toBe(expectedResultJson);
});

test('compare yml json', () => {
  const yml1 = parse(getFixturePath('file1.yml'));
  const yml2 = parse(getFixturePath('file2.yml'));
  expect(compare(yml1, yml2, getFormatter('json'))).toBe(expectedResultJson);
});
