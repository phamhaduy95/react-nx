import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

type DatePanelState = {
  selectedDateTime: Date | null;
  action: {
    selectDateTime: (date: Date | null) => void,
  };
};

type ContextValueType = {
  store: StoreApi<DatePanelState>;
} | null;

const StoreContext = createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
};

export function DatePanelStoreProvider(props: Props) {
  const { children } = props;
  const value = useMemo(() => {
    const store = createStore<DatePanelState>((set) => ({
      selectedDateTime: null,
      action: {
        selectDateTime(date) {
          set((state) => ({ selectedDateTime: date }));
        },
      },
    }));
    return {store}
  }, []);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useDatePanelStore<U>(
    selector: (state: DatePanelState) => U,
    equalFunc?: (a: U, b: U) => boolean
  ): U {
    const value = useContext(StoreContext);
    if (value === null) throw new Error('DateTimePanel store Context is null');
    const { store } = value;
    return useStore(store, selector, equalFunc);
  }
  