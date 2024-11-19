import _ from 'lodash';

const compare = (json1, json2) => {
  const json1sorted = _.pick(json1, Object.keys(json1).sort());
  const json2sorted = _.pick(json2, Object.keys(json2).sort());
  const result = Object.keys(json1sorted).reduce((acc, key) => {
    const value = json1sorted[key];
    if (Object.hasOwn(json2sorted, key)) {
      if (json2sorted[key] === value) {
        acc.push(`  ${key}: ${value}`);
      } else {
        acc.push(`- ${key}: ${value}`);
        acc.push(`+ ${key}: ${json2sorted[key]}`);
      }
    } else {
      acc.push(`- ${key}: ${value}`);
    }
    return acc;
  }, []);

  const finalResult = Object.keys(json2sorted).reduce((acc, key) => {
    if (!Object.hasOwn(json1sorted, key)) {
      acc.push(`+ ${key}: ${json2sorted[key]}`);
    }
    return acc;
  }, result);

  const sortedResult = finalResult.toSorted((a, b) => {
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
