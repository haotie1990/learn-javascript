
const middlewares = [];

middlewares.push(async function(ctx, next) {
  console.log('1');
  await next();
  console.log('6');
});

middlewares.push(async function(ctx, next) {
  console.log('2');
  await next();
  console.log('5');
});

middlewares.push(async function(ctx, next) {
  console.log('3');
  await next();
  console.log('4');
});

async function run() {
  const middleware = middlewares.shift();
  await (middleware && middleware({}, run));
}

run(); // expect output: 1 2 3 4 5 6