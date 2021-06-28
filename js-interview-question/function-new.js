
/**
 * 1. 创建一个空对象
 * 2. 将空对象作为构造函数的this,执行构造函数
 * 3. 判断构造函数返回值是否为对象
 * @param {*} func 
 */
function New(func) {
  let context = Object.create(func.prototype);
  let args = [].slice.call(arguments, 1);
  let result = func.apply(context, args);
  if (result && typeof result === 'object') {
    return result;
  }
  return context;
}