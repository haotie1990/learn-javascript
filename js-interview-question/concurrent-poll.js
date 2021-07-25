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