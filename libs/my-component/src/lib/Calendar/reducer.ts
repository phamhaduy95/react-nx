import dayjs from 'dayjs';
import { useReducer } from 'react';

export type CalendarState = {
  selectedDate: Date;
  currentMonth: { year: number; month: number };
};

type SelectNewDateAction = {
  type: 'SELECT_NEW_DATE';
  payload: {
    newDate: string;
  };
};

type GoToNextMonthAction = {
  type: 'GO_TO_NEXT_MONTH';
};

type GoToPreviousMonthAction = {
  type: 'GO_TO_PREVIOUS_MONTH';
};

export type CalendarAction =
  | SelectNewDateAction
  | GoToNextMonthAction
  | GoToPreviousMonthAction;

type Dispatcher = React.Dispatch<CalendarAction>;

export type CalendarActionMethod = {
  selectNewDate: (newDate: string) => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
};

function getActionMethod(dispatch: Dispatcher): CalendarActionMethod {
  return {
    selectNewDate(newDate: string) {
      dispatch({ type: 'SELECT_NEW_DATE', payload: { newDate } });
    },
    goToNextMonth() {
      dispatch({ type: 'GO_TO_NEXT_MONTH' });
    },
    goToPreviousMonth() {
      dispatch({ type: 'GO_TO_PREVIOUS_MONTH' });
    },
  };
}

const reducer = (
  state: CalendarState,
  action: CalendarAction
): CalendarState => {
  switch (action.type) {
    case 'SELECT_NEW_DATE': {
      const newDateStr = action.payload.newDate;
      const newDate = new Date(newDateStr);
      return { ...state, selectedDate: newDate };
    }
    case 'GO_TO_PREVIOUS_MONTH': {
      const { year, month } = state.currentMonth;
      const currentMonth = dayjs().year(year).month(month);
      const prevMonth = currentMonth.subtract(1, 'month');
      const newMonth: CalendarState['currentMonth'] = {
        year: prevMonth.year(),
        month: prevMonth.month(),
      };
      return { ...state, currentMonth: newMonth };
    }
    case 'GO_TO_NEXT_MONTH': {
      const { year, month } = state.currentMonth;
      const currentMonth = dayjs().year(year).month(month);
      const nextMonth = currentMonth.add(1, 'month');
      const newMonth: CalendarState['currentMonth'] = {
        year: nextMonth.year(),
        month: nextMonth.month(),
      };
      return { ...state, currentMonth: newMonth };
    }
    default: {
      return state;
    }
  }
};

export function useCalendarReducer(initialState: CalendarState) {
    const [state,dispatch] = useReducer(reducer,initialState);
    const action = getActionMethod(dispatch);
    return {state,action}
}
