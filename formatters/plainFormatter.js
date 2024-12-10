import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const formatPlain = (diffTree, parentPath = '') => {
  const lines = diffTree.flatMap((node) => {
    const path = parentPath ? `${parentPath}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${path}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'changed':
        return `Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return formatPlain(node.children, path);
      case 'unchanged':
        return [];
      default:
        return null;
    }
  });

  return lines.filter((line) => line.length > 0).join('\n');
};

export default formatPlain;
