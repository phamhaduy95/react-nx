import { useEffect } from 'react';
import { Placement } from './types';
import { addPaddingToPopup, recalculateAndPositionPopup } from './utilities';

export function usePopupPlacement(
  triggerRef: React.MutableRefObject<HTMLElement | null>,
  popupRef: React.MutableRefObject<HTMLElement | null>,
  placement: Placement,
  padding: number,
  isOpen: boolean
) {
  useEffect(() => {
    if (!isOpen) return;
    const triggerEl = triggerRef.current;
    const popupEl = popupRef.current;
    if (triggerEl === null || popupEl === null) return;
    const newPlacement = recalculateAndPositionPopup(triggerEl, popupEl, placement);
    addPaddingToPopup(popupEl,newPlacement,padding);
  }, [placement, isOpen, padding]);
}
