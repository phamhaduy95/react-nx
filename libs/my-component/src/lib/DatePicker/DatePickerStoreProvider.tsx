import { Store } from '@mui/icons-material';
import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

type DatePickerState = {
  selectedDate: Date | null;
  submittedDate: Date | null;
  isPopupOpen: boolean;
  action: {
    selectDate(date: DatePickerState['selectedDate']): void;
    submitDate(date: DatePickerState['submittedDate']): void;
    togglePopup: (isOpen: boolean) => void;
  };
};

type ContextValueType = StoreApi<DatePickerState> | null;

const StoreContext = createContext<ContextValueType>(null);

type ContextProviderProps = {
  children: JSX.Element;
};

export function DatePickerStoreProvider(props: ContextProviderProps) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<DatePickerState>((set) => ({
      selectedDate: null,
      submittedDate: null,
      isPopupOpen: false,
      action: {
        selectDate(date) {
          set((state) => ({ selectedDate: date }));
        },
        togglePopup(isOpen) {
          set((state) => ({ isPopupOpen: isOpen }));
        },
        submitDate(date) {
          set((state) => ({ submittedDate: date }));
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useDatePickerStore<U>(
  selector: (state: DatePickerState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('DatePickerStore Context value is null');
  return useStore(value, selector, equalFunc);
}

export function useStoreDirectly(
){
  const value = useContext(StoreContext);
  if (value === null) throw new Error('DatePickerStore Context value is null');
  return value;
}