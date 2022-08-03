import { useRef, useCallback } from "react";
import { useAccordionItemContext } from "./AccordionItemContext";
import useHeightRecalculateHook from "./useHeightRecalculateHook";

type ItemBodyProps = {
  content: () => React.ReactNode;
};
export default function AccordionBody(props: ItemBodyProps) {
  const { content } = props;
  const { isItemActive } = useAccordionItemContext();
  const ref = useRef(null);
  const height = useHeightRecalculateHook(isItemActive, ref);
  const makeShow = (isActive: boolean) => {
    if (isActive)
      return {
        height: height,
      };
    return {
      height: 0,
    };
  };

  return (
    <div className={`Accordion__Body`} style={makeShow(isItemActive)}>
      <div className="Accordion__Body__Content" ref={ref}>
        {content()}
      </div>
    </div>
  );
}
