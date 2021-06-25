'use strict';

/**
 * 节流,在指定时间范围里,只执行一次事件,后续有事件发生立即执行,保证每次事件执行的时间间隔一致
 * 节流即降低事件被执行的频率
 * 防抖是虽然事件持续触发，但只有等事件停止触发后 n 秒才执行函数，节流是持续触发的时候，每 n 秒执行一次函数
 * @param {function} func 
 * @param {number} wait 
 * @returns 
 */
function throttle(func, wait) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    if (!timer) {
      func.apply(context, args);
      timer = setTimeout(function() {
        timer = null;
      }, wait);
    }
  }
}

function throttle1(func, wait) {
  let previous = 0;
  return function() {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

// function throttle2(func, wait, leading, trailing) {
//   let timer = null;
//   return function() {
//     let context = this;
//     let args = arguments;
//     if (!timer) {
//       if (leading) {
//         func.apply(context, args);
//       }
//       timer = setTimeout(function() {
//         timer = null;
//       }, wait);
//     }
//   }
// }

// 第三版
function throttle3(func, wait) {
  var timeout, context, args, result;
  var previous = 0;

  var later = function() {
      console.log('later');
      previous = +new Date();
      timeout = null;
      func.apply(context, args)
  };

  var throttled = function() {
      var now = +new Date();
      //下次触发 func 剩余的时间
      var remaining = wait - (now - previous);
      console.log('remaining', remaining);
      context = this;
      args = arguments;
       // 如果没有剩余的时间了或者你改了系统时间
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          func.apply(context, args);
      } else if (!timeout) {
          timeout = setTimeout(later, remaining);
      }
  };
  return throttled;
}

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle4(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0; // 上一次函数执行时间
  if (!options) options = {};

  var later = function() {
    console.log('later call func');
    // 此处将previous设置为0,保证再有事件触发且leading === false,情况下设置previous = _now，remaining === wait;
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args); // 时间间隔结束处执行
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var _now = Date.now();
    if (!previous && options.leading === false) previous = _now;
    var remaining = wait - (_now - previous);
    console.log('remaining:%s, wait: %s, _now: %s, previous: %s', remaining, wait, _now, previous);
    context = this;
    args = arguments;
    // 什么情况下会触发remaining > wait:认为修改了系统时间导致now < previous,会立即触发一次函数执行
    // remaining <= 当leading === true时会触发 
    if (remaining <= 0 || remaining > wait) {
      if (timeout) { // 清空定时间保证remaining === 0时触发和定时器执行只执行一个
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      console.log('time start call func');
      result = func.apply(context, args); // 时间间隔开始处执行
      if (!timeout) context = args = null; // 利于GC
    } else if (!timeout && options.trailing !== false) {
      // 如果trailing == true,则首次执行后再由事件触发会设置定时器,由于
      timeout = setTimeout(later, remaining);
      console.log('setTimeout, %s', remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}

function throttle5(func, wait, options = {}) {
  let timer = null;
  let previous = 0;
  let result = null;
  let throttled = function() {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (!previous && options.leading === false) {
      previous = now;
    }
    let remaining = wait - (now - previous);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timer) {
        context = args = null;
      }
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(function() {
        previous = options.leading === false ? 0 : Date.now();
        result = func.apply(context, args);
        timer = null;
        if (!timer) {
          context = args = null;
        }
      }, remaining);    
    }
  }
  return throttled;
}

const sleep = function(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

async function main() {
  const log = throttle5(function() {
    console.count('now: ' + new Date().toString());
  }, 300, { leading: true, trailing: false });
  for(let i = 0; i < 6; i++) {
    log();
    await sleep(100);
  }
}
main();

