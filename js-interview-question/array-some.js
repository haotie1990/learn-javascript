
Array.prototype.Some = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback not a function');
  }
  
  const array = Object(this);
  const len = Number(array.length);

  let i = 0;
  while (i < len) {
    if (i in array) {
      if (callback.call(thisArg, array[i], i, array)) {
        return true;
      }
    }
    i++;
  }
  return false;
}

function isBiggerThan10(element, index, array) {
  return element > 10;
}

let res1 = [2, 5, 8, 1, 4].Some(isBiggerThan10);  // false
let res2 = [12, 5, 8, 1, 4].Some(isBiggerThan10); // true

console.log(res1);
console.log(res2);