'use strict';

/**
 * 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal
 */

function mySetInterVal(fn, a, b) {
  let counter = 0;
  let timer = null;
  const startTimer = function(ms) {
    timer = setTimeout(function() {
      fn(ms);
      counter++;
      startTimer(a + b * counter);
    }, ms);
  }
  startTimer(a + b * counter);
  return {
    getTimer: function() {
      console.log('timer: ' + timer);
      return timer;
    },
    clearTimer: function() {
      timer = null;
    }
  }
}

function myClear(timer) {
  clearTimeout(timer.getTimer());
  timer.clearTimer();
}

const timer = mySetInterVal(function(ms) {
  console.log(ms + '-' + Date.now());
}, 100, 100);

setTimeout(function() {
  myClear(timer);
}, 2000);