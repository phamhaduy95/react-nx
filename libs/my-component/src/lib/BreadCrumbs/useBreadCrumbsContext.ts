import {useContext} from 'react';
import BreadCrumbsContext from './BreadCrumbContext';
export default function useBreadCrumbsContext(){
    const value = useContext(BreadCrumbsContext);
    if (value === null) throw new Error("BreakCrumbContext is null");
    const action = value.action;
    const state = value.state;
    return {state,action}
}