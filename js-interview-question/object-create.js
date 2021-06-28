
const _ = require('lodash');

Object.prototype.Create = function(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('proto is not object or function');
  }
  let object = {};
  Object.setPrototypeOf(object, proto);
  if (propertiesObject) {
    // for (const key in propertiesObject) {
    //   if (Object.hasOwnProperty.call(propertiesObject, key)) {
    //     Object.defineProperty(object, key, propertiesObject[key]);
    //   }
    // }
    Object.defineProperties(object, propertiesObject);
  }
  return object;
}

const obj = Object.Create(null);
console.log(Object.getPrototypeOf(obj));

const obj1 = Object.Create(Object.prototype);
const obj2 = {};
console.log(Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2));