'use strict';

const http = require('http');
const Context = require('./context')；

class Application {
  constructor() {
    this.server = null;
    this.middlewares = [];
  }

  createServer(...args) {
    return new Promise((resolve, reject) => {
      this.server = http.createServer((res, req) => {
        resolve(new Context(res, req));
      });
      this.server.listen(...args);
    });
  }

  listen(...args) {
    this.createServer(...args)
      .then((ctx) => {
        ctx.res.end(ctx.body);
      })
      .catch((err) => {
        process.exit(-1);
      });
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }
}