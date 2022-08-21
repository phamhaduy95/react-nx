import { useEffect } from 'react';
import { positionPopup } from '../usePopupPlacement/usePopUpPlacement';
import { PopupElementProps } from './PopupElement';
export default function usePopupWidthHandler(
  targetRef: React.MutableRefObject<HTMLElement|null>,
  popupRef: React.MutableRefObject<HTMLElement|null>,
  widthType: PopupElementProps['width'],
  placement: PopupElementProps['placement']
) {
  useEffect(() => {
    const targetEl = targetRef.current;
    const popupEl = popupRef.current;
    if (targetEl === null || popupEl === null) return;
    if (widthType === 'fit-content') {
      popupEl.style.width = 'max-content';
      return;
    }
    if (typeof widthType === 'number') {
      popupEl.style.width = `${widthType}px`;
      return;
    }

    const observer = new ResizeObserver((entries, observer) => {
      for (let entry of entries) {
        const newWidth = entry.borderBoxSize[0].inlineSize;
        popupEl.style.width = `${newWidth}px`;
        positionPopup(targetEl, popupEl, placement);
      }
    });
    observer.observe(targetEl);

    return () => {
      observer.disconnect();
    };
  }, [widthType]);
}
