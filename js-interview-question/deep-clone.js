'use strict';

/**
 * 深拷贝关注点:
 * 1. JavaScript内置对象的复制: Set、Map、Date、Regex等
 * 2. 循环引用问题
 * @param {*} object 
 * @returns 
 */
function deepClone(source, memory) {
  const isPrimitive = (value) => {
    return /Number|Boolean|String|Null|Undefined|Symbol|Function/.test(Object.prototype.toString.call(value));
  }
  let result = null;

  memory || (memory = new WeakMap());
  // 原始数据类型及函数
  if (isPrimitive(source)) {
    console.log('current copy is primitive', source);
    result = source;
  }
  // 数组
  else if (Array.isArray(source)) {
    result = source.map(value => deepClone(value, memory));
  }
  // 内置对象Date、Regex
  else if (Object.prototype.toString.call(source) === '[object Date]') {
    result = new Date(source);
  }
  else if (Object.prototype.toString.call(source) === '[object Regex]') {
    result = new RegExp(source);
  }
  // 内置对象Set、Map
  else if (Object.prototype.toString.call(source) === '[object Set]') {
    result = new Set();
    for (const value of source) {
      result.add(deepClone(value, memory));
    }
  }
  else if (Object.prototype.toString.call(source) === '[object Map]') {
    result = new Map();
    for (const [key, value] of source.entries()) {
      result.set(key, deepClone(value, memory));
    }
  }
  // 引用类型
  else {
    if (memory.has(source)) {
      result = memory.get(source);
    } else {
      result = Object.create(null);
      memory.set(source, result);
      Object.keys(source).forEach(key => {
        const value = source[key];
        result[key] = deepClone(value, memory);
      });
    }
  }
  return result;
}

// 其他实现深拷贝的方法
function deepCloneByNotification(obj) {
  return new Notification('', {
    data: obj,
    silent: true
  }).data;
}

function deepCloneByHistoryState(obj) {
  const oldState = history.state;
  history.replaceState(obj, document.title);
  const copy = history.state;
  history.replaceState(oldState, document.title);
  return copy;
}

function Foo() {
  this.a = 1;
}
Foo.prototype.b = 1;
Foo.c = function() {};
const map = new Map;
map.set('a', 1);
map.set('b', 2);
const set = new Set;
set.add(1);
set.add(2);

const objects = {
  'arrays': ['a', ''],
  'array-like objects': { '0': 'a', 'length': 1 },
  'booleans': false,
  'boolean objects': Object(false),
  'date objects': new Date,
  'Foo instances': new Foo,
  'objects': { 'a': 0, 'b': 1, 'c': 2 },
  'objects with object values': { 'a': /a/, 'b': ['B'], 'c': { 'C': 1 } },
  'function': function log() {
    console.log('log');
  },
  'maps': map,
  'null values': null,
  'numbers': 0,
  'number objects': Object(0),
  'regexes': /a/gim,
  'sets': set,
  'strings': 'a',
  'string objects': Object('a'),
  'undefined values': undefined
};

// const cloneObjects = deepClone(objects);

// console.log(cloneObjects);
// Object.keys(cloneObjects).forEach(key => {
//   console.log('key: %s, result: %s', key, cloneObjects[key] === objects[key]);
// });

// const obj1 = {};
// const obj2 = { obj1 };
// obj1.obj2 = obj2;

// const cloneObj1 = deepClone(obj1);
// console.log('ojb1: %o', cloneObj1);
// console.log(cloneObj1.obj2 === obj1.obj2);
// console.log(cloneObj1.obj2 === obj2);
// console.log(cloneObj1.obj2.obj1 === cloneObj1);
// console.log(cloneObj1.obj2.obj1.obj2 === cloneObj1.obj2);

const obj3 = { name: 'jack' };
const arr = [obj3, obj3];
const cloneArr = deepClone(arr);
console.log('false:', cloneArr === arr);
console.log('true:', cloneArr[0] === cloneArr[1]);
console.log('true:', arr[0] === arr[1]);
console.log('false:', cloneArr[0] === arr[0]);
console.log('false:', cloneArr[1] === arr[1]);