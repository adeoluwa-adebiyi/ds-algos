const { swap } = require("./utils");

const selectionSort = (itemList = [])=>{
    for(let i = 0; i < itemList.length; i++){

        let smallestIndex = i;

        for(let j=i+1; j < itemList.length; j++){
            if(itemList[j] < itemList[smallestIndex]){
                smallestIndex = j;
            }
        }

        itemList = swap(itemList, i, smallestIndex);

    }
    return itemList;
}

const itemList = new Array(20);
for(let index=0; index < itemList.length; index++)    itemList[index] = Math.random() * 1000;


console.log("BEFORE SORT:");
console.log(JSON.stringify(itemList));

console.log("AFTER SORT:");
console.log( JSON.stringify( selectionSort( itemList) ) );