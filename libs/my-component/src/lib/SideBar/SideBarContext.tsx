import React from 'react'
import { SideBarState, SideBarActionMethod, SideBarContextValueType } from './type';
import { createContext, useReducer, useContext } from 'react';
import reducer from './reducer';
import { getMethodAction } from './reducer';

const sideBarContext = createContext<SideBarContextValueType>(null);

const initialState:SideBarState = {
    isExpanded:false,
    isFixed:false,
    selectedItemId:"",
}

type ProviderProps = {
    children:JSX.Element;
} 

export const useSideBarContext =()=>{
    const value = useContext(sideBarContext);
    if (value === null) throw new Error("context value must not be null");
    const {state,action} = value;
    return {state,action}

}

export default function SideBarContextProvider(props:ProviderProps) {
    const {children} = props;
    const [state,dispatch] = useReducer(reducer,initialState);
    const action = getMethodAction(dispatch);
    return (
    <sideBarContext.Provider value={{state,action}}>
        {children}
    </sideBarContext.Provider>
  )
}
