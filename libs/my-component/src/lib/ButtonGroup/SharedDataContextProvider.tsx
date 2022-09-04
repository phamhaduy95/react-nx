import { createContext, useContext } from 'react'
import { ButtonGroupProps } from './ButtonGroup';


type SharedDataType = {
    onChange:Required<ButtonGroupProps>["onChange"];
  }
  
  type SharedDataContextValue = {sharedData:SharedDataType}|null;
  const SharedDataContext = createContext<SharedDataContextValue>(null); 

type Props = {
    onChange:SharedDataType["onChange"];
    children:JSX.Element;
}

export function ButtonGroupSharedDataContextProvider(props:Props) {
    const {onChange,children} = props;
  return (
    <SharedDataContext.Provider value={{sharedData:{onChange}}}>
        {children}
    </SharedDataContext.Provider>
  )
}

export function useButtonGroupSharedData(){
    const value = useContext(SharedDataContext);
    if (value === null) throw new Error("shared Data context is null");
    return value.sharedData;
}