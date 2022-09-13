import classNames from 'classnames';
import React from 'react';


export type ModalHeaderProps = {
  children: React.ReactNode;
  className?:string,
};

export function ModalHeader(props: ModalHeaderProps) {
  let { children,className } = props;
  className = className=== undefined?"":className;
  const rootClassName = classNames("Modal__Header",className)
  return (
    <div className={rootClassName}>
      {children}
    </div>
  );
}
