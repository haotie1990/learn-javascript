
console.log('loading module a');

export const moduleA = {
  name: 'moduleA',
  print: function() {
    console.log('print module a');
  }
}

export default 34; // export default导出的是一个值为34，变量名为default的接口

// export 34; // 报错，因为export导出的是一个接口