class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class BST{

    constructor(rootData=null){
        if(rootData)
            this.root = new Node(rootData);
        else
            this.root = null;
    }

    insertIt = (data) =>{
        let start = this.root;

        if(!start){
            this.root = new Node(data)
            return;
        }

        while(start != null){

            if(data >= start.data){
                if(!start.right){
                    start.right = new Node(data);
                    start.right.parent = start;
                    return;
                }
                start = start.right;
            }

            if(data <= start.data){
                if(!start.left){
                    start.left = new Node(data);
                    start.left.parent = start;
                    return;
                }
                start = start.left;
            }

        }
    }

    _inOrder = (root) => {
      if(!root)
        return;

      this._inOrder(root.left);
      console.log(root.data);
      this._inOrder(root.right);
    }

    _postOrder = (root) => {
      if(!root)
        return;

      this._postOrder(root.left);
      this._postOrder(root.right);
      console.log(root.data);
    }

    _preOrder = (root) => {
      if(!root)
        return;

      console.log(root.data);
      this._preOrder(root.left);
      this._preOrder(root.right);    
    }

    _height = (node)=>{
        if(!node)
            return 0;
        return (1+ (Math.max(this._height(node.left), this._height(node.right))));
    }


    findNode = (data) =>{
        let start = this.root;
        while(start){
            if(data > start.data){
                start = start.right;
                continue;
            }

            if(data < start.data){
                start = start.left;
                continue;
            }
        }

        if(!start)
            throw Error(`Data: ${data} not found in tree`)

        return start;
    }


    _inOrderSuccessor = (node) => {
        if(!node.right)
            return node;
        return this._inOrderSuccessor(node.right);
    }


    delete = (data) => {
        let start = this.root;

        while(start){

            if(data > start.data){
                start = start.right;
                continue;
            }

            if(data < start.data){
                start = start.left;
                continue;
            }

            if(data === start.data)
                break;
        }

        if(!start){
            throw Error(`Data: ${start} not found in tree`);
        }

        //Handle no child case
        if(!start.left && !start.right){
            if(start.parent && start.parent.left === start){
                start.parent.left = null;
            }

            if(start.parent && start.parent.right === start){
                start.parent.right = null;
            }

            if(!start.parent){
                this.root = null;
            }
            return;
        }

        //Handle one child case
        if(!start.left || !start.right){

            let temp;

            //Check if node is right child
            if(!start.left){
                temp = start.right;
            }

            //Check if node is left child
            if(!start.right){
                temp = start.left;
            }

            if(!start.parent){
                this.root = temp;
                return;
            }

            if(start.parent && start.parent.left === start){
                start.parent.left = temp;
                start = null;
            }

            if(start.parent && start.parent.right === start){
                start.parent.right = temp;
                start = null;
            }
            return;
        }

        //Handle two children case
        if(start.left && start.right){

            let successor = this._inOrderSuccessor(start.left);

            if(successor.left && successor.parent.left === successor){
                successor.parent.left = successor.left;
                successor.left = null;
            }

            if(successor.right && successor.parent.right === successor){
                successor.parent.right = successor.left;
                successor.left = null;
            }

            if(successor === successor.parent.left){
                successor.parent.left = null;
            }

            if(successor === successor.parent.right){
                successor.parent.right = null;
            }

            successor.left = start.left;
            successor.right = start.right;

            if(!start.parent){
                this.root = successor;
                return;
            }

            if(start.parent && start.parent.left === start){
                start.parent.left = successor;
                return;
            }

            if(start.parent && start.parent.right === start){
                start.parent.right = successor;
                return;
            }

        }
    }
}


const tree = new BST();
const list = new Array(20);

for(let i =0; i < 20; i++){
    const value = Math.random() * 1000;
    list.push(value);
    tree.insertIt(value);
}

tree.delete(list[list.length-10]);
// console.log(list[])

tree._inOrder(tree.root);

