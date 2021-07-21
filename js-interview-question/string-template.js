'use strict';

// function template(input, data) {
//   const regex = RegExp(/\{\{(\w+)\}\}/, 'g');
//   let result;
//   let output = input;
//   while((result = regex.exec(input)) !== null) { // input字符串不能修改
//     const [pattern, key] = result;
//     output = output.replace(pattern, data[key]);
//   }
//   return output;
// }

function template(input, data) {
  const regex = RegExp(/\{\{([\w|\.]+)\}\}/, 'g');
  let result;
  while((result = regex.exec(input)) !== null) { // input字符串不能修改
    const [pattern, key] = result;
    // 由于改变了原字符串,但regex.lastIndex并未被重置,仍然从此位置开始匹配
    // '我是{{name}}'.length === '我是jack，年龄{', 所以第二个{{age}}并没有被匹配上
    input = input.replace(pattern, eval(`data.${key}`));
    regex.lastIndex = 0; // 重置lastIndex;
  }
  return input;
}

const string = '我是{{user.name}}，年龄{{user.age}}，性别{{user.sex}}';
const person = {
  name: 'jack',
  age: 18,
  sex: 'male'
};

console.log(template(string, { user: person }));

// var regex1 = RegExp(/\{\{(\w+)\}\}/, 'g');
// var str1 = '我是{{name}}，年龄{{age}}，性别{{sex}}';
// var array1;

// while ((array1 = regex1.exec(str1)) !== null) {
//   console.log(array1, regex1.lastIndex);
// }