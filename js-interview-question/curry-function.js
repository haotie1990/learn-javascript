'use strict';

/**
 * 柯里化是将多个参数的函数转换为一个参数的函数的过程
 * @param {function} func 
 * @returns 
 */
function currying(func) {
  const len = func.length;
  // 固定参数
  let args = [].slice.call(arguments, 1);
  return function curried() {
    // 固定参数与传入参数组合,满足执行函数参数则执行,否则继续将传入参数固定下来
    let _args = [].concat.apply(args, arguments);
    if (_args.length >= len) {
      return func.apply(this, _args);
    } else {
      return currying.apply(this, [func].concat(_args));
    }
  }
}

// 第二版
function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function curry(fn, length) {
  length = length || fn.length;
  var slice = Array.prototype.slice;
  return function () {
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry.apply(this, combined), length - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  };
}

const sum = function(a, b, c) {
  return a + b + c;
}

const sumCurry = currying(sum);

console.log(sumCurry(1)(2)(3));

const persons = [{ name: 'Jack' }, { name: 'John' }];
const prop = currying(function(key, object){
  return object[key];
});

console.log(persons.map(prop('name')));