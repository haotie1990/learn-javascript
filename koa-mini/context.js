'use strict';

class Context {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
}

module.exports = Context;