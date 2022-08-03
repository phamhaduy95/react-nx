type SubScribeItemAction = {
  type: "SUBSCRIBE_ITEM";
};

type UnSubscribeItemAction = {
  type: "UNSUBSCRIBE_ITEM";
};

type SelectItemAction = {
  type: "SELECT_ITEM";
  payload: {
    index: number;
  };
};

export type AccordionAction =
  | SubScribeItemAction
  | UnSubscribeItemAction
  | SelectItemAction;

export type AccordionActionMethod = {
  subscribeItem: () => void;
  unsubscribeItem: () => void;
  selectItem: (index: number) => void;
};
type Dispatch = React.Dispatch<AccordionAction>;

export default function useAccordionAction(
  dispatch: Dispatch
): AccordionActionMethod {
  return {
    unsubscribeItem: () => {
      dispatch({ type: "UNSUBSCRIBE_ITEM" });
    },
    subscribeItem: () => {
      dispatch({ type: "SUBSCRIBE_ITEM" });
    },
    selectItem: (index) => {
      dispatch({ type: "SELECT_ITEM", payload: { index } });
    },
  };
}
