import React from 'react';
import { ScrollableDataColumnProps } from './ScrollableDataColumn';

export type SharedDataType = {
    onSelect:NonNullable<ScrollableDataColumnProps["onSelect"]>
}

type ContextValueType = {
    sharedData:SharedDataType
  } | null;
  
  const SharedDataContext = React.createContext<ContextValueType>(null);
  
type SharedDataContextProviderProps = {
    children: JSX.Element;
    sharedData: SharedDataType
  };
  
  export function SharedDataContextProvider(props: SharedDataContextProviderProps) {
    const { children,sharedData } = props;
 
    return (
      <SharedDataContext.Provider value={{sharedData}}>
        {children}
      </SharedDataContext.Provider>
    );
  }
  
  export function useSharedData() {
    const value = React.useContext(SharedDataContext);
    if (value === null) throw new Error('SharedData context for ScrollableDataColumn is null');
    const {sharedData} = value;
    return sharedData;
  }
  