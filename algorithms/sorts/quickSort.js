const { swap } = require("./utils");

// algorithm quicksort(A, lo, hi) is
//     if lo < hi then
//         p := partition(A, lo, hi)
//         quicksort(A, lo, p - 1)
//         quicksort(A, p + 1, hi)

// algorithm partition(A, lo, hi) is
//     pivot := A[hi]
//     i := lo
//     for j := lo to hi do
//         if A[j] < pivot then
//             swap A[i] with A[j]
//             i := i + 1
//     swap A[i] with A[hi]
//     return i

const partition = (itemList, start, end)=>{

    let leftRegionIndex = start;
    let rightRegionIndex = end;

    const pivot = itemList[Math.floor(((start+end)/2.0))];

    while(true){

        while(itemList[leftRegionIndex] < pivot){
            leftRegionIndex++;
            console.log(`LEFT_INDEX: ${leftRegionIndex}`);
        }

        while(itemList[rightRegionIndex] > pivot){
            rightRegionIndex--;
            console.log(`RIGHT: ${rightRegionIndex}`);
        }

        if(leftRegionIndex >= rightRegionIndex)
            break;
            
        itemList = swap(itemList, leftRegionIndex, rightRegionIndex);

        leftRegionIndex++;
        rightRegionIndex--;
    }
    return rightRegionIndex;

}

const quickSort = (itemList=[], start, end) =>{
    if(start < end){
        const p = partition(itemList, start, end);
        quickSort(itemList, start, p);
        quickSort(itemList, p+1, end);
    }
}


let itemList = new Array(20);


for(let index=0; index < itemList.length; index++)
    itemList[index] = Math.random() * 1000;


console.log("BEFORE SORT:");
console.log(JSON.stringify(itemList));

quickSort( itemList, 0, itemList.length-1);

console.log("AFTER SORT:");
console.log( JSON.stringify( itemList ) );