
/**
 * countOfLetters('A2B3') // { A: 2, B: 3 }
 * countOfLetters('A(A3B)2') // { A: 7, B: 2}
 * countOfLetters('C4(A(A3B)2)2') // { A: 14, B: 4, C: 4 }
 * @param {*} str 
 */
function countOfLetters(str) {
  let stack = [];
  const len = str.length;
  const pick = () => stack[stack.length - 1];
  const isNumber = v => !Number.isNaN(parseInt(v))
  for (let i = 0; i < len; i++) {
    const s = str[i];
    if (pick() === ')' && isNumber(s)) {
      let subStr = '';
      while(pick() !== '(') {
        let letter = stack.pop();
        if (letter !== ')') {
          if (isNumber(letter)) {
            subStr = ((+letter) * parseInt(s)) + subStr;
          } else if (isNumber(subStr.charAt(0))) {
            subStr = letter + subStr;
          } else {
            subStr = letter + s + subStr;
          }
        }
      }
      // 弹出'('
      stack.pop();
      // 重新入栈
      stack = stack.concat(subStr.split(''));
      continue;
    }
    stack.push(s);
  }
  console.log(stack);

  let result = {};
  let count = '';
  while(stack.length) {
    const s = stack.pop();
    if (isNumber(s)) {
      count = s + count;
    } else {
      result[s] = (result[s] || 0) + (parseInt(count || '1'));
      count = '';
    }
  }
  console.log(result);
}

countOfLetters('A2B3')
countOfLetters('A(A3B)2')
countOfLetters('C4(A(A3B)2)2')