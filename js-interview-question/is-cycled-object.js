
/**
 * JS 如何检测到对象中有循环引用
 * @param {*} value 
 * @returns 
 */

function isCircularReference(value) {
  try {
    JSON.stringify(value);
  } catch {
    return true;
  }
  return false;
}

function isCycledObject(value) {
  const isObject = value => Object.prototype.toString.call(value) === '[object Object]';
  const isPrimitive = value => /Number|Boolean|String|Undefined|Null|Symbol/.test(Object.prototype.toString.call(value));
  const memory = new WeakMap();
  let isCycled = false;
  const traverse = function(value) {
    if (!isPrimitive(value)) {
      if (memory.has(value)) {
        isCycled = true;
        return; 
      }
      memory.set(value, true);
      const keys = Object.keys(value);
      for (const key of keys) {
        traverse(value[key]);
      }
    }
  }
  traverse(value);
  return isCycled;
}

const obj = {
  name: "obj"
};
obj.newKey = obj;

const date = new Date();
date.d = date;

const array = [
  obj
];
obj.array = array;

const obj1 = {};
const obj2 = { obj1 };
obj1.obj2 = obj2;

const a = {
  a: 1,
  c: 3
}
const b = {
  a: a,
  c: 3
}
a.b = b;

console.log(isCycledObject(array));
console.log(isCycledObject(date));
console.log(isCycledObject(obj));
console.log(isCycledObject(obj1));
console.log(isCycledObject(a));

console.log('--------------------------------');

console.log(isCircularReference(array));
console.log(isCircularReference(date));
console.log(isCircularReference(obj));
console.log(isCircularReference(obj1));
console.log(isCircularReference(a));