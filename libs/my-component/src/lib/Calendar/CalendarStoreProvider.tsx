import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';
import { useStore, createStore, StoreApi } from 'zustand';
export type CalendarState = {
  selectable: boolean;
  currentMonth: { year: number; month: number };
  selectedDate: Date | null;
  action: {
    gotoNextMonth: () => void;
    gotoPreviousMonth: () => void;
    selectDate: (date: Date) => void;
    selectNewMonth: (newMonth: CalendarState['currentMonth']) => void;
    toggleSelectable: (isSelectable: boolean) => void;
  };
};

type StoreContextValue = StoreApi<CalendarState> | null;

const StoreContext = createContext<StoreContextValue>(null);

type StoreContextProps = {
  children: JSX.Element;
};

export function CalendarStoreProvider(props: StoreContextProps) {
  const { children } = props;
  const store = useMemo(
    () =>
      createStore<CalendarState>((set) => ({
        selectable: false,
        currentMonth: { month: dayjs().month(), year: dayjs().year() },
        selectedDate: null,
        action: {
          gotoNextMonth() {
            set((state) => {
              const { year, month } = state.currentMonth;
              const currentMonth = dayjs().year(year).month(month);
              const nextMonth = currentMonth.add(1, 'month');
              const newMonth: CalendarState['currentMonth'] = {
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
              const newMonth: CalendarState['currentMonth'] = {
                year: prevMonth.year(),
                month: prevMonth.month(),
              };
              return { ...state, currentMonth: newMonth };
            });
          },
          selectDate(date) {
            set(() => {
              return { selectedDate: date };
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
          toggleSelectable(isSelectable) {
            set(() => ({ selectable: isSelectable }));
          },
        },
      })),
    []
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useCalendarStore<U>(
  selector: (state: CalendarState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const store = useContext(StoreContext);
  if (store === null) throw new Error('CalendarState store Context is null');
  return useStore(store, selector, equalFunc);
}
