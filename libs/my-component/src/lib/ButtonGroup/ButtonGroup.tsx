import React, { useEffect } from "react";
import { ButtonGroupContextProvider } from "./ButtonGroupContext";
import { ButtonGroupState } from "./ButtonGroupReducer";
import useButtonGroupContext from "./ButtonGroupContext";
import ButtonGroupItem, { giveIndexToGroupItems } from "./ButtonGroupItem";
import "./ButtonGroup.scss"
type Props = {
  children: JSX.Element[]|JSX.Element;
  className?: string;
  /** the callback function triggered when there is new active item. It wont triggered when multiple is set true */
  onChange?: (activeIndex: number) => void;
  /** if true then it allows multiple active item at once*/
  multiple?:boolean;
  /** if it is true then there must be one active item. when no item set active, the first item  will be set active*/
  mandatory?:boolean;
  disabled?: boolean;
};

/**
 * The Wrapped component for ButtonBox so that it can access to the context value of ComboBoxContext.
 */
function WrappedButtonGroup(props: Props) {
  let { children, className, onChange,disabled } = props;
  className = className == undefined ? "ButtonGroup-default" : className;
  disabled = (disabled == undefined)?false:disabled;
  const { state, action } = useButtonGroupContext();
  const { activeIndex } = state;
  const indexItems = giveIndexToGroupItems(children);

  useEffect(() => {
    if (activeIndex !== -1) {
      if (onChange) onChange(activeIndex);
    }
  }, [activeIndex]);

  return <div className={`ButtonGroup ${className}`}>{indexItems}</div>;
}

/**
 * A group of items, which allows users to choose multiple active items or one active item at the time. \<button\> or \<a\> is preferred to be item in group. 
 */
export default function ButtonGroup(props: Props) {
  let { mandatory,multiple,disabled} = props;
  mandatory = (mandatory == undefined)?false:mandatory;
  multiple = (multiple == undefined)?false:multiple;
  disabled = (disabled == undefined)?false:disabled;

  const initialState: ButtonGroupState = {
    activeIndex: -1,
    numberOfItems: 0,
    mandatory : mandatory,
    multiple: multiple,
    disabled:disabled
  };

  return (
    <ButtonGroupContextProvider initialState={initialState}>
      <WrappedButtonGroup {...props}></WrappedButtonGroup>
    </ButtonGroupContextProvider>
  );
}

