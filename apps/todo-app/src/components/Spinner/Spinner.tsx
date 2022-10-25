import React from 'react';
import classNames from 'classnames';
import "./Spinner.scss"
export type SpinnerProps = {
    className:string;
} 

export function Spinner(props:SpinnerProps) {
    const {className} = props;
    const rootClassName = classNames("Spinner__Container",className);
    return ( 
    <div className={rootClassName}>
      <div className="Spinner"></div>
    </div>
  );
}
