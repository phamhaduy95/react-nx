import React, { useState } from 'react';
import { Collapsible } from '../Collapsible';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface SideBarSubListProps {
  headerText: string;
  headerIcon?: React.ReactElement;
  children: JSX.Element[] | JSX.Element;
}

const defaultProps: Required<Omit<SideBarSubListProps, 'children'>> = {
  headerIcon: <></>,
  headerText: '',
};

export function SideBarSubList(props: SideBarSubListProps) {
  const newProps = { ...defaultProps, ...props };
  const { children, headerText, headerIcon } = newProps;
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  const renderHeaderIcon = () => {
    if (headerIcon)
      return <div className="SidBar__SubList__HeaderIcon">{headerIcon}</div>;
    return <></>;
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
          {children}
        </Collapsible>
      </div>
    </div>
  );
}
