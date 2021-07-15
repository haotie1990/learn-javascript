
/**
 * https://segmentfault.com/a/1190000014486043
 * https://www.zhihu.com/question/68330851/answer/266506621
 */

function random(min, max) {
  let rd = Math.random() * (max - min + 1) + min;
  return Math.floor(rd);
}

function randomArray(array) {
  const len = array.length;
  const newArr = [];
  const map = new Map();
  while (newArr.length < len) {
    const idx = random(0, len -1);
    if (map.has(idx)) {
      continue;
    }
    newArr.push(array[idx]);
    map.set(idx, true);
  }
  return newArr;
}

function shuffle(array) {
  let len = array.length;
  let _array = [...array];
  while (len) {
    let index = Math.floor(Math.random() * len--);
    [_array[index], _array[len]] = [_array[len], _array[index]];
  }
  return _array;
}

console.log('%s', shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('%s', shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('%s', shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));