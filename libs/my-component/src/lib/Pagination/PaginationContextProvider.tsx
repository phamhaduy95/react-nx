import { createContext,useContext } from "react";
import { ActionMethod } from './PaginationAction';
import usePaginationReducer, { PaginationState } from "./PaginationReducer";
import getPaginationAction from './PaginationAction';




type PaginationContextValue ={
  state: PaginationState;
  action: ActionMethod;
}|null;

export const PaginationContext = createContext<PaginationContextValue>(null);


interface ContextProps{
    children : JSX.Element[]|JSX.Element;
    initialState: PaginationState; 
}

export default function PaginationContextProvider(props:ContextProps) {
    const {children,initialState} = props;
    const {state,dispatch} = usePaginationReducer(initialState);
    const action = getPaginationAction(dispatch);
    

  return (
      <PaginationContext.Provider value={{state,action}}>
          {children}
      </PaginationContext.Provider>
  )

}

export function usePaginationContext(){
    const value = useContext(PaginationContext);
    if (value === null) throw new Error("Pagination context is null");
    const state = value.state;
    const action = value.action;
    return {state,action}
}