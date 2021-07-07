const BinarySearch = require('./binary-search.js');

describe('Binary Search', () => {
  test('binary search return index', () => {
    let input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let target = 10;
    expect(BinarySearch(input, target)).toEqual(9);
  });
  test('binary search return -1', () => {
    let input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let target = 12;
    expect(BinarySearch(input, target)).toEqual(-1);
  });
});