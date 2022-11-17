import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';
import { useStore, createStore, StoreApi } from 'zustand';

export type PaginationStore = {
  currentIndex: number;
  maxIndex: number;
  action: {
    updateMaxIndex: (max: number) => void;
    moveNext: () => void;
    movePrev: () => void;
    moveToNew: (index: number) => void;
  };
};

type StoreContextValue = StoreApi<PaginationStore> | null;

const StoreContext = createContext<StoreContextValue>(null);

type StoreContextProps = {
  children: JSX.Element;
};

export function PaginationStoreProvider(props: StoreContextProps) {
  const { children } = props;
  const store = useMemo(
    () =>
      createStore<PaginationStore>((set) => ({
        maxIndex: 0,
        currentIndex: 1,
        action: {
          updateMaxIndex(max) {
            set(() => ({ maxIndex: max }));
          },
          moveNext() {
            set((state) => {
              const { maxIndex, currentIndex } = state;
              const next =
                currentIndex + 1 > maxIndex ? maxIndex : currentIndex + 1;
              return { currentIndex: next };
            });
          },
          movePrev() {
            set((state) => {
              const { maxIndex, currentIndex } = state;
              const prev = currentIndex - 1 <= 0 ? 1 : currentIndex - 1;
              return { currentIndex: prev };
            });
          },
          moveToNew(index) {
            set((state) => {
              const { maxIndex } = state;
              const validIndex =
                index <= 0 ? 1 : index > maxIndex ? maxIndex : index;
              return { currentIndex: validIndex };
            });
          },
        },
      })),
    []
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function usePaginationStore<U>(
  selector: (state: PaginationStore) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const store = useContext(StoreContext);
  if (store === null) throw new Error('PaginationStore Context is null');
  return useStore(store, selector, equalFunc);
}
