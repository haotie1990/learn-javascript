'use strict';

console.log('================================');
console.log(process.argv);
console.log('================================');

console.log('%o', new Number(1));

console.count('已打印，time:' + Date.now());
console.count('已打印，time:' + Date.now());
console.count('已打印，time:' + Date.now());

console.error('something went wrong');