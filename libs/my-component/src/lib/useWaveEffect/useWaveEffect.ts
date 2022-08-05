import { MutableRefObject, useEffect } from 'react';
import "./waveEffect.scss"
const BASE_WAVE_SIZE = 2;

// setup the wave effect when element is clicked.
export function useWaveEffect<T extends HTMLElement>(ref: MutableRefObject<T>) {
  useEffect(() => {
    const el = ref.current;
    if (el === null) return; 
    el.classList.add("wave-effect");
    const waveLength =getWaveMaxLength<T>(el);
    const newSizeScale =Math.floor(waveLength/BASE_WAVE_SIZE); 

    const handleMouseDown = (e:MouseEvent)=>{
        if (e.target !== el) return
        const pos = {
            x:e.offsetX,
            y:e.offsetY,
        }
        const waveEl = document.createElement("div");
        waveEl.classList.add("wave-circle");
        waveEl.style.top = `${pos.y-10}px`;
        waveEl.style.left =`${pos.x-10}px`;
        el.append(waveEl);
    }

    // when mouse is released, the wave will still 
    const handleMouseUp = (e:MouseEvent)=>{
         let waveEl = el.querySelector(".wave-circle:not(.deleting)") as HTMLElement;
        if (waveEl === null) return;
        waveEl.classList.add("deleting");
        const handle = (e:AnimationEvent)=>{
            if (e.target !== waveEl) return
            waveEl.removeEventListener("animationend",handle);
            waveEl.remove();
        };
        waveEl.addEventListener("animationend",handle);

        const timeout = setTimeout(()=>{
            if (!waveEl) return;
            waveEl.remove();
            clearTimeout(timeout)
        },100);
        
    };

    el.addEventListener("mouseup",handleMouseUp,false);
    el.addEventListener("mousedown",handleMouseDown,false);
    return ()=>{
        el.removeEventListener("mouseup",handleMouseUp,false);
        el.removeEventListener("mousedown",handleMouseDown,false);
    }

  }, []);
}
function getWaveMaxLength<T extends HTMLElement>(el: T) {
    const { width, height } = el.getBoundingClientRect();
    const waveMaxLength = Math.sqrt(width * width + height * height) * 1.2;
    return  Math.floor(waveMaxLength);
}

