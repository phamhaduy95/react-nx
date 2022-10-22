import { useEffect, useMemo, useState } from "react";
import {v4 as uuidv4} from "uuid"

export function useGenerateUUID(){
    const id = useMemo(()=>{
        return uuidv4()
    },[]);
    return id;
}