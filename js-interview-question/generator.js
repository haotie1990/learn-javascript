
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
}

const g = helloWorldGenerator();
// for (let value of helloWorldGenerator()) {
//   console.log(value);
// }
console.log(Object.prototype.toString.call(g));
console.log(Object.prototype.toString.call(helloWorldGenerator));
console.log(g.next()); // expect { value: undefined, done: true }
console.log(g.next()); // generator执行到最后，后续再次调用next方法，不管调用多少次，都将返回：{ value: undefined, done: true }

console.log('--------------------------------------');
// next函数返回的value指向yield epresstion表达式执行的值

// next方法和yield的暂停逻辑
// 手动惰性求值
// ! yield表达式只能再Generator函数中使用，其他地方会报错
function* sum(a, b) {
  yield a + b;
}
const s = sum(1, 2);
console.log(s.next());

console.log('--------------------------------------');

// Generator函数就是遍历器生成函数，因此把Generator函数赋值Symbol.iterator可以使得对象可被forof遍历
const obj = { a: 1, b: 2, c: 3, d: 4 };

obj[Symbol.iterator] = function* () {
  const keys = Object.keys(this);
  for (let key of keys) {
    yield { key, value: this[key] };
  }
}

// 隐式的执行了obj[Symbol.iterator]方法
for (const { key, value } of obj) {
  console.log('key: ' + key + ' value: ' + value);
}

console.log('--------------------------------------');
// yield表达式没有返回值
// var result = yield 1 + 2; 也就是如果next不传值，result一直是undefined
// next方法的参数作为上一个yield表达式的返回值
// ! next方法第一次使用参数会被忽略

function* f() {
  for (let i = 0; true; i++) {
    let result = yield i;
    console.log('result:%s', result);
    if (result) {
      i = -1;
    }
  }
}

let gf = f();
console.log(gf.next());
console.log(gf.next());
console.log(gf.next(true));

function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b

console.log('--------------------------------------');

// Generator.prototype.throw抛出一个错误，如果generator函数内部有try...catch则会
// 被内部接收，如果没有则抛出外部
// ! throw方法抛出的错误要被generator内部捕获，必须至少执行过一次next方法

// 任何数据结构只要有 Iterator 接口，就可以被yield*遍历
// yield* 后面跟着一个generator

function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

console.log([...logReturned(genFuncWithReturn())])

// 利用genrator展开嵌套数组

function flatArray(array) {
  const iterTree = function* (value) {
    if (Array.isArray(value)) {
      for (const item of value) {
        yield* iterTree(item);
      }
    } else {
      yield value;
    }
  }
  return [...iterTree(array)];
}

console.log(flatArray([1, [ 2, [ 3] ], 4, 5, [ [ [6] ] ], 7, 8 ]));

// generator