import { useContext } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useCarouselStore } from './CarouselStoreProvider';

export function CarouselControlPrev() {
  const action = useCarouselStore((state) => state.action);

  const handleClick = (e?: any) => {
    action.moveToPrevSlide();
  };
  return (
    <div
      className="Carousel__Arrow-backward"
      onClick={handleClick}
      tabIndex={0}
    >
      <ArrowBackIosIcon className='Carousel__ArrowIcon'/>
    </div>
  );
}
