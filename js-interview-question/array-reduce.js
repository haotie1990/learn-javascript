
// [,,,].Reduce不会报错
Array.prototype.Reduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback not a function');
  }

  const array = Object(this);
  const len = array.length >>> 0;

  // 未指定initialValue且数组为空
  if (initialValue == null && len === 0) {
    throw new Error('initialValue is null');
  } else if (len === 0) { // 指定initalValue且数组为空
    return initialValue;
  }

  let i = 0;
  let accumulator = null;
  let currentValue = null;
  let currentIndex = null;
  while (i < len) {
    if (i in array) {
      // 第一次执行
      /**
       * 回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：
       * 如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；
       * 如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值
       */
      if (currentIndex === null) {
        // 未指定initialValue
        if (initialValue == null) {
          accumulator = array[i];
          // 找到下一个赋值或未删除项
          currentIndex = i + 1;
          while (!(currentIndex in array) && currentIndex < len) {
            currentIndex = currentIndex + 1;
          }
          if (currentIndex >= len) {
            return accumulator;
          }
          i = currentIndex + 1;
          currentValue = array[currentIndex];
          accumulator = callback(accumulator, currentValue, currentIndex, array);
          continue;
        } else {
          accumulator = initialValue;
        }
      }
      currentIndex = i;
      currentValue = array[currentIndex];
      accumulator = callback(accumulator, currentValue, currentIndex, array);
    }
    i++;
  }
  return accumulator;
}

/**
 * 完整版
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 * @param {*} callback 
 * @param {*} initialValue 
 * @returns 
 */
Array.prototype.Reduce1 = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback not a function');
  }

  const array = Object(this);
  const len = array.length >>> 0;
  let accumulator = null;
  let currentIndex = 0;
  let currentValue = null;
  if (initialValue == null) {
    // 没传入初始值的时候，取数组中第一个非 empty 的值为初始值
    while(currentIndex < len && !(currentIndex in array)) {
      currentIndex++;
    }
    if (currentIndex >= len) {// 未提供initialValue且无法在数组中找到有效值,报错
      throw new Error('array is empty and initialValue is null');
    }
    // 注意将currentIndex向后进一位，currentValue从下一位开始
    accumulator = array[currentIndex++];
  } else {
    accumulator = initialValue;
  }

  while (currentIndex < len) {
    if (currentIndex in array) {
      currentValue = array[currentIndex];
      accumulator = callback(accumulator, currentValue, currentIndex, array);
    }
    currentIndex++; 
  }
  return accumulator;
}

function sum(pre, next) {
  return pre += next;
}

console.log([, 1, 2 , 3].Reduce1(sum));
console.log([, 1, 2 , 3].reduce(sum));
console.log('----------------------------------------------------------------');
console.log([, 1, 2 , 3].Reduce1(sum, 10));
console.log([, 1, 2 , 3].reduce(sum, 10));
console.log('----------------------------------------------------------------');
console.log([0, , 2 , 3].Reduce1(sum));
console.log([0, , 2 , 3].reduce(sum));
console.log('----------------------------------------------------------------');
console.log([0, 1, 2 , 3].Reduce1(sum));
console.log([0, 1, 2 , 3].reduce(sum));
console.log('----------------------------------------------------------------');
console.log([0, 1, 2 , 3].Reduce1(sum, 10));
console.log([0, 1, 2 , 3].reduce(sum, 10));
console.log('----------------------------------------------------------------');
console.log([].Reduce1(sum, 10));
console.log([].reduce(sum, 10));
console.log('----------------------------------------------------------------');
console.log([1].Reduce1(sum, 10));
console.log([1].reduce(sum, 10));
console.log('----------------------------------------------------------------');
console.log([,1,].Reduce1(sum));
console.log([,1,].reduce(sum));
console.log('----------------------------------------------------------------');
console.log([1].Reduce1(sum));
console.log([1].reduce(sum));
console.log('----------------------------------------------------------------');
// console.log([,,,].Reduce1(sum));
// console.log([,,,].reduce(sum));
// console.log('----------------------------------------------------------------'); TypeError
// console.log([].Reduce(sum));
// console.log([].reduce(sum));