import React, { useReducer } from 'react'
import ModalState from './ModalState';
import useModalAction, { ModalAction } from './ModalAction';

function reducer(state:ModalState,action:ModalAction):ModalState{
    switch(action.type){
        case "CLOSE_MODAL":
            if (!state.isOpen) return state;
            return {...state,isOpen:false};
        case "OPEN_MODAL":
            if (state.isOpen) return state;
            return {...state,isOpen:true}   
    }

}
export default function useModalReducer(initialState:ModalState) {
    const [state,dispatch] = useReducer(reducer,initialState);
    const action = useModalAction(dispatch);
    return {state,action}
}
