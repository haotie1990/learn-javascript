const Promise = require('bluebird');

Promise.map = function(promises, mapper, concurrency = Infinity) {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    // const taskLen = len <= concurrency ? len : concurrency;
    const taskLen = Math.min(len, concurrency);
    let result = [];
    const tasks = [];
    while (promises.length) {
      let _promises = promises.splice(0, taskLen);
      let tasksLen = tasks.length;
      tasks.push(function() {
        return Promise.all(_promises.map((p, i) => {
          // 将promises中的值都强制转为promise
          return Promise.resolve(p).then((_p) => {
            // 调用mapper
            return mapper(_p, tasksLen * taskLen + i);
          })
        }));
      });
    }
    let promise = Promise.resolve();
    for (const task of tasks) {
      promise = promise
        .then(task)
        .then(data => {
          console.log('data:%s', data);
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

Promise.map1 = function (iterable, mapper, concurrency = Infinity) {

  let index = 0
  const results = []
  const pending = []
  const iterator = iterable[Symbol.iterator]()
  while (concurrency-- > 0) {
    const thread = wrappedMapper()
    if (thread) pending.push(thread)
    else break
  }
  return Promise.all(pending).then(() => results)

  function wrappedMapper () {
    const next = iterator.next()
    if (next.done) return null
    const i = index++
    const mapped = Promise.resolve(next.value).then((value) => mapper(value, i))
    return Promise.resolve(mapped).then(resolved => {
      results[i] = resolved
      return wrappedMapper()
    })
  }
}

// 0 1 2 3 4 5
// 0 * 2 + 0, 0 * 2 + 1, 1 * 2 + 0, 1 * 2 + 1,
Promise.map(
  [1, 2, 3, 4, 5],
  (value, index) => {
    console.log('value:%s, index:%s', value, index);
    return value *2;
  },
  2
)
  .then(result => console.log(result));

module.exports = Promise;