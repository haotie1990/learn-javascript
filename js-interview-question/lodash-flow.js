
/**
 * 创建一个函数。 返回的结果是调用提供函数的结果，
 * this 会绑定到创建函数。 每一个连续调用，
 * 传入的参数都是前一个函数返回的结果
 * @param {Function|Function[]} funcs 要调用的函数
 */
function flow(funcs) {
  if (!Array.isArray(funcs)) {
    funcs = [funcs];
  }
  const context = this;
  return function() {
    let args = [].slice.call(arguments, 0);
    return funcs.reduce((acc, func) => {
      acc = Array.isArray(acc) ? acc : [acc];
      return func.apply(context, acc);
    }, args);
  }
}

const add10 = x => x + 10
const mul10 = x => x * 10
const add100 = x => x + 100

console.log(flow([add10, mul10, add100])(10));