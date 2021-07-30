/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 *
 * https://leetcode-cn.com/problems/move-zeroes/description/
 *
 * algorithms
 * Easy (63.87%)
 * Likes:    1145
 * Dislikes: 0
 * Total Accepted:    425.3K
 * Total Submissions: 665.9K
 * Testcase Example:  '[0,1,0,3,12]'
 *
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 
 * 示例:
 * 
 * 输入: [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 * 
 * 说明:
 * 
 * 
 * 必须在原数组上操作，不能拷贝额外的数组。
 * 尽量减少操作次数。
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let len = nums.length;
  let zeroCount = 0;
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      zeroCount++;
    }
  }
  if (zeroCount === len) {
    return;
  }
  while (zeroCount > 0) {
    let zeroIndex = -1;
    for (let i = 0; i < len; i++) {
      if (zeroIndex === -1 && nums[i] === 0) {
        zeroIndex = i;
      } else if (zeroIndex >= 0 && nums[i] !== 0) {
        [nums[zeroIndex], nums[i]] = [nums[i], nums[zeroIndex]];
        zeroIndex = i;
      }
    }
    zeroCount--;
  }
};
// @lc code=end

