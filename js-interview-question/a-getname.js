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
  /**
   * target：需要定义属性的对象
   * property：要定义修改的属性名称（string）或Symbol
   * descriptor：属性描述符
   *    configurable：当且仅当configuration为true，该属性的描述符才能改变，同时该属性也能对应的对象上删除，默认false
   *    enumerable：当且仅当enumerable为true，该属性才会出现在对象的枚举属性中，默认false
   *    value：该属性对应的值，可以是任何有效的JavaScript值（数值、对象、函数等），默认undefined
   *    writable：当且仅当writable为true，属性的值，即上面的value，才能被赋值运算符改变，默认false
   *    get：属性的getter函数，默认undefined，当访问该属性时，会调用此函数，注意函数内this的指向
   *    set：属性的setter函数，默认undefined，当属性值被修改时，会调用此函数
   * 
   * ! getter和setter方法中的this指向target，但是由于继承关系，this可能指向target的子对象
   */
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