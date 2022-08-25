import { useReducer } from 'react';
import { DateRangeInputFieldProps } from './DateRangeInputField';

export type DateRangePickerState = {
  startDate: Date | null;
  endDate: Date | null;
  startDatePopup: boolean;
  endDatePopup: boolean;
};

type SelectStartAction = {
  type: 'SELECT_START_DATE';
  payload: {
    date: DateRangePickerState['startDate'];
  };
};

type SelectEndDateAction = {
  type: 'SELECT_END_DATE';
  payload: {
    date: DateRangePickerState['endDate'];
  };
};

type TogglePopUpAction = {
  type: 'TOGGLE_POPUP';
  payload: {
    which: DateRangeInputFieldProps['mode'];
    isOpen: boolean;
  };
};

export type CalendarAction =
  | SelectStartAction
  | SelectEndDateAction
  | TogglePopUpAction;

type Dispatcher = React.Dispatch<CalendarAction>;

export type DateRangePickerActionMethod = {
  selectStartDate: (date: DateRangePickerState['startDate']) => void;
  selectEndDate: (date: DateRangePickerState['endDate']) => void;
  togglePopUp: (payload: TogglePopUpAction['payload']) => void;
};

function getActionMethod(dispatch: Dispatcher): DateRangePickerActionMethod {
  return {
    selectStartDate(date) {
      dispatch({ type: 'SELECT_START_DATE', payload: { date } });
    },
    selectEndDate(date) {
      dispatch({ type: 'SELECT_END_DATE', payload: { date } });
    },
    togglePopUp(payload) {
      dispatch({ type: 'TOGGLE_POPUP', payload: payload });
    },
  };
}

const reducer = (
  state: DateRangePickerState,
  action: CalendarAction
): DateRangePickerState => {
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
    case 'TOGGLE_POPUP': {
      const { which, isOpen } = action.payload;
      if (which === 'selectEnd') {
        if (state.endDatePopup === isOpen) return state;
        const startDatePopup = isOpen ? false : true;
        return { ...state, endDatePopup: isOpen, startDatePopup };
      }
      if (which === 'selectStart') {
        if (state.startDatePopup === isOpen) return state;
        const endDatePopup = isOpen ? false : true;
        return { ...state, startDatePopup: isOpen, endDatePopup };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

export function useDateRangePickerReducer(initialState: DateRangePickerState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = getActionMethod(dispatch);
  return { state, action };
}
