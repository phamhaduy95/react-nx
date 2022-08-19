
export function range(min:number,max:number,step:number=1){
    const array = [];
    let i =min;
    while(i<=max){
        array.push(i);
        i+=step;
    }
    return array;
}





