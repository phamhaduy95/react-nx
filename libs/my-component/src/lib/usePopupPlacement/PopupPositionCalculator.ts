import { Placement } from "./usePopUpPlacement";
import * as PopupPositionType from "./PopupPosition";
import PopupPosition from "./PopupPosition";

export default class PopupPositionCalculator {
  protected constructor() {}

  static getPositionFor(
    placement: Placement,
    wrapper: HTMLElement,
    popup: HTMLElement
  ): PopupPosition {
    switch (placement) {
      case "topCenter":
        return new PopupPositionType.TopCenterPopupPosition(wrapper, popup);
      case "topLeft":
        return new PopupPositionType.TopLeftPopupPosition(wrapper, popup);
      case "topRight":
        return new PopupPositionType.TopRightPopupPosition(wrapper, popup);
      case "bottomCenter":
        return new PopupPositionType.BottomCenterPopupPosition(wrapper, popup);
      case "bottomRight":
        return new PopupPositionType.BottomRightPopupPosition(wrapper, popup);
      case "bottomLeft":
        return new PopupPositionType.BottomLeftPopupPosition(wrapper, popup);
      case "leftBottom":
        return new PopupPositionType.LeftBottomPopupPosition(wrapper, popup);
      case "leftCenter":
        return new PopupPositionType.LeftCenterPopupPosition(wrapper, popup);
      case "leftTop":
        return new PopupPositionType.LeftTopPopupPosition(wrapper, popup);
      case "rightTop":
        return new PopupPositionType.RightTopPopupPosition(wrapper, popup);
      case "rightCenter":
        return new PopupPositionType.RightCenterPopupPosition(wrapper, popup);
      case "rightBottom":
        return new PopupPositionType.RightBottomPopupPosition(wrapper, popup);
    }
  }
}

