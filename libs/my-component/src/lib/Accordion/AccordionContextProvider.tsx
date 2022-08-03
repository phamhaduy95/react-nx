import { createContext, useContext} from "react";
import { AccordionActionMethod } from './AccordionAction';
import useAccordionReducer from './useAccordionReducer';

import AccordionState from "./AccordionState";


type AccordionContextValue =  {
  state: AccordionState;
  action: AccordionActionMethod 
}|null;


export const AccordionContext = createContext<AccordionContextValue>(null);

type ContextProviderProps = {
  initialState:AccordionState,
  children: JSX.Element[]|JSX.Element;
}

export default function AccordionContextProvider(props: ContextProviderProps) {
  const {initialState,children} = props;
  const {state,action} = useAccordionReducer(initialState)
  return (
    <AccordionContext.Provider value={{ state, action }}>
      {children}
    </AccordionContext.Provider>
  );
}

export function useAccordionContext(){
    const value = useContext(AccordionContext);
    if (!value) throw("The AccordionContext value is null");
    const {state,action} = value;
    return {state,action}
}