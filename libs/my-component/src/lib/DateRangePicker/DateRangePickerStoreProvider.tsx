import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

export type DateRangePickerState = {
  startDate: Date | null;
  endDate: Date | null;
  action: {
    selectStartDate: (date: Date | null) => void;
    selectEndDate: (date: Date | null) => void;
  };
};

type ContextValueType = StoreApi<DateRangePickerState> | null;

const StoreContext = createContext<ContextValueType>(null);

type ContextProviderProps = {
  children: JSX.Element;
};

export function DateRangePickerStoreProvider(props: ContextProviderProps) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<DateRangePickerState>((set) => ({
      startDate: null,
      endDate: null,
      action: {
        selectEndDate(date) {
          set((state) => {
            return { endDate: date };
          });
        },
        selectStartDate(date) {
          set((state) => {
            return { startDate: date };
          });
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useDateRangePickerStore<U>(
  selector: (state: DateRangePickerState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('DateRangePicker Context value is null');
  return useStore(value, selector, equalFunc);
}
