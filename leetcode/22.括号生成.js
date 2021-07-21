/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (77.23%)
 * Likes:    1901
 * Dislikes: 0
 * Total Accepted:    306.7K
 * Total Submissions: 397.2K
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：n = 1
 * 输出：["()"]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let result = [];
  const isValid = function(array) {
    let str = array.join('');
    let count = 1;
    while(count <= n) {
      str = str.replace('()', '');
      count += 1;
    }
    return str.length === 0;
  }
  const generateAll = function(array, index, length) {
    if (index === length) {
      if (isValid(array)) {
        result.push(array.join(''));
      }
      return;
    } else {
      array[index] = '(';
      generateAll([...array], index + 1, length);
      array[index] = ')';
      generateAll([...array], index + 1, length);
    }
  }
  generateAll([], 0, n * 2);
  return result;
};
// @lc code=end
