type BreadCrumbAction = {
  type: "TOGGLE_EXPAND";
  payload: {
    value: boolean;
  };
};

export default BreadCrumbAction;

type Dispatcher = React.Dispatch<BreadCrumbAction>;

export type BreadCrumbActionActionMethod = {
  toggleExpand: (value: boolean) => void;
};

export function getBreadCrumbsAction(
  dispatch: Dispatcher
): BreadCrumbActionActionMethod {
  return {
    toggleExpand(value) {
      dispatch({ type: "TOGGLE_EXPAND", payload: { value: value } });
    },
  };
}
