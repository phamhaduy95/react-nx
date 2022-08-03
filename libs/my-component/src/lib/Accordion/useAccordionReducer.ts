import AccordionState from "./AccordionState";
import { AccordionAction } from "./AccordionAction";

import { useReducer } from "react";
import useAccordionAction from "./AccordionAction";

class AccordionStateHolder {
  private state: AccordionState;
  constructor(state: AccordionState) {
    this.state = state;
  }

  subscribeNewItem() {
    let newState: AccordionState = { ...this.state };
    newState.numberOfItem += 1;
    this.state = newState;
    return this;
  }

  removeLastItem() {
    let newState: AccordionState = { ...this.state };
    newState.numberOfItem -= 1;
    this.state = newState;
    return this;
  }

  selectNewItem(index: number) {
    if (index === this.state.activeItem) return this;
    let newState: AccordionState = { ...this.state };
    newState.activeItem = index;
    this.state = newState;
    return this;
  }

  getState() {
    return this.state;
  }
}

export default function useAccordionReducer(initialState: AccordionState) {
  const reducer = (
    state: AccordionState,
    action: AccordionAction
  ): AccordionState => {
    const stateHolder = new AccordionStateHolder(state);
    switch (action.type) {
      case "SUBSCRIBE_ITEM": {
        return stateHolder.subscribeNewItem().getState();
      }
      case "UNSUBSCRIBE_ITEM": {
        return stateHolder.removeLastItem().getState();
      }
      case "SELECT_ITEM": {
        const newIndex = action.payload.index;
        return stateHolder.selectNewItem(newIndex).getState();
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const action = useAccordionAction(dispatch);
  return { state, action };
}
