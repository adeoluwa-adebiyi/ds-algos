const { swap } = require("./utils");
const assert = require("assert");

const insertionSort = (itemList=[]) => {
    for(let i=0; i < itemList.length; i++){

        let j = i;

        while( j > 0 && itemList[j-1] > itemList[j]){
            itemList = swap(itemList, j-1, j);
            j -=1;
        }

    }
    return itemList;
}

const itemList = new Array(20);
for(let index=0; index < itemList.length; index++)    itemList[index] = Math.random() * 1000;

console.log(JSON.stringify(insertionSort(itemList)));