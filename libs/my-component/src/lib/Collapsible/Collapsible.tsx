import React, { MutableRefObject, useRef, useState } from "react";
import { useEffect } from "react";
import "./Collapsible.scss"
type PropsType = {
  children?: JSX.Element[] | JSX.Element;
  direction?: "horizontal" | "vertical";
  showed?: boolean;
};

const defaultPropsValue: Required<PropsType> = {
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

export default function Collapsible(props: PropsType) {
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

function useControlElementCollapsingState( ref: MutableRefObject<HTMLElement | null>,
    props: Required<PropsType>){
        const {showed,direction} = props;
        useEffect(()=>{
            const el = ref.current;
            if (el === null) return;
            if(showed){
                setElementToMaxHeight(el,direction);
                return
            }
            setElementToMinHeight(el,direction);
        },[showed])
}


function setElementToMaxHeight(el:HTMLElement,direction:Required<PropsType>["direction"]){
    switch (direction) {
        case "horizontal": {
          const size = el.scrollWidth;
          el.style.maxWidth = `${size}px`;
          return;
        }
        case `vertical`: {
          const size = el.scrollHeight;
          el.style.maxHeight = `${size}px`;
          return;
        }
      }
}
function setElementToMinHeight(el:HTMLElement,direction:Required<PropsType>["direction"]){
    switch (direction) {
        case "horizontal": {
          el.style.maxWidth = `0px`;
          return;
        }
        case `vertical`: {
          el.style.maxHeight = `0px`;
          return;
        }
      }
}
