import compare from './src/compare.js';

const genDiff = (path1, path2, format = 'stylish') => compare(path1, path2, format);

export default genDiff;
