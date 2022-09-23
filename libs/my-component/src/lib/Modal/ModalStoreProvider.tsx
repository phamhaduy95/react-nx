import React, { createContext, useContext, useMemo } from 'react';
import { StoreApi, createStore, useStore } from 'zustand';

type ModalState = {
  isOpen: boolean;
  action: {
    toggleOpen: (isOpen: boolean) => void;
  };
};

type StoreContextValue = 
 StoreApi<ModalState>
 | null;

const StoreContext = createContext<StoreContextValue>(null);

type Props = {
  children: JSX.Element;
};
export function ModalStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(
    () =>
      createStore<ModalState>((set) => ({
        isOpen: false,
        action: {
          toggleOpen(isOpen) {
            set((state) => ({ isOpen: isOpen }));
          },
        },
      })),
    []
  );
  return (
    <StoreContext.Provider value={ store }>{children}</StoreContext.Provider>
  );
}
export function useModalStore<U>(
  selector: (state: ModalState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error(' store context of Modal is null');
  const store  = value;
  return useStore(store, selector, equalFunc);
}
