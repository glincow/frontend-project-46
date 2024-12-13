import formatStylish from './stylishFormatter.js';
import formatPlain from './plainFormatter.js';
import formatJson from './jsonFormatter.js';

const getFormatter = (name) => {
  switch (name) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    case 'json':
      return formatJson;
    default:
      throw new Error(`Unknown formatter name: '${name}'!`);
  }
};

export default getFormatter;
