'use strict';

function unique(array) {
  const result = [];
  const map = new Map();
  array.forEach(item => {
    if (!map.has(item)) {
      result.push(item);
    }
    map.set(item, true);
  });
  return result;
}

function unique1(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

function unique2(array) {
  return Array.from(new Set(array));
}

function unique3(array) {
  const map = {};
  array.forEach(item => {
    map[item + '::' + typeof item] = item;
  });
  return Object.keys(map).map(key => map[key]);
}

console.log(unique([1, 2, 3, 4, 1, 2]));
console.log(unique1([1, 2, 3, 4, 1, 2]));
console.log(unique2([1, 2, 3, 4, 1, 2]));
console.log(unique3([1, 2, 3, 4, 1, 2]));