'use strict';

/**
 * Array flat function
 */

function flat(array, depth = Number.MAX_VALUE) {
  let result = [];
  depth--;
  for (const item of array) {
    if (Array.isArray(item) && depth >= 0) {
      result.push(...flat(item, depth));
    } else {
      result.push(item);
    }
  }
  return result;
}

const array = [1, 2, 3, [ 4, [ 5 ], 6 ], [7, 8], [ [ [ 9 ] ] ]];

console.log(flat(array));
console.log(flat(array, 1));
console.log(flat(array, 2));
console.log(flat(array, 3));