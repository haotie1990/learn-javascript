'use strict';

/**
 * 防抖
 * limit时间内如果多次触发事件则重新计时,并在计时结束后执行指定方法
 */

function debounce1(func, limit = 400) {
  let timer = null;
  return function() {
    let self = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      func.apply(self, args);
    }, limit);
  }
}

const log = debounce1(function(random) {
  console.log('Now:', new Date().toString(), 'print log...', random);
}, 500);

log(Math.random());
log(Math.random());
log(Math.random());

/**
 * 防抖
 * 1. 立即执行一次
 * 2. 返回函数的返回值
 * 3. 允许取消
 */

function debounce(func, options = {}) {
  const {
    limit = 400,
    immediate = false, // immediate为true,则在limit时间内的开始执行函数,false则在结束执行函数
  } = options;
  let timer = null;
  const debounced = function() {
    let self = this;
    let args = arguments;
    let result = null;
    let cancel = false;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      if (!timer) {
        result = func.apply(self, args);
      }
      // 对比了underscore的实现，有一点不同，立即触发执行一次后，后续事件连续触发停止limit事件后才会再次处理
      // https://github.com/lessfish/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js
      timer = setTimeout(function() {
        timer = null;
      }, limit);
    } else {
      timer = setTimeout(function() {
        result = func.apply(self, args);
      }, limit);
    }
    return result; // 只有当immediate为true的时候才可以立即拿到记过
  }

  /**
   * 如果immediate是true,cancel后,下次事件触发则会立即执行函数
   * 如果immediate是false,则下次事件触发重新开始计时,直到limit时间内未再次触发事件,再执行函数
   */
  debounced.cancel = function() {
    clearTimeout(timer);
    timer = null;
  }

  return debounced;
}