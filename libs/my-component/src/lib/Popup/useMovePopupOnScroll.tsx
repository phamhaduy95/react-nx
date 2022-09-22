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
    let basePopupPos = getPopoverPosition(popupEl);

    const resizeCallback = () => {
      basePopupPos = getPopoverPosition(popupEl);
    };
    window.addEventListener('resize', resizeCallback);

    let initialScroll = getWindowScrollPosition();
    const callback = () => {
      const deltaScroll = {
        top: window.scrollY - initialScroll.top,
        left: window.scrollX - initialScroll.left,
      };
    
      const newPopupPos = repositionPopupForNewScrollPos(
        basePopupPos,
        deltaScroll
      );
      positionPopup(popupEl, newPopupPos);
    };
    document.addEventListener('scroll', callback);
    return () => {
      document.removeEventListener('scroll', callback);
      window.removeEventListener('resize', resizeCallback);
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
