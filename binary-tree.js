/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth(root = this.root) {
    if (this.root === null) return 0;

    let depth = 1;

    if (root.left && !root.right) {
      depth += this.minDepth(root.left);
    } else if (!root.left && root.right) {
      depth += this.minDepth(root.right);
    } else if (root.left && root.right) {
      depth += this.minDepth(root.left) < this.minDepth(root.right) ? this.minDepth(root.left) : this.minDepth(root.right);
    }
    return depth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(root = this.root) {
    if (this.root === null) return 0;

    let depth = 1;

    if (root.left && !root.right) {
      depth += this.maxDepth(root.left);
    } else if (!root.left && root.right) {
      depth += this.maxDepth(root.right);
    } else if (root.left && root.right) {
      depth += this.maxDepth(root.left) > this.maxDepth(root.right) ? this.maxDepth(root.left) : this.maxDepth(root.right);
    }
    return depth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {

    let maxSum = 0;

    function sumHelper(node) {
      if (node === null) return 0;
      const leftSum = sumHelper(node.left);
      const rightSum = sumHelper(node.right);
      maxSum = Math.max(maxSum, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    sumHelper(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (this.root === null) return null;

    let nextLarge = null;

    function nextLargerHelper(root, lowerBound) {
      if (root.val > lowerBound && (nextLarge === null || root.val < nextLarge)) nextLarge = root.val;

      if (root.left) nextLargerHelper(root.left, lowerBound);
      if (root.right) nextLargerHelper(root.right, lowerBound);
    }

    nextLargerHelper(this.root, lowerBound);
    return nextLarge;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    function findDepth(currentNode, node) {
      if (currentNode === node) return 1;

      if (currentNode.left && findDepth(currentNode.left, node)) return 1 + findDepth(currentNode.left, node);
      if (currentNode.right && findDepth(currentNode.right, node)) return 1 + findDepth(currentNode.right, node);
    }

    function findParent(currentNode, targetNode) {
      if (currentNode === targetNode) return null;

      if (currentNode.left === targetNode || currentNode.right === targetNode) return currentNode;
      
      if (currentNode.left && findParent(currentNode.left, targetNode)) return findParent(currentNode.left, targetNode);
      if (currentNode.right && findParent(currentNode.right, targetNode)) return findParent(currentNode.right, targetNode);
    }
    return findParent(this.root, node1) !== findParent(this.root, node2) && findDepth(this.root, node1) === findDepth(this.root, node2);
  }


  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  // static serialize(tree) {
  //   let toSerialize = [];

  //   function fill(node) {
  //     if (node) {
  //       toSerialize.push(node.val);
  //       fill(node.left);
  //       fill(node.right);
  //     } else {
  //       toSerialize.push("null");
  //     }
  //   }
  //   fill(tree.root);
  //   return toSerialize.join(",");
  // }

  static serialize(tree) {
    if (tree === null) return "[]";
  
    function serializeHelper(root) {
      let str = root.val;

      if (root.left === null) {
        str += ",null";
      } else {
        str += `,${serializeHelper(root.left)}`;
      }
      if (root.right === null) {
        str += ",null";
      } else {
        str += `,${serializeHelper(root.right)}`;
      }
      return str;
    }

    return serializeHelper(tree.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    let nodeArr = stringTree.split(',');

    function deserializeHelper() {
      let currentVal = nodeArr.shift();
      if (currentVal === "null") return null;

      let currentNode = new BinaryTreeNode(+currentVal);
      currentNode.left = deserializeHelper();
      currentNode.right = deserializeHelper();
      return currentNode;
    }
    
    let root = deserializeHelper();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
