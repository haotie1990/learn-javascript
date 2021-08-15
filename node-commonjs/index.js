/**
 * 下面连续加载module-a模块，只有输出一次：loading module a
 * 因为使用require加载模块存在缓存，完成一次加载后，后续加载均会返回已缓存的加载模块
 */
let moduleA = require('./module-a'); // output: loading module a
moduleA = require('./module-a'); // output: 
moduleA = require('./module-a'); // output: 

const moduleB = require('./module-b'); // output: loading module b

/**
 * module c模块导出一个函数，加载模块并不会执行此函数
 * * 可以delete require.cache，清除模块缓存
 */
let moduleC = require('./module-c'); // output: loading module c
console.log(moduleC());
delete require.cache[require.resolve('./module-c')];
moduleC = require('./module-c');
console.log(moduleC());
delete require.cache[require.resolve('./module-c')];
moduleC = require('./module-c');
console.log(moduleC());

/**
 * require加载模块是有缓存的，所有缓存都存放在require.cache里
 * cache的key是模快绝对路径，可以使用require.resolve获取
 * * 缓存是根据绝对路径识别模块的，如果同样的模块名，但是保存在不同的路径，require命令还是会重新加载该模块
 */
console.log('require cache ' + Object.keys(require.cache));


// console.log('module:%o', module.children);
// console.log('exports:%o', exports);
// console.log('this:%o', this);

// 当前模快的this指向module.exports，而不是globalThis
console.log('this === module.exports', this === module.exports);

/**
 * exports是指向module.exports的变量，模块中指向向其添加属性或方法，不可覆盖，否则将改变exports指向module.exports
 * 导致无法导出模块功能
 * * 因此单一对象导出或导出一个方法，不可以使用如下的形式：
 *    exports = moduleObject;
 *    exports = function () {}
 */
console.log('exports === module.exports', exports === module.exports);

// require.resolve()命令只解析返回模块的绝对路径，但不加载执行模快脚本，下面的代码并没有打印输出：loading module a
console.log('require.resolve: ' + require.resolve('./module-a.js'));

const ModuleD = require('./module-d');
console.log('ModuleD:' + ModuleD);
setTimeout(function () {
  console.log('ModuleD:' + ModuleD);
}, 300);