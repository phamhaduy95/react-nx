import { MutableRefObject, useEffect, useState } from 'react';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { CollapsibleProps } from './Collapsible';


export function useControlElementCollapsingState(
  ref: MutableRefObject<HTMLElement | null>,
  props: Required<CollapsibleProps>
) {
  const { showed, direction } = props;
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  // * reset size of element to normal when new direction is set.
  useEffectSkipFirstRender(() => {
    const el = ref.current;
    if (el === null) return;
    setElementToMaxSize(el, 'horizontal');
    setElementToMaxSize(el, 'vertical');
  }, [direction]);

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    if (showed) {
      const callback = () => {
        if (direction === 'vertical') {
          el.style.maxHeight = 'max-content';
        } else {
          el.style.maxWidth = 'max-content';
        }
      };
      setElementToMaxSize(el, direction);
      el.addEventListener('transitionend', callback);
      return () => {
        el.removeEventListener('transitionend', callback);
      };
    }
    if (firstRender) {
      setElementToMinSize(el, direction);
      return;
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
