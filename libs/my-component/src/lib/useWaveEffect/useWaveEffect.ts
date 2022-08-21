import { MutableRefObject, useEffect } from 'react';
import './waveEffect.scss';
const BASE_WAVE_SIZE = 2;

//Des: setup the wave effect when element is clicked.
export function useWaveEffect(ref: MutableRefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    el.classList.add('wave-effect');
    const waveLength = getWaveMaxLength(el);
    const newSizeScale = Math.round(waveLength / BASE_WAVE_SIZE) * 2;

    //Note: mouseDown and mouseup event is non-bubble.
    const handleMouseDown = (e: MouseEvent) => {
      // Note: since we cannot rely on offsetX and offsetY to determine the actual relative position of the pointer, one solution is use clientX and clientY with combination of top,left from getBoundingClientRect like we did below.
      const {top,left} = el.getBoundingClientRect();
      const pos = {
        x: e.clientX - left,
        y: e.clientY - top,
      };
      const waveEl = createTheWaveElement(pos, el);
      //Des: make browser to wait 1ms to kick off transition since transition can not be started immediately.
      const timeout = setTimeout(() => {
        waveEl.style.transform = `scale(${newSizeScale})`;
        clearTimeout(timeout);
      }, 1);
    };

    // Des: when mouse is released, if the wave is sill growing, wait until it finish transition process and then remove the waveEl form DOM. Otherwise, wait for timeout of 100ms to remove it.
    const handleMouseUp = (e: MouseEvent) => {
      let waveEl = el.querySelector(
        '.wave-circle:not(.deleting)'
      ) as HTMLElement;
      if (waveEl === null) return;
      waveEl.classList.add('deleting');
      if (waveEl.classList.contains('growing')) {
        const handle = (e: any) => {
          if (e.target !== waveEl) return;
          waveEl.removeEventListener('transitionend', handle);
          waveEl.remove();
        };
        waveEl.addEventListener('transitionend', handle);
      } else {
        const timeout = setTimeout(() => {
          waveEl.remove();
          clearTimeout(timeout);
        }, 100);
      }
    };

    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousedown', handleMouseDown);
    return () => {
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
}



function createTheWaveElement(pos: { x: number; y: number; }, el: any) {
    const waveEl = document.createElement('div');
    waveEl.classList.add('wave-circle');
    waveEl.style.top = `${pos.y - BASE_WAVE_SIZE / 2}px`;
    waveEl.style.left = `${pos.x - BASE_WAVE_SIZE / 2}px`;
    el.append(waveEl);
    waveEl.style.transform = 'scale(0,0)';

    // add class name change when the wave start transition and it finished transition
    const handleTransitionStart = () => {
        waveEl.classList.add('growing');
        waveEl.removeEventListener('transitionstart', handleTransitionStart);
      };
      waveEl.addEventListener('transitionstart', handleTransitionStart);

      const handleTransitionEnd = () => {
        waveEl.classList.replace('growing', 'finish-growing');
        waveEl.removeEventListener('transitionend', handleTransitionEnd);
      };
      waveEl.addEventListener('transitionend', handleTransitionEnd);
    return waveEl;
}

function getWaveMaxLength<T extends HTMLElement>(el: T) {
  const { width, height } = el.getBoundingClientRect();
  const waveMaxLength = Math.sqrt(width * width + height * height);
  return Math.floor(waveMaxLength);
}


