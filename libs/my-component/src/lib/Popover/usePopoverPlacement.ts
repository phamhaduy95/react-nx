import { useEffect } from 'react';

export type Position = { top: number; left: number };
export type Placement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'center-center'
  | 'center-left'
  | 'center-right';

export function usePopoverPlacement(
  popoverRef: React.MutableRefObject<HTMLElement | null>,
  anchorRef: React.MutableRefObject<HTMLElement | null> | null,
  placement: Placement,
  basePosition: Position,
  isOpen: boolean
) {
  useEffect(() => {
    if (!isOpen) return;
    const popoverEl = popoverRef.current;
    if (popoverEl === null) return;
    const anchorPosition = recalculateBasePositionBasedOnAnchor(
      anchorRef,
      basePosition
    );
    const popoverPosition = calculatePositionForPopover(
      popoverEl,
      placement,
      anchorPosition
    );

    const adjustedPosition = rePositionPopoverBaseOnViewPort(
      popoverEl,
      popoverPosition
    );

    console.log(adjustedPosition)
    positionPopover(popoverEl, adjustedPosition);
  }, [placement, basePosition.top, basePosition.left, isOpen]);
}

function calculatePositionForPopover(
  popoverEl: HTMLElement,
  placement: Placement,
  basePosition: Position
) {
  const { horizontal, vertical } = getDimensionsFromPlacementString(placement);
  const popoverHeight = popoverEl.clientHeight;
  const popoverWidth = popoverEl.clientWidth;
  let top = basePosition.top;
  switch (vertical) {
    case 'top': {
      top = basePosition.top - popoverHeight;
      break;
    }
    case 'center': {
      top = basePosition.top - popoverHeight / 2;
      break;
    }
    case 'bottom': {
      top = basePosition.top;
      break;
    }
  }
  let left = basePosition.left;
  switch (horizontal) {
    case 'left': {
      left = basePosition.left - popoverWidth;
      break;
    }
    case 'center': {
      left = basePosition.left - popoverWidth / 2;
      break;
    }
    case 'right': {
      left = basePosition.left;
      break;
    }
  }
  return {
    top,
    left,
  } as Position;
}

function recalculateBasePositionBasedOnAnchor(
  anchorRef: React.MutableRefObject<HTMLElement | null> | null,
  basePosition: Position
) {
  if (anchorRef === null) return basePosition;
  const anchorEl = anchorRef.current;
  if (anchorEl === null) return basePosition;
  const { top, left } = anchorEl.getBoundingClientRect();
  return {
    top: basePosition.top + top,
    left: basePosition.left + left,
  };
}
const padding = 10;

function rePositionPopoverBaseOnViewPort(
  popoverEl: HTMLElement,
  popoverPos: Position
) {
  const viewPortSize = getViewPortSize();
  const popoverHeight = popoverEl.clientHeight;
  const popoverWidth = popoverEl.clientWidth;
  let top = popoverPos.top;
  debugger
  if (top < 0) {
    top = padding;
  } else if (top + popoverHeight > viewPortSize.height) {
    top = viewPortSize.height - padding - popoverHeight;
  }

  let left = popoverPos.left;
  if (left < 0) {
    left = padding;
  } else if (left + popoverWidth > viewPortSize.width) {
    left = viewPortSize.width - padding - popoverWidth;
  }
  return {
    top,
    left,
  } as Position;
}

function positionPopover(popover: HTMLElement, basePosition: Position) {
  popover.style.top = `${basePosition.top}px`;
  popover.style.left = `${basePosition.left}px`;
}

function getViewPortSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

type DimensionType = {
  vertical: 'top' | 'center' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

function getDimensionsFromPlacementString(placement: Placement) {
  const [vertical, horizontal] = placement.split('-');
  return { horizontal, vertical } as DimensionType;
}
