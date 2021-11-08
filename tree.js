/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  // sumValues() {
  //   if (!this.root) return 0;

  //   const stackToSum = [this.root];
  //   let sum = 0;

  //   while (stackToSum.length) {
  //     const currentNode = stackToSum.pop();
  //     sum += currentNode.val;

  //     for (let child of currentNode.children) {
  //       stackToSum.push(child);
  //     }
  //   }
  //   return sum;
  // }

  sumValues(root = this.root) {
    if (root === null) return 0;
    let sum = root.val;

    for (let child of root.children) {
      if (child.children.length == 0) {
        sum += child.val;
      } else {
        sum += this.sumValues(child)
      } 
    }
    return sum;
  }

  

  /** countEvens(): count all of the nodes in the tree with even values. */

  // countEvens() {
  //   if (this.root === null) return 0;
  //   let count = 0;
  //   let stackToCount = [this.root];
  //   while (stackToCount.length > 0) {
  //     let currentNode = stackToCount.pop();
  //     if (currentNode.val % 2 === 0) count ++;
  //     for (let child of currentNode.children) {
  //       stackToCount.push(child);
  //     }
  //   }
  //   return count;
  // }

  countEvens(root = this.root) {
    if (this.root === null) return 0;

    let count = 0
    if (root.val % 2 === 0) {
      count++;
    }
    
    for (let child of root.children) {
      count += this.countEvens(child);
    }

    return count;
  }



  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  // numGreater(lowerBound) {
  //   if (this.root === null) return 0;
  //   let count = 0;
  //   let stackToCount = [this.root];

  //   while (stackToCount.length) {
  //     const currentNode = stackToCount.pop();

  //     if (currentNode.val > lowerBound) {
  //       count++;
  //     }

  //     for (let child of currentNode.children) {
  //       stackToCount.push(child);
  //     }

  //   }
  //   return count;
  // }

  numGreater(lowerBound, root = this.root) {
    if (this.root === null) return 0;

    let count = 0;

    if (root.val > lowerBound) {
      count++;
    }
    for (let child of root.children) {
      count += this.numGreater(lowerBound, child);
    }
    return count;
  }
}

module.exports = { Tree, TreeNode };
