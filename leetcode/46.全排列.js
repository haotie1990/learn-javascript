/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (78.10%)
 * Likes:    1466
 * Dislikes: 0
 * Total Accepted:    369.3K
 * Total Submissions: 472.7K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [1]
 * 输出：[[1]]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * -10 
 * nums 中的所有整数 互不相同
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
  let result = [];
  let used = Array.from({ length: nums.length }).fill(false);
  function search(collection, used) {
    if (collection.length === nums.length) {
      result.push(collection);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i] === false) {
        used[i] = true;
        search(collection.concat(nums[i]), used.slice(0));
        used[i] = false; // 重置状态
      }
    }
    collection = null;
    used = null;
  }
  search([], used);
  return result;
}
// @lc code=end