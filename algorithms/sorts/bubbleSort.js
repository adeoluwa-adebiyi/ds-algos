const { swap } = require("./utils");

const bubbleSort = (itemList=[])=>{

    if(!Array.isArray(itemList))
        throw Error("Algorithm works with only arrays");

    for(let i=0; i < itemList.length; i++){


        for(let j = 0; j < itemList.length-1; j++){

            if(itemList[j] > itemList[j+1]){
                const temp = itemList[j];
                itemList[j] = itemList[j+1];
                itemList[j+1] = temp;
            }

        }

    }

    return itemList;
}

const itemList = new Array(20);
for(let index=0; index < itemList.length; index++)    itemList[index] = Math.random() * 1000;


console.log("BEFORE SORT:");
console.log(JSON.stringify(itemList));

console.log("AFTER SORT:");
console.log( JSON.stringify( bubbleSort( itemList) ) );
