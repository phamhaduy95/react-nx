import React, { useRef, useState } from "react";
import "./ToolTips.scss";
import PopupElement from "../Popup/PopupElement";
import { Placement } from "../usePopupPlacement/usePopUpPlacement";

type Props = {
  children: JSX.Element;
  className?: string;
  text: string;
  placement?: Placement;
  trigger?: "click" | "hover";
  padding?:number;
};

const defaultPropsValue:Required<Props> ={
  children:<></>,
  className:"Tooltips-default",
  text:"tooltips",
  placement:"bottomLeft",
  padding:5,
  trigger:"hover"
}

export default function ToolTips(props: Props) {
  const newProps = {...defaultPropsValue,...props};
  const { children, text, placement,className,padding } = newProps;
  const wrapper = useRef(null);
  const [isShowed, setShowed] = useState(false);

  const handleMouseOver = (e: React.MouseEvent) => {
    setShowed(true);
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    setShowed(false);
  };
  return (
    <div
      className={`ToolTips_Wrapper ${className}`}
      ref={wrapper}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    >
      {children}
      <PopupElement isShowed={isShowed} placement={placement} padding={padding}
        targetRef={wrapper} arrowEnable className="Tooltips__Popup"> 
        {text}
      </PopupElement>
    </div>
  );
}
