import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

type TimePickerState = {
  selectedTime: Date;
  isPopupOpen: boolean;
  action: {
    selectTime: (time: Date) => void;
    togglePopup: (state: boolean) => void;
  };
};

type ContextValueType = {
  store: StoreApi<TimePickerState>;
} | null;

const StoreContext = createContext<ContextValueType>(null);

type ContextProviderProps = {
  children: JSX.Element;
};

export function TimePickerStoreProvider(props: ContextProviderProps) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<TimePickerState>((set) => ({
      selectedTime: dayjs().hour(0).minute(0).second(0).toDate(),
      isPopupOpen: false,
      action: {
        selectTime(date) {
          set((state) => ({ selectedTime: date }));
        },
        togglePopup(isOpen) {
          set((state) => ({ isPopupOpen: isOpen }));
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useTimePickerStore<U>(
  selector: (state: TimePickerState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('TimePicker context value is null');
  return useStore(value.store, selector, equalFunc);
}
