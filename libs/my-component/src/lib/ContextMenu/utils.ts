export type Placement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type Point = { top: number; left: number };
export function positionPopup(
  popup: HTMLElement,
  placement: Placement,
  point: Point
) {
  const viewPortSize = getViewPortSize();
  const popupHeight = popup.clientHeight;
  const popupWidth = popup.clientWidth;
  let pointY = popupHeight >= viewPortSize.height ? 0 : point.top;
  let pointX = popupWidth >= viewPortSize.width ? 0 : point.left;

  switch (placement) {
    case 'bottom-right': {
  
      popup.style.top = `${pointY}px`;
      popup.style.left = `${pointX}px`;
      return;
    }
    case 'top-right': {
      pointY = pointY - popupHeight < 0 ? 0 : pointY - popupHeight;
      popup.style.top = `${pointY}px`;
      popup.style.left = `${pointX}px`;
      return;
    }
    case 'bottom-left': {
      pointX = pointX - popupWidth < 0 ? 0 : pointX - popupWidth;
      popup.style.top = `${pointY}px`;
      popup.style.left = `${pointX}px`;
      return;
    }
    case 'top-left': {
      pointY = pointY - popupHeight < 0 ? 0 : pointY - popupHeight;
      pointX = pointX - popupWidth < 0 ? 0 : pointX - popupWidth;
      popup.style.top = `${pointY}px`;
      popup.style.left = `${pointX}px`;
      return;
    }
  }
}

export function getCorrectPositionForPopup(
  popupEl: HTMLElement,
  basePlacement: Placement,
  basePoint: Point
) {
  const viewPortSize = getViewPortSize();
  let { horizontal, vertical } = getDimensionsFromPlacement(basePlacement);
  if (vertical === 'bottom') {
    if (basePoint.top + popupEl.clientHeight > viewPortSize.height) {
      vertical = 'top';
    }
  } else {
    if (basePoint.top - popupEl.clientHeight < 0) {
      vertical = 'bottom';
    }
  }

  if (horizontal === 'right') {
    if (basePoint.left + popupEl.clientWidth > viewPortSize.width) {
      horizontal = 'left';
    }
  } else {
    if (basePoint.left - popupEl.clientWidth < 0) {
      horizontal = 'right';
    }
  }

  const newPlacement = `${vertical}-${horizontal}`;
  return newPlacement as Placement;
}

type Dimensions = { horizontal: 'left' | 'right'; vertical: 'top' | 'bottom' };

function getDimensionsFromPlacement(placement: Placement): Dimensions {
  const [vertical, horizontal] = placement.split('-');
  return { horizontal, vertical } as Dimensions;
}
function getViewPortSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
