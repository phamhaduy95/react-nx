import { useEffect } from 'react';
import { Placement } from './types';
import {
  recalculateAndPositionPopup,
} from './utilities';

export function useRepositionPopupOnResize(
  triggerRef: React.MutableRefObject<HTMLElement | null>,
  popupRef: React.MutableRefObject<HTMLElement | null>,
  placement: Placement,
  isOpen: boolean
) {
  useEffect(() => {
    if (!isOpen) return;
    const triggerEl = triggerRef.current;
    const popupEl = popupRef.current;
    if (triggerEl === null || popupEl === null) return;
    const callback = () => {
        recalculateAndPositionPopup(triggerEl, popupEl, placement);
    };
    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, [placement, isOpen]);
}
