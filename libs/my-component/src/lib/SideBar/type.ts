export type SideBarState = {
    isExpanded:boolean,
    isFixed:boolean,
    selectedItemId:string,
}   

type SetExpandedAction = {
    type : "TOGGLE_EXPANDED",
    payload:{
        value:boolean;
    }
}

type SetFixedAction = {
    type : "TOGGLE_FIXED",
    payload:{
        value:boolean;
    }
}


type ChangeSelectItemAction = {
    type :"CHANGE_SELECT_ITEM",
    payload: {
        newId: string;
    }
}

export type SideBarAction = SetExpandedAction|SetFixedAction|ChangeSelectItemAction;

export type SideBarActionMethod = {
    setExpanded:(value:boolean)=>void;
    setFixed:(value:boolean)=>void;
    changeSelectItem:(newId:string)=>void;
} 


export type SideBarContextValueType = {
    state: SideBarState,
    action: SideBarActionMethod;
}|null;