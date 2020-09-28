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

    let root = null;

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
                  root = start.right;
                  tree.root = this.balance(root);
                  return;
              }
              start = start.right;
          }
  
          if(val <= start.data){
  
              if(start.left == null){
                  start.left = new Node(val);
                  start.left.id = ++this.id_count;
                  start.left.parent = start;
                  root = start.left;
                  tree.root = this.balance(root);
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
        // console.log("RETURN");
      return;
    }
  
    if (val > root.data) {
        // console.log("RIGHT SUBTREE");
      this.deleteRecursive(val, root.right, root);
    }
  
    if (val < root.data) {
        // console.log("RIGHT SUBTREE");
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
          // console.log("LEFT SUBTREE");
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

        // console.log("RIGHT SUBTREE");
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
      // console.log("END");
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
      // console.log(node.data);
      this.inOrder(node.right);
  }

  BinaryTree.prototype.preOrder = function(node){
    if(!node)
      return;

    // console.log(node.data);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  BinaryTree.prototype.postOrder = function(node){
    if(!node)
      return;

    this.postOrder(node.left);
    this.postOrder(node.right);
    // console.log(node.data);
  }

  BinaryTree.prototype.rightRotate = function(node){
    let temp = node.parent;
    temp.left = node.right;
    node.right = temp;
    temp.parent.right = node;
    node.parent = temp.parent;
    temp.parent = node;

    if(node.parent === this.root){
      node.parent = node;
      tree.root = node;
    }

    return node;

  }

  BinaryTree.prototype.leftRotate = function(node){
    let temp = node.parent;
    temp.right = node.left;
    node.left = temp;
    temp.parent = node;
    node.parent = node;

    if(this.root === node.parent){
      node.parent = node;
      tree.root = node;
    }

    return node;

  }

  BinaryTree.prototype.rightLeftRotate = function(ancestor){
    let nodeParent = ancestor.right;
    let node = ancestor.right.left;
    // console.log(ancestor.right);
    ancestor.right = this.rightRotate(ancestor.right.left);
    ancestor = this.leftRotate(ancestor.right);
    console.log(ancestor);
    return ancestor;
  }

  BinaryTree.prototype.leftRightRotate = function(ancestor){
    let nodeParent = ancestor.left;
    let node = ancestor.left.right;
    ancestor.left = this.rightRotate(ancestor.left.right);
    ancestor = this.leftRotate(ancestor.left);
    return ancestor;
  }

  BinaryTree.prototype.height = function(node){
    if(!node)
      return 0;
    return (1 + Math.max(this.height(node.left),this.height(node.right)));
  }

  BinaryTree.prototype.balance = function(node){

    // console.log(node.parent.parent);

    if(node.parent && node.parent.parent){

      let ancestor = node.parent.parent;

      const balance_factor = this.height(ancestor.left) - this.height(ancestor.right);

      console.log("BALANCE_FACTOR: "+balance_factor);
      // console.log(ancestor);

      if(balance_factor === -1 || balance_factor ===0 || balance_factor ===1){

        if(this.root === node)
          return node;

        return this.balance(ancestor);
      }else{
        
        //LL-Case
        if(ancestor.left && ancestor.left.left && node === ancestor.left.left){
          node.parent.parent = this.rightRotate(ancestor);
          return this.balance(ancestor);
        }

        //LR-Case
        if(ancestor.left && ancestor.left.right && node === ancestor.left.right){
          node.parent.parent = this.leftRightRotate(ancestor);
          return this.balance(ancestor);
        }

        //RR-Case
        if(ancestor.right && ancestor.right.right && node === ancestor.right.right){
          node.parent.parent = this.leftRotate(ancestor);
          return this.balance(ancestor);
        }

        //RL-Case
        if(ancestor.right && ancestor.right.left && node === ancestor.right.left){
          // console.log(ancestor.right.left);
          node.parent.parent = this.rightLeftRotate(ancestor);
          return this.balance(ancestor);
        }

      }

    }

    BinaryTree.prototype.maxHeight = function (node){
      return Math.max(this.height(node.left), this.height(node.right))
    }

    return node;

  }

  function literal(obj){
    return obj;
  }
  
  let tree = new BinaryTree();
  tree.insert(99);
  tree.insert(100);
  tree.insert(31);
  tree.insert(90);
  tree.insert(40);
  tree.insert(34);
  tree.insert(458);
  tree.insert(12);
  // tree.insert(40);
  // tree.insert(46);
  // tree.insert(50);
  // tree.insert(70);

  tree.inOrder(tree.root);

  console.log(tree.height(tree.root));