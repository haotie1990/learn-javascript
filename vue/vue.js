
const observer = require('./observer');

function Vue(options) {
  if (!options.data) {
    options.data = {};
  }
  this._data = options.data;
  observer(this._data);
}

const vm = new Vue({
  data: {
    name: 'vm'
  }
});

vm._data.name = 'vm1';