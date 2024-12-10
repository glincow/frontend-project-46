import _ from 'lodash';

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return typeof value === 'string' ? value : JSON.stringify(value);
  }
  const indent = '    '.repeat(depth + 2);
  const bracketIndent = '    '.repeat(depth + 1);
  const lines = Object.entries(value).map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatStylish = (diffTree, depth = 0) => {
  const indent = '    '.repeat(depth);
  const lines = diffTree.map((node) => {
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
          `${indent}  + ${node.key}: ${formatValue(node.newValue, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent}    ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        return null;
    }
  });

  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default formatStylish;
