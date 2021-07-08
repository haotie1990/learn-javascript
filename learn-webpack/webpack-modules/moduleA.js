'use strict';
const moduleB = require('./moduleB');

module.exports = {
  getName: function() {
    console.log('this is moduleA');
    moduleB.getName();
  }
}
