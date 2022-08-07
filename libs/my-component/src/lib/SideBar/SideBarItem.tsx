import React, { useEffect } from 'react'
import { useGenerateUUID } from './hooks';
import { useSideBarContext } from './SideBarContext';

export interface SideBarItemProps {
    Icon:React.ReactElement,
    Text:React.ReactElement|string;
}

export  function SideBarItem(props:SideBarItemProps) {
  const id = useGenerateUUID();
  const {state,action} = useSideBarContext();
  const handleSelectItem = (e:React.MouseEvent)=>{
      action.changeSelectItem(id);
  }

  const applySelect =()=>{
    console.log(state.selectedItemId);
    if (state.selectedItemId === id) return "selected";
    return ""
  }


  const {Icon,Text} = props;
  return (
    <div className={`SideBar__Item ${applySelect()}`} onClick={handleSelectItem}>
        <div className='SideBar__Item__Icon'>
            {Icon}
        </div>
        <div className='SideBar__Item__Text'>
            {Text}
        </div>
    </div>
  )
}

export default SideBarItem;