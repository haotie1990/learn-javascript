'use strict';

/**
 * 1.事件订阅
 * 2.事件缓存,先发布,后订阅
 * 3.事件一次性订阅
 */
const Observer = {
  subscribes: {},
  on: function(action, callback) {
    const handlers = this.subscribes[action] || [];
    if (handlers.indexOf(callback) === -1) {
      handlers.push(callback);
    }
    this.subscribes[action] = handlers;
  },
  one: function(action, callback) {
    this.off(action, callback);
    const handlers = this.subscribes[action] || [];
    const _callback = (payload) => { // 这里如果不用箭头函数怎么弄？=> 把this保存下来
      this.off(action, _callback);
      callback(payload);
    }
    this.on(action, _callback);
  },
  off: function(action, callback) {
    const handlers = this.subscribes[action] || [];
    const index = handlers.indexOf(callback);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
    this.subscribes[action] = handlers;
  },
  emit: function(action, payload) {
    const handlers = this.subscribes[action] || [];
    for (const callback of handlers) {
      callback(payload);
    }
  }
}

Observer.on('broadcast', (data) => {
  console.log(1, data);
});

Observer.on('broadcast', (data) => {
  console.log(2, data);
});

Observer.one('broadcast', (data) => {
  console.log(3, data);
});

Observer.emit('broadcast', 'hello world');

setTimeout(() => {
  Observer.emit('broadcast', 'hello world');
}, 300);