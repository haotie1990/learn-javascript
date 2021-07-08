'use strict';

/**
 * 给定一个数组，按找到每个元素右侧第一个比它大的数字，没有的话返回-1 规则返回一个数组
 * 给定数组：[2,6,3,8,10,9]
 * 返回数组：[6,8,8,10,-1,-1]
 */

function findMaxValues(array) {
  const result = [];
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (array[j] > array[i]) {
        result.push(array[j]);
        break;
      }
    }
    if (result.length < i + 1) {
      result.push(-1);
    }
  }
  return result;
}

// https://blog.csdn.net/smileiam/article/details/88732245
function findMaxValuesStack(array) {
  const length = array.length;
  const result = new Array(length);
  const stack = [0]; // stack保存未找到右侧第一个比其大元素的索引
  let index = 1;
  while (index < length) {
    const top = stack.length ? stack[stack.length - 1] : -1;
    // 当遇到一个元素其比栈顶索引对应元素大时，将栈顶索引出栈，并设置其最大值
    // 循环取栈顶索引对应元素与遍历到的元素进行对比，重复上一步判断，直到栈空或遍历到的元素小于栈顶索引对应元素
    if (stack.length && array[index] > array[top]) {
      result[stack.pop()] = array[index];
    } else {
      stack.push(index);
      index++;
    }
  }
  while (stack.length) {
    result[stack.pop()] = -1;
  }
  return result;
}

// x y z，z < y && z > x -> y > x
const array = [2, 5, 4, 6, 8, 10, 9];
const result = findMaxValuesStack(array);
console.log(array);
console.log(result);