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
          this.root.parent = null;
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
    let temp = node.left;
    if(node.parent && node.parent.left  === node){
      node.parent.left = temp;
    }

    if(node.parent && node.parent.right  === node){
      node.parent.right = temp;
    }
    node.left = temp.right;
    temp.right = node;
    temp.parent = node.parent;
    node.parent = temp;
    return temp;
  }

  BinaryTree.prototype.leftRotate = function(node){
    let temp = node.right;
    if(node.parent && node.parent.left  === node){
      node.parent.left = temp;
    }

    if(node.parent && node.parent.right  === node){
      node.parent.right = temp;
    }
    node.right = temp.left;
    temp.left = node;
    temp.parent = node.parent;
    node.parent = temp;
    return temp;
  }

  BinaryTree.prototype.rightLeftRotate = function(node){
    node.right = this.rightRotate(node.right);
    node = this.leftRotate(node);
    return node;
  }

  BinaryTree.prototype.leftRightRotate = function(node){
    node.left = this.leftRotate(node.left);
    node = this.rightRotate(node);
    return node;
  }

  BinaryTree.prototype.height = function(node){
    if(!node)
      return 0;
    return (1 + Math.max(this.height(node.left),this.height(node.right)));
  }

  BinaryTree.prototype.balanceFactor = function(node){
    if(!node)
      return 0;
    return this.height(node.left) - this.height(node.right);
  }

  BinaryTree.prototype.balance = function(node){

    if(node){

      const balance_factor = this.balanceFactor(node);

      console.log("BALANCE_FACTOR: "+balance_factor);


        if(balance_factor > 1){
          console.log("LEFT SUBTREE");

          if(node.left.left){
            console.log("LL");
            node = this.rightRotate(node);
          }
          else if(node.left.right){
            console.log("LR");
            node = this.leftRightRotate(node);
          }

        }

        if(balance_factor <-1){
          
          console.log("RIGHT SUBTREE");

          if(node.right.right){
            console.log("RR");
            node = this.leftRotate(node);
          }
          else if(node.right.left){
            console.log("RL");
            node = this.rightLeftRotate(node);
          }

        }

        if(node.parent == null){
          return node;
        }

        return this.balance(node.parent);

      // }

    }

    console.log("END");
    return node;

  }

  BinaryTree.prototype.maxHeight = function (node){
    return Math.max(this.height(node.left), this.height(node.right))
  }

  function literal(obj){
    return obj;
  }
  
  let tree = new BinaryTree();

  tree.insert(90);
  tree.insert(91);
  tree.insert(100);
  tree.insert(105);
  tree.insert(40);
  tree.insert(34);
  tree.insert(458);
  tree.insert(12);
  tree.insert(40);
  tree.insert(46);
  tree.insert(50);
  tree.insert(70);

  // console.log(tree.root)

  tree.delete(90);
  tree.inOrder(tree.root);

  // console.log(tree.height(tree.root));