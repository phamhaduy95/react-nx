import { useEffect } from 'react';

type Placement = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

const defaultPlacement: Placement = 'bottom-right';

export function useSubMenuPlacement(
  targetRef: React.MutableRefObject<HTMLElement | null>,
  popupRef: React.MutableRefObject<HTMLElement | null>,
  isOpen: boolean
) {
  useEffect(() => {
    if (!isOpen) return;
    const targetEl = targetRef.current;
    const popupEl = popupRef.current;
    if (targetEl === null || popupEl === null) return;
    const placement = getCorrectPlacement(targetEl, popupEl); 
    placeThePopup(targetEl, popupEl, placement);
  }, [isOpen]);
}

function getCorrectPlacement(targetEl: HTMLElement, popupEl: HTMLElement) {
  const viewPort = getViewPortSize();
  let initialPlacement = defaultPlacement;
  const targetRect = targetEl.getBoundingClientRect();
  const popupRect = popupEl.getBoundingClientRect();
  if (targetRect.x + targetRect.width + popupRect.width > viewPort.width) {
    initialPlacement.replace('right', 'left');
  } else if (targetRect.x - popupRect.width < 0) {
    initialPlacement.replace('left', 'right');
  }
  if (targetRect.y + popupRect.height > viewPort.height) {
    initialPlacement.replace('bottom', 'top');
  } else if (targetRect.y - popupRect.height + targetRect.height < 0) {
    initialPlacement.replace('top', 'bottom');
  }
  return initialPlacement;
}

function placeThePopup(
  targetEl: HTMLElement,
  popupEl: HTMLElement,
  placement: Placement
) {
  const targetRect = targetEl.getBoundingClientRect();
  const popupRect = popupEl.getBoundingClientRect();
  switch (placement) {
    case 'bottom-right': {
      const left =  targetRect.width;
      const top = 0;
      popupEl.style.top = `${top}px`;
      popupEl.style.left = `${left}px`;
      return;
    }
    case 'bottom-left': {
      const left =  - popupRect.width;
      const top = 0;
      popupEl.style.top = `${top}px`;
      popupEl.style.left = `${left}px`;
      return;
    }
    case 'top-left': {
      const left = - popupRect.width;
      const top =  targetRect.height - popupRect.height;
      popupEl.style.top = `${top}px`;
      popupEl.style.left = `${left}px`;
      return;
    }
    case 'top-right': {
      const left =  + targetRect.width;
      const top =  targetRect.height - popupRect.height;
      popupEl.style.top = `${top}px`;
      popupEl.style.left = `${left}px`;
      return;
    }
  }
}

function getViewPortSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
