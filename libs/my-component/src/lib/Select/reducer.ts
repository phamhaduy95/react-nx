import { useReducer } from "react";

export interface SelectState {
  selectedItem: {
    value: string;
    id: string;
  };
  isPopupOpen: boolean;
}

type SelectItemAction = {
  type: 'SELECT_ITEM';
  payload: {
    newItem: SelectState['selectedItem'];
  };
};

type TogglePopupAction = {
  type: 'TOGGLE_POPUP';
  payload: {
    isOpen: boolean;
  };
};

type SelectAction = SelectItemAction | TogglePopupAction;

export type SelectActionMethod = {
  selectItem: (newItem: SelectItemAction['payload']['newItem']) => void;
  togglePopup: (isOpen: boolean) => void;
};

type Dispatcher = React.Dispatch<SelectAction>;

const getActionMethod = (dispatch: Dispatcher): SelectActionMethod => {
  return {
    selectItem(newItem) {
      dispatch({ type: 'SELECT_ITEM', payload: { newItem } });
    },
    togglePopup(isOpen) {
      dispatch({ type: 'TOGGLE_POPUP', payload: { isOpen } });
    },
  };
};

const reducer = (state: SelectState, action: SelectAction): SelectState => {
  switch (action.type) {
    case 'SELECT_ITEM': {
      const selectedItem = action.payload.newItem;
      return { ...state, selectedItem };
    }
    case 'TOGGLE_POPUP': {
      const isPopupOpen = action.payload.isOpen;
      return { ...state, isPopupOpen };
    }
    default:
      return state;
  }
};

export function useSelectReducer(initialState:SelectState){
    const [state,dispatch] = useReducer(reducer,initialState);
    const action = getActionMethod(dispatch);
    return {state,action};
}


