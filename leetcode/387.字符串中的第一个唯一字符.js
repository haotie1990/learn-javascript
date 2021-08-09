/*
 * @lc app=leetcode.cn id=387 lang=javascript
 *
 * [387] 字符串中的第一个唯一字符
 *
 * https://leetcode-cn.com/problems/first-unique-character-in-a-string/description/
 *
 * algorithms
 * Easy (52.77%)
 * Likes:    422
 * Dislikes: 0
 * Total Accepted:    203.3K
 * Total Submissions: 384.7K
 * Testcase Example:  '"leetcode"'
 *
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 * 
 * 
 * 
 * 示例：
 * 
 * s = "leetcode"
 * 返回 0
 * 
 * s = "loveleetcode"
 * 返回 2
 * 
 * 
 * 
 * 
 * 提示：你可以假定该字符串只包含小写字母。
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  let map = new Map();
  for (let _s of s) {
    map.set(_s, (map.get(_s) || 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (map.get(s.charAt(i)) === 1) {
      return i;
    }
  }
  return -1;
};
// @lc code=end

