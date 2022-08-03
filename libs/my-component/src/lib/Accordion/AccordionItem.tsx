import React, { useEffect, useState } from "react";

import { useAccordionContext } from "./AccordionContextProvider";
import AccordionItemContextProvider from "./AccordionItemContext";
import { AccordionHeader } from "./AccordionHeader";
import AccordionBody from "./AccordionBody";

type IndexedItemProps = {
  index: number;
  header: () => React.ReactNode;
  content: () => React.ReactNode;
};

function IndexedItem(props: IndexedItemProps) {
  const { index, header, content } = props;
  const [isActive, setActive] = useState(false);
  const { state, action } = useAccordionContext();

  useEffect(() => {
    action.subscribeItem();
    return () => {
      action.unsubscribeItem();
    };
  }, []);

  useEffect(() => {
    if (state.isAlwaysOpen) return;
    if (state.activeItem !== index) {
      setActive(false);
    }
  }, [state.activeItem]);

  useEffect(() => {
    if (state.isAlwaysOpen) return;
    if (isActive) action.selectItem(index);
  }, [isActive]);

  const applyActive = ()=>{
    if (isActive)
      return "active";
    return ""
  }


  return (
    <AccordionItemContextProvider
      isItemActive={isActive}
      setItemActive={setActive}
    >
      <div className={`Accordion__Item ${applyActive()}`}>
        <AccordionHeader header={header} />
        <AccordionBody content={content} />
      </div>
    </AccordionItemContextProvider>
  );
}

type AccordionItemProps = Omit<IndexedItemProps, "index">;
/** the public dummy AccordionItem, in which user will put the properties */
export default function AccordionItem(props: AccordionItemProps) {
  return <></>;
}

export function addIndexToAccordionItems(
  AccordionItems: JSX.Element[] | JSX.Element
) {
  if (AccordionItems instanceof Array) {
    return AccordionItems.map((element, index) => {
      const props: IndexedItemProps = { ...element.props, index: index };
      return React.createElement(IndexedItem, props);
    });
  }
  const props: IndexedItemProps = { ...AccordionItems.props, index: 0 };
  return <IndexedItem {...props} />;
}
