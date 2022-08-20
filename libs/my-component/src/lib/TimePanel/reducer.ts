import { useReducer } from 'react';

export type TimePanelState = {
  selectTime: {
    hour:number,
    minute:number,
    second:number,
  },
};

type SelectHourAction = {
  type: 'SELECT_HOUR';
  payload: {
     hour:number,
  };
};

type SelectMinuteAction = {
    type:"SELECT_MINUTE",
    payload: {
        minute: number
    }
}

type SelectSecondAction = {
  type:"SELECT_SECOND",
  payload: {
    second : number;
  }
}


type ActionType = SelectHourAction|SelectMinuteAction|SelectSecondAction;

export type TimePanelActionMethod = {
  selectHour: (hour: number) => void;
  selectMinute:(min:number)=>void,
  selectSecond:(second:number)=>void,
};

type Dispatcher = React.Dispatch<ActionType>;

function getActionMethod(dispatch: Dispatcher): TimePanelActionMethod {
  return {
    selectHour(hour) {
      dispatch({ type: 'SELECT_HOUR', payload: {  hour} });
    },
    selectMinute(minute) {
        dispatch({type:"SELECT_MINUTE",payload:{minute}})
    },
    selectSecond(second){
      dispatch({type:"SELECT_SECOND",payload:{second}})
    },
  };
}

const reducer = (
  state: TimePanelState,
  action: ActionType
): TimePanelState => {
  switch (action.type) {
    case 'SELECT_HOUR': {
        const hour = action.payload.hour;
        if (state.selectTime.hour === hour) return state;
        const selectTime = {...state.selectTime,hour}
        return {...state,selectTime} 
    }
    case "SELECT_MINUTE":{
        const minute = action.payload.minute;
        if (state.selectTime.minute === minute) return state;
        const selectTime = {...state.selectTime,minute}
        return {...state,selectTime}
    }

    case "SELECT_SECOND":{
      const second = action.payload.second;
      if (state.selectTime.second === second) return state;
      const selectTime = {...state.selectTime,second}
      return {...state,selectTime}
    }
    default:
      return state;
  }
};

export const useTimePanelReducer = (initialState: TimePanelState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = getActionMethod(dispatch);
  return { state, action };
};
