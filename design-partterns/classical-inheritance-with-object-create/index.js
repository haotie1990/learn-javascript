'use strict';

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.info = function() {
  console.log('Person information name: ' + this.name + ' age: ' + this.age);
}

function Man(...args) {
  Person.call(this, ...args);
}

Man.prototype = Object.create(Person.prototype);
Man.prototype.constructor = Man;
Man.prototype.run = function() {
  console.log('man ' + this.name + ' is running');
}

const man = new Man('Jack', 18);
man.info();
man.run();