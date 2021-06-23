'use strict';

function Life(isLive) {
  this.isLive = isLive;
}

Life.prototype.living = function() {
  return 'I‘m is living.';
}

function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

Person.prototype.setSex = function(sex) {
  this.sex = sex;
}

Person.prototype.toString = function() {
  return `${this.name}-${this.age}-${this.sex}`;
}

function Animal(type) {
  this.type = type;
}

Animal.prototype.run = function() {
  return 'I’m is running.';
}

Animal.prototype.info = function() {
  return `I'm is ${this.type}`;
}

function Man(name, age, sex) {
  Person.call(this, name, age, sex);
  Animal.call(this, 'Human');
}

function objectCreate(prototype) {
  const F = function() {};
  F.prototype = prototype || Object.prototype;
  return new F();
}
function inheritPrototype(child, parent) {
  child.prototype = objectCreate(parent.prototype);
  child.prototype.constructor = child;
}

// inheritPrototype(Man, Person);

Man.prototype = Object.create(Person.prototype);
Object.assign(Man.prototype, Animal.prototype); // 使用混合方式实现多继承
Man.prototype.constructor = Man;

const man = new Man('Jack', 18);
console.log(man.toString());
man.setSex('male');
console.log(man.toString());
console.log(man.run());
console.log(man.info());