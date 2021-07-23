
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

console.log('--------------------------------');

/**
 * 1[-/+] 11[位指数]        52[数值]                 64位长
 * +  -  + -------- + ----------------------- +
*/

/**
 * 十进制小数转二进制小数，乘2取整，顺序排列
 * @param {number} number 
 */
function float2binary(number) {
  let result = '';
  let count = 0;
  // 最大精度是53位，此处需要判断count小于等于53
  while (number !== 0 && count < 54) {
    // number范围：(0, 1]，乘2后，(0, 2]，向下取值，0/1，顺序排列
    let n = number * 2;
    result = result + Math.floor(n);
    // 除1，取余，得小数部分，此时会失真
    number = (n) % 1;
    count++;
    // console.log('number:%d, count:%d, result:%d', number, count, result);
  }
  return '0.' + result;
}

console.log(float2binary(0.1) + '/' + (0.1).toString(2));
console.log(float2binary(0.25) + '/' + (0.25).toString(2));
console.log(float2binary(0.125) + '/' + (0.125).toString(2));
console.log(float2binary(0.333) + '/' + (0.333).toString(2));
console.log(float2binary(0.8125) + '/' + (0.8125).toString(2));