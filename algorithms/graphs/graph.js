class Graph{

    constructor(rep){
        this.rep = rep;
    }

    neighbours(node){
        return this.rep[node];
    }

}


module.exports = {
    Graph
}