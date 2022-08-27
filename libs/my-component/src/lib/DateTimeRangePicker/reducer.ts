import { useReducer } from 'react';

export type DateTimeRangePickerState = {
  startDate: Date | null;
  endDate: Date | null;
};

type SelectStartDateAction = {
  type: 'SELECT_START_DATE';
  payload: {
    date: DateTimeRangePickerState['startDate'];
  };
};

type SelectEndDateAction = {
  type: 'SELECT_END_DATE';
  payload: {
    date: DateTimeRangePickerState['endDate'];
  };
};

type Action = SelectStartDateAction | SelectEndDateAction;

type Dispatcher = React.Dispatch<Action>;

export type DateTimeRangePickerActionMethod = {
  selectStartDate: (date: DateTimeRangePickerState['startDate']) => void;
  selectEndDate: (date: DateTimeRangePickerState['endDate']) => void;
};

function getActionMethod(
  dispatch: Dispatcher
): DateTimeRangePickerActionMethod {
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
  state: DateTimeRangePickerState,
  action: Action
): DateTimeRangePickerState => {
  switch (action.type) {
    case 'SELECT_START_DATE': {
      const newDate = action.payload.date;
      if (newDate?.toDateString() === state.startDate?.toDateString())
        return state;
      return { ...state, startDate: newDate };
    }
    case 'SELECT_END_DATE': {
      const newDate = action.payload.date;
      if (newDate?.toDateString() === state.endDate?.toDateString())
        return state;
      return { ...state, endDate: newDate };
    }
    default: {
      return state;
    }
  }
};

export function useDateTimeRangePickerReducer(
  initialState: DateTimeRangePickerState
) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = getActionMethod(dispatch);
  return { state, action };
}
