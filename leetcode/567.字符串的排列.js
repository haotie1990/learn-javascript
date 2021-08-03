/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 *
 * https://leetcode-cn.com/problems/permutation-in-string/description/
 *
 * algorithms
 * Medium (42.78%)
 * Likes:    391
 * Dislikes: 0
 * Total Accepted:    100K
 * Total Submissions: 233.8K
 * Testcase Example:  '"ab"\n"eidbaooo"'
 *
 * 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。
 * 
 * 换句话说，s1 的排列之一是 s2 的 子串 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s1 = "ab" s2 = "eidbaooo"
 * 输出：true
 * 解释：s2 包含 s1 的排列之一 ("ba").
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s1= "ab" s2 = "eidboaoo"
 * 输出：false
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s1.length, s2.length <= 10^4
 * s1 和 s2 仅包含小写字母
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  // 暴力法
  // let isTrue = false;
  // let used = Array.from({ length: s1.length }).fill(false);
  // function generate(str, length, used) {
  //   if (str.length === length) {
  //     if (s2.includes(str)) {
  //       isTrue = true;
  //     }
  //     return;
  //   }
  //   for (let i = 0; i < s1.length; i++) {
  //     if (used[i] === false) {
  //       used[i] = true;
  //       generate(str + s1.charAt(i), length, used.slice(0));
  //       used[i] = false;
  //     }
  //   }
  // }
  // generate('', s1.length, used);
  // return isTrue;

  // 滑动窗口
  let n = s1.length;
  let m = s2.length;
  if (n > m) {
    return false;
  }
  const aCode = 'a'.charCodeAt();
  const cnt1 = new Array(26).fill(0);
  const cnt2 = new Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    cnt1[s1.charCodeAt(i) - aCode]++;
    cnt2[s2.charCodeAt(i) - aCode]++;
  }
  if (cnt1.toString() === cnt2.toString()) {
    return true;
  }
  for (let i = n; i < m; i++) {
    cnt2[s2.charCodeAt(i) - aCode]++;
    cnt2[s2.charCodeAt(i - n) - aCode]--;
    if (cnt1.toString() === cnt2.toString()) {
      return true;
    }
  }
  return false;
};
// @lc code=end

