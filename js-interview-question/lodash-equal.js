
function isEqual(x, y) {
  if (x === y) {
    return true;
  } else if ((typeof x === 'object' && x !== null) && (typeof y === 'object' && y !== null)) {
    const keysX = Object.keys(x);
    const keysY = Object.keys(y);
    if (keysX.length !== keysY.length) {
      return false;
    }
    for (const key of keysX) {
      if(!isEqual(x[key], y[key])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

var obj = {here: {is: "an"}, object: 2};
console.log(isEqual(obj, obj));
console.log(isEqual(obj, {here: 1, object: 2}));
console.log(isEqual(obj, {here: {is: "an"}, object: 2}));
console.log(isEqual(1, 1));
console.log(isEqual({ x: 1 }, { x: 1 }));
console.log(isEqual({ x: 1 }, { y: 1 }));
console.log(isEqual(new Date(2021, 7, 1), new Date(2021, 7, 1)));