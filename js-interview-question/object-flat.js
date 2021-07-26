
/**
 * {
 *   a: {
 *     b: {
 *       c: {
 *         d: 1
 *       }
 *     }
 *   },
 *   a1: [
 *    { a: 2 }
 *   ]
 * }
 */

function flat(value) {
  const isArray = value => Array.isArray(value);
  const isObject = value => typeof value === 'object' && value !== null;
  const result = {};
  const traverse = function(value, path) {
    if (!isObject(value) && !isArray(value)) {
      result[path] = value;
      return;
    }
    for (const key of Object.keys(value)) {
      let _path = path;
      if (isArray(value)) {
        _path = _path + '[' + key + ']';
      } else if (isObject(value)) {
        _path = _path + (_path ? '.' : '') + key;
      }
      traverse(value[key], _path);
    }
  }
  traverse(value, '');
  return result;
}

const obj1 = {
  a: {
    b: {
      c: {
        d: 1
      },
      c1: [
        2,
        {
          d1: 3
        }
      ]
    }
  },
  a1: [
    4,
    {
      b1: {
        c2: [
          5,
          [
            [
              6
            ]
          ]
        ]
      }
    }
  ]
};
console.log('%o', flat(obj1));