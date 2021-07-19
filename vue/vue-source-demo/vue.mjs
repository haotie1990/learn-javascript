
import observer from './observer.mjs';
import Watcher from './watcher.mjs';

class Vue {
  constructor(options) {
    if (!options.data) {
      options.data = {};
    }
    this._data = options.data;
    // 将数据变为响应式
    observer(this._data);
  
    // 新建一个Wathcer对象，此时Dep.target指向这个Wathcer对象实例
    // 当render函数中触发了对属性的依赖时，则会触发依赖收集
    new Watcher();
  }
}

const vm = new Vue({
  data: {
    name: 'vm'
  }
});

console.log('data name: ' + vm._data.name);
vm._data.name = 'vm1';