/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 *
 * https://leetcode-cn.com/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (46.32%)
 * Likes:    1046
 * Dislikes: 0
 * Total Accepted:    270.5K
 * Total Submissions: 583.7K
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
 * 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * intervals[i].length == 2
 * 0 i i 
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  const merged = [];
  // const swap = function(i, j) {
  //   [intervals[i], intervals[j]] = [intervals[j], intervals[i]];
  // }
  // const quickSort = function(left, right) {
  //   if (left < right) {
  //     let p = left;
  //     let idx = p + 1;
  //     for (let i = idx; i <= right; i++) {
  //       if (intervals[i][0] < intervals[p][0]) {
  //         swap(i, idx);
  //         idx++;
  //       }
  //     }
  //     swap(p, idx - 1);
  //     p = idx - 1;
  //     quickSort(left, p - 1);
  //     quickSort(p + 1, right);
  //   }
  // }
  // quickSort(0, intervals.length - 1);
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < intervals.length; i++) {
    if (merged.length) {
      const [s, e] = merged.pop();
      const [s1, e1] = intervals[i];
      if (s <= s1 && s1 <= e) {
        merged.push([s, Math.max(e, e1)]);
      } else if (s <= e1 && e1 <= e) {
        merged.push([Math.min(s, s1), e]);
      } else {
        merged.push([s, e]);
        merged.push([s1, e1]);
      }
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
};
// @lc code=end

