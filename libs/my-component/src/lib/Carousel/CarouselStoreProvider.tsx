import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

type CarouselState = {
  scrollingState: 'idle' | 'transitioning';
  selectedSlide: {
    id: number;
  };
  numberOfSlides: number;
  action: {
    subscribe: () => void;
    unsubscribe: () => void;
    switchTransitionState: (state: CarouselState['scrollingState']) => void;
    moveToNextSlide: () => void;
    moveToPrevSlide: () => void;
    moveToSlide: (index: number) => void;
  };
};

type StoreContextValueType = {
  store: StoreApi<CarouselState>;
} | null;

const StoreContext = createContext<StoreContextValueType>(null);

type Props = {
  children: JSX.Element;
};

export function CarouselStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<CarouselState>((set) => ({
      scrollingState: 'idle',
      selectedSlide: { id: 0 },
      numberOfSlides: 0,
      action: {
        subscribe() {
          set((state) => ({ numberOfSlides: state.numberOfSlides + 1 }));
        },
        unsubscribe() {
          set((state) => ({ numberOfSlides: state.numberOfSlides - 1 }));
        },
        switchTransitionState(state) {
          set(() => ({ scrollingState: state }));
        },
        moveToNextSlide() {
          set((state) => {
            if (state.scrollingState === 'transitioning') return {};
            const newPos = invertNumberWhenExceedRange(
              state.selectedSlide.id + 1,
              {
                min: 0,
                max: state.numberOfSlides - 1,
              }
            );
            return { selectedSlide: { id: newPos } };
          });
        },
        moveToPrevSlide() {
          set((state) => {
            if (state.scrollingState === 'transitioning') return {};
            const newPos = invertNumberWhenExceedRange(
              state.selectedSlide.id - 1,
              {
                min: 0,
                max: state.numberOfSlides - 1,
              }
            );
            return { selectedSlide: { id: newPos } };
          });
        },
        moveToSlide(index) {
          set((state) => {
            if (state.scrollingState === 'transitioning') return {};
            return { selectedSlide: { id: index } };
          });
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useCarouselStore<U>(
  selector: (state: CarouselState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error(' store context of DataColumn is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}
/** make input number equal to min when it is larger than max and equal to max when it is smaller than min, otherwise keep its value */
function invertNumberWhenExceedRange(
  number: number,
  range: { min: number; max: number }
) {
  const { max, min } = range;
  if (number > max) return min;
  if (number < min) return max;
  return number;
}
