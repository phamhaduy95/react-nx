import React, {  MutableRefObject, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import usePopupArrowPosition from "../usePopupPlacement/usePopupArrowPosition";
import usePopupPadding from "../usePopupPlacement/usePopupPadding";
import usePopupPlacement from "../usePopupPlacement/usePopUpPlacement";
import "./PopupElement.scss"

type Placement =
  | "bottomRight"
  | "bottomLeft"
  | "bottomCenter"
  | "topLeft"
  | "topRight"
  | "topCenter"
  | "leftTop"
  | "leftCenter"
  | "leftBottom"
  | "rightTop"
  | "rightCenter"
  | "rightBottom";

type Props = {
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
  padding?: number;
  placement: Placement;
  arrowEnable?: boolean;
  isShowed: boolean;
  targetRef:MutableRefObject<any>;
};

const defaultPropsValue: Required<Props> = {
  className: "",
  children: <></>,
  padding: 5,
  placement: "topCenter",
  arrowEnable: true,
  isShowed: false,
  targetRef: React.createRef(),
};

const PopupElement =(props: Props) => {
  const {
    isShowed,
    className,
    children,
    padding,
    placement,
    arrowEnable,
    targetRef
  }: Required<Props> = {
    ...defaultPropsValue,
    ...props
  };

  const arrowRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  usePopupPlacement(targetRef,popupRef,placement);
  usePopupPadding(popupRef,placement,padding);
  usePopupArrowPosition(arrowRef,placement);

  console.log(arrowEnable,padding,targetRef.current)

  const makeShow = () => {
    if (isShowed) return "showed";
    return "";
  };

  return ReactDOM.createPortal(
    <div className={`Popup ${className} ${makeShow()}`} ref={popupRef}>
      <div className="Popup__Content">
        <div className="Popup__Arrow" ref={arrowRef} hidden={!arrowEnable} />
        {children}
      </div>
    </div>,
    document.body
  );
}

export default PopupElement;


