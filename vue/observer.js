const defineReactive = require('./defineReactive');

function observer(value) {
  if (!value || typeof value !== 'object') {
    throw new TypeError('value is not a object');
  }
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}

module.exports = observer;