import React from "react";
import useBreadCrumbsContext from "./useBreadCrumbsContext";
import { BreadCrumbState } from "./BreadCrumbReducer";
import BreadCrumbSeparator from "./BreadCrumbSeparator";
import BreadCrumbsExpansibleNotation from "./BreadCrumbsExpansibleNotation";
type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function BreadCrumbsItemView(props: Props) {
  const { children } = props;
  const { state, action } = useBreadCrumbsContext();
  const ArrayOfItems = convertToArray(children);
  const ItemView = createView(ArrayOfItems, state);
  return <>{ItemView}</>;
}

function convertToArray(items: JSX.Element[] | JSX.Element): JSX.Element[] {
  if (items instanceof Array) return items;
  else return [items];
}

function createView(items: JSX.Element[], state: BreadCrumbState) {
  const itemsLength = items.length;
  const ExpandNotation = BreadCrumbsExpansibleNotation(); 
  const { maxNumberOfItem: limit, isExpanded } = state;
  const separator = BreadCrumbSeparator();
  if (itemsLength > limit && !isExpanded) {
    return [items[0], separator, ExpandNotation , separator,items[1]];
  }
  return items.map((item, index) => {
    if (index < itemsLength - 1) {
      return (
        <>
          {item}
          {separator}
        </>
      );
    }
    return item;
  });
}
