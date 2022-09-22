import { useEffect } from 'react';
import { Placement } from './types';
import {
  recalculateAndPositionPopup,
} from './utilities';

export function usePopupPlacement(
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

    recalculateAndPositionPopup(triggerEl, popupEl, placement);
  }, [placement, isOpen]);
}

