
class TreeNode {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

const five = new TreeNode(5);
const four = new TreeNode(4);
const eight = new TreeNode(8);
const eleven = new TreeNode(11);
const seven = new TreeNode(7);
const two = new TreeNode(2);
const thirteen = new TreeNode(13);
const four1 = new TreeNode(4);
const five1 = new TreeNode(5);
const one = new TreeNode(1);

five.left = four;
five.right = eight;

four.left = eleven;
eleven.left = seven;
eleven.right = two;

eight.left = thirteen;
eight.right = four1;
four1.left = five1;
four1.right = one;

/**
 * 查找二叉树，找到路径，且路径和等于指定值
 * @param {*} root 
 * @param {*} targetSum 
 * @returns 
 */
function pathSum(root, targetSum) {
  let result = [];
  const collectPath = function(node, sum, path) {
    if (!node) {
        return;
    }
    sum = sum - node.val;
    path.push(node.val);
    if (!node.left && !node.right && sum === 0) {
      result.push(path);
      return;
    }
    collectPath(node.left, sum, [].concat(path));
    collectPath(node.right, sum, [].concat(path));
  }
  collectPath(root, targetSum, []);
  return result;
}

const result = pathSum(five, 22);

console.log(result);