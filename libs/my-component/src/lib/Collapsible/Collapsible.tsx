import React, { MutableRefObject, useRef, useState } from "react";
import { useEffect } from "react";
import "./Collapsible.scss"
import { useControlElementCollapsingState } from "./hook";
export type CollapsibleProps = {
  children?: JSX.Element[] | JSX.Element|string;
  direction?: "horizontal" | "vertical";
  showed?: boolean;
};

const defaultPropsValue: Required<CollapsibleProps> = {
  children: <></>,
  direction: "vertical",
  showed: true,
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
  const { children, direction, showed } = newProps;
  const ref = useRef(null);

  useControlElementCollapsingState(ref,newProps);

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    if (showed) {
        
    }
  }, [showed]);

  const makeShowed = () => {
    if (showed) return "showed";
    return "";
  };

  return (
    <div
      className={`collapsible ${makeShowed()}`}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default Collapsible;


