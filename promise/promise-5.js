
/**
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
 * @param {functon} executor 
 */
 function PromiseAPlus(executor) {
  const STATUS_PENDING = 'pending';
  const STATUS_FULFILLED = 'fulfilled';
  const STATUS_REJECTED = 'rejected';

  this.status = STATUS_PENDING;
  this.data = null;
  this.error = null;
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];
  this.nextResovle = null;
  this.nextReject = null;
  this.then = function(onResolved, onRejected) {
    let nextPromise = null;
    nextPromise = new PromiseAPlus((resolve, reject) => {
      if (this.status === STATUS_FULFILLED) {
        if (onResolved) {
          let result = onResolved(this.data);
          this.resolvePromise(nextPromise, result, resolve, reject);
        }
      } else if (this.status === STATUS_REJECTED){
        if (onRejected) {
          let result = onRejected(this.error);
        }
      } else { // Pending状态
        // 缓存成功和失败状态的回调函数,等到状态确认了再执行
        if (onResolved) {
          this.onResolvedCallbacks.push(onResolved);
        }
        if (onRejected) {
          this.onRejectedCallbacks.push(onRejected);
        }
      }
    });
    return nextPromise;
  }
  this.resolvePromise = function(nextPromise, result, resolve, reject) {
    if (nextPromise === result) { // 返回自身的Promise实例需要报错
      throw new TypeError('Chaining cycle detected for promise');
    }
    // 判断onResolved的回调返回值是不是Promise对象,如果是则执行then方法传入resolve和reject
    if (result instanceof PromiseAPlus) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  }

  const resolve = (data) => {
    if (this.status !== STATUS_PENDING) {
      return;
    }
    this.status = STATUS_FULFILLED;
    this.data = data;
    while (this.onResolvedCallbacks.length) {
      const onResolved = this.onResolvedCallbacks.shift();
      const result = onResolved(this.data);
      if (this.nextResolve) {
        this.nextResolve(result);
      }
    }
  }

  const reject = (error) => {
    if (this.status !== STATUS_PENDING) {
      return;
    }
    this.status = STATUS_REJECTED;
    this.error = error;
    while (this.onRejectedCallbacks.length) {
      const onRejected = this.onRejectedCallbacks.shift();
      const result = onRejected(this.error);
      if (this.nextReject) {
        this.nextReject(result);
      }
    }
  }

  executor(resolve, reject);
}

const promise = new PromiseAPlus((resolve, reject) => {
  resolve('success');
})

// promise.then(value => {
//   console.log('1')
//   console.log('resolve', value)
//   return value;
// }).then(value => {
//   console.log('2')
//   console.log('resolve', value)
//   return value;
// }).then(value => {
//   console.log('3')
//   console.log('resolve', value)
// })

let p = null;
p = promise.then(value => {
  console.log('resolve', value);
  return p;
});

// 输出 resolve success
