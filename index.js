import compare from './src/compare.js';

const genDiff = (path1, path2) => compare(path1, path2, 'stylish');

export default genDiff;
