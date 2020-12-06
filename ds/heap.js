class Heap {

    constructor(comparator = (a, b) => {
        if (a > b)
            return 1;

        if (a < b)
            return -1;

        if (a === b)
            return 0;
    }) {
        this.comparator = comparator;
        this.inserted = 0;
        this.incrementalSize = 10;
        this.array = new Array(this.incrementalSize);
    }

    // return but dont delete max of heap
    peek = () => {
        return this.array[1];
    }

    //pop root node
    pop = () => {
        const val = this.array[1];
        this.array[1] = this.array[this.inserted];
        this.array[this.inserted] = null;
        this.inserted -= 1;
        this.floydHeapifyDown(1);
        return val;
    }

    //remove root node
    deleteTop = () => {
        if (this.inserted < 1)
            throw Error("Invalid operation, array is empty");

        if (this.inserted === 1) {
            this.inserted -= 1;
            this.array[1] = null;
            return;
        }

        const last = this.array[this.inserted];
        this.array[this.inserted] = null;
        this.array[1] = last;
        this.floydHeapifyDown();
    }

    //replace root node
    replace = (val) => {
        this.array[1] = val;
        this.floydHeapifyDown(1);
    }

    //add new key to heap
    insert = (value) => {
        this.inserted += 1;
        this.array[this.inserted] = value;
        this.heapifyUp();
    }

    heapifyUp = () => {

        let child = this.inserted;
        let parent = this.parent(this.inserted);

        while (true) {

            if (parent < 1)
                return;

            if (
                this.comparator(this.array[child], this.array[parent]) === 1
            ) {
                this.swap(parent, child);
                child = parent;
            } else {
                return;
            }

            parent = this.parent(parent);

        }

    }


    parent = (index) => {
        return Math.floor(index / 2.0);
    }

    heapifyDown = (index) => {

        const leftChild = this.getLeftChild(index);
        const rightChild = this.getRightChild(index);

        // Node has two children

        if (this.array[leftChild] && this.array[rightChild]) {

            const max = this.comparator(this.array[leftChild], this.array[rightChild]) === 1 ?
                leftChild : this.comparator(this.array[leftChild], this.array[rightChild]) === 0 ?
                    leftChild : rightChild;

            this.swap(max, index);

            return this.heapifyDown(max);

        }

        // Node has one child
        if (this.array[leftChild]) {

            if (this.comparator(this.array[leftChild], this.array[index]) === 1) {
                this.swap(leftChild, index);
                return this.heapifyDown(leftChild);
            }

        }

        // Node has no child

        if (!this.array[leftChild]) {
            return;
        }


    }

    floydHeapifyDown = (index) => {

        let max;

        const leftChild = this.getLeftChild(index);
        const rightChild = this.getRightChild(index);

        if (
            (leftChild <= this.inserted) && (this.comparator(this.array[leftChild], this.array[index]) === 1 
            || this.comparator(this.array[leftChild], this.array[index]) === 0)) {
            max = leftChild;
        } else {
            max = index;
        }

        if (
            (rightChild <= this.inserted) && (this.comparator(this.array[rightChild], this.array[max]) === 1 
            || this.comparator(this.array[rightChild], this.array[max]) === 0)) {
            max = rightChild;
        }

        if (max !== index) {
            this.swap(max, index);
            this.floydHeapifyDown(max);
        }
    }

    getLeftChild = (val) => {
        return (val * 2);
    }

    getRightChild = (val) => {
        return (val * 2) + 1;
    }

    swap = (indexA, indexB) => {
        const temp = this.array[indexA];
        this.array[indexA] = this.array[indexB];
        this.array[indexB] = temp;
    }
}


const main = () => {

    const minComparator = (a, b) => {
        if (a < b) {
            return 1;
        }

        if (a > b) {
            return -1;
        }

        return 0;
    }

    const minHeap = new Heap(minComparator);
    for (let start = 0; start < 10; start++) {
        minHeap.insert(Math.floor(Math.random() * 100));
    }

    for (start = 0; start < 10; start++) {
        const val = minHeap.pop();
        console.log(val);
    }
}

module.exports = Heap;