
String.prototype.IndexOf = function(searchValue, fromIndex) {
  const string = this;
  const len = string.length;

  // 默认值为 0
  let n = fromIndex | 0;
  // 如果 fromIndex 的值小于 0，或者大于 str.length ，那么查找分别从 0 和str.length 开始
  let k = n <= 0 ? 0 : n >= len ? len : n;
  while (k < len) {
    const subStr = string.substring(k, k + searchValue.length);
    if (subStr === searchValue) {
      return k;
    }
    k++;
  }
  return -1;
}

console.log('hello world'.IndexOf('ll') + '/' + 'hello world'.indexOf('ll'))
console.log('hello world'.IndexOf('ll', -1) + '/' + 'hello world'.indexOf('ll', -1));
console.log('hello world'.IndexOf('or', -6) + '/' + 'hello world'.indexOf('or', -6));
console.log('hello world'.IndexOf('wo', 12) + '/' + 'hello world'.indexOf('wo', 12));

// function move({x = 0, y = 0} = {}) {
//   return [x, y];
// }

// function move({x, y} = { x: 0, y: 0 }) {
//   return [x, y];
// }

// console.log(move({x: 3, y: 8}));
// console.log(move({x: 3}));
// console.log(move({})); 
// console.log(move()); 