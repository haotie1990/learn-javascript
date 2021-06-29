
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
 * @param {functon} executor 
 */
function PromiseAPlus(executor) {
  const STATUS_PENDING = 'pending';
  const STATUS_FULFILLED = 'fulfilled';
  const STATUS_REJECTED = 'rejected';

  this.status = STATUS_PENDING;
  this.data = null;
  this.error = null;
  this.then = function(onResolved, onRejected) {
    if (this.status === STATUS_FULFILLED) {
      onResolved && onResolved(this.data);
    } else if (this.status === STATUS_REJECTED){
      onRejected && onRejected(this.error);
    }
  }

  const resolve = (data) => {
    if (this.status !== STATUS_PENDING) {
      return;
    }
    this.status = STATUS_FULFILLED;
    this.data = data;
  }

  const reject = (error) => {
    if (this.status !== STATUS_PENDING) {
      return;
    }
    this.status = STATUS_REJECTED;
    this.error = error;
  }

  executor(resolve, reject);
}

const promise = new PromiseAPlus((resolve, reject) => {
  resolve('success');
  reject('error');
})

promise.then(value => {
  console.log('resolve', value)
}, error => {
  console.log('reject', error);
})

// 输出 resolve success
