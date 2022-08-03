import { ButtonGroupAction } from "./buttonGroupAction";

export type ButtonGroupState = {
  activeIndex: number;
  numberOfItems: number;
  mandatory:boolean;
  multiple: boolean;
  disabled:boolean;
};

export default function buttonGroupReducer (
  state: ButtonGroupState,
  action: ButtonGroupAction
): ButtonGroupState {

  switch (action.type) {
   
    case "SUBSCRIBE_ITEM": {
      const numberOfItems = state.numberOfItems + 1;
      return { ...state, numberOfItems };
    }
    case "UNSUBSCRIBE_ITEM": {
      console.log("unsubscribe")
      const numberOfItems = state.numberOfItems - 1;
      let activeIndex =state.activeIndex;
      if (activeIndex >= numberOfItems ) activeIndex = numberOfItems-1;   
      return { ...state, numberOfItems,activeIndex };
    }
    case "SELECT_ITEM": {
      const newItem = action.payload.activeIndex;
      return { ...state, activeIndex: newItem };
    }
    default:
      return state
  }
}
