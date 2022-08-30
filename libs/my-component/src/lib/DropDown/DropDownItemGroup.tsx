import React from 'react'
import classNames from 'classnames';

export type DropDownItemGroup = {
    className?:string;
    label?:string|JSX.Element|false;
    children:JSX.Element[]|JSX.Element;
}

export  function DropDownItemGroup(props:DropDownItemGroup) {
    const {className,label,children} = props;
    const rootClassName = classNames("DropDown__ItemGroup",className);
    const renderLabel = ()=>{
        if (label) return <div className='DropDown__ItemGroup__Label'>
            {label}
        </div>
        return <></>
    }
  return (
    <div className={rootClassName}>
        {renderLabel()}
        {children}
    </div>
  )
}
