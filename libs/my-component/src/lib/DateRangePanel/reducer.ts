import { useReducer } from 'react';

export type DateRangePanelState = {
  startDate: Date|null;
  endDate: Date|null;
};

type SelectStartAction = {
  type: 'SELECT_START_DATE';
  payload: {
    date: DateRangePanelState["startDate"]
  };
};

type SelectEndDateAction = {
  type: 'SELECT_END_DATE';
  payload: {
    date: DateRangePanelState["endDate"]
  };
};

export type CalendarAction = SelectStartAction | SelectEndDateAction;

type Dispatcher = React.Dispatch<CalendarAction>;

export type DateRangePanelActionMethod = {
  selectStartDate: (date:DateRangePanelState["startDate"]) => void;
  selectEndDate: (date: DateRangePanelState["endDate"]) => void;
};

function getActionMethod(dispatch: Dispatcher): DateRangePanelActionMethod {
  return {
    selectStartDate(date) {
      dispatch({ type: 'SELECT_START_DATE', payload: { date } });
    },
    selectEndDate(date) {
      dispatch({ type: 'SELECT_END_DATE', payload: { date } });
    },
  };
}

const reducer = (
  state: DateRangePanelState,
  action: CalendarAction
): DateRangePanelState => {
  switch (action.type) {
    case 'SELECT_START_DATE': {
      const newDate = action.payload.date;
      if (newDate?.toDateString() === state.startDate?.toDateString())
        return state;
      return { ...state, startDate: newDate };
    }
    case 'SELECT_END_DATE': {
      const newDate = action.payload.date;
      if (newDate?.toDateString() === state.endDate?.toDateString()) return state;
      return { ...state, endDate: newDate };
    }
    default: {
      return state;
    }
  }
};

export function useDateRangePanelReducer(initialState: DateRangePanelState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = getActionMethod(dispatch);
  return { state, action };
}
