'use strict';

function currying(fn) {
  const length = fn.length;
  const args = [];

  return function curried() {
    [].push.apply(args, arguments);
    if (args.length >= length) {
      return fn.apply(this, args);
    }
     // arguments.callee 在严格模式下被禁用,需要函数声明,不可使用匿名函数
    return curried;
  }
}

function currying1(fn) {
  const args = [];
  return function curried() {
    [].push.apply(args, arguments);
    if (arguments.length === 0) {
      return fn.apply(this, args);
    }
    return curried;
  }
}

function concat(a, b, c) {
  console.log([a, b, c]);
  return [a, b, c];
}

// const curried = currying(concat);

// const result = curried(1, 2)(3, 4);

let curried1 = currying1(concat);

curried1 = curried1(1, 2)(3, 4);
curried1 = curried1();
curried1();