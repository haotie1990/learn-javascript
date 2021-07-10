/**
 * 要求⽤不同⽅式对 A 进⾏改造实现 A.name 发⽣变化时⽴即执⾏ A.getName
 * 已知对象
 *  A = {
 *    name: 'sfd',
 *    getName: function(){
 *      console.log(this.name)
 *    }
 *  }
 */

let A = {
  name: 'sfd',
  getName: function() {
    console.log(this.name);
  }
};

function defineProperty(target, property, value) {
  return Object.defineProperty(target, property, {
    get: function() {
      return value;
    },
    set: function(_value) {
      value = _value;
      if (property === 'name') {
        target.getName();
      }
    }
  });
}

A = defineProperty(A, 'name', A.name);

// A = new Proxy(A, {
//   set: function(target, property, value) {
//     if (property === 'name') {
//       target.getName();
//     }
//     return Reflect.set(target, property, value);
//   }
// });

A.name = 'a';
// console.log(A.name);