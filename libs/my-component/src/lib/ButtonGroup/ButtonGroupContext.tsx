import buttonGroupReducer, { ButtonGroupState } from "./ButtonGroupReducer"
import getButtonGroupAction, { ActionMethod } from './buttonGroupAction';
import {createContext, useContext, useReducer} from 'react';


type ContextValue = {
    state: ButtonGroupState,
    action: ActionMethod,
}|null;

const ButtonGroupContext = createContext<ContextValue>(null)

export default function useButtonGroupContext(){
    const value = useContext(ButtonGroupContext);
    if (value === null) throw new Error("The Button Group Context is null");
    const state = value.state;
    const action = value.action;
    return {state,action}

}
type Props =  {
    children: JSX.Element;
    initialState: ButtonGroupState;
}


export function ButtonGroupContextProvider(props:Props) {
    const {children,initialState} = props;
    const [state,dispatch] = useReducer(buttonGroupReducer,initialState);
    const action = getButtonGroupAction(dispatch);
    return (
    <ButtonGroupContext.Provider value={{state,action}}>
        {children}
    </ButtonGroupContext.Provider>
  )
}
