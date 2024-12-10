import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

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

const compare = (json1, json2, formatter) => {
  const diffTree = buildDiffTree(json1, json2);
  return formatter(diffTree);
};

export default compare;
