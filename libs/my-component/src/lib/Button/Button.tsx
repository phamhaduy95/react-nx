import { useEffect, useState } from "react";
import "./Button.scss";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "default"
  | "danger"
  | "dark";

type Props = {
  onClick?: (e?: any) => void;
  className?: string;
  children?: JSX.Element | string;
  variant?: ButtonVariant;

  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  active?: boolean;
};

export function Button(props: Props) {
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    if (!active) setActive(false);
  }, [props.active]);

  let { onClick, className, children, variant, disabled, type, active } = props;
  variant = variant === undefined ? "default" : variant;
  children = children === undefined ? "Button" : children;
  className = className === undefined ? "button-defaultStyle" : className;
  className = `button ${className} button-${variant} `;
  if (isActive) className += `button-active`;
  type = type === undefined ? "button" : type;

  const handleClick = (e?: any) => {
    if (onClick !== undefined) {
      onClick();
    }
    if (active) {
      setActive(!isActive);
    }
  };

  function getButton() {
    if (disabled)
      return (
        <button
          type={type}
          className={className}
          onClick={handleClick}
          disabled
        >
          {children}
        </button>
      );
    return (
      <button type={type} className={className} onClick={handleClick}>
        {children}
      </button>
    );
  }

  return getButton();
}
