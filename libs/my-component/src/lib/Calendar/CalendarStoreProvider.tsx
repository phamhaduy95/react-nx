import dayjs from 'dayjs';
import { createContext, useContext } from 'react';
import { useStore, createStore, StoreApi } from 'zustand';

export type CalendarStore = {
  currentMonth: { year: number; month: number };
  action: {
    gotoNextMonth: () => void;
    gotoPreviousMonth: () => void;
    selectNewMonth: (newMonth: CalendarStore['currentMonth']) => void;
  };
};

type StoreContextValue = {
  store: StoreApi<CalendarStore>;
} | null;

const StoreContext = createContext<StoreContextValue>(null);

type StoreContextProps = {
  children: JSX.Element;
};

export  function CalendarStoreProvider(props: StoreContextProps) {
    const {children} = props;
  const store = createStore<CalendarStore>((set) => ({
    currentMonth: { month: dayjs().month(), year: dayjs().year() },
    action: {
      gotoNextMonth() {
        set((state) => {
          const { year, month } = state.currentMonth;
          const currentMonth = dayjs().year(year).month(month);
          const nextMonth = currentMonth.add(1, 'month');
          const newMonth: CalendarStore['currentMonth'] = {
            year: nextMonth.year(),
            month: nextMonth.month(),
          };
          return { currentMonth: newMonth };
        });
      },
      gotoPreviousMonth() {
        set((state) => {
          const { year, month } = state.currentMonth;
          const currentMonth = dayjs().year(year).month(month);
          const prevMonth = currentMonth.subtract(1, 'month');
          const newMonth: CalendarStore['currentMonth'] = {
            year: prevMonth.year(),
            month: prevMonth.month(),
          };
          return { ...state, currentMonth: newMonth };
        });
      },
      selectNewMonth(newMonth) {
        set((state) => {
          const { month, year } = newMonth;
          if (
            year === state.currentMonth.year &&
            month === state.currentMonth.month
          )
            return state;
          return { ...state, currentMonth: { year, month } };
        });
      },
    },
  }));

  return (
    <StoreContext.Provider value={{store}}>
        {children}
    </StoreContext.Provider>
  )
}

export function useCalendarStore(){
    const value = useContext(StoreContext);
    if (value === null) throw new Error("store context is null");
    const {store} = value;
    return store;
}