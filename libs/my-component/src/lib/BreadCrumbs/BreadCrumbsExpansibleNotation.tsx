import React from 'react'
import useBreadCrumbsContext from './useBreadCrumbsContext';


export default function BreadCrumbsExpansibleNotation() {
  const {state,action} = useBreadCrumbsContext();
  const {isExpanded} = state;
  const handleClick = (event:React.MouseEvent)=>{
    action.toggleExpand(!isExpanded);
  }
  return (
    <span className='BreadCrumbs_ExpansibleNotation' onClick={handleClick}>...</span>
  )
}
