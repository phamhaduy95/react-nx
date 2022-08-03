type SelectNewAction = {
  type: "SELECT_NEW";
  payload: {
    index: number;
  };
};

type MoveNextAction = {
  type: "MOVE_NEXT";
};

type MovePrevAction = {
  type: "MOVE_PREV";
};

export type ActionObject = SelectNewAction | MoveNextAction | MovePrevAction;

export type ActionMethod = {
  selectNew: (index: number) => void;
  moveNext: () => void;
  movePrev: () => void;
};

type Dispatcher = React.Dispatch<ActionObject>;

export default function getPaginationAction(dispatch: Dispatcher): ActionMethod {
  return {
    selectNew(index) {
      dispatch({ type: "SELECT_NEW", payload: { index: index } });
    },
    moveNext() {
      dispatch({ type: "MOVE_NEXT" });
    },
    movePrev() {
      dispatch({ type: "MOVE_PREV" });
    },
  };
}
