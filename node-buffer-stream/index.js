'use strict';

const buffer = Buffer.from('hello world'); // 初始化后,内容空间固定

console.log(buffer.length);
console.log(buffer.toString());

buffer.write('world hello!');// 写入字符长度超过初始化空间

console.log(buffer.length);
console.log(buffer.toString());

const slice = buffer.slice(0, 5); // slice创建的切片非副本,而是指向共同的内容空间

console.log(slice.length);
console.log(slice.toString());

slice.write('hello');// 修改切片或原buffer均会导致buffer数据被修改

console.log(buffer.toString());
console.log(buffer.length);