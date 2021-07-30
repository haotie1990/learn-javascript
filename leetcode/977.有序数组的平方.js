/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 *
 * https://leetcode-cn.com/problems/squares-of-a-sorted-array/description/
 *
 * algorithms
 * Easy (72.36%)
 * Likes:    257
 * Dislikes: 0
 * Total Accepted:    128.5K
 * Total Submissions: 177.6K
 * Testcase Example:  '[-4,-1,0,3,10]'
 *
 * 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [-4,-1,0,3,10]
 * 输出：[0,1,9,16,100]
 * 解释：平方后，数组变为 [16,1,0,9,100]
 * 排序后，数组变为 [0,1,9,16,100]
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [-7,-3,2,3,11]
 * 输出：[4,9,9,49,121]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 10^4
 * -10^4 
 * nums 已按 非递减顺序 排序
 * 
 * 
 * 
 * 
 * 进阶：
 * 
 * 
 * 请你设计时间复杂度为 O(n) 的算法解决本问题
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  let negative = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
      negative = i;
    } else {
      break;
    }
  }
  let result = [];
  let i = negative;
  let j = negative + 1;
  while (i >= 0 || j < nums.length) {
    if (i < 0) {
      result.push(nums[j] * nums[j]);
      j++;
    } else if (j >= nums.length) {
      result.push(nums[i] * nums[i]);
      i--;
    } else if (nums[i] * nums[i] < nums[j] * nums[j]) {
      result.push(nums[i] * nums[i]);
      i--;
    } else {
      result.push(nums[j] * nums[j]);
      j++;
    }
  }
  return result;
};
// @lc code=end

