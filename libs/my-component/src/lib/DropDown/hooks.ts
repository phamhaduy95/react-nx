import { useEffect } from "react";

export function useSwitchFocus(ref:React.MutableRefObject<HTMLElement|null>,isOpen:boolean){
    useEffect(()=>{
        const el = ref.current;
        if (el === null) return;
        if (isOpen){
            el.focus();
       
        }
    
    },[isOpen])  
}