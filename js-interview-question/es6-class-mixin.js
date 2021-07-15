function copyProperties(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== 'constructor'
      && key !== 'prototype',
      && key !== 'name') {
      let descriptor = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, descriptor);
    }
  }
}

function mixin(...mixins) {
  class Mix {
    constructor() {
      for (const mix of mixins) {
        copyProperties(this, new mix());// 拷贝实例属性
      }
    }
  }
  for (const mix of mixins) {
    copyProperties(Mix, mix); // 拷贝静态属性
    copyProperties(Mix.prototype, mix.prototype); // 拷贝原型属性
  }

  return Mix;
}

class Man extends mixin(Person, Animal) {
  constructor() {
  }
}

