import { useEffect, useState } from "react";
/** this hook provide safer way to invoke any event callback function since its wont trigger the callback when the React component is first rendered */ 
export function useEventCallback(callback:Function,dependencyArray:NonNullable<any>[]){
    const [firstRender,setFirstRender] = useState(false);
    useEffect(()=>{
        setFirstRender(true);
    },[])
    useEffect(()=>{
        if (firstRender) return;
        callback();  
    },[...dependencyArray])
}


