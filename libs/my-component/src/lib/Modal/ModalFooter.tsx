import classNames from 'classnames';
import React from 'react';

export type ModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};
export function ModalFooter(props: ModalFooterProps) {
  let { children, className } = props;
  className = className === undefined ? '' : className;
  const rootClassName = classNames('Modal__Footer', className);
  return <div className={rootClassName}>{children}</div>;
}
