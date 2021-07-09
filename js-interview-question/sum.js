/**
 * 按要求实现一个 sum 函数
 * const a = sum(0); // => a === 0
 * const b = sum(1)(2); // => b === 3
 * const c = sum(4)(5); // c === 9
 * const k = sum(n1)...(nk) // k === n1 + n2 + ... + nk
 */

function sum(...args) {
  const fn = function(..._args) {
    return sum.apply(this, [...args, ..._args]);
  }
  /**
   * 对象到原始值的转换，有三种类型（hint）
   *   "string"：对于console.log等其他需要字符串的操作
   *   "number"：对于数学运算
   *   "default"： 少数运算
   * 
   * 转换算法：
   *    1. 调用obj[Symbol.toPrimitive](hint)如果这个方法存在
   *    2. 否则，如果hint是"string"，尝试 toString > valueOf
   *    2. 否则，如果hint是"number"或"default"，尝试 valueOf > toString
   */
  fn[Symbol.toPrimitive] = () => {
    return args.reduce((s, c) => s += c, 0);
  }
  fn.toString = () => {
    return args.reduce((s, c) => s += c, 0);
  }
  fn.valueOf = () => {
    return args.reduce((s, c) => s += c, 0);
  }
  return fn;
}

const a = sum(0);
const b = sum(1)(2);
const c = sum(4)(5);

console.log('a:%d, b:%d, c:%d', a, b, c);
