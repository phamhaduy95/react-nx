import { useEffect } from 'react';
import { PopupElementProps } from './PopupElement';
import {recalculateAndPositionPopup } from './utilities';


export default function usePopupWidthHandler(
  triggerRef: React.MutableRefObject<HTMLElement | null>,
  popupRef: React.MutableRefObject<HTMLElement | null>,
  widthType: PopupElementProps['width'],
  placement: PopupElementProps['placement']
) {
  useEffect(() => {
    const triggerEl = triggerRef.current;
    const popupEl = popupRef.current;
    if (triggerEl === null || popupEl === null) return;
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
        recalculateAndPositionPopup(triggerEl,popupEl,placement);
      }
    });
    observer.observe(triggerEl);

    return () => {
      observer.disconnect();
    };
  }, [widthType]);
}
