import { createContext, useContext, useMemo } from 'react'
import { ToggleGroupProps } from './ToggleGroup';


type SharedDataType = {
    onChange:Required<ToggleGroupProps>["onChange"];
  }
  
  type SharedDataContextValue = SharedDataType|null;
  const SharedDataContext = createContext<SharedDataContextValue>(null); 

type Props = {
    onChange:SharedDataType["onChange"];
    children:JSX.Element;
}

export function ToggleGroupSharedDataContextProvider(props:Props) {
    const {onChange,children} = props;
    const sharedData = useMemo(()=>({onChange}),[onChange])
  return (
    <SharedDataContext.Provider value={sharedData}>
        {children}
    </SharedDataContext.Provider>
  )
}

export function useToggleGroupSharedData(){
    const value = useContext(SharedDataContext);
    if (value === null) throw new Error("shared Data context is null");
    return value;
}