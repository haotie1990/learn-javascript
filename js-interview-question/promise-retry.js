Promise.retry = function(promise, max) {
  return new Promise(function(resolve, reject) {
    const onFulfilled = function(data) {
      resolve(data);
    }
    const onRejected = function(error) {
      if (max--) {
        return call();
      }
      reject(error);
    }
    const call = function() {
      promise.then(onFulfilled, onRejected);
    }
    call();
  });
}