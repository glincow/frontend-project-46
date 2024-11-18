import _ from 'lodash';

const compare = (json1, json2) => {
  const json1sorted = _.pick(json1, Object.keys(json1).sort());
  const json2sorted = _.pick(json2, Object.keys(json2).sort());
  const result = [];
  for (const [key, value] of Object.entries(json1sorted)) {
    if (Object.hasOwn(json2sorted, key)) {
      if (json2sorted[key] === value) {
        result.push(`  ${key}: ${value}`);
      } else {
        result.push(`- ${key}: ${value}`);
        result.push(`+ ${key}: ${json2sorted[key]}`);
      }
    } else {
      result.push(`- ${key}: ${value}`);
    }
  }
  for (const [key, value] of Object.entries(json2sorted)) {
    if (!Object.hasOwn(json1sorted, key)) {
      result.push(`+ ${key}: ${value}`);
    }
  }
  const sortedResult = result.toSorted((a, b) => {
    if (a.substring(2).split(':')[0] < b.substring(2).split(':')[0]) {
      return -1;
    } if (a.substring(2).split(':')[0] > b.substring(2).split(':')[0]) {
      return 1;
    }
    return 0;
  });
  return `{\n ${sortedResult.join('\n ')}\n}`;
};

export default compare;
