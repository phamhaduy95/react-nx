import React from 'react';
import List from '@mui/material/List';

import { ListItemLink } from './ListItemLink';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItemButton, ListItemText, SvgIconProps } from '@mui/material';

export type SideBarListItemType = {
  icon:React.ReactElement;
  text: string;
  to?: string;
};

export interface SideBarListProps {
  items: SideBarListItemType[];
}

export function MaterialSideBarList(props: SideBarListProps) {
  const { items } = props;
  const renderItems = () => {
    return items.map((item, i) => {
    
      const { icon, text, to } = item;
      const NewIcon =  React.cloneElement(icon);
      if (to)
        return <ListItemLink icon={icon} primary={text} to={to} key={i} />;
      return (  
        <ListItemButton className='Material-SideBar__Item'>
          <ListItemIcon >{NewIcon}</ListItemIcon>
          <ListItemText primary={text}/>
        </ListItemButton>
      );
    });
  };

  return <List className="Material-SideBar__List">{renderItems()}</List>;
}
