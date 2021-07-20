/**
 * https://github.com/koajs/compose/blob/master/index.js
 */

/**
 * 
 * @param {Array} middlewares 
 */
const compose = function(middlewares) {
  /**
   * @param {Object} context
   * @param {Promise}
   */
  return function(context, next) {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i;
      let fn = middlewares[i];
      // 当执行到最后一个middleware方法时
      // 其next有两种情况：
      //  1. 包装compose执行事传入的callback函数并执行
      //  2. 直接返回一个fulfilled状态的Promise
      if (i === middlewares.length) {
        fn = next;
      }
      if (!fn) {
        return Promise.resolve();
      }
      try {
        // 当前middleware执行，其next就是下一个middleware的Promise包装
        // 因为当前middleware方法体中执行await next();就是执行下一个middleware方法
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
}

const arr = [];
const stack = [];

stack.push(async (context, next) => {
  arr.push(1);
  await next();
  arr.push(6);
});

stack.push(async (context, next) => {
  arr.push(2);
  await next();
  arr.push(5);
});

stack.push(async (context, next) => {
  arr.push(3);
  await next();
  arr.push(4);
});

async function main() {
  // await compose(stack)({});
  await compose(stack)({}, function(){
    console.log('callback');
  });
  console.log('arr:%s', arr);
}
main();

module.exports = compose;