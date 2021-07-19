
/**
 * https://github.com/vuejs/vue/blob/dev/src/core/observer/dep.js
 */
export default class Dep {
  constructor() {
    // 用来存放Watcher的数组
    this.subs = [];
  }
  
  addSub(watcher) {
    this.subs.push(watcher);
  }

  // 通知subs中的所有watcher对象触发更新操作
  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
}
