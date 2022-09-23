import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { Time } from './types';

type TimePanelState = {
  selectedTime: Time | null;
  action: {
    selectTime: (time:Time|null)=>void;
    selectHour: (hour: Time['hour']) => void;
    selectMinute: (minute: Time['minute']) => void;
    selectSecond: (second: Time['second']) => void;
  };
};

type ContextValueType = {
  store: StoreApi<TimePanelState>;
} | null;

const StoreContext = createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
};

const DEFAULT_TIME:Time = {hour:0,minute:0,second:0};

export function TimePanelStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<TimePanelState>((set) => ({
      selectedTime: null,
      action: {
        selectTime(time) {
          set((state) => ({
            selectedTime:time
          })); 
        },
        selectHour(hour) {
          set((state) => {
            const selectedTime =
              state.selectedTime === null
                ? DEFAULT_TIME
                : state.selectedTime;
            const newTime = { ...selectedTime, hour };
            return { selectedTime: newTime };
          });
        },
        selectMinute(minute) {
          set((state) => {
            const selectedTime =
              state.selectedTime === null
                ? DEFAULT_TIME
                : state.selectedTime;
            const newTime = { ...selectedTime, minute };
            return { selectedTime: newTime };
          });
        },
        selectSecond(second) {
          set((state) => {
            const selectedTime =
              state.selectedTime === null
                ? DEFAULT_TIME
                : state.selectedTime;
            const newTime = { ...selectedTime, second };
            return { selectedTime: newTime };
          });
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useTimePanelStore<U>(
  selector: (state: TimePanelState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('TimePanelStore Context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}
