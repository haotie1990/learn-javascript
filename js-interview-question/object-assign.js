
Object.prototype.Assign = function() {
  if (arguments.length === 0) {
    throw new Error('parameters is empty');
  }

  let objects = [].slice.call(arguments);
  let target = objects.shift();
  objects.reduce(function(target, source) {
    if (source == null) {
      return target;
    }
    for (let key in source) { // Object.getOwnPropertySymbols
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
    return target;
  }, target);
  return target;
}

// const o1 = { a: 1 };
// const o2 = { b: 2 };
// const o3 = { c: 3 };

// const obj = Object.Assign(o1, o2, o3);
// console.log(obj); // { a: 1, b: 2, c: 3 }
// console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。

const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = Object.Assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }

// const o1 = { a: 1 };
// const o2 = { [Symbol('foo')]: 2 };

// const obj = Object.Assign({}, o1, o2);
// console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
// Object.getOwnPropertySymbols(obj); // [Symbol(foo)]