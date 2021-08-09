/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 *
 * https://leetcode-cn.com/problems/single-number/description/
 *
 * algorithms
 * Easy (71.79%)
 * Likes:    1958
 * Dislikes: 0
 * Total Accepted:    458.8K
 * Total Submissions: 638.8K
 * Testcase Example:  '[2,2,1]'
 *
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 
 * 说明：
 * 
 * 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 * 
 * 示例 1:
 * 
 * 输入: [2,2,1]
 * 输出: 1
 * 
 * 
 * 示例 2:
 * 
 * 输入: [4,1,2,1,2]
 * 输出: 4
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  // 也可以使用map先遍历一遍数组，计算每一个元素出现的次数，再遍历map，找到次数为1的元素
  // for (let i = 0; i < nums.length; i++) {
  //   let hasSame = false;
  //   for (let j = 0; j < nums.length; j++) {
  //     if (nums[i] === nums[j] && i !== j) {
  //       hasSame = true;
  //       break;
  //     }
  //   }
  //   if (!hasSame) {
  //     return nums[i];
  //   }
  // }

  // 位运算
  /**
   * 异或运算符(^)，我们了解下，这个运算符的功能
   * * 任何数和自己做异或运算，结果为 0，即 a⊕a=0
   * * 任何数和 0 做异或运算，结果还是自己，即 a⊕0=a
   * * 异或运算中，满足交换律和结合律，也就是a⊕b⊕a=b⊕a⊕a=b⊕(a⊕a)=b⊕0=b
   */
  // 所以出现两次的字母异或运算得0，跟出现一次的字母异或运算得到自己
  let num = nums[0];
  for (let i = 1; i < nums.length; i++) {
    num ^= nums[i];
  }
  return num;
};
// @lc code=end
