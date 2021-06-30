
/**
 * Promise/A+规范：https://juejin.cn/post/6844903767654023182
 * 1. Promise是一个构造函数
 * 2. 创建一个Promise实例会传入一个执行器,此执行器会立即执行
 * 3. Promise有三种状态
 *    * Pending 等待
 *    * Fulfilled 完成
 *    * Rejected 失败
 * 4. 状态只能从Pending-->Fulfilled或从Pending-->Rejected,一旦发生便不可以二次修改
 * 5. Promise中使用resovle和reject两个函数修改Promise状态
 * 6. then方法中做状态判断，如果是成功状态则调用成功回调函数,如果是失败状态则调用失败回调函数
 * 7. 处理异步任务
 * 8. 实现then方法多次调用添加多个处理函数
 * 9. 实现then方法的链式调用
 *    * 处理then方法onResolved回调返回新的Promise的情况
 *    * then方法链式调用识别Promise是否返回自己
 * 10.捕获错误及then链式调用其他状态码补充
 * 11.参考Fulfilled状态补充对rejected和pending状态的改造
 * 12.处理then方法参数可选
 */

const resolvePromise = function(promise, x, resolve, reject) {
  if (promise === x) { // 返回自身的Promise实例需要报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      return resolve(x);
    }
    let then;
    try {
      then = x.then;
    } catch (error) {
      return reject(error);
    }
    if (typeof then === 'function') {
      let called = false;
      try {
        // ? 规范这里为什么这么弄
        then.call(
          x,
          y => {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          r => {
            if (called) {
              return;
            }
            called = true;
            reject(r);
        });
      } catch (error) {
        if (called) {
          return;
        }
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

const STATUS_PENDING = 'pending';
const STATUS_FULFILLED = 'fulfilled';
const STATUS_REJECTED = 'rejected';

function PromiseAPlus(executor) {

  this.status = STATUS_PENDING;
  this.data = null;
  this.error = null;
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];

  try {
    const resolve = this.resolve.bind(this);
    const reject = this.reject.bind(this);
    executor(resolve, reject);
  } catch(error) {
    this.reject(error);
  }
}

PromiseAPlus.prototype.resolve = function(data) {
  if (this.status === STATUS_PENDING) {
    this.status = STATUS_FULFILLED;
    this.data = data;
    while (this.onResolvedCallbacks.length) {
      const onResolved = this.onResolvedCallbacks.shift();
      onResolved(this.data);
    }
  }
}

PromiseAPlus.prototype.reject = function(error) {
  if (this.status === STATUS_PENDING) {
    this.status = STATUS_REJECTED;
    this.error = error;
    while (this.onRejectedCallbacks.length) {
      const onRejected = this.onRejectedCallbacks.shift();
      onRejected(this.error);
    }
  }
}

PromiseAPlus.prototype.then = function(onFulfilled, onRejected) {
  const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
  const realOnRejected = typeof onRejected === 'function' ? onRejected : (error) => {throw error};

  // ! Cannot access 'promise' before initialization
  // 为了等待promise初始化完成后再访问,需要创建一个异步函数去等待promise完成初始化
  const promise2 = new PromiseAPlus((resolve, reject) => {
    const fulfilledMicrotask = () => {
      queueMicrotask(() => {
        try {
          const x = realOnFulfilled(this.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch(error) {
          reject(error);
        }
      });
    }

    const rejectedMicrotask = () => {
      queueMicrotask(() => {
        try {
          const x = realOnRejected(this.error);
          resolvePromise(promise2, x, resolve, reject);
        } catch(error) {
          reject(error);
        }
      });
    }
    if (this.status === STATUS_FULFILLED) {
      fulfilledMicrotask();
    } else if (this.status === STATUS_REJECTED){
      rejectedMicrotask();
    } else { // Pending状态
      // 缓存成功和失败状态的回调函数,等到状态确认了再执行
      this.onResolvedCallbacks.push(fulfilledMicrotask);
      this.onRejectedCallbacks.push(rejectedMicrotask);
    }
  });
  return promise2;
}
PromiseAPlus.prototype.catch = function(onRejected) {
  this.then(undefined, onRejected);
}
// * 规范：finally()方法返回一个Promise，无论Promise的状态是fulfilled还是rejected都会执行
PromiseAPlus.prototype.finally = function(callback) {
  return this.then((data) => {
    // ? 此处为什么要返回一个Promise
    // PromiseAPlus.resolve处理callback函数返回值
    // 抛出的异常将在then方法里面处理
    return PromiseAPlus.resolve(callback())
      .then(() => {
        return data;
      });
  }, error => {
    return PromiseAPlus.resolve(callback())
      .then(() => {
        return error;
      });
  });
}

PromiseAPlus.resolve = function(data) {
  if (data instanceof PromiseAPlus) {
    return data;
  }
  return new PromiseAPlus((resolve, reject) => {
    resolve(data);
  });
}
PromiseAPlus.reject = function(error) {
  return new PromiseAPlus((resolve, reject) => {
    reject(error);
  });
}
PromiseAPlus.all = function(promises) {
  const len = promises.length;
  const result = new Array(len);
  let countDone = 0;
  return new PromiseAPlus((resolve, reject) => {
    if (len === 0) {
      resolve(result);
    }
    for (let i = 0; i < len; i++) {
      const promise = promises[i];
      PromiseAPlus.resolve(promise)
        .then(data => {
          result[i] = data;
          countDone++;
          if (countDone === len) {
            resolve(result);
          }
        }, error => {
          reject(error);
        });
    }
  });
}
PromiseAPlus.race = function(promises) {
  return new PromiseAPlus((resolve, reject) => {
    const len = promises.length;
    let result;
    if (len === 0) {
      resolve(result);
    }
    for (let i = 0; i < len; i++) {
      const promise = promises[i];
      PromiseAPlus.resolve(promise)
        .then(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    }
  });
}
// allSettled方法返回一个所有给定的Promise都已经fulfilled或rejected后的Promise
// 并带一个对象数组,每个对象对应的Promise结果
// 每个结果对象都有一个status字符串,如果它的值是fulfilled,则结果对象上有一个value;
// 如果status的值是rejected,则结果对象上有一个reason
PromiseAPlus.allSettled = function(promises) {
  return new PromiseAPlus((resolve, reject) => {
    const len = promises.length;
    const result = new Array(len);
    let countDone = 0;
    if (len === 0) {
      resolve(result);
    }
    for (let i = 0; i < len; i++) {
      const promise = promises[i];
      PromiseAPlus.resolve(promise)
        .then(data => {
          result[i] = {
            status: 'fulfilled',
            value: data
          };
        }, error => {
          result[i] = {
            status: 'rejected',
            reason: error
          };
        })
        .finally(() => {
          countDone++;
          if (countDone === len) {
            resolve(result);
          }
        });
    }
  });
}
/**
 * ? 这个deffered方法干嘛的
 */
PromiseAPlus.deferred = function() {
  const result = {
    promise: null,
    resolve: null,
    reject: null
  };
  result.promise = new PromiseAPlus((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}

const promise = new PromiseAPlus((resolve, reject) => {
  resolve(100)
})

promise
  .then()
  .then()
  .then()
  .then(value => console.log(value))

module.exports = PromiseAPlus;
