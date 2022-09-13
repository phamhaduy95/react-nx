import classNames from 'classnames';
import React, { useContext } from 'react';

export type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export function ModalBody(props: ModalBodyProps) {
  let { children, className } = props;
  className = className === undefined ? '' : className;
  const rootClassName = classNames('Modal__Body', className);
  return <div className={rootClassName}>{children}</div>;
}
