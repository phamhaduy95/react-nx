
type SubscribeItemAction = {
    type:"SUBSCRIBE_ITEM";
}

 type UnsubscribeItemAction = {
    type:"UNSUBSCRIBE_ITEM"
}
type SelectItemAction = {
    type:"SELECT_ITEM",
    payload:{
        activeIndex: number;
    }
}

export type ButtonGroupAction = SubscribeItemAction | UnsubscribeItemAction | SelectItemAction;

export type ActionMethod = {
    subscribeItem :()=>void;
    unsubscribeItem : ()=>void;
    selectItem: (activeIndex:number)=>void; 
}

type Dispatcher = React.Dispatch<ButtonGroupAction>;

export default function getButtonGroupAction(dispatch:Dispatcher):ActionMethod{
    return{
    subscribeItem :()=>{
        dispatch({type:"SUBSCRIBE_ITEM"});
    },

     unsubscribeItem:()=>{
        dispatch({type:"UNSUBSCRIBE_ITEM"});
    },

    selectItem: (activeIndex:number)=>{
        dispatch({type:"SELECT_ITEM",payload:{activeIndex:activeIndex}})
    }
}
}

