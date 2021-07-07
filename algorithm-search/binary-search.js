
/**
 * 二分查找
 * 算法描述：
 *    给予一个包含n个元素的数组A（要求数组有序）
 *    1. 令left为0，right为n-1
 *    2. 如果left>right，则搜索失败
 *    3. 令m（中间元素）为（left + right）/ 2
 *    4. 如果A[m] < target，则令left为m+1，并回归步骤2
 *    5. 如果A[m] > target，则令right为m-1，并回顾步骤2
 *    6. 如果A[m] = target，则搜索成功
 * @param {Array} array 
 * @param {Number} target 
 * @param {Number} left 
 * @param {Number} right 
 */
function BinarySearch(array, target, left, right) {
  left = left || 0;
  right = right || array.length - 1;
  if (left > right) {
    return -1;
  }
  let middle = Math.floor((left + right) / 2);
  if (array[middle] < target) {
    return BinarySearch(array, target, middle + 1, right);
  } else if (array[middle] > target) {
    return BinarySearch(array, target, left, middle - 1);
  } else {
    return middle;
  }
}

module.exports = BinarySearch;