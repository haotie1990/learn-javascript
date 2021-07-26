'use strict';

/**
 * 自动执行队列中的方法,每一个方法都有一个next回调函数
 * next函数不执行不调用队列中的下一个方法
 * @param {array} queue 
 */
function runQueue(queue, callback) {
  if (!queue || !queue.length) {
    throw new Error('queue empty');
  }
  const step = (index) => {
    if (index >= queue.length) {
      return callback();
    }
    const fn = queue[index];
    fn(() => {
      step(index + 1);
    });
  }
  step(0);
}