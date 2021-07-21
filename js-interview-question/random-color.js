/**
 * 实现输出一个十六进制的随机颜色(#af0128a)
 * rgb颜色，分别代表红色（0~255）、绿色（0~255）、蓝色（0~255）
 * 实现函数输出0~255的随机整数，转成16进制
 */

function randomColor() {
  const randomNum = function(min, max) {
    // return Math.round(Math.random() * (max - min + 1) + min - 0.5); // min-0.5 ~ max+0.5
    return Math.floor(Math.random() * (max - min + 1) + min); // min ~ max+1
  }
  // Number.toString(base), base范围2~36，默认是10
  // Math.floor(Math.random() * 256) -> 0 ~ 255
  const red = `0${randomNum(0, 255).toString(16)}`.slice(-2);
  const green = `0${randomNum(0, 255).toString(16)}`.slice(-2);
  const blue = `0${randomNum(0, 255).toString(16)}`.slice(-2);
  return `#${red}${green}${blue}`;
}

console.log(randomColor());
console.log(randomColor());
console.log(randomColor());