import { forwardRef, useEffect } from "react";
import { ClickOutSideHandler } from "./ClickOutSideHandler";

type Props = {
  children: JSX.Element;
  onClickOutSide: (e?: any) => void;
};

/**
 * ClickOutSideWatcher is React component which accepts ref of its direct child then observe any click event that happens outside its child.
 * CLickOutSideWatcher requires its direct child not having any click event handler where there is no event bubbling mechanic. For example  event.stopPropagation() or using Capture mode.
 */
const ClickOutSideWatcher = forwardRef((props: Props, ref: any) => {
  const { children, onClickOutSide } = props;
  useEffect(() => {
    const element = ref.current;
    console.log(element)
    if (element === null) return;
      const clickOutSideHandler = new ClickOutSideHandler(
        element,
        onClickOutSide
      );
      return () => {
        clickOutSideHandler.removeEventHandler();
      };
  }, [ref.current]);

  return <>{children}</>;
});

export default ClickOutSideWatcher;
