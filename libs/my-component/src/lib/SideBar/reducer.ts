import { Dispatch } from 'react';
import { SideBarState, SideBarAction, SideBarActionMethod } from './type';

export default function reducer(
  state: SideBarState,
  action: SideBarAction
): SideBarState {
  switch (action.type) {
    case 'TOGGLE_EXPANDED': {
      const value = action.payload.value;
      return { ...state, isExpanded: value };
    }
    case 'TOGGLE_FIXED': {
      const value = action.payload.value;
      return { ...state, isFixed: value };
    }
    case 'CHANGE_SELECT_ITEM': {
      const newItemId = action.payload.newId;
      console.log("reducer "+ newItemId);
      return { ...state, selectedItemId: newItemId };
    }
    default:
      return state;
  }
}

export function getMethodAction(
  dispatch: Dispatch<SideBarAction>
): SideBarActionMethod {
  return {
    changeSelectItem(newIndex) {
      dispatch({
        type: 'CHANGE_SELECT_ITEM',
        payload: {
          newId: newIndex,
        },
      });
    },
    setExpanded(value) {
      dispatch({
        type: 'TOGGLE_EXPANDED',
        payload: {
          value,
        },
      });
    },
    setFixed(value) {
      dispatch({
        type: 'TOGGLE_FIXED',
        payload: {
          value,
        },
      });
    },
  };
}
