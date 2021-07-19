import nextTick from './next-tick.mjs';

let has = {};
let queue = [];
let waiting = false;

function flushSchedulerQueue() {
  let watcher = null;
  let id = null;
  while(queue.length) {
    watcher = queue.shift();
    id = watcher.id;
    has[id] = null;
    watcher.run();
  }
  waiting = false;
}

/**
 * https://github.com/vuejs/vue/blob/dev/src/core/observer/scheduler.js#L164:17
 */
export default function queueWatcher(watcher) {
  const { id } = watcher;
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}