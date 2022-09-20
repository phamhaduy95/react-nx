import { useEffect } from 'react';

export function useMovePopoverOnScroll(
  popoverRef: React.MutableRefObject<HTMLElement|null>,
  isOpen: boolean,
  fixedOnScroll:boolean,
) {
  useEffect(() => {
    if (!isOpen || fixedOnScroll) return;
    const el = popoverRef.current;
    if (el === null) return;
    let tickCount = 0;
    let basePosition = getClientPosition(el);
    let baseScrollPos = { x: window.scrollX, y: window.scrollY };
    const callback = (e: Event) => {
    
      if (tickCount === 2) {
        const deltaScrollPos = {
          x: window.scrollX - baseScrollPos.x,
          y: window.scrollY - baseScrollPos.y,
        };
        repositionPopoverBaseOnScrollPosition(el,basePosition, deltaScrollPos);
        tickCount = 0;
      }
      tickCount++;
    };
    document.addEventListener('scroll', callback);
    return () => {
      document.removeEventListener('scroll', callback);
    };
  }, [isOpen,fixedOnScroll]);
}

function repositionPopoverBaseOnScrollPosition(
  popoverEl: HTMLElement,
  basePos:{top:number,left:number},
  delta: { x: number; y: number }
) {
  

  popoverEl.style.top = `${basePos.top - delta.y}px`;
  popoverEl.style.left = `${basePos.left - delta.x}px`;
}

function getClientPosition(el:HTMLElement){
    const {top,left} = el.getBoundingClientRect();
    return {top,left}
}