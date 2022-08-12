import dayjs from 'dayjs';
import { useReducer } from 'react';

export type CalendarState = {
  selectedDate: Date;
  currentMonth: { year: number; month: number };
  selectable: boolean;
};

type SelectNewDateAction = {
  type: 'SELECT_NEW_DATE';
  payload: {
    newDate: string;
  };
};

type MakeSelectableAction = {
  type: 'MAKE_SELECTABLE';
  payload: {
    selectable: boolean;
  };
};

type GoToNextMonthAction = {
  type: 'GO_TO_NEXT_MONTH';
};

type GoToPreviousMonthAction = {
  type: 'GO_TO_PREVIOUS_MONTH';
};

type SelectNewMonthAction = {
  type: 'SELECT_NEW_MONTH';
  payload: {
    month: number;
    year: number;
  };
};

export type CalendarAction =
  | SelectNewDateAction
  | GoToNextMonthAction
  | GoToPreviousMonthAction
  | MakeSelectableAction
  | SelectNewMonthAction;

type Dispatcher = React.Dispatch<CalendarAction>;

export type CalendarActionMethod = {
  selectNewDate: (newDate: string) => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
  makeSelectable: (selectable: boolean) => void;
  selectNewMonth: (year: number, month: number) => void;
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
    makeSelectable(selectable) {
      dispatch({ type: 'MAKE_SELECTABLE', payload: { selectable } });
    },
    selectNewMonth(year: number, month: number) {
      dispatch({ type: 'SELECT_NEW_MONTH', payload: { year, month } });
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
      if (newDateStr === state.selectedDate.toDateString()) return state;
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
    case 'MAKE_SELECTABLE': {
      const selectable = action.payload.selectable;
      if (selectable === state.selectable) return state;
      return { ...state, selectable };
    }
    case 'SELECT_NEW_MONTH': {
      const { month, year } = action.payload;
      if (
        year === state.currentMonth.year &&
        month === state.currentMonth.month
      )
        return state;
      return { ...state, currentMonth: { year, month } };
    }

    default: {
      return state;
    }
  }
};

export function useCalendarReducer(initialState: CalendarState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = getActionMethod(dispatch);
  return { state, action };
}
