'use strict';

function isType(type) {
  return function(value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  }
}

const types = ['Number', 'Boolean', 'String', 'Function', 'Symbol', 'Null', 'Undefined', 'RegExp', 'Array', 'Date', 'Set', 'Map'];

const [
  isNumber,
  isBoolean,
  isString,
  isFunction,
  isSymbol,
  isNull,
  isUndefined,
  isRegExp,
  isArray,
  isDate,
  isSet,
  isMap,
] = types.map(type => isType(type));

console.log('true:', isNumber(1));
console.log('true:', isBoolean(true));
console.log('true:', isString('string'));
console.log('true:', isFunction(Array.isArray));
console.log('true:', isSymbol(Symbol('string')));
console.log('true:', isNull(null));
console.log('true:', isUndefined(undefined));
console.log('true:', isRegExp(/\w/g));
console.log('true:', isArray([]));
console.log('true:', isDate(new Date()));
console.log('true:', isSet(new Set([])));
console.log('true:', isMap(new Map()));
