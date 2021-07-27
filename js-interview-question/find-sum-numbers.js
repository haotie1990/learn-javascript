/**
 * 求给定数组中 N 个数相加之和为 sum 所有可能集合，请补充以下代码
 */

function findCollectionSumOfNumbers(array, n, sum) {
  // 枚举所有n个数的组合，判断组合的和等于sum
  let result = [];
  const generateAll = function(index, collection, arr) {
    if (collection.length === n) {
      const s = collection.reduce((acc, c) => acc += c, 0);
      if (s === sum) {
        result.push(collection);
      }
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      generateAll(index + 1, collection.concat(arr[i]), arr.slice(i + 1));
    }
  }
  generateAll(0, [], array.slice(0));
  return result;
}

console.log(findCollectionSumOfNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 10));

console.log(findCollectionSumOfNumbers([1, 0, -1, 0, -2, 2], 4, 0));