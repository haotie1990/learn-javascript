'use strict';

function uncurrying(fn) {
  return function curried() {
    const context = [].shift.call(arguments);
    return fn.apply(context, arguments);
  }
}

const push = uncurrying(Array.prototype.push);

(function() {
  push(arguments, 4);
  console.log(arguments);
})(1, 2, 3);