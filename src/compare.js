import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  return keys.map(key => {
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
      newValue: obj2[key] 
    };
  });
};

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return typeof value === 'string' ? value : JSON.stringify(value);
  }
  const indent = '    '.repeat(depth + 2);
  const bracketIndent = '    '.repeat(depth + 1);
  const lines = Object.entries(value).map(([key, val]) => 
    `${indent}${key}: ${formatValue(val, depth + 1)}`
  );
  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatStylish = (diffTree, depth = 0) => {
  const indent = '    '.repeat(depth);
  const lines = diffTree.map(node => {
    switch (node.type) {
      case 'added':
        return `${indent}  + ${node.key}: ${formatValue(node.value, depth)}`;
      case 'removed':
        return `${indent}  - ${node.key}: ${formatValue(node.value, depth)}`;
      case 'unchanged':
        return `${indent}    ${node.key}: ${formatValue(node.value, depth)}`;
      case 'changed':
        return [
          `${indent}  - ${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${indent}  + ${node.key}: ${formatValue(node.newValue, depth)}`
        ].join('\n');
      case 'nested':
        return `${indent}    ${node.key}: ${formatStylish(node.children, depth + 1)}`;
    }
  });

  return `{\n${lines.join('\n')}\n${indent}}`;
};

const compare = (json1, json2, formatter = formatStylish) => {
  const diffTree = buildDiffTree(json1, json2);
  return formatter(diffTree);
};

export default compare;
