/**
 * 实现一个打点计时器
 */
/* 
  1.从start至end,每隔100毫秒console.log一个数字，每次数字增幅为1
  2.返回的对象中需要包含一个cancel方法，用于停止定时操作
  3.第一个数字需要立即输出
*/

function printCounter(start, end) {
  if (start > end) {
    throw new Error('start > end');
  }
  let counter = start;
  let timer = null;
  const print = () => {
    console.log(counter);
  }
  const increase = () => counter++;
  const startTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    if (counter >= end) {
      return;
    }
    timer = setTimeout(function() {
      increase();
      print();
      startTimer();
    }, 100);
  }
  print();
  startTimer();
  return {
    cancel: function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
  }
}

const result = printCounter(1, 10);

setTimeout(() => result.cancel(), 500);

