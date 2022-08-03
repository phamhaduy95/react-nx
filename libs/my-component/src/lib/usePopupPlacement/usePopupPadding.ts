import React, { useEffect } from "react";
import { Placement } from "./usePopUpPlacement";

/** The hook for defining the spacing between the popUp element and the wrapper element. The mechanism behind this hook is to adjust the padding value for each placement. For example, when the popup is placed on top, then the padding-top value is set with positive value, while other there sides are set to zero.
 * 
 * @param popupRef : ref of the popUp
 * @param placement : placement of the popup in string.
 * @param paddingInPixel : the padding value of popup in pixel
 */

export default function usePopupPadding(
  popupRef: React.MutableRefObject<HTMLElement | null>,
  placement: Placement,
  paddingInPixel: number
) {
  useEffect(() => {
    const popup = popupRef.current;
    if (popup) {
      popup.style.padding ="none";
      if (placement.startsWith("bottom")) {
        popup.style.paddingTop = `${paddingInPixel}px`;
        return;
      }
      if (placement.startsWith("top")) {
        popup.style.paddingBottom = `${paddingInPixel}px`;
        return;
      }

      if (placement.startsWith("right")) {
        popup.style.paddingLeft = `${paddingInPixel}px`;
        return;
      }

      if (placement.startsWith("left")) {
        popup.style.paddingRight = `${paddingInPixel}px`;
        return;
      }
    }
  }, [placement, popupRef, paddingInPixel]);
}
