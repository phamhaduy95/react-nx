import { useEffect } from 'react';
import { Placement } from './types';
import { addPaddingToPopup, recalculatePopupPosition } from './utilities';

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
   recalculatePopupPosition(triggerEl, popupEl, placement,padding);

  }, [placement, isOpen, padding]);
}
