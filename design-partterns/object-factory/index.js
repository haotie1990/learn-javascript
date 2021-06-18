'use strict';

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function() {
  console.log('name:' + this.name);
}

Person.prototype.getAge = function() {
  console.log('age:' + this.age);
}

function objectFactory() {
  const Constructor = [].shift.call(arguments);
  
  // const obj = Object.create(Object.prototype);
  // obj.__proto__ = Constructor.prototype;

  // const obj = {};
  // Object.setPrototypeOf(obj, Constructor.prototype);

  const obj = Object.create(Constructor.prototype)
  const ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}

const person = objectFactory(Person, 'jack', 18);

console.log(person instanceof Person);
console.log(Object.getPrototypeOf(person) === Person.prototype);

person.getName();
person.getAge();