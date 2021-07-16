

function startInterval(func, interval, ...args) {
  let timer = null;
  let count = 0;
  let startTime = Date.now();
  const callback = function() {
    func.apply(this, args);
    count++;
    // 由于异步任务队列执行其他函数的时间，offset会大于零，即期待的interval实际会延长
    let now = Date.now();
    let offset = now - (startTime + count * interval);
    let nextTime = interval - offset;
    console.log('startTime:%s, count:%d, now:%s, offset:%s, nextTime:%s', startTime, count, now, offset, nextTime);
    timer = setTimeout(callback, nextTime < 0 ? 0 : nextTime);
  }
  timer = setTimeout(callback, interval);
  return function() {
    clearTimeout(timer);
  };
}

const clear = startInterval(function(message) {
  console.count('callback: ' + message);
}, 1000, 'hello world');

setTimeout(clear, 10 * 1000);