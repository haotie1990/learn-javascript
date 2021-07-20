const Koa = require('koa');
const app = new Koa();

app.use(async function(context, next){
  console.log('first middleware');
  // 指向 second middleware的Promise.resolve包装
  // 因此会执行second middleware的函数体
  await next();
  console.log('first middleware done');
});

app.use(async function(context, next){
  console.log('second middleware');
  // 如果second middleware是最后一个middleware，则next指向Promise.resolve()，直接返回并执行剩下的逻辑，并返回一个Promise
  // 此时将触发上一个middleware await next()语句后面部分的执行（如果没有则依次向上返回）
  // 如果seconde middleware不是最后一个middleware，则继续执行下一个middleware的函数体
  await next();
  console.log('second middleware done');
});

app.use(async function(context, next){
  context.body = 'hello world';
})
app.listen(3000, 'localhost', (err) => {
  if (err) {
    process.exit(-1);
  }
  console.log('listen');
});