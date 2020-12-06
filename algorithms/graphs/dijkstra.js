/***
 * 
 * M -> N 1
 * N -> 0 3
 * N -> Q 2
 * N -> P 2
 * O -> P 2
 * Q -> p -3
 * p -> R 2
 * 
 */

const heap = require("../../ds/heap");


const graphRep = {
    "M": [ 
        ["N",1]
     ],
    "N": [
        ["O",3], ["Q",2], ["P",2]
    ],
    "O": [
        ["P",2], ["N",3]
    ],
    "Q": [
        ["P",-3],["N",2]
    ],
    "P":[
        ["R",2], ["O",2], ["Q",-3]
    ],
    "R":[
        ["P",2]
    ]
}


class Graph{

    constructor(rep){
        this.rep = rep;
    }

    neighbours = (node)=>{
        return this.rep[node]
    }

}


const dijkstraShortestPath = (graph,start, end)=>{

    const queue = [];

    const distances = {};

    const previous = {};

    const initOp = ()=>{
        for(let node of Object.keys(graph)){
            distances[node] = Infinity;
            previous[node] = null;
        }
    }

    const popHeap = (heap=queue)=>{
        const nodesValue = heap.map((value,index)=>value);
        const smallest = new Array();
        for(let i= 0; i < heap.length;i++){
            if(nodesValue[smallest] > nodesValue[i])
                smallest = i;
        } 
        const value = heap[i];
        delete heap[i];
        let k =i;
        while(i < heap.length)
            heap[i++] = heap[++k];
        return value;
    }

    const insertHeap = (heap=queue, value)=>{
        queue.push(value);
    }

    const heapEmpty = (heap=queue) =>{
        return heap.length===0;
    }

    initOp();

    distances[start] = 0;

    insertHeap(value=[start, distances[start]]);

    while(!heapEmpty()){

        const [node, weight] = popHeap(queue);

        for(let nodeTuple of graph.neighbours(node)){

            const [neighbour, nWeight] = nodeTuple;
            const calculatedDistance = distances[node] + nWeight;
            if(calculatedDistance < distances[neighbour]){
                distances[neighbour] = calculatedDistance;
                previous[neighbour] = node;
                insertHeap(value=[neighbour, calculatedDistance]);
            }
            continue;

        }
    }

}


const main = ()=>{
    const graph = new Graph(graphRep)
}