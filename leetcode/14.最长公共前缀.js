/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (40.41%)
 * Likes:    1719
 * Dislikes: 0
 * Total Accepted:    581.6K
 * Total Submissions: 1.4M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 
 * 如果不存在公共前缀，返回空字符串 ""。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 * 
 * 
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  let result = [];
  let index = 0;
  if (strs.length <= 1) {
    return strs.join('');
  }
  while (true) {
    let str = strs.reduce((p, c, i) => {
      if (i === 1) { // 没有设置initValue，i从1开始
        if (p.charAt(index) === c.charAt(index)) {
          return c.charAt(index);
        }
        return '';
      } else {
        if (p === c.charAt(index)) {
          return c.charAt(index);
        }
        return '';
      }
    });
    index++;
    if (str) {
      result.push(str);
    } else {
      break;
    }
  }
  return result.join('');
};
// @lc code=end