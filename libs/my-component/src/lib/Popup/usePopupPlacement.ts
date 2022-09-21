import { useEffect } from 'react';
import { Placement } from './types';
import {
  calculatePositionForPopupBasedOnPlacement,
  findCorrectPlacementForPopup,
  positionPopup,
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


    const initialPos = calculatePositionForPopupBasedOnPlacement(
      triggerEl,
      popupEl,
      placement
    );
    // debugger
    const newPlacement = findCorrectPlacementForPopup(
      popupEl,
      initialPos,
      placement
    );
    const finalPos = calculatePositionForPopupBasedOnPlacement(
      triggerEl,
      popupEl,
      newPlacement
    );
    positionPopup(popupEl, finalPos);
  }, [placement, isOpen]);
}
