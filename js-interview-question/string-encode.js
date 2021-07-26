/**
 * Input: 'aaaabbbccd'
 * Output: 'a4b3c2d1'，代表 a 连续出现四次，b连续出现三次，c连续出现两次，d连续出现一次
 * 
 * aaaabbbcc => a4b3c2
 * aaaabbbaaaa => a4b3a4
 * aabbcc => a2b2c2
 */

function encodeString(string) {
  let result = '';
  let stack = [];
  if (!string || !string.length) {
    return result;
  }
  const strArray = string.split('');
  const pick = () => stack[stack.length - 1];
  const concat = () => result = result + pick() + (stack.length > 1 ? stack.length : '');
  
  stack.push(strArray.shift());
  
  while(strArray.length) {
    const letter = strArray.shift();
    if (pick() !== letter) {
      concat();
      stack.length = 0;
    }
    stack.push(letter);
  }
  if (stack.length) {
    concat();
  }
  return result;
}

console.log(encodeString('aaaabbbccd'));
console.log(encodeString('aaaabbbcc'));
console.log(encodeString('aaaabbbaaaa'));
console.log(encodeString('aabbcc'));