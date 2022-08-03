import React from 'react'

import useBreadCrumbsContext from './useBreadCrumbsContext';


export default function BreadCrumbSeparator() {
  const {state} = useBreadCrumbsContext();
  const  {separator}= state;
  return (
    <span className='BreadCrumbs_Separator'>{separator}</span>
  )
}
