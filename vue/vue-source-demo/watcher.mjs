import Dep from './dep.mjs';
import queueWatcher from './queueWatcher.mjs';

Dep.target = null;

let uid = 0;

/**
 * https://github.com/vuejs/vue/blob/dev/src/core/observer/watcher.js
 */
export default class Watcher {
  constructor() {
    this.id = ++uid;
    // ? 每创建一个watcher实例，就将实例对象赋值给Dep.target
    // ? 所有的Dep共享一个Dep.target，如何保证不冲突
    Dep.target = this;
  }

  update() {
    console.log('watcher:%s update', this.id);
    queueWatcher(this);
  }

  run() {
    console.log('watcher:%s UI Render', this.id);
  }
}

// 模拟连续修改某数据出发依赖更新导致watcher更新，但由于批量异步更新策略，最终只有完成一个UI更新
let watch1 = new Watcher();
let watch2 = new Watcher();

watch1.update();
watch1.update();
watch2.update();
watch2.update();
watch2.update();