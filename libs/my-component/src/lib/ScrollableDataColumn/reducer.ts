import { useReducer } from 'react';

export type DataColumnState = {
  selectedItem: {
    id:string,
  }
};

type SelectItemAction = {
  type: 'SELECT_ITEM';
  payload: {
    id: string;
  };
};

type DataColumnAction = SelectItemAction;

export type DataColumnActionMethod = {
  selectItem: (id: string) => void;
};

type Dispatcher = React.Dispatch<DataColumnAction>;

function getActionMethod(dispatch: Dispatcher): DataColumnActionMethod {
  return {
    selectItem(id) {
      dispatch({ type: 'SELECT_ITEM', payload: { id} });
    },
  };
}

const reducer = (
  state: DataColumnState,
  action: DataColumnAction
): DataColumnState => {
  switch (action.type) {
    case 'SELECT_ITEM': {
      const {id} = action.payload;
      if (id === state.selectedItem.id) return state;
      return { ...state, selectedItem: {id}};
    }
    default:
      return state;
  }
};

export const useDataColumnReducer = (initialState: DataColumnState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = getActionMethod(dispatch);
  return { state, action };
};
