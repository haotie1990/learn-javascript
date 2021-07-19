
let callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

/**
 * https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js
 */
export default function nextTick(cb) {
  callbacks.push(cb);
  if (!pending) {
    pending = true;
    // setTimeout(flushCallbacks, 0);
    // Promise.resolve().then(flushCallbacks);
    queueMicrotask(flushCallbacks);
  }
}
