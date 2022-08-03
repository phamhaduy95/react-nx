import { useEffect, useState } from "react";

export default function useHeightRecalculateHook(isActive:boolean,ref:any){
    const [height,setHeight] = useState<number>(0);
    useEffect(() => {
        const { height } = calculateElementSize(ref.current);
        setHeight(height);
      }, [isActive]);

    return height;

}

function calculateElementSize(ref: any) {
    const height = ref.offsetHeight;
    const width = ref.offsetWidth;
    return { height, width };
  }
  