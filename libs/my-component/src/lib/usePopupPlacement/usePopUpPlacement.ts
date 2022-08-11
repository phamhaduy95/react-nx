import { MutableRefObject, useEffect as useLayoutEffect } from 'react';
import PopupPositionCalculator from './PopupPositionCalculator';
import { OnResizeObserver } from './OnResizeObserver';
import { transformToPixel } from './utilities';

type ElementRef = MutableRefObject<HTMLElement | null>;
export type Placement =
  | 'bottomRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'topLeft'
  | 'topRight'
  | 'topCenter'
  | 'leftTop'
  | 'leftCenter'
  | 'leftBottom'
  | 'rightTop'
  | 'rightCenter'
  | 'rightBottom';

/**
 * hook for controlling the relative position of Popup element to the wrapper element.As the popup  element is created as the React portal element which is not an child element
 *
 * @param wrapper ReactRef of wrapper element
 * @param popUp   ReactRef of popup element
 * @param placement  the placement in which the popup is put.
 */

export default function usePopupPlacement(
  wrapper: ElementRef,
  popUp: ElementRef,
  placement: Placement
) {
  /** set initial position */
  useInitialPosition(wrapper, popUp, placement);

  /** change position according to the size of the window */
  usePositionOnWindowResize(wrapper, popUp, placement);
}

function usePositionOnWindowResize(
  wrapper: ElementRef,
  Popup: ElementRef,
  placement: Placement
) {
  useLayoutEffect(() => {
    const button = wrapper.current;
    const menu = Popup.current;
    if (!button || !menu) return; 
      const resizeObserver = new OnResizeObserver();
      const listener = () => {
        positionPopup(button, menu, placement);
      };
      resizeObserver.addListener(listener);
      return () => {
        resizeObserver.deactivate();
      };
    
  }, [placement, wrapper, Popup]);
}

function useInitialPosition(
  wrapper: ElementRef,
  popup: ElementRef,
  placement: Placement
) {
  useLayoutEffect(() => {
    const button = wrapper.current;
    const menu = popup.current;
    if (button && menu) {
      positionPopup(button, menu, placement);
    }
  }, [placement, popup, wrapper]);
}

/**
 * the utility method for setting the absolute position of the popup by provide the value in pixel to left and top CSS properties.
 *
 */
export function positionPopup(
  button: HTMLElement,
  menu: HTMLElement,
  placement: Placement
) {
  const position = PopupPositionCalculator.getPositionFor(
    placement,
    button,
    menu
  ).getValue();
  menu.style.top = transformToPixel(position.top);
  menu.style.left = transformToPixel(position.left);
}
