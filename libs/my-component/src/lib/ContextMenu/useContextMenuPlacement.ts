import { MutableRefObject, useEffect } from 'react';

type ElementRef = MutableRefObject<HTMLElement | null>;
export type Placement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
type Point = { x: number; y: number };

// hook allow to position popup
export function useContextMenuPlacement(
  ref: ElementRef,
  popupRef: ElementRef,
  initialPlacement: Placement,
  // the callback whose purpose is to set highlight Item is null
  focusCallback: () => void
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
      hideThenShowAgain(popupEl, focusCallback);
    };
    el.addEventListener('contextmenu', callback);
    return () => {
      el.removeEventListener('contextmenu', callback);
    };
  }, [initialPlacement]);
  //on scroll event
}

function positionPopup(popup: HTMLElement, placement: Placement, point: Point) {
  const popupHeight = popup.clientHeight;
  const popupWidth = popup.clientWidth;
  switch (placement) {
    case 'bottom-right': {
      popup.style.top = `${point.y}px`;
      popup.style.left = `${point.x}px`;
      return;
    }
    case 'top-right': {
      popup.style.top = `${point.y - popupHeight}px`;
      popup.style.left = `${point.x}px`;
      return;
    }
    case 'bottom-left': {
      popup.style.top = `${point.y}px`;
      popup.style.left = `${point.x - popupWidth}px`;
      return;
    }
    case 'top-left': {
      popup.style.top = `${point.y - popupHeight}px`;
      popup.style.left = `${point.x - popupWidth}px`;
      return;
    }
  }
}

function getCorrectPositionForPopup(
  popupEl: HTMLElement,
  basePlacement: Placement,
  basePoint: Point
) {
  let newPlacement = basePlacement.toString();
  const viewPortSize = getViewPortSize();
  if (basePoint.y + popupEl.clientHeight > viewPortSize.height) {
    newPlacement = newPlacement.replace('bottom', 'top');
  }
  if (basePoint.y - popupEl.clientHeight < 0) {
    newPlacement = newPlacement.replace('top', 'bottom');
  }
  if (basePoint.x + popupEl.clientWidth > viewPortSize.width) {
    newPlacement = newPlacement.replace('left', 'right');
  }
  if (basePoint.x - popupEl.clientWidth < 0) {
    newPlacement = newPlacement.replace('right', 'left');
  }
  return newPlacement as Placement;
}

function getViewPortSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function hideThenShowAgain(popupEl: HTMLElement, focusCallback: () => void) {
  focusCallback();
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
