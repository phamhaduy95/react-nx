import { NumberArray } from 'd3';
import dayjs from 'dayjs';
import { useReducer } from 'react';

export type DateTimePickerState = {
  selectedDateTime: Date;
  isPopupOpen: boolean;
};

type SelectDateAction = {
  type: 'SELECT_DATE';
  payload: {
    newDate: Date;
  };
};

type SelectTimeAction = {
  type : "SELECT_TIME",
  payload: {
    time: {
      hour:number;
      minute:number;
      second:number;
    }
  }
}

type TogglePopupAction = {
  type: 'TOGGLE_POPUP';
  payload: {
    isPopupOpen: boolean;
  };
};

type DatePickerAction =
  | SelectDateAction
  | TogglePopupAction|SelectTimeAction;

export type DateTimePickerActionMethod = {
  selectDate: (newDate: DateTimePickerState['selectedDateTime']) => void;
  togglePopup: (isPopupOpen: boolean) => void;
  selectTime: (time:SelectTimeAction["payload"]["time"])=>void;
  
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
      dispatch({type:"SELECT_TIME",payload:{time}})
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
      const currDate = state.selectedDateTime;
      if (newDate.toString() === currDate.toString()) return state;
      return { ...state, selectedDateTime: newDate };
    }
    case "SELECT_TIME":{
      const {hour,second,minute} = action.payload.time;
      const date = dayjs(state.selectedDateTime).hour(hour).second(second).minute(minute).toDate();
      if (date.toTimeString() === state.selectedDateTime.toTimeString()) return state;
      return {...state,selectedDateTime:date};
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
