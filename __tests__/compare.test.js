import compare from '../src/compare.js';

test('compare', () => {
    expect(compare({}, {})).toBe('{\n \n}');
});