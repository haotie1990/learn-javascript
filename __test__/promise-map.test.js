const Promise = require('../js-interview-question/promise-map');

describe('Promise.map-test', () => {
  function mapper(val) {
    return val * 2;
  }

  test('should map input values array', () => {
    var input = [1, 2, 3];
    return Promise.map(input, mapper).then(result => {
      expect(result).toEqual([2,4,6]);
    });
  });

  test('should map input promises array', () => {
    var input = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
    return Promise.map(input, mapper).then(result => {
      expect(result).toEqual([2,4,6]);
    });
  });

  test('should map mixed input array', () => {
    var input = [1, Promise.resolve(2), 3];
    return Promise.map(input, mapper).then(result => {
      expect(result).toEqual([2,4,6]);
    });
  });

  test('should reject when input contains rejection', () => {
    var input = [Promise.resolve(1), Promise.reject(2), Promise.resolve(3)];
    return expect(Promise.map(input, mapper)).rejects.toEqual(2);
  });

  test('should call mapper asynchronously on values array', () => {
    var calls = 0;
    function mapper(val) {
        calls++;
    }
    var input = [1, 2, 3];
    return Promise.map(input, mapper).then(() => {
      expect(calls).toEqual(3);
    });
  });

  test('should map input values array with concurrency', () => {
    var concurrency = 2;
    var input = [1, 2, 3];
    return Promise.map(input, (value) => Promise.resolve(Math.pow(value, 2)), concurrency).then((result) => {
      expect(result).toEqual([1,4,9]);
    });
  });

  test('should not have more than {concurrency} promises in flight', () => {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var b = [];
    var now = Date.now();

    var immediates = [];
    function immediate(index) {
      var resolve;
      var ret = new Promise(function(){resolve = arguments[0]});
      immediates.push([ret, resolve, index]);
      return ret;
    }

    var lates = [];
    function late(index) {
      var resolve;
      var ret = new Promise(function(){resolve = arguments[0]});
      lates.push([ret, resolve, index]);
      return ret;
    }


    function promiseByIndex(index) {
      return index < 5 ? immediate(index) : late(index);
    }

    function resolve(item) {
      item[1](item[2]);
    }

    var ret1 = Promise.map(array, function(value, index) {
      return promiseByIndex(index).then(function() {
          b.push(value);
      });
    }, 5);

    var ret2 = Promise.delay(100).then(function() {
      expect(b.length).toEqual(0);
      immediates.forEach(resolve);
      return immediates.map(function(item){return item[0]});
    }).delay(100).then(function() {
      expect(b).toEqual([0, 1, 2, 3, 4]);
      lates.forEach(resolve);
    }).delay(100).then(function() {
      expect(b).toEqual([0, 1, 2, 3, 4, 10, 9, 8, 7, 6 ]);
      lates.forEach(resolve);
    }).thenReturn(ret1).then(function() {
      expect(b).toEqual([0, 1, 2, 3, 4, 10, 9, 8, 7, 6, 5]);
    });
    return Promise.all([ret1, ret2]);
  });
});