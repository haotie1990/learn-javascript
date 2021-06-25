
Function.prototype.Bind = function bind(ctx) {
  if (typeof this !== "function") {
    throw Error("not a function");
  }
  let fn = this;
  let args = [...arguments].slice(1);

  let resFn = function() {
    // bind创建的函数作为构造函数出现时，bind传入的this对象将失效
    let self = this instanceof resFn ? this : ctx; // ???
    return fn.apply(self, args.concat([...arguments]));
  };
  // 保证bind创建的函数可以作为构造函数使用且会继承原函数的原型链
  resFn.prototype = this.prototype;
  return resFn;
}

function Person(name) {
  this.name = name;
}

Person.prototype.toString = function() {
  return this.name;
}

const PersonNew = Person.Bind({ sex: 'male' });

const person1 = new Person('Jack');
const person2 = new PersonNew('John');

console.log(person1 instanceof Person, person1.toString());
console.log(person2 instanceof Person, person2.toString());
console.log(person1 instanceof PersonNew, person1.toString());
console.log(person1.constructor.prototype === person2.constructor.prototype);
console.log(PersonNew.prototype);
console.log(PersonNew.__proto__);
console.log(Person.prototype === PersonNew.prototype);