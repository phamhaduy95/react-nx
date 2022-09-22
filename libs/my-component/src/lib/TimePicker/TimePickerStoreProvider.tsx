import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { Time } from '../TimePanel/types';

type TimePickerState = {
  selectedTime: Time|null;
  submittedTime:Time|null;
  isPopupOpen: boolean;
  action: {
    selectTime: (time: Time|null) => void;
    togglePopup: (state: boolean) => void;
    submitTime:(time:Time|null)=>void;
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
      selectedTime: null,
      submittedTime:null,
      isPopupOpen: false,
      action: {
        selectTime(date) {
          set((state) => ({ selectedTime: date }));
        },
        togglePopup(isOpen) {
          set((state) => ({ isPopupOpen: isOpen }));
        },
        submitTime(time) {
          set((state)=>({submittedTime:time}))
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
