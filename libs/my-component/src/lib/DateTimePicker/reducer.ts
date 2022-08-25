import dayjs from 'dayjs';
import { useReducer } from 'react';
import { extractTimeFromDate } from '../utils/dateTime';

export type DateTimePickerState = {
  selectedDateTime: Date | null;
  isPopupOpen: boolean;
};

type SelectDateAction = {
  type: 'SELECT_DATE';
  payload: {
    newDate: Date | null;
  };
};

type SelectTimeAction = {
  type: 'SELECT_TIME';
  payload: {
    time: {
      hour: number;
      minute: number;
      second: number;
    };
  };
};

type TogglePopupAction = {
  type: 'TOGGLE_POPUP';
  payload: {
    isPopupOpen: boolean;
  };
};

type DatePickerAction = SelectDateAction | TogglePopupAction | SelectTimeAction;

export type DateTimePickerActionMethod = {
  selectDate: (newDate: DateTimePickerState['selectedDateTime']) => void;
  togglePopup: (isPopupOpen: boolean) => void;
  selectTime: (time: SelectTimeAction['payload']['time']) => void;
};

type Dispatcher = React.Dispatch<DatePickerAction>;

function getActionMethod(dispatch: Dispatcher): DateTimePickerActionMethod {
  return {
    selectDate(newDate) {
      dispatch({ type: 'SELECT_DATE', payload: { newDate } });
    },
    togglePopup(isPopupOpen) {
      dispatch({ type: 'TOGGLE_POPUP', payload: { isPopupOpen } });
    },
    selectTime(time) {
      dispatch({ type: 'SELECT_TIME', payload: { time } });
    },
  };
}

const reducer = (
  state: DateTimePickerState,
  action: DatePickerAction
): DateTimePickerState => {
  switch (action.type) {
    case 'SELECT_DATE': {
      const newDate = action.payload.newDate;
      if (newDate?.toString() === state.selectedDateTime?.toString())
        return state;
      const { hour, second, minute } = extractTimeFromDate(
        state.selectedDateTime
      );
      const selectedDateTime = dayjs(newDate)
        .hour(hour)
        .minute(minute)
        .second(second)
        .toDate();
      return { ...state, selectedDateTime };
    }
    case 'SELECT_TIME': {
      const { hour, second, minute } = action.payload.time;
      if (state.selectedDateTime === null) return state;
      const date = dayjs(state.selectedDateTime)
        .hour(hour)
        .second(second)
        .minute(minute)
        .toDate();
      if (date.toTimeString() === state.selectedDateTime.toTimeString())
        return state;
      return { ...state, selectedDateTime: date };
    }

    case 'TOGGLE_POPUP': {
      const isOpen = action.payload.isPopupOpen;
      if (isOpen === state.isPopupOpen) return state;
      return { ...state, isPopupOpen: isOpen };
    }

    default: {
      return state;
    }
  }
};

export function useDateTimePickerReducer(initialState: DateTimePickerState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = getActionMethod(dispatch);
  return { state, action };
}
