/**
 * 数字千分位处理
 * 将 153812.7 转化为 153,812.7
 */

function numberThousands(number) {
  const numberStr = String(number);
  let result = '';
  let [interger, decimal] = numberStr.split('.');
  while (interger.length > 3) {
    // 倒数三位数字
    let subStr = interger.substring(interger.length - 3);
    interger = interger.replace(subStr, '');
    result = `,${subStr}${result}`;
  }
  if (interger.length) {
    result = `${interger}${result}`;
  }
  return result + (decimal ? `.${decimal}` : '');
}

function toString (number, thousandsSeperator = ',') {
  const s = String(number)
  let r = ''
  for (let i = s.length - 1; i >= 0; i--) {
    const seperator = (s.length - i - 1) % 3 ? '' : thousandsSeperator
    r = `${s[i]}${seperator}${r}`
  }
  return r.slice(0, -1)
}

console.log(numberThousands(812.7));
console.log(numberThousands(1812.7));
console.log(numberThousands(2321153812.7));
console.log(numberThousands(343153812.7));
console.log(numberThousands(342153812));

console.log(toString(812.7));
console.log(toString(1812.7));
console.log(toString(2321153812.7));
console.log(toString(343153812.7));
console.log(toString(342153812));