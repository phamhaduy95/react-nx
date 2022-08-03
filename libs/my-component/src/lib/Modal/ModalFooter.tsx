import React, { useEffect } from "react";
import { Button } from "../Button/Button";
import { useModalContext } from "./ModalContextProvider";

type Props = {
  children: React.ReactNode;
};
export default function ModalFooter(props: Props) {
  let { children } = props;
  children ??= <DefaultFooter />;
  return <div className="Modal__Footer">{children}</div>;
}

export const DefaultFooter = () => {
  const { state, action } = useModalContext();

  const handleOkClick = () => {
    action.closeModal();
  };

  const handleCancelClick = () => {
    action.closeModal();
  };

  return (
    <div className="Modal__Footer__button-box--default">
      <Button variant="secondary" onClick={handleCancelClick}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleOkClick}>
        Ok
      </Button>
    </div>
  );
};
