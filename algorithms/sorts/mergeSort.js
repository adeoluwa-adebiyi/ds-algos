const merge = (leftArray, rightArray) => {
    let i = 0;
    let j = 0;
    let k = 0;

    const sortedArray = new Array(leftArray.length + rightArray.length)

    while(i < leftArray.length && j < rightArray.length){

        if(leftArray[i] < rightArray[j]){
            sortedArray[k] = leftArray[i];
            i++;
        }else{
            sortedArray[k] = rightArray[j];
            j++;
        }
        k++;

    }

    while(i < leftArray.length){
        sortedArray[k] = leftArray[i];
        i++;
        k++;
    }

    while(j < rightArray.length){
        sortedArray[k] = rightArray[j];
        j++;
        k++;
    }

    return sortedArray;
}

const mergeSort = (itemList=[]) => {

    if(itemList.length <= 1)
        return itemList;

    const mid = Math.floor(itemList.length/2);
    let leftArray = itemList.slice(0, mid);
    let rightArray = itemList.slice(-mid);

    leftArray = mergeSort(leftArray);
    rightArray = mergeSort(rightArray);

    return merge(leftArray, rightArray);
}


let itemList = new Array(20);
for(let index=0; index < itemList.length; index++)    itemList[index] = Math.random() * 1000;


console.log("BEFORE SORT:");
console.log(JSON.stringify(itemList));

itemList = mergeSort( itemList );

console.log("AFTER SORT:");
console.log( JSON.stringify( itemList ) );