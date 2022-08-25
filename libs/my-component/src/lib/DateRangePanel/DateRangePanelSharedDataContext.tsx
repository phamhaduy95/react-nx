import React from 'react'
import { DateRangePanelProps } from './DateRangePanel';

type DatePanelSharedData = {
    mode:NonNullable<DateRangePanelProps["mode"]>,
    onClickToSelect:NonNullable<DateRangePanelProps["onClickToSelect"]>
}

const sharedDataContext = React.createContext<DatePanelSharedData|null>(null); 

type ContextProviderProps = {
  children:JSX.Element
} & Required<DateRangePanelProps>

export function DateRangePanelSharedDataContext(props:ContextProviderProps) {
  const {mode,children,onClickToSelect} = props;
  return (
    <sharedDataContext.Provider value={{mode,onClickToSelect}}>
        {children}
    </sharedDataContext.Provider>
  )
}


export function useDateRangePanelSharedData(){
  const sharedData = React.useContext(sharedDataContext);
  if (sharedData === null) throw new Error("ShareDataContext of DateRangePanel is null");
  return sharedData;
  
}