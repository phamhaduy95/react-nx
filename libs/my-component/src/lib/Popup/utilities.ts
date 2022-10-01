import { PopupPositionCalculator } from "./PopupPositionCalculator";
import { Placement, Position } from "./types";

export function getClientPositionOfElement(element: HTMLElement) {
  const { top, left } = element.getBoundingClientRect();
  return { top,left
  };
}
export function getSizeOf(element: HTMLElement) {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
}

export function recalculateAndPositionPopup(
  triggerEl: HTMLElement,
  popupEl: HTMLElement,
  placement: Placement
) {
  const initialPos = calculatePositionForPopupBasedOnPlacement(
    triggerEl,
    popupEl,
    placement
  );

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
}


function calculatePositionForPopupBasedOnPlacement(
  triggerEl: HTMLElement,
  popupEl: HTMLElement,
  placement: Placement
) {
  const pos = PopupPositionCalculator.getPositionFor(
    popupEl,
    triggerEl,
    placement
  ).getValue();
  return pos;
}

function findCorrectPlacementForPopup(
  popupEl: HTMLElement,
  initialPosition: Position,
  initialPlacement: Placement
) {
  const viewPortSize = getViewportSize();
  const { first, second } = getDimensionFromPlacement(initialPlacement);
  const popupHeight = popupEl.clientHeight;
  const popupWidth = popupEl.clientWidth;
  let newFirst = first;
  let newSecond = second;
  
  if (initialPosition.top - popupHeight < 0) {
    if (first === 'top') newFirst = 'bottom';
    if (first === 'left' || first === 'right') newSecond = 'bottom';
  } else if (initialPosition.top + popupHeight > viewPortSize.height) {
    if (first === 'bottom') newFirst = 'top';
    if (first === 'left' || first === 'right') newSecond = 'top';
  }
  if (initialPosition.left - popupWidth < 0) {
    if (first === 'left') newFirst = 'right';
    if (first === 'bottom' || first === 'top') newSecond = 'left';
  } else if (initialPosition.left + popupWidth > viewPortSize.width) {
    if (first === 'right') newFirst = 'left';
    if (first === 'bottom' || first === 'top') newSecond = 'right';
  }

  const newPlacement = `${newFirst}-${newSecond}`;
  return newPlacement as Placement;
}

type DimensionType = {
  first: 'bottom' | 'top' | 'left' | 'right';
  second: 'bottom' | 'top' | 'left' | 'right' | 'center';
};
 
function getDimensionFromPlacement(placement: Placement) {
  const [first, second] = placement.split('-');
  return { first, second } as DimensionType;
}

function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function positionPopup(popupEl: HTMLElement, position: Position) {
  popupEl.style.top = `${position.top}px`;
  popupEl.style.left = `${position.left}px`;
}