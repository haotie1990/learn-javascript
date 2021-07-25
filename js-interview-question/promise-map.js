const Promise = require('bluebird');

Promise.map = function(promises, mapper, concurrency = Infinity) {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    const taskLen = len <= concurrency ? len : concurrency;
    let result = [];
    promises = promises.map(
      (p, index, array) => Promise.resolve(p).then((_p) => mapper(_p, index, array))
    );
    const tasks = [];
    while (promises.length) {
      let _promises = promises.splice(0, taskLen);
      tasks.push(function() {
        return Promise.all(_promises);
      });
    }
    let promise = Promise.resolve();
    for (const task of tasks) {
      promise = promise
        .then(task)
        .then(data => {
          result = result.concat(data);
          return result;
        })
        .catch(err => {
          reject(err);
        });
    }
    promise.then(resolve);
  });
}

module.exports = Promise;