import React from 'react';
import {
  DataColumnState,
  DataColumnActionMethod,
  useDataColumnReducer,
} from './reducer';

type ContextValueType = {
  state: DataColumnState;
  action: DataColumnActionMethod;
} | null;

const DataColumnContext = React.createContext<ContextValueType>(null);

type ContextProviderProps = {
  initialState: DataColumnState;
  children: JSX.Element;
};

export function DataColumnContextProvider(props: ContextProviderProps) {
  const { initialState, children } = props;
  const { state, action } = useDataColumnReducer(initialState);

  return (
    <DataColumnContext.Provider value={{ state, action }}>
      {children}
    </DataColumnContext.Provider>
  );
}

export function useDataColumnsContext() {
  const value = React.useContext(DataColumnContext);
  if (value === null) throw new Error('DataColumn context value is null');
  const { state, action } = value;
  return { state, action };
}
