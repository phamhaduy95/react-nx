import { useEffect as useLayoutEffect } from "react";
import { Placement } from "./usePopUpPlacement";
import * as ArrowPosition from "./ArrowPosition";

/**
 * This React hook is used to control the direction of the arrow point of the popUp element when the popUp element changes its position.
 * 
 * @param arrowRef 
 * @param placement 
 */
export default function usePopupArrowPosition(
  arrowRef: React.MutableRefObject<any>,
  placement: Placement
) {
  useLayoutEffect(() => {
    const arrow = arrowRef.current;
    if (arrow) {
      ArrowPositionController.setArrowPositionWhenPopupPlacementIs(
        placement,
        arrow
      );
    }
  }, [placement, arrowRef]);
}

class ArrowPositionController {
  private constructor() {}

  static setArrowPositionWhenPopupPlacementIs(
    placement: Placement,
    arrow: HTMLElement
  ) {
    switch (placement) {
      case "topLeft": {
        const arrowPosition = new ArrowPosition.TopLeftArrowPosition(arrow);
        arrowPosition.setDirection("top").setPosition();
        return;
      }
      case "topCenter": {
        const arrowPosition = new ArrowPosition.TopCenterArrowPosition(arrow);
        arrowPosition.setDirection("top").setPosition();
        return;
      }

      case "topRight": {
        const arrowPosition = new ArrowPosition.TopRightArrowPosition(arrow);
        arrowPosition.setDirection("top").setPosition();
        return;
      }

      case "bottomLeft": {
        const arrowPosition = new ArrowPosition.BottomLeftArrowPosition(arrow);
        arrowPosition.setDirection("bottom").setPosition();
        return;
      }
      case "bottomCenter": {
        const arrowPosition = new ArrowPosition.BottomCenterArrowPosition(
          arrow
        );
        arrowPosition.setDirection("bottom").setPosition();
        return;
      }
      case "bottomRight": {
        const arrowPosition = new ArrowPosition.BottomRightArrowPosition(arrow);
        arrowPosition.setDirection("bottom").setPosition();
        return;
      }
      case "rightTop": {
        const arrowPosition = new ArrowPosition.RightTopArrowPosition(arrow);
        arrowPosition.setDirection("right").setPosition();
        return;
      }

      case "rightCenter": {
        const arrowPosition = new ArrowPosition.RightCenterArrowPosition(arrow);
        arrowPosition.setDirection("right").setPosition();
        return;
      }

      case "rightBottom": {
        const arrowPosition = new ArrowPosition.RightBottomArrowPosition(arrow);
        arrowPosition.setDirection("right").setPosition();
        return;
      }

      case "leftTop": {
        const arrowPosition = new ArrowPosition.LeftTopArrowPosition(arrow);
        arrowPosition.setDirection("left").setPosition();
        return;
      }

      case "leftCenter": {
        const arrowPosition = new ArrowPosition.LeftCenterArrowPosition(arrow);
        arrowPosition.setDirection("left").setPosition();
        return;
      }

      case "leftBottom": {
        const arrowPosition = new ArrowPosition.LeftBottomArrowPosition(arrow);
        arrowPosition.setDirection("left").setPosition();
        return;
      }
    }
  }
}
