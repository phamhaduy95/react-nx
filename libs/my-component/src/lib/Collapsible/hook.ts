import { MutableRefObject, useEffect } from 'react';
import { CollapsibleProps } from './Collapsible';

export function useControlElementCollapsingState(
  ref: MutableRefObject<HTMLElement | null>,
  props: Required<CollapsibleProps>
) {
  const { showed, direction } = props;

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    if (showed) {
      const callback = () => {
        el.style.maxHeight = 'max-content';
      };
      setElementToMaxSize(el, direction);
      el.addEventListener('transitionend', callback);
      return () => {
        el.removeEventListener('transitionend', callback);
      };
    }

    setElementToMaxSize(el, direction);
    const timeout = setTimeout(() => {
      setElementToMinSize(el, direction);
      clearTimeout(timeout);
    }, 2);

    return () => {
      clearTimeout(timeout);
    };
  }, [showed, direction]);
}

function setElementToMaxSize(
  el: HTMLElement,
  direction: Required<CollapsibleProps>['direction']
) {
  switch (direction) {
    case 'horizontal': {
      const size = el.scrollWidth;
      el.style.maxWidth = `${size}px`;
      return;
    }
    case `vertical`: {
      const size = el.scrollHeight;
      el.style.maxHeight = `${size}px`;
      return;
    }
  }
}
function setElementToMinSize(
  el: HTMLElement,
  direction: Required<CollapsibleProps>['direction']
) {
  switch (direction) {
    case 'horizontal': {
      el.style.maxWidth = `0px`;
      return;
    }
    case `vertical`: {
      el.style.maxHeight = `0px`;
      return;
    }
  }
}
