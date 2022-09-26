import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { Time } from '../TimePanel/types';

type DateTimePickerState = {
  selectedDate: Date | null;
  submittedDate: Date | null;
  isPopupOpen: boolean;
  action: {
    selectDate(date: DateTimePickerState['selectedDate']): void;
    selectTime(time: Time | null): void;
    selectDateTime(date:Date|null):void;
    submitDate(date: DateTimePickerState['submittedDate']): void;
    togglePopup: (isOpen: boolean) => void;
  };
};

type ContextValueType = 
  StoreApi<DateTimePickerState>|
null;

const StoreContext = createContext<ContextValueType>(null);

type ContextProviderProps = {
  children: JSX.Element;
};

const DEFAULT_DATE = dayjs().hour(0).minute(0).second(0).toDate();
const DEFAULT_TIME: Time = { hour: 0, minute: 0, second: 0 };

export function DateTimePickerStoreProvider(props: ContextProviderProps) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<DateTimePickerState>((set) => ({
      selectedDate: null,
      submittedDate: null,
      isPopupOpen: false,
      action: {
        selectDate(date) {
          set((state) => {
            if (date === null) {
              return { selectedDate: null };}
            const { selectedDate } = state;
            const oldTime = extractTimeFromDateObject(selectedDate);
            const newDate = updateTimeForDateObject(date, oldTime);
            return {
              selectedDate: newDate,
            };
          });
        },
        selectTime(time) {
          set((state) => {
            const { selectedDate } = state;
            if (selectedDate === null && time === null) return {};
            const newDate = updateTimeForDateObject(selectedDate, time);
            return { selectedDate: newDate };
          });
        },
        selectDateTime(date) {
          set((state) => {
            return { selectedDate: date };
          });
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
    <StoreContext.Provider value={store }>{children}</StoreContext.Provider>
  );
}

export function useDateTimePickerStore<U>(
  selector: (state: DateTimePickerState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('context value is null');
  return useStore(value, selector, equalFunc);
}

export function useStoreDirectly(
  ){
    const value = useContext(StoreContext);
    if (value === null) throw new Error('DatePickerStore Context value is null');
    return value;
  }

function updateTimeForDateObject(date: Date | null, time: Time | null) {
  const nonNullableDate = date === null ? DEFAULT_DATE : date;
  const newTime = time === null ? DEFAULT_TIME : time;
  const { hour, minute, second } = newTime;
  const newDate = dayjs(nonNullableDate)
    .hour(hour)
    .minute(minute)
    .second(second)
    .toDate();
  return newDate;
}

function extractTimeFromDateObject(date: Date | null): Time {
  if (date === null) return DEFAULT_TIME;
  const day = dayjs(date);
  return {
    hour: day.hour(),
    minute: day.minute(),
    second: day.second(),
  };
}
