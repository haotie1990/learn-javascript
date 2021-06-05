'use strict';

new Promise((resolve, reject) => {
  resolve('data1');
}).then((data) => {
  console.log(data);
}).then((data) => {
  console.log(data.toString());
}).catch((err) => {
  console.log('err', err);
}).finally(() => {
  console.log('finally');
})