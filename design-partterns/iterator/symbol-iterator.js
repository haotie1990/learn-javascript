'use strict';

function defineIterator(target) {
  Object.defineProperty(target, Symbol.iterator, {
    value: function() {
      const keys = Object.keys(target);
      return {
        next: function() {
          const done = !keys.length;
          const value = target[keys.shift()];
          return { value, done };
        }
      }
    }
  });
}

function Iterator(object) {
  if (typeof object === 'object' && object !== null) {
    const _object = Object.assign({
      [Symbol.iterator]: function() {
        const keys = Object.keys(object);
        return {
          next: function() {
            // 最后要返回{ done: true, value: undefined }
            const done = !keys.length;
            const value = object[keys.shift()];
            return {
              value,
              done
            };
          },
          return: function() {
            // for of循环提前退出（报错或break）会调用return方法
            console.log('return');
          }
        };
      }
    }, object);
    return _object;
  }
  return object;
}

/**
 * for...in,遍历除了Symbol类型的所有可枚举属性（包括原型链上的属性）,需要使用hasOwnProperty判断
 * for...of,调用Symbol.iterator的迭代器对象进行遍历
 * forEach,数组方法,缺点是不可使用break, continue, return
 */

const obj = {
  a: 1,
  b: 2,
  c: 3
};

// const _obj = Iterator(obj);
defineIterator(obj);
for (const value of obj) {
  console.log(value);
}
for (const value of obj) {
  console.log(value);
}