'use strict';

/**
 * Array flat function
 */

function flat(array, depth = Number.MAX_VALUE) {
  let result = [];
  depth--; // 展开一次减一
  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      // result.push(...flat(item, depth)); 使用push方法,depth条件设置>=0
      result = result.concat(flat(item, depth));
    } else {
      result.push(item);
    }
  }
  return result;
}

function flat1(array, depth = Number.MAX_VALUE) {
  let result = [...array];
  while (result.some(i => Array.isArray(i) && depth > 0)) {
    result = [].concat(...result);
    depth--;
  }
  return result;
}

const array = [1, 2, 3, [ 4, [ 5 ], 6 ], [7, 8], [ [ [ 9 ] ] ]];

console.log(flat(array));
// console.log(flat(array, 1));
const arr1 = flat(array, 1);
console.log(flat(array, 2));
console.log(flat(array, 3));
console.log('----------------------------------------------------------------');
console.log(flat1(array));
console.log(flat1(array, 1));
console.log(flat1(array, 2));
console.log(flat1(array, 3));