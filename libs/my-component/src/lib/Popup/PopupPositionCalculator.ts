import * as PopupPositionType from './PopupPosition';
import PopupPosition from './PopupPosition';
import { Placement } from './types';


export class PopupPositionCalculator {
  protected constructor() {}

  static getPositionFor(
    popup: HTMLElement,
    trigger: HTMLElement,
    placement: Placement
  ): PopupPosition {
    switch (placement) {
      case 'top-center':
        return new PopupPositionType.TopCenterPopupPosition(trigger, popup);
      case 'top-left':
        return new PopupPositionType.TopLeftPopupPosition(trigger, popup);
      case 'top-right':
        return new PopupPositionType.TopRightPopupPosition(trigger, popup);
      case 'bottom-center':
        return new PopupPositionType.BottomCenterPopupPosition(trigger, popup);
      case 'bottom-right':
        return new PopupPositionType.BottomRightPopupPosition(trigger, popup);
      case 'bottom-left':
        return new PopupPositionType.BottomLeftPopupPosition(trigger, popup);
      case 'left-bottom':
        return new PopupPositionType.LeftBottomPopupPosition(trigger, popup);
      case 'left-center':
        return new PopupPositionType.LeftCenterPopupPosition(trigger, popup);
      case 'left-top':
        return new PopupPositionType.LeftTopPopupPosition(trigger, popup);
      case 'right-top':
        return new PopupPositionType.RightTopPopupPosition(trigger, popup);
      case 'right-center':
        return new PopupPositionType.RightCenterPopupPosition(trigger, popup);
      case 'right-bottom':
        return new PopupPositionType.RightBottomPopupPosition(trigger, popup);
    }
  }
}
