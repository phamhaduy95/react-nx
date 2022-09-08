import React from 'react'
import { reDefineMenuItem } from './PopupMenuItem';

export type PopupMenuItemGroupProps = {
    label:string;
    children:JSX.Element[]|JSX.Element;
}
export function PopupMenuItemGroup(props:PopupMenuItemGroupProps) {
   const {label,children} = props;
   const MenuItem = reDefineMenuItem(children);

   return (
    <div className='PopupMenu__ItemGroup'>
        <div className='PopupMenu__ItemGroup__Label'>
            {label}
        </div>
        {MenuItem}
    </div>
  )
}
