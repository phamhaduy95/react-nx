import React, { useContext } from "react";
import { ReactComponent as CloseIcon } from "./close-Icon.svg";
import { useModalContext } from './ModalContextProvider';


type Props = {
  children: React.ReactNode;
};

export default function ModalHeader(props: Props) {
  let { children } = props;
  children ??= "";
  const {state,action} = useModalContext();

  function handleClick(e: any) {
    action.closeModal();
  }
  
  return (
    <div className="Modal__Header">
      {children}
      <button className="Modal__Close-button" onClick={handleClick}>
        <CloseIcon className="Modal__Close-Icon" />
      </button>
    </div>
  );
}
