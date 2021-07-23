
/**
 * 十进制转二进制，除2取余，逆序排列
 * @param {number} number 十进制整数 
 */
function number2binary(number) {
  let result = '';
  while(number > 1) {
    // 逆序处理
    result = (number % 2) + result;
    // 取整，得到商数
    number = Math.floor(number / 2);
  }
  return number + result;
}

console.log(number2binary(32));
console.log(number2binary(10));
console.log(number2binary(0));
console.log(number2binary(1));
console.log(number2binary(2));
console.log(number2binary(3));


console.log('--------------------------------');

/**
 * 二进制转十进制
 * @param {number} number 二进制整数 
 */
function binary2number(number) {
  const numbers = String(number).split('');
  let result = 0;
  let len = numbers.length - 1;
  for (let i = len; i >= 0; i--) {
    result = Math.pow(2, len - i) * (+numbers[i]) + result;
  }
  return result;
}

console.log(binary2number(1111));
console.log(binary2number(1101));
console.log(binary2number(1001));
console.log(binary2number(1010));
console.log(binary2number(11));
console.log(binary2number(10));