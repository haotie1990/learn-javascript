'use strict';

/**
 * @param {array} promises 
 */
function PromiseAll(promises) {
  const len = promises.length;
  let doneCount = 0;
  let result = Array.from({ length: len });
  return new Promise((resolve, reject) => {
    promises
      .map(promise => {
        if (!promise || typeof promise.then !== 'function') {
          return Promise.resolve(promise);
        }
        return promise;
      })
      .forEach((promise, index) => {
        promise
          .then(data => {
            doneCount++;
            result[index] = data;
            if (doneCount === len) {
              resolve(result);
            }
          })
          .catch(err => {
            reject(err);
          });
      })
  });
}

const promise1 = (function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('time end 1000'), 1000);
  });
})();

const promise2 = (function() {
  return Promise.resolve(true);
})();

const promise3 = (function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('time end 500'), 500);
  });
})();

PromiseAll([promise1, promise2, promise3, 0, 'string', null])
  .then((data) => {
    console.log(data.toString()); 
  })
  .catch((err) => {
    console.error(err);
  });

Promise.all([promise1, promise2, promise3, 0, 'string', null])
  .then((data) => {
    console.log(data.toString()); 
  })
  .catch((err) => {
    console.error(err);
  });