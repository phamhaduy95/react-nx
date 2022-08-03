import BreadCrumbAction from "./BreadCrumbsAction";

export type BreadCrumbState = {
    isExpanded:boolean;
    maxNumberOfItem: number;
    separator:string;
}



export default function BreadCrumbsReducer(state:BreadCrumbState,action:BreadCrumbAction):BreadCrumbState{
    switch( action.type){
        case "TOGGLE_EXPAND":{
            const isExpanded = action.payload.value;
            return {...state,isExpanded};
        }
        default:
            return state;
    }    
} 
