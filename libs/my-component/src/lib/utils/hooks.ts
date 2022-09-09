import { useEffect } from 'react';

export function useSwitchFocus(
  ref: React.MutableRefObject<HTMLElement | null>,
  isOpen: boolean
) {
  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    if (isOpen) {
      el.focus();
      return;
    }
    el.blur();
  }, [isOpen]);
}

export function useScrollOnTouchMove(
  scrollElRef: React.MutableRefObject<HTMLElement | null>
) {
  useEffect(() => {
    const scrollEl = scrollElRef.current;
    if (scrollEl === null) return;
    let position = { x: 0, y: 0 };
    let firstTouchId = -1;

    const touchStartCallback = (e: TouchEvent) => {
      const touches = e.targetTouches;
      const firstTouch = touches[0];
      firstTouchId = firstTouch.identifier;
      position = { x: firstTouch.clientX, y: firstTouch.clientY };
    };

    const touchMoveCallback = (e: TouchEvent) => {
      e.preventDefault();
      const touches = e.targetTouches;
      const firstTouch = findTargetTouch(touches, firstTouchId);
      if (firstTouch === null) return;
      const deltaPos = {
        x: firstTouch.clientX - position.x,
        y: firstTouch.clientY - position.y,
      };

      scrollEl.scrollBy({
        left: deltaPos.x,
        top: deltaPos.y,
        behavior: 'smooth',
      });
      console.log(deltaPos);
    };

    const touchEndCallback = (e: TouchEvent) => {
      const touches = e.targetTouches;
      const firstTouch = findTargetTouch(touches, firstTouchId);
      if (firstTouch === null) return;
      firstTouchId = -1;
      position = { x: 0, y: 0 };
    };

    const touchCancelCallback = (e: TouchEvent) => {
      console.log('cancel');
      const touches = e.targetTouches;
      const firstTouch = findTargetTouch(touches, firstTouchId);
      if (firstTouch === null) return;
      firstTouchId = -1;
      position = { x: 0, y: 0 };
    };

    scrollEl.addEventListener('touchstart', touchStartCallback);
    scrollEl.addEventListener('touchmove', touchMoveCallback);
    scrollEl.addEventListener('touchcancel', touchCancelCallback);
    scrollEl.addEventListener('touchend', touchEndCallback);

    return () => {
      scrollEl.removeEventListener('touchstart', touchStartCallback);
      scrollEl.removeEventListener('touchmove', touchMoveCallback);
      scrollEl.removeEventListener('touchcancel', touchCancelCallback);
      scrollEl.removeEventListener('touchend', touchEndCallback);
    };
  }, []);
}

function findTargetTouch(touches: TouchList, id: number) {
  for (let i = 0; i < touches.length; i++) {
    if (touches[i].identifier === id) return touches[i];
  }
  return null;
}
