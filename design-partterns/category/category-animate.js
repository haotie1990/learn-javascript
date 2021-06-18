'use strict';

/**
 * 策略对象,用来封装各种算法或业务规则,并且其目标一致
 * 比如本例中返回的均是动画元素当前应该所处位置
 */
const Tween = {
  linear: function(time, source, target, duration) {
    return target * time / duration + source;
  },
  easeIn: function(time, source, target, duration) {
    return target * ( time /= duration ) + source;
  },
  strongEaseIn: function(time, source, target, duration) {
    return target * ( time /= duration ) * time * time * time * time + source;
  },
  strongEaseOut: function(time, source, target, duration) {
    return target * ( ( time = time / duration - 1 ) * time * time * time * time + 1)+ source;
  },
  sineaseIn: function(time, source, target, duration) {
    return target * ( time /= duration ) * time * time + source;
  },
  sineaseOut: function(time, source, target, duration) {
    return target * ( ( time = time / duration - 1 ) * time * time + 1)+ source;
  }
}

/**
 * 策略环境类Context对象,接收请求并委托给指定的策略算法执行
 * @param {HTMLElement} element 
 */
function Animate(element) {
  this.dom = element;
  this.startTime = 0;
  this.startPos = 0;
  this.endPos = 0;
  this.propertyName = null;
  this.tween = null;
  this.duration = null;
}
Animate.prototype.start = function(propertyName, endPos, duration, timingFunction) {
  this.startTime = Date.now();
  this.propertyName = propertyName;
  this.startPos = this.dom.getBoundingClientRect()[propertyName];
  this.endPos = endPos;
  this.duration = duration;
  this.tween = Tween[timingFunction];

  let timer = setInterval(() => {
    if (!this.step()) {
      clearInterval(timer);
    }
  }, 19);
}
Animate.prototype.step = function() {
  const now = Date.now();
  if (now >= this.startTime + this.duration) {
    this.update(this.endPos);
    return false;
  }
  const pos = this.tween(now - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
  this.update(pos);
  return true;
}
Animate.prototype.update = function(value) {
  this.dom.style[this.propertyName] = value + 'px';
}