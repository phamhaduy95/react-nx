import { createContext, useContext, useMemo } from 'react';
import { StoreApi, createStore, useStore } from 'zustand';

type DrawerState = {
  isOpen: boolean;
  action: {
    toggleOpen: (isOpen: boolean) => void;
  };
};

type DrawerContextValue = {
  store: StoreApi<DrawerState>;
} | null;

const StoreContext = createContext<DrawerContextValue>(null);

type Props = {
  children: JSX.Element;
};

export function DrawerStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(()=>createStore<DrawerState>((set) => ({
    isOpen: false,
    action: {
      toggleOpen(isOpen) {
        set((state) => ({ isOpen:isOpen }));
      },
    },
  })),[]);
  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}
export function useDrawerStore<U>(
  selector: (state: DrawerState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error(' store context of Drawer is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}
