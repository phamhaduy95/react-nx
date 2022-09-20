import { MutableRefObject, useEffect } from 'react';
import { Placement, getCorrectPositionForPopup, positionPopup, Point } from './utils';

type ElementRef = MutableRefObject<HTMLElement | null>;



// hook allow to position popup
export function useContextMenuPlacement(
  ref: ElementRef,
  popupRef: ElementRef,
  initialPlacement: Placement
) {
  // ensure the position style for popup is fixed
  useEffect(() => {
    const popupEl = ref.current;
    if (popupEl === null) return;
    popupEl.style.position = 'fixed';
  }, []);
  // register contextmenu event top show or hide popup
  useEffect(() => {
    const el = ref.current;
    const popupEl = popupRef.current;
    if (el === null || popupEl === null) return;
    const callback = (e: MouseEvent) => {
      e.preventDefault(); // ensure no default context popup
      const basePoint: Point = { x: e.clientX, y: e.clientY };
      const newPlacement = getCorrectPositionForPopup(
        popupEl,
        initialPlacement,
        basePoint
      );
      positionPopup(popupEl, newPlacement, basePoint);
      hideThenShowAgain(popupEl);
    };
    el.addEventListener('contextmenu', callback);
    return () => {
      el.removeEventListener('contextmenu', callback);
    };
  }, [initialPlacement]);
  //on scroll event
}



function hideThenShowAgain(popupEl: HTMLElement) {
  popupEl.classList.remove('is-showed');
  const timeOut = setTimeout(() => {
    popupEl.classList.add('is-showed');
    switchFocus(popupEl, true);
    clearTimeout(timeOut);
  }, 100);
}
function switchFocus(el: HTMLElement, isFocus: boolean) {
  if (isFocus) {
    el.focus();
    return;
  }
  el.blur();
}



