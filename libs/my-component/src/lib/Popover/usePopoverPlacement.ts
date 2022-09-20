import { useEffect } from 'react';
import { getCorrectPositionForPopup, Placement, Point, positionPopup } from '../ContextMenu/utils';
export function usePopoverPlacement(
  popoverRef: React.MutableRefObject<HTMLElement|null>,
  placement: Placement,
  basePosition: Point,
  isOpen:boolean,
) {
    useEffect(()=>{
        if (!isOpen) return;
        const el= popoverRef.current;
        if (el === null) return;
        const rightPlacement = getCorrectPositionForPopup(el,placement,basePosition);
        positionPopup(el,rightPlacement,basePosition);
    },[placement,basePosition.x,basePosition.y,isOpen])

}
