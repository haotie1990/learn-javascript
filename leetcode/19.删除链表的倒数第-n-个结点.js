/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
 *
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (42.48%)
 * Likes:    1476
 * Dislikes: 0
 * Total Accepted:    451.4K
 * Total Submissions: 1.1M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 
 * 进阶：你能尝试使用一趟扫描实现吗？
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：head = [1], n = 1
 * 输出：[]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中结点的数目为 sz
 * 1 
 * 0 
 * 1 
 * 
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  // https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/shan-chu-lian-biao-de-dao-shu-di-nge-jie-dian-b-61/
  let pre = null;
  let mid = null;
  let next = null;
  while (n--) {
    next = next ? next.next : head;
  }
  // next此时指正正数第n个节点
  while(next) {
    mid = mid ? mid.next : head;
    next = next.next;
  }
  // 如果倒数第n个节点指向首节点，直接处理
  if (mid === head) {
    return mid.next;
  }
  // mid 指向倒数第n个节点
  do {
    pre = pre ? pre.next : head;
  } while(pre && pre.next !== mid)
  // pre指向倒数n+1个节点
  if (pre) {
    pre.next = mid.next;
    return head;
  }
  // 链表只有一个节点，并且需要删除
  return pre;
};
// @lc code=end

