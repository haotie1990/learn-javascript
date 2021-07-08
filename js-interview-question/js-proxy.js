
function proxy(target, handler) {
  return new Proxy(target || {}, {
    /**
     * 拦截对象属性的读取
     *  ! 如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同
     *  ! 如果要访问的目标属性没有配置访问方法，即get方法是undefined的，则返回值必须为undefined
     * @param {*} target 目标对象
     * @param {*} property 访问属性
     * @param {*} receiver Proxy或者继承Proxy的对象，当proxy作为原型链对象存在时，receiver是最初被调用的对象
     *    let obj = Object.create(proxy);
     *    obj.name; 此时receiver指向obj
     * @returns {*} 可以返回任何值
     */
    get: function(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      console.log('self', this); // this指向handler
      if (typeof value === 'function') {
        return function() {
          console.log('_self', this); // this指向proxy
          return value.apply(target, arguments);
        }
      }
      return value;
    },
    /**
     * 设置属性值操作的捕获器
     *  ! 若目标属性是一个不可写及不可配置的数据属性，则不能改变它的值
     *  ! 如果目标属性没有配置存储方法，即 [[Set]] 属性的是 undefined，则不能设置它的值
     *  ! 在严格模式下，如果 set() 方法返回 false，那么也会抛出一个 TypeError 异常
     * @param {*} target 
     * @param {*} property 
     * @param {*} value 
     * @param {*} receiver 
     * @returns {boolean} 返回true代表设置成功，严格模式下如果返回false，将会抛出TypeError异常
     */
    set: function(target, property, value, receiver) {
      return Reflect.set(target, property, value, receiver);
    },
    /**
     * 当目标对象作为函数的时候，或其调用call、apply方法的时候，apply会被触发
     * @param {*} target 
     * @param {*} context 
     * @param {*} args 
     * @returns 
     */
    apply: function(target, context, args) {
      console.log('apply', target, context, args);
      return Reflect.apply(target, context, args);
    },
    ...(handler || {}),
  });
}

const target = new Date();
console.log(proxy(target).getDate());