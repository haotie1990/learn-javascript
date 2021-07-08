/**
 * 题目：手写用 ES6 Proxy 如何实现 arr[-1] 的访问
 */

/**
 * 处理一个数组，使其支持性array[-1]的访问
 * @param {Array} array
 * @return {Array} new array
 */
function proxy(array) {
  /**
   * @param {*} target 目标对象
   * @param {object} handler 处理器对象
   */
  return new Proxy(array, {
    /**
     * 拦截对目标对象属性的读取操作
     * @param {*} target 目标对象
     * @param {string} property 属性名
     * @param {*} reveiver proxy实例
     */
    get: function (target, property, receiver) {
      if (Number.isInteger(+property) && +property < 0) {
        property = String(target.length + (+property));
      }
      return Reflect.get(target, property, receiver);
    }
  });
}

const array = proxy([1, 2, 3]);
console.log(array[-1]);
console.log(array[-2]);
console.log(array[-3]);
console.log(array[-4]);