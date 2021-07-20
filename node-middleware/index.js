const http = require('http');

/**
 * vue-router里面执行router hooks的代码
 */
function runQueue (queue, fn, cb) {
  const step = index => {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
    }
  }
  step(0)
}

function compose(middlewares, callback) {
  return function(ctx) {
    const dispatch = function(step) {
      if (step >= middlewares.length) {
        return callback(ctx);
      }
      const func = middlewares[step];
      func(ctx, function() {
        dispatch(step + 1);
      });
    }
    dispatch(0);
  }
}

const middlewares = [];

middlewares.push(function log(ctx, next){
  console.log('print log url:%s', ctx.req.url);
  next();
});

middlewares.push(function auth(ctx, next){
  ctx.user = { name: 'Kider' };
  next();
});

middlewares.push(function body(ctx, next){
  console.log('body ctx:%o', ctx);
  next();
});

const processMiddlewares = compose(middlewares, function(ctx) {
  console.log('callback ctx:%o', ctx);
});
processMiddlewares({ req: { url: 'http://www.vipkid.com' }, res: {} });