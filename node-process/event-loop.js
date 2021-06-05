'use strict';

function func1() {
  console.log('this is func1');
}

function func2() {
  console.log('this is func2');
  setTimeout(func21, 0);
}

function func21() {
  console.log('this is func21');
}

function func3() {
  console.log('this is func3');
  new Promise((resolve, reject) => {
    console.log('this is promise in func3');
    resolve();
  }).then(func31);
}

function func31() {
  console.log('this is func31');
}

function func4() {
  console.log('this is func4');
}

function func5() {
  console.log('this is func5');
}

console.log('================================');

func1();

// setTimeout(func2, 100);
setTimeout(func2, 0);

new Promise((resolve, reject) => {
  console.log('this is promise');
  resolve();
}).then(func3);

process.nextTick(func4);

setImmediate(func5);