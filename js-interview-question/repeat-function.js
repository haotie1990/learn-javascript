/**
 * 动手实现一个 repeat 方法
 * function repeat(func, times, wait) {}
 * const repeatFunc = repeat(alert, 4, 3000);
 * 调用这个 repeatFunc ("hellworld")，会alert4次 helloworld, 每次间隔3秒
 */

function repeat(func, times, wait) {
  let args = null;
  let start = function(args) {
    func.apply(this, args);
    times--;
    if (times > 0) {
      setTimeout(() => {
        start(args);
      }, wait);
    }
  }
  return function () {
    args = [].slice.call(arguments, 0);
    if (times > 0) {
      start(args);
    }
  }
}

const repeatFunc = repeat(console.log, 4, 1000);

repeatFunc('hello world');