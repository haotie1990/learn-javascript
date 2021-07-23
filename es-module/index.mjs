
// import会执行加载模快，但多次加载只会执行一次
import { moduleA } from './module-a.mjs';
import './module-a.mjs';
import './module-a.mjs';

// ! 当前我们编写工程代码是，会出现混用CommonJs和ES Module规范，主要是由于Webpack、babel等工具进行了转化

// const module = require('./module-a.mjs');

// moduleA = {}; 报错，接口不可修改

// export import被JavaScript引擎用来做静态分析，其只能放在模块的顶层，不能放在代码块中

// import()函数可以支持动态加载，返回一个Promise

/**
 * [Module] {
 *    default: 34,
 *    moduleA: { name: 'moduleA', print: [Function: print] }
 *  }
 * 
 * 试用场景：
 *  1. 按需加载
 *  2. 条件加载
 *  3. 动态路径加载
 */

// import('./module-a.mjs')
//   .then(module => console.log(module));

import * as moduleAA from './module-a.mjs';
// console.log(moduleAA);

import * as moduleBB from './module-b.mjs';
// console.log(moduleBB);

// ! 浏览器 script脚本设置type="module"等价于 script加上defer

// ! CommonJs与ES Module的三大区别
/**
 * 1. CommonJs模快是输出的一个值的拷贝，ES6模块输出的是一个值的引用
 * 2. CommonJs模快是运行时加载，ES6模块是编译时输出
 * 3. CommonJs模块的require命令是同步加载，ES5模块的import方法是异步加载
 */

// ! ES6模块不会缓存结果

// .mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置

// 如果一个npm依赖包，package.json中type=module，此时如果使用require命令加载，便会报错，因此require命令无法解析export命令

// ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异

import * as m from './even.mjs';
console.log(m.even(10));
console.log(m.counter);