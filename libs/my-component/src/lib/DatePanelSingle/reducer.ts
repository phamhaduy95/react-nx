import dayjs from 'dayjs';
import { useReducer } from 'react';

export type DatePanelSingleState = {
  selectedDate: Date|null;
};

type SelectNewDateAction = {
  type: 'SELECT_NEW_DATE';
  payload: {
    newDate: DatePanelSingleState["selectedDate"];
  };
};

export type CalendarAction = SelectNewDateAction;

type Dispatcher = React.Dispatch<CalendarAction>;

export type CalendarActionMethod = {
  selectNewDate: (newDate: DatePanelSingleState["selectedDate"]) => void;
};

function getActionMethod(dispatch: Dispatcher): CalendarActionMethod {
  return {
    selectNewDate(newDate) {
      dispatch({ type: 'SELECT_NEW_DATE', payload: { newDate } });
    },
  };
}

const reducer = (
  state: DatePanelSingleState,
  action: CalendarAction
): DatePanelSingleState => {
  switch (action.type) {
    case 'SELECT_NEW_DATE': {
      const newDate = action.payload.newDate;
      if (newDate?.toDateString() === state.selectedDate?.toDateString())
        return state;
      return { ...state, selectedDate: newDate };
    }
    default: {
      return state;
    }
  }
};

export function useDatePanelReducer(initialState: DatePanelSingleState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = getActionMethod(dispatch);
  return { state, action };
}
