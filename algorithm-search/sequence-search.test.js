const SequenceSearch = require('./sequence-search.js');

describe('SequenceSearch', () => {
  test('sequence search return index', () => {
    expect(SequenceSearch([1, 2, 3], 3)).toEqual(2);
  });
  test('sequence search return -1', () => {
    expect(SequenceSearch([1, 2, 3], 4)).toEqual(-1);
  });
});
