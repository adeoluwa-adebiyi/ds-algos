

class Heap{

    getRightChildIndex = (index) => {
        return (index*2)+1;
    }

    getLeftChildIndex = (index) => {
        return (index*2);
    }

    swap = (array, i, j) => {
        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;
        return array;
    }

}


class MaxHeap extends Heap{

    constructor(size = 100){
        super();
        this.size = size;
        this.heapArray = new Array(this.size);
        this.count = size;
        this.heapArray.push(null);
    }


    insert = (data) => {
        this.expandSize();
        this.heapArray[this.count-1] = data;
        this.heapify(this.heapArray, this.count-1)
    }

    expandSize = ()=>{
        // if(this.count <= 3){
        //     this.heapArray = new Array(this.size * 2);
        // }
    }

    remove = () => {
        let retVal = this.heapArray[1];
        // yield retVal;
        this.count-=1;
        this.swap(this.heapArray, 1, this.count);
        this.bubbleDownwards(retVal, 1);
        return retVal;
    }

    heapify = (data, index) => {
        let parentIndex = Math.floor(index/2.0);

        while(parentIndex > 0){
            
        }


        if(this.heapArray[index] && this.heapArray[index] > data){
            console.log("RETURN");
            return;
        }

        if(this.heapArray[index] && this.heapArray[index] < data){

            console.log("LT")
            this.swap(this.heapArray, index, parentIndex);

            if(parentIndex === 0){
                return;
            }

            this.heapify(this.heapArray, parentIndex);
        }
    }

    heapifyDown = (data, index) => {

        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index);

        if(this.heapArray[leftChildIndex] > data){
            this.swap(this.heapArray, index, leftChildIndex);
            return this.bubbleDownwards(data, leftChildIndex);
        }
            
        if(this.heapArray[rightChildIndex] > data){
            this.swap(this.heapArray, index, rightChildIndex);
            return this.bubbleDownwards(data, rightChildIndex);
        }

    }

    getLeafData = () => {
        return this.heapArray[this.count-1];
    }
}

const maxHeap = new MaxHeap();
for(let i=0; i < 10;i++){
    let val = Math.random() * 100;
    maxHeap.insert(val);
    console.log(val);
}

console.log("\n\n");

console.log(JSON.stringify(maxHeap.heapArray));

// for(let i = 0; i < 10; i++){
//     let val = maxHeap.remove();
//     console.log(val);
// }
