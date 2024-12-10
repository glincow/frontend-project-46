import formatStylish from './stylishFormatter.js';
import formatPlain from './plainFormatter.js';

const getFormatter = (name) => {
  switch (name) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    default:
      return null;
  }
};

export default getFormatter;
