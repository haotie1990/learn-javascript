/**
 * 数字千分位处理
 * 将 153812.7 转化为 153,812.7
 */

function numberThousands(number) {
  const numberStr = String(number);
  let result = '';
  let [interger, decimal] = numberStr.split('.');
  while (interger.length > 3) {
    let subStr = interger.substring(interger.length - 3);
    interger = interger.replace(subStr, '');
    result = `,${subStr}${result}`;
  }
  if (interger.length) {
    result = `${interger}${result}`;
  }
  // if (result[0] === ',') {
  //   result = result.slice(1);
  // }
  return result + (decimal ? `.${decimal}` : '');
}

console.log(numberThousands(812.7));
console.log(numberThousands(1812.7));
console.log(numberThousands(2321153812.7));
console.log(numberThousands(343153812.7));
console.log(numberThousands(342153812));