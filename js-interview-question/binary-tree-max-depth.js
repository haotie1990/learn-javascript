// 二叉树的最大深度
function treeMaxDepth(tree) {
  let max = 0;
  if (!tree) {
    return max;
  }
  function dfs(root, depth) {
    if (!root.left && !root.right) {
      max = Math.max(max, depth);
    } else {
      if (root.left) {
        dfs(root.left, depth + 1);
      }
      if (root.right) {
        dfs(root.right, depth + 1);
      }
    }
  }
  dfs(tree, max + 1);
  return max;
}