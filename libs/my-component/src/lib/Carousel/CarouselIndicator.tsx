import React from 'react';
import { IndexedCarouselSlide } from './CarouselSlide';
import { useCarouselStore } from './CarouselStoreProvider';
import classNames from 'classnames';

type CarouselIndicatorProps = {
  id: number;
};

export  function CarouselIndicator(props: CarouselIndicatorProps) {
  const { id } = props;
  const action = useCarouselStore((state) => state.action);
  const isSelected = useCarouselStore((state)=>(state.selectedSlide.id === id));
  const itemClassName = classNames("Carousel__Indicator",{
    ["is-selected"]:isSelected
  });

  const handleClick = () => {
    action.moveToSlide(id);
  };

  return (
    <div className={itemClassName} onClick={handleClick} tabIndex={0}>
    </div>
  );
}

export function mapEachSlideToOneIndicator(slides: JSX.Element[]) {
  return slides.map((e, i) => {
    const props = e.props as IndexedCarouselSlide;
    const id = props.index;
    return <CarouselIndicator id={id} key={`indicator-${id}`} />;
  });
}
