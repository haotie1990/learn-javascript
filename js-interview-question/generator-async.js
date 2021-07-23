const fetch = require('node-fetch');
const fs = require('fs');

// generator异步封装
function* request() {
  const reponse = yield fetch('https://api.github.com/users/github');
  // console.log('id: ' + reponse.id);
}

let req = request(); // 返回generator
let res = req.next(); // 启动generator，返回yield后面表达式的值，promise
res.value.then(data => {
  return data.json();
}).then(data => {
  // 将异步执行结果交回到generator函数内，使得generator函数内的异步看起来像是同步
  req.next(data);
});

// call by value & call by name
// thunk函数，将多参函数，转换为只传callback的单参函数
// https://github.com/tj/node-thunkify
function thunkES5(func) {
  return function() {
    // ? 此处为什么需要保留context
    let context = this;
    let args = [].slice.call(arguments, 0);
    return function(callback) {
      let called = false;
      args.push(function(){
        // 避免callback重复调用
        if (called) {
          return;
        }
        called = true;
        callback.apply(null, arguments);
      });
      try {
        func.apply(context, args);  
      } catch (error) {
        callback(error);
      }
    }
  }
}

function thunkES6(func) {
  return function(...args) {
    return function(callback) {
      return func.call(this, ...args, callback);
    }
  }
}

function print(message, callback) {
  callback(message);
}

function mockAsyncPrint(message, callback) {
  setTimeout(function(){
    // node.js callback函数的第一个参数永远是err
    callback(null, message.toUpperCase());
  }, 100);
}

const printThunk = thunkES5(print);

// printThunk('hello world')(console.log);

const mockAsyncPrintThunk = thunkES5(mockAsyncPrint);

var sequencePrint = function* () {
  // mockAsyncPrintThunk返回一个参数是callback的函数
  // 所以，next方法第一次执行后，value是一个function，参数是一个callback
  let a = yield mockAsyncPrintThunk('hello');
  let b = yield mockAsyncPrintThunk('world');
  return a + ' ' + b;
}

var g = sequencePrint();
var r = g.next();
r.value(function(err, data){
  if (err) {
    throw err;
  }
  // 注意，将callback的结果data，通过next方法传入generator，作为上一个yiedl表达式的执行结果
  // 等价: let msg = data;
  r = g.next(data);
  r.value(function(err, data){
    if (err) {
      throw err;
    }
    // 等价：msg = data;
    g.next(data);
  });
});

// 上面的操作，看起来gen方法内部yield的执行是同步的
// 分析上面的流程，其就是将同一个callback函数，反复的传入next方法返回value属性的过程

function runGenerator(generator, callback) {
  let gen = generator();
  // result.value由于thunk的处理，其为参数为callback的函数
  // next为传入reslut.value的callback函数
  const next = function (err, ...args) {
    if (err) {
      callback(err);
    }
    const result = gen.next(...args);
    if (!result.done) {
      result.value(next);
    } else {
      callback(null, result.value);
    }
  }
  next();
}

// 支持返回Promise
function runGenPromise(gen) {
  let _resolve = null;
  let _reject = null;
  let isReturnPromise = arguments.length === 1;
  let callback = !isReturnPromise
    ? arguments[1]
    : new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

  let g = gen();
  const next = function (err, ...args) {
    if (err) {
      isReturnPromise ? _reject(err) : callback(err);
    }
    let result = g.next(...args);
    if (!result.done) {
      result.value(next);
    } else {
      isReturnPromise ? _resolve(result.value) : callback(null, result.value);
    }
  }
  next();
  return callback;
}

// runGenerator(sequencePrint, function(err, data) {
//   console.log(data);
// });

// runGenPromise(sequencePrint).then(data => console.log(data));

function mockAsyncPrintPromise(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // if (message === 'HELLO') {
      //   resolve(message.toLowerCase());
      // } else if (message === 'WORLD') {
      //   reject(new Error(message));
      // }
      resolve(message.toLowerCase());
    }, 100);
  });
}

function* sequencePrintPromise() {
  let a = yield mockAsyncPrintPromise('HELLO');
  let b = yield mockAsyncPrintPromise('WORLD');
  return a + ' ' + b;
}

// 支持yield表达式后面跟着Promise
function runGenByPromise(generator) {
  return new Promise(function(resolve, reject) {
    const g = generator();
    const next = function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      const result = g.next(data);
      if (!result.done) {
        result.value.then(next.bind(null, null), next);
      } else {
        resolve(result.value);
      }
    }
    next();
  });
}

// runGenByPromise(sequencePrintPromise)
//   .then(data => console.log(data), error => console.log(error));


// 手写Co实现：https://github.com/tj/co/blob/master/index.js
/**
 * 
 * @param {Generator} generator 
 */
function myCo(generator) {
  const isGenerator = value => Object.prototype.toString.call(value) === '[object Generator]';
  const isGeneratorFunction = value => Object.prototype.toString.call(value) === '[object GeneratorFunction]';
  const isPromise = value => Object.prototype.toString.call(value) === '[object Promise]';
  const isFunction = value => Object.prototype.toString.call(value) === '[object Function]';
  return new Promise((resolve, reject) => {
    if (!isGeneratorFunction（generator)) {
      return reject(new Error('generator not available'));
    }
    const g = generator();
    if (!isGenerator(g)) {
      return reject(new Error('generator not available'));
    }
    onFulfilled();
    function onFulfilled(data) {
      let res = null;
      try {
        res = g.next(data);
      } catch (error) {
        reject(error);
      }
      next(res);
    }

    function onRejected(error) {
      let res = null;
      try {
        // 将错误交回到generator内部处理，如果generator内部没有处理，则再由外部接收
        res = g.throw(error);
      } catch (error) {
        reject(error);
      }
      next(res);
    }

    function next(res) {
      if (res.done) {
        return resolve(res.value);
      }
      let value = res.value;
      // 如果value是一个thunk函数，转成Promise
      if (isFunction(value)) {
        value = thunkToPromise(value);
      } else if (!isPromise(value)) { // 如果不是Promise也不是thunk函数，则直接转为Promise，co在这个地方处理更复杂一些
        value = Promise.resolve(value);
      }
      value.then(onFulfilled, onRejected);
    }

    function thunkToPromise(func) {
      return new Promise((resolve, reject) => {
        func.call(this, function(err, ...args) {
          if (err) {
            return reject(err);
          }
          resolve(args);
        });
      });
    }
  });
}

myCo(sequencePrint)
  .then(data => console.log(data), error => console.log(error));

myCo(sequencePrintPromise)
  .then(data => console.log(data), error => console.log(error));