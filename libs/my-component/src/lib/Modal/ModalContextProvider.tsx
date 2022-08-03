import React, { createContext, useContext, useReducer } from "react";
import { Dispatch } from "react";
import { ModalActionMethod } from "./ModalAction";
import ModalState from './ModalState';
import useModalReducer from "./useModalReducer";


type ModalContextValue = {
  state: ModalState;
  action:ModalActionMethod
}|null;



const ModalContext = createContext<ModalContextValue>(null);

type Props = {
  children: JSX.Element;
  initialState:ModalState,
};

export default function ModalContextProvider(props:Props) {
  const {children,initialState} = props;
  const {state,action} = useModalReducer(initialState);
  return (
    <ModalContext.Provider value={{state,action}}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext(){
  const value = useContext(ModalContext);
  if (!value) throw "Modal context value is null";
  const {state,action} = value;
  return {state,action}
}