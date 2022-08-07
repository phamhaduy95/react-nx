import React, { MutableRefObject, useRef, useState } from "react";
import { useEffect } from "react";
import "./Collapsible.scss"
import { useControlElementCollapsingState } from "./hook";
export type CollapsibleProps = {
  children?: JSX.Element[] | JSX.Element|string;
  direction?: "horizontal" | "vertical";
  showed?: boolean;
  className?:string;
};

const defaultPropsValue: Required<CollapsibleProps> = {
  children: <></>,
  direction: "vertical",
  showed: true,
  className:"",
};

function supplyDefaultValueWhenUndefineOrNull<T extends Object>(
  props: T,
  defaultValue: Required<T>
) {
  let tempProps: Required<T> = { ...defaultValue, ...props };
  return tempProps;
}

export function Collapsible(props: CollapsibleProps) {
  const newProps = supplyDefaultValueWhenUndefineOrNull(
    props,
    defaultPropsValue
  );
  const { children, direction, showed,className } = newProps;
  const ref = useRef(null);

  useControlElementCollapsingState(ref,newProps);


  const makeShowed = () => {
    if (showed) return "showed";
    return "";
  };

  return (
    <div
      className={`collapsible ${className} ${makeShowed()}`}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default Collapsible;


