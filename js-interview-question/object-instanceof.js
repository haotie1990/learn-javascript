
function InstanceOf(target, constructor) {
  if (typeof constructor !== 'function') {
    return false;
  }
  const hasInstance = constructor[Symbol.hasInstance];
  if (hasInstance && typeof hasInstance === 'function') {
    return !!hasInstance.call(constructor, target);
  }
  let proto = Object.getPrototypeOf(target);
  while(proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

class Array1 {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof Array1);
console.log(InstanceOf([], Array1));

console.log([] instanceof Array);
console.log(InstanceOf([], Array));

console.log('' instanceof Array);
console.log(InstanceOf('', Array));

console.log('' instanceof String);
console.log(InstanceOf('', String));

console.log(new String('') instanceof String);
console.log(InstanceOf(new String(''), String));