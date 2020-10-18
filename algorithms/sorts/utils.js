const swap = (itemList=[], a, b)=>{
    const temp = itemList[b];
    itemList[b] = itemList[a];
    itemList[a] = temp;
    return itemList;
}

module.exports = {
    swap,
}