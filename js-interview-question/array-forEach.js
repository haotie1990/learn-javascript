'use strict';

Array.prototype.ForEach = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback not a function');
  }
  if (this == null) {
    throw new TypeError('this not a array');
  }
  // const arr = this;
  const arr = Object(this);
  // 未初始化项将被跳过
  /**
   * [1, undefined, 3] undefined会被遍历到
   * [1,,3] 只会遍历两次
   */
  // for (const index in arr) {
  //   if (Object.hasOwnProperty.call(arr, index)) {
  //     const i = +index;
  //     const value = arr[i];
  //     callback.call(thisArg, value, i, arr);
  //   }
  // }

  let i = 0;
  let len = arr.length >>> 0;
  while (i < len) {
    if (i in arr) {
      callback.call(thisArg, arr[i], i, arr);
    }
    i++;
  }
}

let value;
const array = [1, 2, 3,, 5, 6, 7];
const array1 = [1, 2, 3, value, 5, 6, 7]
const array2 = ['one', 'two', 'three', 'four'];

array.forEach(function (value, index, arr) {
  console.log(this, value, index);
}, { name: 'forEach' });

console.log('--------------------------------');

array.ForEach(function (value, index, arr) {
  console.log(this, value, index);
}, { name: 'ForEach' });

// ['one', 'two', 'three', 'four'].forEach(function (value, index, arr) {
//   console.log(value);
//   if (value === 'two') {
//     arr.shift();
//   }
// });
// console.log('--------------------------------');
// ['one', 'two', 'three', 'four'].ForEach(function (value, index, arr) {
//   console.log(value);
//   if (value === 'two') {
//     arr.shift();
//   }
// });