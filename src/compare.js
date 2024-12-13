import _ from 'lodash';
import parse from './parse.js';
import getFormatter from '../formatters/index.js';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).toSorted();

  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: buildDiffTree(obj1[key], obj2[key]) };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'unchanged', value: obj1[key] };
    }
    return {
      key,
      type: 'changed',
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
};

const compare = (path1, path2, formatterName) => {
  const object1 = parse(path1);
  const object2 = parse(path2);
  const formatter = getFormatter(formatterName);
  const diffTree = buildDiffTree(object1, object2);
  return formatter(diffTree);
};

export default compare;
