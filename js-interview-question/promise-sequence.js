
const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });
const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });
const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });
const mergePromise = (ajaxArray) => {
  // 1,2,3 done [1,2,3] 此处写代码 请写出ES6、ES3 2中解法
  let result = [];
  // return ajaxArray.reduce((promise, ajaxFunc) => {
  //   return promise.then(ajaxFunc).then(data => {
  //     return result = result.concat(data);
  //   })
  // }, Promise.resolve());

  // let promise = Promise.resolve();
  // for (const ajaxFunc of ajaxArray) {
  //   promise = promise.then(ajaxFunc).then(data => result.push(data));
  // }
  // return promise.then(() => result);

  return (async () => {
    for (const ajaxFunc of ajaxArray) {
      result.push(await ajaxFunc())
    }
    return result;
  })();
};
mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data); // data 为[1,2,3]
});
// 执行结果为：1 2 3 done [1,2,3]
