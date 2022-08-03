import React from "react";
import "./Badge.scss"

type Props = {
  children: JSX.Element|string;
  showZero?: boolean;
  badgeContent: JSX.Element | number;
  className?: string;
  maxValue?: number;
};

const defaultPropsValue:Required<Props> = {
  children: <></>,
  showZero: true,
  badgeContent:  0,
  className: "Badge--default",
  maxValue: 99
}

export default function Badge(props: Props) {
  const newProps = {...defaultPropsValue,...props};
  const { children, badgeContent, showZero, maxValue, className } = newProps;
  const makeDisappear = () => {
    if (typeof badgeContent === "number") {
      if (badgeContent === 0) return "hide";
      return "";
    }
    return "";
  };

  return (
    <div className={`Badge ${className}`}>
      {children}
      <div className={`Badge__Notification ${makeDisappear()}`}>
        {renderBadgeContent(badgeContent, maxValue)}
      </div>
    </div>
  );
}

function renderBadgeContent(
  badgeContent: JSX.Element | number,
  maxValue: number
) {
  if (typeof badgeContent === "number") {
    if (badgeContent > maxValue) return `+${maxValue}`;
    return badgeContent;
  }
  return badgeContent;
}
