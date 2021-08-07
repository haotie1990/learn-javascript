/**
 * 处理Http请求并发量
 */
/**
 * 
 * @param {array} requests http请求方法数组 
 * @param {number} max 最大并发量
 */
function concurrentPoll(requests, max) {
  return new Promise(function(resolve, reject) {
    let length = requests.length;
    if (length <= max) {
      Promise.allSettled(requests)
        .then(data => resolve(data));
      return;
    }
    let result = [];
    let promise = Promise.resolve();
    let tasks = [];
    while(requests.length > 0) {
      const subRequests = requests.splice(0, max);
      tasks.push(function() {
        return Promise.allSettled(subRequests);
      });
    }
    for (const task of tasks) {
      promise = promise.then(task).then(data => result = result.concat(data));
    }
    promise.then(() => resolve(result));
  });
}

function poll(requests, limit) {
  let _resolve = null;
  let _reject = null;
  let result = [];
  let currentIndex = 0;
  function next(index) {
    const req = requests[index];
    if (!req) return;
    req()
      .then(data => {
        return result[index] = data;
      },_reject)
      .then(() => next(currentIndex++))
      .finally(() => {
        if (result.length === requests.length) {
          _resolve(result);
        }
      });
  }
  for (let i = 0; i < limit && i < requests.length; i++) {
    next(currentIndex++);
  }
  return new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });
}