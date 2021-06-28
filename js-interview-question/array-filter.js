'use strict';

Array.prototype.Filter = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback not a function');
  }
  if (this == null) {
    throw new TypeError('this ia empty');
  }

  const arr = Object(this);
  const len = Number(arr.length); // arr.length >>> 0;

  const result = [];
  let i = 0;
  while (i < len) {
    // 在非严格模式下call函数的this值如果为null或undefined,则会取全局对象,严格模式下则会取undefined
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      result.push(arr[i]);
    }
    i++
  }
  return result;
}

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);
const result1 = words.Filter(word => word.length > 6);

console.log(result);
console.log(result1);