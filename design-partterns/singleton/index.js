'use strict';

/**
 * 将创建实例/变量的方法和管理单例的方法拆开
 * @param {function} fn fn不是构造函数,且必须有返回值 
 * @returns 单例的构造函数
 */
function getSingleTon(fn) {
  if (Object.prototype.toString.call(fn) !== '[object Function]') {
    throw new Error('fn not a function');
  }
  let instance = null;
  return function() {
    return instance || (instance = fn.apply(this, arguments));
  }
}

/**
 * 传入构造函数创建某个对象的单例实例
 * 使用闭包达到保存单例实例
 * @param {function} fn fn必须是构造函数
 * @returns 单例的构造函数
 */
function getSingleInstance(fn) {
  if (Object.prototype.toString.call(fn) !== '[object Function]') {
    throw new Error('fn not a function');
  }
  let instance = null;
  return function() {
    if (instance) {
      return instance;
    }
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arguments);
    instance = Object.prototype.toString.call(ret) !== '[object Object]' ? obj : ret;
    return instance;
  }
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Man() {
  Person.apply(this, arguments);
}
Man.prototype = Object.create(Person.prototype);
Man.prototype.constructor = Man;

const createSinglePerson = getSingleInstance(Person);

const person1 = createSinglePerson('jack', 18);
const person2 = createSinglePerson('john', 18);

console.log(person1 === person2);

const createSingleMan = getSingleInstance(Man);

const man1 = createSingleMan('jack', 18);
const man2 = createSingleMan('john', 18);

console.log(man1 === man2);
console.log(man1.name, man1.age);
console.log(man2.name, man2.age);