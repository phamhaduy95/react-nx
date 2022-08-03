import { useReducer } from 'react';
import BreadCrumbsReducer, { BreadCrumbState } from './BreadCrumbReducer';
import { getBreadCrumbsAction } from './BreadCrumbsAction';

export default function useBreadCrumbsReducer(initialState:BreadCrumbState){
    const [state,dispatch] = useReducer(BreadCrumbsReducer,initialState);
    const action = getBreadCrumbsAction(dispatch);
    return {state,action};
}