function Node(val) {
  this.left = null;
  this.right = null;
  this.parent = null;
  this.data = val;
}

function BinaryTree() {
  this.root = null;
}

BinaryTree.prototype.insert = function (val) {
    if(!this.root){
        this.root = new Node(val);
        return;
    }

    let start = this.root;
    while(start){
        if(val >= start.data){
            if(start.right == null){
                start.right = new Node(val);
                start.right.parent = start;
                return;
            }
            start = start.right;
        }

        if(val <= start.data){

            if(start.left == null){
                start.left = new Node(val);
                start.left.parent = start;
                return;
            }

            start = start.left;
        }
    }
}

BinaryTree.prototype.delete = function (val) {
  this.deleteRecursive(val, this.root, null);
};

BinaryTree.prototype.insertRecursive = function (val, root, parent) {
  // if tree is empty, initialize root
  if (!root) {
    root = new Node(val);
    root.parent = parent;
    return root;
  }

  if (val > root.data) {
    root.right = this.insertRecursive(val, root.right, root);
  }

  if (val < root.data) {
    root.left = this.insertRecursive(val, root.left, root);
  }
};

BinaryTree.prototype.deleteRecursive = function (val, root, parent) {
  if (!root) {
      console.log("RETURN");
    return;
  }

  if (val > root.data) {
    this.deleteRecursive(val, root.right, root);
  }

  if (val < root.data) {
    this.deleteRecursive(val, root.left, root);
  }

  if (val === root.data) {
    //Handle left subtree case
    if (root === parent.left) {
      //Handle empty leaf node
      if (!root.left && !root.right) {
        parent.left = null;
      }

      if (!root.left && root.right) {
        let temp = parent.left;
        parent.left = root.right;
        root.right.parent = parent;
        temp = null;
      }

      if (!root.right && root.left) {
        let temp = parent.left;
        parent.left = root.left;
        root.left.parent = parent;
        temp = null;
      }

      if (root.left && root.right) {
        //        smallest-parent
        //        / ---> left subtree of parent
        //     smallest
        //     /    \
        //    nil   r-node
        // Walk left subtree of node to get smallest node
        let temp = this.smallestTreeNode(root);
        // Resign smallest tree right node
        temp.parent.left = temp.right;

        temp.left = parent.left.left;
        temp.right = parent.left.right;
        parent.left = temp;
        temp.parent = parent;
      }
    }

    //Handle right subtree case
    if (root === parent.right) {
      //Handle empty leaf node
      if (!root.left && !root.right) {
        parent.right = null;
      }

      if (!root.left && root.right) {
        let temp = parent.left;
        parent.right = root.right;
        root.right.parent = parent;
        temp = null;
      }

      if (!root.right && root.left) {
        let temp = parent.left;
        parent.right = root.left;
        root.left.parent = parent;
        temp = null;
      }

      if (root.left && root.right) {
        //        smallest-parent
        //        / ---> left subtree of parent
        //     smallest
        //     /    \
        //    nil   r-node
        // Walk left subtree of node to get smallest node
        let temp = this.smallestTreeNode(root);
        // Resign smallest tree right node
        temp.parent.left = temp.right;

        temp.left = parent.right.left;
        temp.right = parent.right.right;
        parent.right = temp;
        temp.parent = parent;
      }
    }
  }
};

BinaryTree.prototype.delete = function (val) {
  this.deleteRecursive(val, this.root, null);
};

BinaryTree.prototype.smallestTreeNode = function (node) {
  if (!node.left) return node;
  return this.smallestTreeNode(node.left);
};

BinaryTree.prototype.inOrder = function(node){
    if(!node)
        return;
    this.inOrder(node.left);
    console.log(node.data);
    this.inOrder(node.right);
}

let tree = new BinaryTree();
tree.insert(40);
tree.insert(45);
tree.insert(31);
tree.insert(90);
tree.insert(40);
tree.insert(34);
tree.insert(99);
tree.insert(12);



// console.log(tree.root);

// tree.inOrder(tree.root);
console.log(tree.root.left);
tree.delete(40);
tree.inOrder(tree.root);