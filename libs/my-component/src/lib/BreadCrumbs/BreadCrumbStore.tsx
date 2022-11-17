import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';
import { useStore, createStore, StoreApi } from 'zustand';

export type BreadCrumbsState = {
  isExpanded: boolean;
  action: {
    toggleExpand: (isExpanded: boolean) => void;
  };
};

type StoreContextValue = StoreApi<BreadCrumbsState> | null;

const StoreContext = createContext<StoreContextValue>(null);

type StoreContextProps = {
  children: JSX.Element;
};

export function BreadCrumbsStoreProvider(props: StoreContextProps) {
  const { children } = props;
  const store = useMemo(
    () =>
      createStore<BreadCrumbsState>((set) => ({
        isExpanded: false,

        action: {
          toggleExpand(isExpanded) {
            set(() => ({ isExpanded }));
          },
        },
      })),
    []
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useBreadCrumbsStore<U>(
  selector: (state: BreadCrumbsState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const store = useContext(StoreContext);
  if (store === null) throw new Error('BreadCrumbsStore Context is null');
  return useStore(store, selector, equalFunc);
}
