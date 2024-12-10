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
      return null;
  }
};

export default getFormatter;
