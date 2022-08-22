import dayjs from 'dayjs';
import { useReducer } from 'react';


export type CalendarState = {
  currentMonth: { year: number; month: number };
} 



export function prepareInitialState(
): CalendarState {
  const now = new Date(Date.now());
  const currentMonth: CalendarState['currentMonth'] = {
    month: now.getMonth(),
    year: now.getFullYear(),
  };
    return {
      currentMonth,
    };
  }


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
  | GoToNextMonthAction
  | GoToPreviousMonthAction
  | SelectNewMonthAction;


type Dispatcher = React.Dispatch<CalendarAction>;

export type CalendarActionMethod = {
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
  selectNewMonth: (year: number, month: number) => void;
};

function getActionMethod(dispatch: Dispatcher): CalendarActionMethod {
  return {
    goToNextMonth() {
      dispatch({ type: 'GO_TO_NEXT_MONTH' });
    },
    goToPreviousMonth() {
      dispatch({ type: 'GO_TO_PREVIOUS_MONTH' });
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
