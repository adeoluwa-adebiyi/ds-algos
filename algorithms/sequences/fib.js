const fib = (n)=>{
    if(n ===0)
        return 0;

    if(n===1)
        return 1;

    //return addition of last two values
    return fib(n-1) + fib(n-2)
}


const memoFib = (n, memory) => {

    if(n===0)
        return 0;

    if(n===1)
        return 1;

    if(memory[n] != -1){
        return memory[n];
    }

    return memory[n] = memoFib(n-1,memory) + memoFib(n-2, memory); 
}


const speedFib = (n) =>{
    const memory = new Array(n+1);
    for(let i =0; i < memory.length; i++)
        memory[i] = -1;
    
    return memoFib(n, memory);
}


for(let i=0; i < 10; i++){
    console.log(speedFib(i));
}