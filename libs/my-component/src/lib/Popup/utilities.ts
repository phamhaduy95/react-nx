import { PaddingProps } from '@mui/system';
import { PopupPositionCalculator } from './PopupPositionCalculator';
import { Placement, Position } from './types';
type Error = 'bottom' | 'top' | 'left' | 'right';

export function getClientPositionOfElement(element: HTMLElement) {
  const { top, left } = element.getBoundingClientRect();
  return { top, left };
}
export function getSizeOf(element: HTMLElement) {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
}

export function recalculatePopupPosition(
  triggerEl: HTMLElement,
  popupEl: HTMLElement,
  placement: Placement,
  padding: number
) {
  const initialPos = calculatePopupPositionForPlacement(
    triggerEl,
    popupEl,
    placement
  );

  const firstCheck = checkPopupPositionAppropriate(popupEl, initialPos);
  if (firstCheck.result) {
    positionPopup(popupEl, initialPos);
    addPaddingToPopup(popupEl, placement, padding);
    return;
  }

  const newPlacement = findNewPopupPlacement(firstCheck.error, placement);
  const newPosition = calculatePopupPositionForPlacement(
    triggerEl,
    popupEl,
    newPlacement
  );

  const secondCheck = checkPopupPositionAppropriate(popupEl, newPosition);
  if (secondCheck.result) {
    positionPopup(popupEl, newPosition);
    addPaddingToPopup(popupEl, newPlacement, padding);
    return;
  }
  const movedPosition = movePopupPosition(
    popupEl,
    initialPos,
    firstCheck.error
  );
  positionPopup(popupEl, movedPosition);
}

function calculatePopupPositionForPlacement(
  triggerEl: HTMLElement,
  popupEl: HTMLElement,
  placement: Placement
) {
  const pos = PopupPositionCalculator.getPositionFor(
    popupEl,
    triggerEl,
    placement
  ).getValue();
  return pos as Position;
}

function findNewPopupPlacement(errors: Error[], initialPlacement: Placement) {
  const { first, second } = getDimensionFromPlacement(initialPlacement);
  let newFirst = first;
  let newSecond = second;

  if (errors.includes('bottom')) {
    if (first === 'bottom') newFirst = 'top';
    if (first === 'left' || first === 'right') newSecond = 'bottom';
  }
  if (errors.includes('top')) {
    if (first === 'top') newFirst = 'bottom';
    if (first === 'left' || first === 'right') newSecond = 'top';
  }

  if (errors.includes('left')) {
    if (first === 'left') newFirst = 'right';
    if (first === 'bottom' || first === 'top') newSecond = 'left';
  }
  if (errors.includes('right')) {
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

export function addPaddingToPopup(
  popup: HTMLElement,
  placement: Placement,
  padding: number
) {
  popup.style.padding = 'none';
  if (placement.startsWith('bottom')) {
    popup.style.paddingTop = `${padding}px`;
    return;
  }
  if (placement.startsWith('top')) {
    popup.style.paddingBottom = `${padding}px`;
    return;
  }

  if (placement.startsWith('right')) {
    popup.style.paddingLeft = `${padding}px`;
    return;
  }

  if (placement.startsWith('left')) {
    popup.style.paddingRight = `${padding}px`;
    return;
  }
}

function checkPopupPositionAppropriate(
  popupEl: HTMLElement,
  position: Position
) {
  const popupHeight = popupEl.clientHeight;
  const popupWidth = popupEl.clientWidth;
  const viewPortSize = getViewportSize();
  let result = true;
  let error: Error[] = [];
  if (position.top < 0) {
    result = false;
    error.push('top');
  }
  if (position.top + popupHeight > viewPortSize.height) {
    result = false;
    error.push('bottom');
  }
  if (position.left < 0) {
    result = false;
    error.push('left');
  }
  if (position.left + popupWidth > viewPortSize.width) {
    result = false;
    error.push('right');
  }
  return { result, error };
}

function movePopupPosition(
  popupEl: HTMLElement,
  position: Position,
  errors: Error[]
) {
  const newPosition = { ...position };
  const popupHeight = popupEl.clientHeight;
  const popupWidth = popupEl.clientWidth;
  const viewPortSize = getViewportSize();

  if (errors.includes('bottom')) {
    if (errors.includes('top')) {
      newPosition.top = 2;
    }
    newPosition.top = viewPortSize.height - popupHeight -2;
  } else if (errors.includes('top')) {
    newPosition.top = 2;
  }

  if (errors.includes('right')) {
    if (errors.includes('left')) {
      newPosition.left =2;
    }
    newPosition.left = viewPortSize.width - popupWidth - 2;
  }
  if (errors.includes('left')) {
    newPosition.left = 2;
  }
  return newPosition;
}
