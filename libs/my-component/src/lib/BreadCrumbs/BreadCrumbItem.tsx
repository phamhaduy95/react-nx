import React from 'react'
type Props = {
    children: JSX.Element;
    index: number;
}

export default function BreadCrumbItem(props:Props) {
  const {children, index} = props;
  return (
    <span className='BreadCrumbs_Item' key={index}>{children}</span>
  )
}
