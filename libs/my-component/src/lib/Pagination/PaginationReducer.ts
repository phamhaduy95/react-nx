import { ActionObject } from "./PaginationAction";
import { initialState } from '../Carousel/useCarouselStateManagerHook';
import {useReducer} from 'react';

export type PaginationState = {
    selectedItem:number;
    maxIndex:number;
    disabled:boolean;
}



function PaginationReducer(state:PaginationState,action:ActionObject):PaginationState{
    switch(action.type){
        case "SELECT_NEW":{
            const newSelectedIndex = action.payload.index;
            return {...state,selectedItem:newSelectedIndex}
        }
        case "MOVE_NEXT":{
            let newIndex = state.selectedItem +1;
            if (newIndex >= state.maxIndex) newIndex = state.maxIndex;
            return {...state,selectedItem:newIndex}
        }
        case "MOVE_PREV":{
            let newIndex = state.selectedItem -1;
            if (newIndex <= 0) newIndex = 1;
            return {...state,selectedItem:newIndex}
        }
        default:
        return state;        
    }
}
export default function usePaginationReducer(initialState:PaginationState){
    const [state,dispatch] = useReducer(PaginationReducer,initialState);
    return {state,dispatch}
}