'use strict';

/**
 * 
 * @param {array|object} collection 
 * @param {function} callback 
 */
function forEach(collection, callback) {
  let index = 0;
  const isArray = Array.isArray(collection);
  const _collection = isArray ? collection : Object.keys(collection);
  for (const key of _collection) {
    callback(
      isArray ? index++ : key,
      isArray ? key : collection[key]);
  }
}

forEach([1, 2, 3, 4, 5], function(index, value) {
  console.log(index, value);
});

forEach({ '1': 1, '2': 2, '3': 3, length: 3 }, function(index, value) {
  console.log(index, value);
});