
const SelectionSort = require('./selection-sort');

describe('Bubble sort', () => {
  test('sort [8, 3, 1, 2, 7, 9, 4, 5, 10, 6]', () => {
    expect(SelectionSort([8, 3, 1, 2, 7, 9, 4, 5, 10, 6])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('sort []', () => {
    expect(SelectionSort([])).toEqual([]);
  });
});