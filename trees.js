// Beware! Common JS style classes just for the fun of it....
// Remember when object oriented javascript was a complete nightmare!!

  function Node(val) {
    this.id = null;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.data = val;
  }
  
  function BinaryTree() {
    this.id_count = 0;
    this.root = null;
  }
  
  BinaryTree.prototype.insert = function (val) {

      if(!this.root){
          this.root = new Node(val);
          this.root.parent = this.root;
          this.root.id = ++this.id_count;
          return;
      }
  
      let start = this.root;

      while(start){

          if(val >= start.data){
              if(start.right == null){
                  start.right = new Node(val);
                  start.right.id = ++this.id_count;
                  start.right.parent = start;
                  return;
              }
              start = start.right;
          }
  
          if(val <= start.data){
  
              if(start.left == null){
                  start.left = new Node(val);
                  start.left.id = ++this.id_count;
                  start.left.parent = start;
                  return;
              }
  
              start = start.left;
          }
      }

  }
  
  BinaryTree.prototype.delete = function (val) {
    this.deleteRecursive(val, this.root, this.root);
  };
  
  BinaryTree.prototype.insertRecursive = function (val, root) {

    // if tree is empty, initialize root
    if (!root) {
      root = new Node(val);
      root.parent = null;
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
        console.log("RIGHT SUBTREE");
      this.deleteRecursive(val, root.right, root);
    }
  
    if (val < root.data) {
        console.log("RIGHT SUBTREE");
      this.deleteRecursive(val, root.left, root);
    } 

  
    if (val === root.data) {

    
        if(root === this.root){

            if(!root.left && !root.right){
                this.root = null;
                return;
            }

            if (!root.left && root.right) {
                this.root = root.right;
                this.root.parent = this.root;
              }
        
              if (!root.right && root.left) {
                this.root = root.left;
                this.root.parent = this.root;
              }
        
              if (root.left && root.right) {
                //        smallest-parent
                //        / ---> left subtree of parent
                //     smallest
                //     /    \
                //    nil   r-node
                // Walk left subtree of node to get smallest node
                let temp = this.largestTreeNode(root.left);
                // Resign smallest tree right node
                temp.parent.right = temp.right;
                temp.left = root.left;
                temp.right = root.right;
                this.root.parent = this.root = temp;
              }

        }
        
      //Handle left subtree case
      if (literal(root) === literal(parent.left)) {
          console.log("LEFT SUBTREE");
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
          let temp = this.largestTreeNode(root.left);
          // Resign smallest tree right node
          temp.parent.right = temp.right;
  
          temp.left = parent.left.left;
          temp.right = parent.left.right;
          parent.left = temp;
          temp.parent = parent;
        }
      }
  
      //Handle right subtree case
      if (literal(root) === literal(parent.right)) {
        //Handle empty leaf node

        console.log("RIGHT SUBTREE");
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
          let temp = this.largestTreeNode(root.left);
          // Resign smallest tree right node
          temp.parent.right = temp.right;
          temp.left = parent.right.left;
          temp.right = parent.right.right;
          parent.right = temp;
          temp.parent = parent;
        }
      }
      console.log("END");
    }
  };
  
  BinaryTree.prototype.delete = function (val) {
    this.deleteRecursive(val, this.root);
  };
  
  BinaryTree.prototype.largestTreeNode = function (node) {
    if (!node.left) return node;
    return this.largestTreeNode(node.right);
  };
  
  BinaryTree.prototype.inOrder = function(node){
      if(!node)
          return;
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
  }

  BinaryTree.prototype.preOrder = function(node){
    if(!node)
      return;

    console.log(node.data);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  BinaryTree.prototype.postOrder = function(node){
    if(!node)
      return;

    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.data);
  }

  BinaryTree.prototype.rightRotate = function(node){

    let temp = node.parent;
    node.right = temp;
    node.parent = temp.parent;
    temp.parent = node;

    if(node.parent === this.root){
      console.log("YES");
      node.parent = node;
      tree.root = node;
    }

    return node;

  }

  function literal(obj){
    return obj;
  }
  
  let tree = new BinaryTree();
  // tree.insert(40);
  // tree.insert(45);
  // tree.insert(31);
  // tree.insert(90);
  // tree.insert(40);
  // tree.insert(34);
  // tree.insert(99);
  // tree.insert(12);
  tree.insert(40);
  tree.insert(39);
  tree.insert(12);
  tree.inOrder(tree.root);
//   console.log(tree.root.parent);