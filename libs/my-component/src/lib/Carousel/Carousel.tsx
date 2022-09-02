import { useEffect, useRef } from 'react';
import {
  CarouselStoreProvider,
  useCarouselStore,
} from './CarouselStoreProvider';
import { generateIndexedCarouselSlidesFromChildren } from './CarouselSlide';
import { ScrollEventHandler } from './ScrollEventHandler';
import { mapEachSlideToOneIndicator } from './CarouselIndicator';
import { CarouselControlNext } from './CarouselControlNext';
import { CarouselControlPrev } from './CarouselControlPrev';
import "./Carousel.scss";


export type CarouselProps = {
  children: JSX.Element[] | JSX.Element;
};

export function Carousel(props: CarouselProps) {
  return (
    <CarouselStoreProvider>
      <WrappedCarousel {...props} />
    </CarouselStoreProvider>
  );
}

function WrappedCarousel(props: CarouselProps) {
  const { children } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const indexedCarouselSlides = generateIndexedCarouselSlidesFromChildren(
    children,
    containerRef
  );

  const indicators = mapEachSlideToOneIndicator(indexedCarouselSlides);

  const action = useCarouselStore((state) => state.action);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (containerEl === null) return;
    const scrollEventHandler = new ScrollEventHandler(containerEl);
    scrollEventHandler.onScrollStart = () => {
      action.switchTransitionState('transitioning');
    };
    scrollEventHandler.onScrollEnd = () => {
      action.switchTransitionState('idle');
    };
    return () => {
      scrollEventHandler.remove();
    };
  }, []);

  return (
    <div className="Carousel">
      <div className="Carousel__Viewport" ref={containerRef}>
        {indexedCarouselSlides}
      </div>
      <div className="Carousel__IndicatorBox">{indicators}</div>
        <CarouselControlPrev />
        <CarouselControlNext />
    </div>
  );
}
