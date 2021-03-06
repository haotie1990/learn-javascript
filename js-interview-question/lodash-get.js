'use strict';

/**
 * @param {object} content
 * @param {string/array} path
 * @param {*} defaultValue
 */
function getValue(context, path, defaultValue) {
  if (Object.prototype.toString.call(context) !== '[object Object]'
    && Object.prototype.toString.call(context) !== '[object Array]') {
    return context;
  }
  let paths = [];
  if (Array.isArray(path)) {
    paths = [...path];
  } else if (Object.prototype.toString.call(path) === '[object String]') {
    // paths = path.split('.')
    //   .map(p => {
    //     if (p.includes('[')) {
    //       return p.replace(/\[/g, '.').replace(/\]/g, '').split('.').filter(_ => !!_);
    //     }
    //     return p;
    //   })
    //   .reduce((p, n) => {
    //     return p.concat(n);
    //   }, []);
    paths = path.replace(/\[/g, '.').replace(/\]/g, '').split('.').filter(Boolean);
  } else {
    paths = [String(path)];
  }
  let result = undefined;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];
    result = result ? result[key] : context[key];
    if (result !== null && typeof result !== 'undefined') {
      continue;
    }
    return defaultValue || undefined;
  }
  return result;
}

const object = { 'a': [{ 'b': { 'c': 3 } }] };
const array = [[[{ 'a': [{ 'b': { 'c': 3 } }] }]]];
console.log(getValue(object, 'a[0].b.c'));
console.log(getValue(object, 'a.0.b'));
console.log(getValue(object, ['a', '0', 'b', 'c']));
console.log(getValue(object, 'a.b.c', 'default'));
console.log(getValue(array, '[0][0][0].a[0].b.c'))