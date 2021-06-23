'use strict';

const _ = require('lodash');

/**
 * 浅拷贝,不考虑内置对象（Date、Regex、Set、Map
 * @param {*} value 
 * @return 变量副本
 */
function shallowClone(value) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  if (Array.isArray(value)) {
    return [...value];
  }
  const object = {};
  Object.keys(value).forEach(key => object[key] = value[key]);
  return object;;
}

// 使用JSON.parse(JSON.stringify({}))进行复职,存在如下问题:
// 1. undefined属性无法被复制
// 2. 循环引用无法被复制
// 3. 函数方法无法被复制
// 4. 内置对象无法被复制
/**
 * 深拷贝,不考虑内置对象（Date、Regex、Set、Map）及函数,考虑循环引用
 * @param {*} value
 * @param {weakmap} memory
 * @return 变量副本 
 */
function deepClone(value, memory) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  if (!memory) {
    memory = new WeakMap();
  }
  if (Array.isArray(value)) {
    return value.map(item => deepClone(item, memory));
  }

  let result = {};
  if (memory.has(value)) { // 对象类型先查找是否已经创建过
    result = memory.get(value);
  } else {
    memory.set(value, result); // 提前保存对象引用对应的副本,后面才正式想副本里填内容
    Object.keys(value).forEach(key => {
      const _value = value[key];
      if (typeof _value !== 'object' || _value === null) { // 对象属性对应value是基本数据类型
        result[key] = _value;
      } else { // 对象属性对应value为普通对象
        result[key] = deepClone(_value, memory);
      }
    });
  }
  return result;
}

/**
 * 这个循环引用的处理是错误的
 * @param {*} target 
 * @param {*} map 
 * @returns 
 */
function deepClone1(target, map = new WeakMap()) {
  if (map.get(target)) { // 有问题,target对象是原对象并不是副本,这个是错误的
    return target;
  }
  if (typeof target === 'object' && target !== null) {
    map.set(target, true);  // 为循环引用的对象做标记
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone1(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

const obj = {
  name: 'Jack',
  age: 17,
  school: {
    name: 'Peking University',
    city: 'Beijing',
    department: {
      name: 'Math'
    }
  }
};
// const obj1 = deepClone(obj);
// console.log('false', obj === obj1);
// console.log('false', obj.school === obj1.school);
// console.log('false', obj.school.department === obj1.school.department);

// const obj2 = shallowClone(obj);
// console.log('false', obj === obj2);
// console.log('true', obj.school === obj2.school);
// console.log('true', obj.school.department === obj2.school.department);

const obj3 = {};
const obj4 = { obj3 };
obj3.obj4 = obj4;

const obj5 = deepClone(obj3);
console.log('false', obj3 === obj5);
console.log('false', obj3.obj4 === obj5.obj4);
console.log('false', obj3.obj4.obj3 === obj5.obj4.obj3);
console.log('true', obj5.obj4.obj3 === obj5);
console.log('true', obj5.obj4 === obj5.obj4.obj3.obj4);

const arr = [1, 'str', obj, obj, obj3];

const arr1 = deepClone(arr);
// console.log('false', arr1 === arr);
// console.log('true', arr1[0] === arr[0]);
// console.log('true', arr1[2] === arr1[3]);
// console.log('false', arr1[2] === arr[2]);

const arr2 = [obj, obj];
// const arr3 = _.cloneDeep(arr2);
// const arr3 = deepClone(arr2);
// console.log('true', arr3[0] === arr3[1]);
// console.log('false', arr3[0] === arr2[0]);
// console.log('false', arr3[1] === arr2[0]);