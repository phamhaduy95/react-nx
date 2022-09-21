import { Placement, Position } from './types';
import { useEffect } from 'react';
import { positionPopup } from './utilities';

export function useMovePopupOnScroll(
  triggerRef: React.MutableRefObject<HTMLElement | null>,
  popupRef: React.MutableRefObject<HTMLElement | null>,
  placement: Placement,
  isOpen: boolean
) {
  useEffect(() => {
    if (!isOpen) return;
    const popupEl = popupRef.current;
    if (popupEl === null) return;
    let tick = 0;
    const basePopupPos = getPopoverPosition(popupEl);
    console.log(basePopupPos)
    let initialScroll = getWindowScrollPosition();
    const callback = () => {
      if (tick === 1) {
        const deltaScroll = {
          top: window.scrollY - initialScroll.top,
          left: window.scrollX - initialScroll.left,
        };
        const newPopupPos = repositionPopupForNewScrollPos(
          basePopupPos,
          deltaScroll
        );
        positionPopup(popupEl, newPopupPos);
        tick = 0;
      }
      tick++;
    };
    document.addEventListener('scroll', callback);
    return () => {
      document.removeEventListener('scroll', callback);
    };
  }, [isOpen, placement]);
}

function getPopoverPosition(popupEl: HTMLElement): Position {
  const { top, left } = popupEl.getBoundingClientRect();
  return { top, left };
}

function getWindowScrollPosition() {
  return { top: window.scrollY, left: window.scrollX };
}

function repositionPopupForNewScrollPos(
  initialPopupPos: Position,
  scrollPos: Position
) {
  return {
    top: initialPopupPos.top - scrollPos.top,
    left: initialPopupPos.left - scrollPos.left,
  } as Position;
}
