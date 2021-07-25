
const aCode = 'a'.charCodeAt();
const zCode = 'z'.charCodeAt();
const ACode = 'A'.charCodeAt();
const ZCode = 'Z'.charCodeAt();

function lowerCase(str) {
  let result = '';
  for(let s of str) {
    const code = s.charCodeAt();
    if (code >= ACode && code <= ZCode) {
      result += String.fromCharCode(code + 32);
    } else {
      result += s;
    }
  }
  return result;
}

function upperCase(str) {
  let result = '';
  for(let s of str) {
    const code = s.charCodeAt();
    if (code >= aCode && code <= zCode) {
      result += String.fromCharCode(code - 32);
    } else {
      result += s;
    }
  }
  return result;
}

console.log(lowerCase('HEELO WORLD'));
console.log(upperCase('hello world'));