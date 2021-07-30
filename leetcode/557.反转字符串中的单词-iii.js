/*
 * @lc app=leetcode.cn id=557 lang=javascript
 *
 * [557] 反转字符串中的单词 III
 *
 * https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/description/
 *
 * algorithms
 * Easy (74.37%)
 * Likes:    311
 * Dislikes: 0
 * Total Accepted:    137.1K
 * Total Submissions: 184.4K
 * Testcase Example:  `"Let's take LeetCode contest"`
 *
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 * 
 * 
 * 
 * 示例：
 * 
 * 输入："Let's take LeetCode contest"
 * 输出："s'teL ekat edoCteeL tsetnoc"
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let len = s.length;
  let arr = s.split(''); // javascript中string类型是不可变的，此是将string转为array处理
  let space = ' ';
  let left = 0;
  let right = -1;
  for (let i = 0; i < len; i++) {
    if ((arr[i] === space) || (i === len -1)) {
      right = (i === len - 1) ? i : (i - 1);
      while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
      left = i +1;
      right = -1;
    }
  }
  return arr.join('');
};
// @lc code=end

