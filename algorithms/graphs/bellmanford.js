
const edges = [
    [0,1],
    [0,2],
    [1,2],
    [1,3],
    [1,4],
    [3,1],
    [3,2],
    [4,3]
]

const _table = [
    [Infinity, -1, 4, Infinity, Infinity],
    [Infinity, Infinity, 3, 2, 2],
    [Infinity, Infinity, Infinity, Infinity, Infinity],
    [Infinity, 1, 5, Infinity, Infinity],
    [Infinity, Infinity, Infinity, -3, Infinity]
]

const nodesMap = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E"
}

const bellmanFord = (edges, table,verts, vstart, end) => {


    distances = {};

    for(let vert of verts){
        distances[vert] = Infinity;
    }

    prevs = {};

    distances[vstart] = 0;

    const getPath = (endVertex,list=[])=>{
        if(!endVertex)
            return list;
        const prev = prevs[endVertex];
        list.push(nodesMap[prev]);
        return getPath(prev,list);
    }

    const relax = (detectCycle=false) => {
        for(let edge of edges){

            const start = edge[0];
            const dest = edge[1];
            const newDistance = distances[start] + table[start][dest];
            if(newDistance < distances[dest]){
                if(detectCycle){
                    throw Error("Graph has negative cycles. Cannot calculate Shortest Path");
                }
                distances[dest] = newDistance;
                prevs[dest] = start;
            }

        }
    }

    for(let vertex=0; vertex < _table.length-1; vertex++){
        relax();
    }

    relax(true);

    const path = getPath(end).reverse();

    console.log(`PATH: ${path}`);

    return path;

}


const main = ()=>{
    bellmanFord(edges, _table, Object.keys(nodesMap),0,3);
}

main();