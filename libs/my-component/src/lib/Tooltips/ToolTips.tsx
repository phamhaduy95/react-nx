import React, { useRef, useState } from "react";
import "./ToolTips.scss";

import { Placement } from "../../hooks/usePopupPlacement/usePopUpPlacement";
import usePopupPlacement from "../../hooks/usePopupPlacement/usePopUpPlacement";
import usePopupPadding from "../../hooks/usePopupPlacement/usePopupPadding";
import PopupElement from "../Popup/PopupElement";

type Props = {
  children: JSX.Element;
  className?: string;
  text: string;
  placement: Placement;
  trigger: "click" | "hover";
};

export default function ToolTips(props: Props) {
  const { children, text, placement } = props;
  let { className } = props;
  className = className === undefined ? "ToolTip-default" : className;
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
      <PopupElement isShowed={isShowed} placement={placement} 
        targetRef={wrapper} arrowEnable className="Tooltips__Popup"> 
        {text}
      </PopupElement>
    </div>
  );
}
