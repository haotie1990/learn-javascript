
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 广度优先搜索
function getPathSum(root) {
  const paths = [];
  if (!root) {
    return paths;
  }
  const node_queue = [root];
  const path_queue = [[root.value]];

  while (node_queue.length) {
    const node = node_queue.shift();
    const path = path_queue.shift();

    if (!node.left && !node.right) {
      paths.push(path);
    } else {
      if (node.left) {
        node_queue.push(node.left);
        path_queue.push(path.concat(node.left.value));
      }

      if (node.right) {
        node_queue.push(node.right);
        path_queue.push(path.concat(node.right.value))
      }
    }
  }

  return paths.map(path => path.reduce((acc, v) => acc += v, 0)).reduce((acc, v) => acc + v, 0);
}

const one = new TreeNode(1);
const two = new TreeNode(2);
const three = new TreeNode(3);
const four = new TreeNode(4);
const five = new TreeNode(5);
const six = new TreeNode(6);
const seven = new TreeNode(7);

one.left = two;
one.right = three;

two.left = four;
two.right = five;

three.left = six;
three.right = seven;

console.log('%o', one);

function preOrderTree(root, array) {
  array = array || [];
  if (root) {
    array.push(root.value);
    preOrderTree(root.left, array);
    preOrderTree(root.right, array);
  }
  return array;
}

function inOrderTree(root, array) {
  array = array || [];
  if (root) {
    inOrderTree(root.left, array);
    array.push(root.value);
    inOrderTree(root.right, array);
  }
  return array;
}

function postOrderTree(root, array) {
  array = array || [];
  if (root) {
    postOrderTree(root.left, array);
    postOrderTree(root.right, array);
    array.push(root.value);
  }
  return array;
}

// console.log(preOrderTree(one));
// console.log(inOrderTree(one));
// console.log(postOrderTree(one));

console.log(getPathSum(one));