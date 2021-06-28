
function InstanceOf(source, target) {
  if (source == null) {
    return false;
  }
  if (typeof source !== 'object' && typeof source !== 'function') {
    return false;
  }
  if (typeof target.constructor !== 'function') {
    return false;
  }
  let proto = Object.getPrototypeOf(source);
  while (true) {
    if (proto == null) {
      return false;
    }
    if (proto === target.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}

// 定义构造函数
function C(){}
function D(){}

var o = new C();


console.log(o instanceof C); // true，因为 Object.getPrototypeOf(o) === C.prototype
console.log(InstanceOf(o, C));

console.log(o instanceof D); // false，因为 D.prototype 不在 o 的原型链上
console.log(InstanceOf(o, D));

console.log(o instanceof Object); // true，因为 Object.prototype.isPrototypeOf(o) 返回 true
console.log(InstanceOf(o, Object));

console.log(C.prototype instanceof Object); // true，同上
console.log(InstanceOf(C.prototype, Object));

C.prototype = {};
var o2 = new C();

console.log(o2 instanceof C); // true
console.log(InstanceOf(o2, C));

console.log(o instanceof C); // false，C.prototype 指向了一个空对象,这个空对象不在 o 的原型链上.
console.log(InstanceOf(o, C));

D.prototype = new C(); // 继承
var o3 = new D();

console.log(o3 instanceof D); // true
console.log(InstanceOf(o3, D));

console.log(o3 instanceof C); // true 因为 C.prototype 现在在 o3 的原型链上
console.log(InstanceOf(o3, C));

console.log('--------------------------------');
var simpleStr = "This is a simple string";
var myString  = new String();
var newStr    = new String("String created with constructor");
var myDate    = new Date();
var myObj     = {};
var myNonObj  = Object.create(null);

console.log(simpleStr instanceof String); // 返回 false, 非对象实例，因此返回 false
console.log(InstanceOf(simpleStr, String));

console.log(myString  instanceof String); // 返回 true
console.log(InstanceOf(myString, String));

console.log(newStr    instanceof String); // 返回 true
console.log(InstanceOf(newStr, String));

console.log(myString  instanceof Object); // 返回 true
console.log(InstanceOf(myString, Object));

console.log(myObj instanceof Object);    // 返回 true, 尽管原型没有定义
console.log(InstanceOf(myObj, Object));

console.log(({})  instanceof Object);    // 返回 true, 同上
console.log(InstanceOf(({}), Object));

console.log(myNonObj instanceof Object); // 返回 false, 一种创建非 Object 实例的对象的方法
console.log(InstanceOf(myNonObj, Object));

console.log(myString instanceof Date); //返回 false
console.log(InstanceOf(myString, Date));

console.log(myDate instanceof Date);     // 返回 true
console.log(myDate instanceof Object);   // 返回 true
console.log(myDate instanceof String);   // 返回 false