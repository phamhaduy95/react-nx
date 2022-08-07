import React, { useEffect, useState } from 'react';
import { Collapsible } from '../Collapsible';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSideBarContext } from './SideBarContext';
import { useGenerateUUID } from './hooks';
export interface SideBarSubListProps {
  headerText: string;
  headerIcon?: React.ReactElement;
  items: string[];
  listStyle?: React.ReactElement | boolean;
}

export function SideBarSubList(props: SideBarSubListProps) {
  const { items, headerText, headerIcon } = props;
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  const renderHeaderIcon = () => {
    if (headerIcon)
      return <div className="SidBar__SubList__HeaderIcon">{headerIcon}</div>;
    return <></>;
  };

  const renderItems = () => {
    return items.map((item, index) => {
      return <SideBarItem key={index} item={item} />;
    });
  };

  const applySelect = () => {
    if (selected) return 'selected';
    return '';
  };

  return (
    <div className={`SideBar__SubList ${applySelect()}`}>
      <div onClick={handleClick} className="SideBar__SubList__Header">
        {renderHeaderIcon()}
        <div className="SideBar__SubList__HeaderText">{headerText}</div>
        <ArrowForwardIosIcon className="SideBar__SubList__HeaderArrow" />
      </div>

      <div className="SideBar__SubList__List">
        <Collapsible direction="vertical" showed={selected}>
          {renderItems()}
        </Collapsible>
      </div>
    </div>
  );
}

type SideBarSubListItemProps = {
  item: SideBarSubListProps['items'][number];
};

function SideBarItem(props: SideBarSubListItemProps) {
  const { item } = props;
  const { state, action } = useSideBarContext();
  const id = useGenerateUUID();
  const handleSelectItem = () => {
    action.changeSelectItem(id);
  };

  const applySelected = ()=>{
    if (state.selectedItemId === id) return "selected";
    return ""
  }

  return (
    <li className={`SideBar__SubList__ListItem ${applySelected()}`} onClick={handleSelectItem}>
      {item}
    </li>
  );
}

export default SideBarSubList;
