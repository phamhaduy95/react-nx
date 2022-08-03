import React from 'react'
import { BreadCrumbContextProvider } from './BreadCrumbContext';
import { BreadCrumbState } from './BreadCrumbReducer';
import BreadCrumbItem from './BreadCrumbItem';
import BreadCrumbsItemView from './BreadCrumbsItemView';
import "./BreadCrumbs.scss"
type Props = {
  children: JSX.Element[]|JSX.Element;
  className?: string;
  onChange?: ()=>any;
  isExpanded?: boolean;
  maxItem?:number;
  separator?:string;
}

export function BreadCrumbs(props:Props) {
  const {children} = props;
  let {className,onChange,isExpanded,maxItem,separator} = props;
  className = (className === undefined)?"BreadCrumbs-default":className;
  isExpanded = (isExpanded === undefined)?false:isExpanded;
  maxItem = (maxItem === undefined || maxItem < 3)?3:maxItem;
  separator = (separator === undefined)?'\\':separator;
 
  const initialState:BreadCrumbState = {
    isExpanded:isExpanded,
    maxNumberOfItem:maxItem,
    separator:separator
  }

 

  return( 
  <BreadCrumbContextProvider initialState={initialState} >
  <nav className='BreadCrumbs' role="navigation" aria-label="Breadcrumbs">
  <BreadCrumbsItemView>{children}</BreadCrumbsItemView>
  </nav>
  </BreadCrumbContextProvider>
  )
}

BreadCrumbs["Item"] = BreadCrumbItem;