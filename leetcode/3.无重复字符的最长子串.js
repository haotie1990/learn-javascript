/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (37.61%)
 * Likes:    5835
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 3M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: s = "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 
 * 
 * 示例 3:
 * 
 * 
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 * 
 * 
 * 示例 4:
 * 
 * 
 * 输入: s = ""
 * 输出: 0
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 
 * s 由英文字母、数字、符号和空格组成
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  // 暴力
  // let array = s.split('');
  // let length = array.length;
  // let max = 0;
  // for (let i = 0; i < length; i++) {
  //   let strings = [array[i]];
  //   if (strings.length > max) {
  //     max = strings.length;
  //   }
  //   for (let j = i + 1; j < length; j++) {
  //     let index = strings.indexOf(array[j]);
  //     strings.push(array[j]);
  //     if (index !== -1) {
  //       strings = strings.slice(index + 1);
  //     }
  //     if (strings.length > max) {
  //       max = strings.length;
  //     }
  //   }
  // }
  // array = null;
  // return max;

  // 滑动窗口
  let set = new Set();
  let len = s.length;
  let max = 0;
  let rk = -1;
  for (let i = 0; i < len; i++) {
    if (i !== 0) {
      set.delete(s.charAt(i - 1));
    }
    while (rk + 1 < len && !set.has(s.charAt(rk + 1))) {
      set.add(s.charAt(rk + 1));
      rk++;
    }
    max = Math.max(max, rk - i + 1);
  }
  return max;
};
// @lc code=end
