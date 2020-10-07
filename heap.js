function Heap(type, number){

    const size = number?number:400

    if(!type || type === "maxHeap"){
        return MaxHeap(size);
    }

    if(type === "minHeap"){
        throw "Not implemented exception";
    }

    function getRightChildIndex(index){
        return (index*2)+1;
    }

    function getLeftChildIndex(index){
        return (index*2);
    }

    function MaxHeap(_size){
        this.heapArray = new Array(_size);
        this.heapArray.push(null);
    }


    MaxHeap.prototype.insert = function(data){

        if(!this.heapArray[1]){
            this.heapArray[1] = data;
        }

        for(let i =1; i < this.heapArray.length; i++){

            if(this.heapArray[i]){

                let left = this.getLeftChildIndex(i);
                let right = this.getRightChildIndex(i);

                if(!this.heapArray[left]){
                    this.heapArray[left] = data;
                    return;
                }

                if(!this.headArray[right]){
                    this.heapArray[right] = data;
                    return;
                }

                continue;
            }
        }

        if(this.heapArray[i] && data > this.heapArray[i]){

        }
    }
}