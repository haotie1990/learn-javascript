
/**
 * 1. 创建一个新的函数
 * 2. 可以传入参数作为原函数的实参
 * 3. 创建函数可以作为构造函数但传入this失效
 * @param {*} ctx 
 * @returns 
 */
Function.prototype.Bind = function bind(ctx) {
  if (typeof this !== "function") {
    throw Error("not a function");
  }
  let fn = this;
  let args = [...arguments].slice(1);

  let fnNop = function() {};

  let resFn = function() {
    // bind创建的函数作为构造函数出现时，bind传入的this对象将失效
    // 硬绑定，当resFn不是作为构造函数的时候，由于函数的闭包特性，self总是指向第一次bind时ctx
    // ! 注意即便再次调用bind方法，当函数执行的时候，层层嵌套，最终执行到第一次bind创建的函数
    let self = this instanceof resFn ? this : ctx;
    return fn.apply(self, args.concat([...arguments]));
  };
  // 保证bind创建的函数可以作为构造函数使用且会继承原函数的原型链
  // 问题：修改绑定函数的prototype会造成原函数的prototype一并被修改
  // resFn.prototype = this.prototype;

  fnNop.prototype = this.prototype;
  resFn.prototype = new fnNop();
  return resFn;
}

Function.prototype.softBind = function(ctx) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function');
  }

  let fn = this;
  let args = [].slice.call(arguments, 1);

  let resFn = function() {
    let self = (!this || (this === (window || global))) ? ctx : this;
    return fn.apply(self, args.concat([...arguments]));
  }
  resFn.prototype = Object.create(fn.prototype);
  return resFn;
}

function print() {
  console.log('name:' + this.name);
}

const obj1 = { name: '1' };
const print1 = print.Bind({ name: '1' });
print1();

const obj2 = { name: '2' };
obj2.print = print.Bind(obj1);
obj2.print();

const obj3 = { name: '3' };
print1.call(obj3);


// function Person(name) {
//   this.name = name;
// }

// Person.prototype.toString = function() {
//   return this.name;
// }

// const PersonNew = Person.Bind({ sex: 'male' });

// const person1 = new Person('Jack');
// const person2 = new PersonNew('John');

// console.log(person1 instanceof Person, person1.toString());
// console.log(person2 instanceof Person, person2.toString());
// console.log(person1 instanceof PersonNew, person1.toString());
// console.log(person1.constructor.prototype === person2.constructor.prototype);
// console.log(PersonNew.prototype);
// console.log(PersonNew.__proto__);
// console.log(Person.prototype === PersonNew.prototype);