'use strict';

Array.prototype.Map = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback not a function');
  }
  if (this == null) {
    throw new TypeError('this is null');
  }
  // 在MDN的Polyfill中,会有如下的操作,如果对比ecma262的说明就大概理解了
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  const arr = Object(this);
  const len = arr.length >>> 0;
  const result = new Array(len);
  
  // 使用for...in只能保证数组没有其他额外属性的正确复制,比如Regex.prototype.exec方法返回的也是一个数组但却额外增加了index和input属性
  // for (const index in arr) {
  //   if (Object.hasOwnProperty.call(arr, index)) {
  //     const i = +index;
  //     const value = arr[i];
  //     const item = callback.call(thisArg, value, i, arr);
  //     result[i] = item;
  //   }
  // }

  let i = 0;
  while (i < len) {
    if (i in arr) {
      const value = callback.call(thisArg, arr[i], i, arr);
      result[i] = value;
    }
    i++;
  }
  return result;
}

const text = '我是{{name}},年龄{{age}},性别{{sex}}';
const regex = /\{\{(\w+)\}\}/;
// console.log([1,2,,4].map(i => i*i));
// console.log([1,2,,4].Map(i => i*i));
console.log(regex.exec(text).map(i => i));
console.log(regex.exec(text).Map(i => i));