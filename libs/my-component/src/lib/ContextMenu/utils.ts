export type Placement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type Point = { x: number; y: number };
export function positionPopup(
  popup: HTMLElement,
  placement: Placement,
  point: Point
) {
  const popupHeight = popup.clientHeight;
  const popupWidth = popup.clientWidth;

  switch (placement) {
    case 'bottom-right': {
      popup.style.top = `${point.y}px`;
      popup.style.left = `${point.x}px`;
      return;
    }
    case 'top-right': {
      popup.style.top = `${point.y - popupHeight}px`;
      popup.style.left = `${point.x}px`;
      return;
    }
    case 'bottom-left': {
      popup.style.top = `${point.y}px`;
      popup.style.left = `${point.x - popupWidth}px`;
      return;
    }
    case 'top-left': {
      popup.style.top = `${point.y - popupHeight}px`;
      popup.style.left = `${point.x - popupWidth}px`;
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
    if (basePoint.y + popupEl.clientHeight > viewPortSize.height) {
      vertical = 'top';
    }
  } else {
    if (basePoint.y - popupEl.clientHeight < 0) {
      vertical = 'bottom';
    }
  }

  if (horizontal === 'right') {
    if (basePoint.x + popupEl.clientWidth > viewPortSize.width) {
      horizontal = 'left';
    }
  } else {
    if (basePoint.x - popupEl.clientWidth < 0) {
      horizontal = 'right';
    }
  }

  const newPlacement = `${vertical}-${horizontal}`;
  return newPlacement as Placement;
}

function getViewPortSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

type Dimensions = { horizontal: 'left' | 'right'; vertical: 'top' | 'bottom' };

function getDimensionsFromPlacement(placement: Placement): Dimensions {
  const [vertical, horizontal] = placement.split('-');
  return { horizontal, vertical } as Dimensions;
}
