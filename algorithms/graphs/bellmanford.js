const graphModule = require("./graph");

const Graph = graphModule.Graph;


const prev = (end, start, prevStore,list=[])=>{
    if(end === start){
        list.push(end);
        return list.reverse();
    }
    list.push(end);
    return prev(prevStore[end],start,prevStore,list);;
}

const bellmanFordAlg = (graph, start,end) =>{

    const vertices = (g=graph) => {
        return Object.keys(g.rep);
    }

    const distances = {};

    const previous = {};


    for(let nodeTuple of Object.keys(graph.rep)){
        const [node, nWeight] = nodeTuple;
        distances[node] = Infinity;
        previous[node] = null;
    }

    distances[start] = 0;


    for(let i = 0; i < vertices().length-1; i++){

        for(let vert of vertices()){

            for(let nodeTuple of graph.neighbours(vert)){
                const [node, weight] = nodeTuple;
                const newDistance = distances[vert] + weight;

                if(newDistance < distances[node]){
                    distances[node] = newDistance;
                    previous[node] = vert;
                }
               

            }
        }

        console.log("DISTANCES:");
        console.log(distances);
        console.log("PREVIOUS:");
        console.log(previous);

    }

    // console.log("DISTANCES:");
    // console.log(distances);
    // console.log("PREVIOUS:");
    // console.log(previous);


    for(let vert of vertices()){

            for(let nodeTuple of graph.neighbours(vert)){
                const [node, weight] = nodeTuple;
                const newDistance = distances[vert] + weight;
                
                if(newDistance < distances[node]){
                    throw Error("Graph contains negative cycles");
                }
            }
    }

    return prev(end,start, previous, []);
    
}



const main = ()=>{

const graphRep = {
    "M": [ 
        ["N",1]
     ],
    "N": [
        ["O",3], ["Q",2], ["P",2]
    ],
    "O": [
        ["P",2], ["N",3], ["Q",-3]
    ],
    "Q": [
        ["P",3],["N",2], ["0",-3]
    ],
    "P":[
        ["R",2], ["O",2], ["Q",3]
    ],
    "R":[
        ["P",2]
    ]
    
    };

    const graph = new Graph(graphRep);
    console.log(bellmanFordAlg(graph,"M", "R"));
}

main();