import { createContext } from "react";
import { BreadCrumbState } from "./BreadCrumbReducer";
import { BreadCrumbActionActionMethod as ActionMethod } from "./BreadCrumbsAction";
import useBreadCrumbsReducer from './useBreadCrumbsReducer';
type BreadCrumbContextValue = {
  state: BreadCrumbState;
  action: ActionMethod;
}|null;


export const BreadCrumbsContext = createContext<BreadCrumbContextValue>(null);

export default BreadCrumbsContext;

type Props = {
    children: JSX.Element;
    initialState:BreadCrumbState;
}

export function BreadCrumbContextProvider(props:Props){
    const {initialState,children} = props;
    const {state,action} = useBreadCrumbsReducer(initialState);
    return(
    <BreadCrumbsContext.Provider value={{state,action}}>
    {children}
    </BreadCrumbsContext.Provider>
    )
}