import Dep from './dep.mjs';

export default function defineReactive(target, key, value) {
  let dep = new Dep();
  let _value = value;
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('依赖收集, 当前wather:%o', Dep.target);
      // 注意Dep.target是当前Watcher对象实例
      // * https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js#L163
      dep.addSub(Dep.target);
      return _value;
    },
    set: function(val) {
      if (_value === val) {
        return;
      }
      _value = val;
      dep.notify();
    }
  });
}
