import React, { useContext } from "react";

type Props = {
  children?: React.ReactNode;
};

export default function ModalBody(props: Props) {
  let { children } = props;
  children = children === undefined ? "" : children;
  return <div className="Modal__Body">{children}</div>;
}
