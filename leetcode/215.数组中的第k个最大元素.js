/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 *
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (64.69%)
 * Likes:    1194
 * Dislikes: 0
 * Total Accepted:    383.6K
 * Total Submissions: 592.9K
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * 
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 * 
 * 
 * 
 * 提示： 
 * 
 * 
 * 1 
 * -10^4 
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function(nums, k) {
  const target = nums.length - k;
  const quickSearch = function(array, left, right) {
    left = typeof left === 'number' ? left : 0;
    right = typeof right === 'number' ? right : array.length - 1;
    if (left === right) {
      return array[left];
    }
    if (left < right) {
      let p = left
      let index = p + 1;
      for (let i = index; i <= right; i++) {
        if (array[i] < array[p]) {
          [array[index], array[i]] = [array[i], array[index]];
          index++;
        }
      }
      [array[p], array[index - 1]] = [array[index - 1], array[p]];
      p = index - 1;
      if (p === target) {
        return array[p];
      } else if (p < target) {
        return quickSearch(array, p + 1, right);
      } else {
        return quickSearch(array, left, p - 1);
      }
    }
  }
  return quickSearch(nums);
};
// @lc code=end

