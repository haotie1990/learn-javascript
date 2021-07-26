// 业务需求中，经常有 只需要最后一次请求的结果（比如搜索）编写一个高阶函数，
// 传递 旧请求方法（执行后返回 promise），返回一个新方法。连续触发时，若上一
// 次 promise 执行未结束则直接废弃，只有最后一次 promise 会触发then/reject

/**
* 只有最后一次promise会then与reject
* @param {function} promiseFunction
* promiseFunction 示例： () => fetch('data')
*/
function lastPromise(promiseFunction) {
  const cache = new Map();
  return function () {
    if (cache.has(promiseFunction)) {
      let prePromise = cache.get(promiseFunction);
      cache.delete(prePromise);
    }
    let promise = promiseFunction()
      .then(data => {
        if (cache.has(promise)) {
          cache.delete(promise);
          return data;
        }
      }, error => {
        if (cache.has(promise)) {
          cache.delete(promise);
          return error;
        }
      }).finally(() => cache.delete(promiseFunction));
    cache.set(promise, true);
    cache.set(promiseFunction, promise);
    return promise;
  }
}
  
  
  
// 示例
let count = 1;
let promiseFunction = () =>
  new Promise(rs =>
    setTimeout(() => {
      rs(count++);
    })
);
let lastFn = lastPromise(promiseFunction);
lastFn().then(console.log); // 无输出
lastFn().then(console.log); // 无输出
lastFn().then(console.log); // 3