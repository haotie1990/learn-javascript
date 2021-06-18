'use strict';

/**
 * 手写数组转树
 */

function TreeNode(id, parent, value, children) {
  this.id = id;
  this.parent = parent;
  this.value = value;
  this.children = children || [];
}

function arrayToTree(array) {
  const map = {};
  let root = null;
  array.forEach(item => {
    map[item.id] = new TreeNode(item.id, item.parent, item.value);
  });
  array.forEach(item => {
    const node = map[item.id];
    const parent = map[item.parent];
    if (parent) {
      parent.children.push(node);
    } else {
      root = node;
    }
  });
  return root;
}

const array = [
  {
    id: 1,
    value: 1,
    parent: null
  },
  {
    id: 2,
    value: 2,
    parent: 1,
  },
  {
    id: 3,
    value: 3,
    parent: 1,
  },
  {
    id: 4,
    value: 4,
    parent: 2,
  },
  {
    id: 5,
    value: 5,
    parent: 3,
  }
];

/**
 *       1
 *     /   \
 *    /     \
 *   2       3
 *   |       |
 *   4       5
 */

const root = arrayToTree(array);
console.log(root);