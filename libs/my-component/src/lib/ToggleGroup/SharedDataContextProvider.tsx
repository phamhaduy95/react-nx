import { createContext, useContext } from 'react'
import { ToggleGroupProps } from './ToggleGroup';


type SharedDataType = {
    onChange:Required<ToggleGroupProps>["onChange"];
  }
  
  type SharedDataContextValue = {sharedData:SharedDataType}|null;
  const SharedDataContext = createContext<SharedDataContextValue>(null); 

type Props = {
    onChange:SharedDataType["onChange"];
    children:JSX.Element;
}

export function ToggleGroupSharedDataContextProvider(props:Props) {
    const {onChange,children} = props;
  return (
    <SharedDataContext.Provider value={{sharedData:{onChange}}}>
        {children}
    </SharedDataContext.Provider>
  )
}

export function useToggleGroupSharedData(){
    const value = useContext(SharedDataContext);
    if (value === null) throw new Error("shared Data context is null");
    return value.sharedData;
}