/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法
  
  add 函数已实现，模拟异步请求后端返回一个相加后的值

  追加问题：如何控制 add 异步请求的并发次数
*/
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function add(a, b) {
  return Promise.resolve(a + b);
}

function sum(arr, add) {
  return arr.reduce((p, c) => {
    return p.then(acc => {
      if (!acc) {
        acc = 0;
      }
      return add(acc, c);
    });
  }, Promise.resolve());
}

// 将数组拆分，分别计算，最后累加
function sumPoll(arr, add, concurrency = Infinity) {
  const chunks = [];
  const len = arr.length <= concurrency ? arr.length : concurrency;
  while (arr.length) {
    chunks.push(arr.splice(0, len));
  }
  const tasks = [];
  for (const chunk of chunks) {
    tasks.push(chunk.reduce((p, c) => p.then(acc => {
      if (!acc) acc = 0;
      return add(acc, c);
    }), Promise.resolve()));
  }
  return Promise.all(tasks).then(result => {
    console.log('result:%s', result);
    if (result.length === 1) {
      return result[0];
    }
    return sumPoll(result, add);
  });
}

sumPoll(arr, add, 3).then(result => console.log(result));