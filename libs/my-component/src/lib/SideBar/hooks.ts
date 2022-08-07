import { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid"

export function useGenerateUUID(){
    const [id,setId] = useState("");
    useEffect(()=>{
        const id = uuidv4();
        setId(id);
    },[]);
    return id; 
}