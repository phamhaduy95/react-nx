import { sliderClasses } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useCarouselStore } from './CarouselStoreProvider';

export type CarouselSlideProps = {
  children: JSX.Element;
};

export function CarouselSlide(props: CarouselSlideProps) {
  const { children } = props;
  return <></>;
}

export type IndexedCarouselSlide = CarouselSlideProps & {
  index: number;
  containerRef: React.MutableRefObject<HTMLElement | null>;
};

 function IndexedCarouselSlide(props: IndexedCarouselSlide) {
  const { children, index, containerRef } = props;
  const slideRef = useRef<HTMLDivElement>(null);
  const action = useCarouselStore((state) => state.action);
  useEffect(() => {
    action.subscribe();
    return () => {
      action.unsubscribe();
    };
  }, []);

  const isSelected = useCarouselStore(
    (state) => state.selectedSlide.id === index
  );

  useEffect(()=>{
    const slideEl = slideRef.current;
    if (slideEl === null) return;
    const slideScrollPos = determineScrollPosition(slideEl);
    console.log(slideEl.offsetLeft);
  },[])


  useEffect(() => {
    const slideEl = slideRef.current;
    const containerEl = containerRef.current;
    if (!isSelected) return;
    if (slideEl === null || containerEl === null) return;
    const slideScrollPos = determineScrollPosition(slideEl);

    // ensure the CSS position of containerEl is non static (relative or absolute) for the scrollTo method work properly.
    containerEl.scrollTo({
        top:slideScrollPos.top,
        left:slideScrollPos.left,
        behavior:"smooth"
    });
  }, [isSelected]);

  return (
    <div className="Carousel__Slide" ref={slideRef}>
      {children}
    </div>
  );
}

export function generateIndexedCarouselSlidesFromChildren(
  children: JSX.Element[] | JSX.Element,
  containerRef: React.MutableRefObject<HTMLElement | null>
) {
  const slidesArray = extractCarouselSlidesFromChildren(children);
  const indexedSlideArray = slidesArray.map((e, i) => {
    const props = e.props as CarouselSlideProps;
    return (
      <IndexedCarouselSlide {...props} index={i} containerRef={containerRef} key={i} />
    );
  });
  return indexedSlideArray;
}

function extractCarouselSlidesFromChildren(
  children: JSX.Element[] | JSX.Element
): JSX.Element[] {
  const childrenArray = ensureChildrenAsArray(children);
  return childrenArray.filter((e) => e.type.name === CarouselSlide.name);
}

function ensureChildrenAsArray(
  slides: JSX.Element[] | JSX.Element
): JSX.Element[] {
  if (slides instanceof Array) return slides;
  return [slides];
}

const determineScrollPosition = (el: HTMLElement) => {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
  };
};

