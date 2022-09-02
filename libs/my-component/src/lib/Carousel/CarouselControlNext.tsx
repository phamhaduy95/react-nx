import React, { useContext } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useCarouselStore } from './CarouselStoreProvider';

export function CarouselControlNext() {
  const action = useCarouselStore((state) => state.action);
  const handleClick = () => {
    action.moveToNextSlide();
  };

  return (
    <div className="Carousel__Arrow-forward" tabIndex={0} onClick={handleClick}>
      <ArrowForwardIosIcon className="Carousel__ArrowIcon" />
    </div>
  );
}
