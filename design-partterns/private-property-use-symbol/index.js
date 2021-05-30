'use strict';

let Person = (function(){
  let _name = Symbol('name');
  let _age = Symbol('age');

  function Person(name, age) {
      this[_name] = name;
      this[_age] = age;
  }

  Person.prototype.getName = function() {
      return this[_name];
  };

  Person.prototype.getAge = function() {
      return this[_age];
  }

  return Person;
})();

const Jack = new Person('Jack', 18);
console.log('name:' + Jack.getName());
console.log('age:' + Jack.getAge());

console.log('_name:' + Jack._name);
console.log('_age:' + Jack._age);

const symbolProperties = Object.getOwnPropertySymbols(Jack);
console.log('name:' + Jack[symbolProperties[0]]);
console.log('age:' + Jack[symbolProperties[1]]);
