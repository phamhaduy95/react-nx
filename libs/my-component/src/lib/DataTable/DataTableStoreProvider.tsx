import { createStore, StoreApi, useStore } from 'zustand';
import React from 'react';

export type DataTableState<T> = {
  rows: T[];
};

type ContextValueType = {
  store: StoreApi<DataTableState<unknown>>;
} | null;

const StoreContext = React.createContext<ContextValueType>(null);

type StoreContextProviderProps<T> = {
  children: JSX.Element;
  rows: T[];
};

export function DataTableStoreProvider<RowDataType>(
  props: StoreContextProviderProps<RowDataType>
) {
  const {rows,children} = props;      
  const store = React.useMemo(() => {
    return createStore<DataTableState<RowDataType>>((set) => ({
      rows: rows,
    }));
  }, []);



  return <StoreContext.Provider value={{store}}>
    {children}
  </StoreContext.Provider>;
}
