/**
 * 实现一个 setter 方法
 * 
 *   let setter = function (conten, key, value) {
 *     your code
 *   };
 *   let n = {
 *     a: {
 *       b: {
 *         c: { d: 1 },
 *         bx: { y: 1 },
 *       },
 *       ax: { y: 1 },
 *     },
 *   };
 *   修改值
 *   setter(n, "a.b.c.d", 3);
 *   console.log(n.a.b.c.d); //3
 *   setter(n, "a.b.bx", 1);
 *   console.log(n.b.bx); //1
 */

function setter(target, key, value) {
  const keys = key.split('.');
  let ref = target;
  let len = keys.length;
  let lastIndex = len - 1;
  for (let i = 0; i < len; i++) {
    let key = keys[i];
    let old = ref[key];
    if (i !== lastIndex) {
      if (typeof old === 'undefined') {
        old = {};
      }
      ref[key] = old;
    } else {
      ref[key] = value;
    }
    ref = ref[key];
  }
}

const object = {
  a: {
    a1: {
      a11: 1
    }
  }
}

setter(object, 'a.a1.a11', 2);
setter(object, 'b.b1.b11', 2);

console.log('%o', object);