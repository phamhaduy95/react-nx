import { useState } from 'react';
import './SideBar.scss';
import SideBarContextProvider from './SideBarContext';
import SideBarHeader from './SideBarHeader';

/* eslint-disable-next-line */
export interface SideBarProps {
  BranchIcon: React.ReactElement;
  BranchText: React.ReactElement | string;
  children: JSX.Element[] | JSX.Element;
}

function WrappedSideBar(props: SideBarProps) {
  const { BranchIcon, BranchText, children } = props;
  const [isExpanded, setExpanded] = useState(true);
  const handleMouseOver = () => {
    setExpanded(true);
  };

  const handleMouseOut = () => {
    setExpanded(false);
  };

  const applyExpandedStyle = () => {
    if (isExpanded) return 'expanded';
    return '';
  };

  return (
    <div className="SideBar">
      <div
        className={`SideBar__Container ${applyExpandedStyle()}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <SideBarHeader Icon={BranchIcon} Name={BranchText} />
        <div className="SideBar__Content">{children}</div>
      </div>
    </div>
  );
}

export function SideBar(props: SideBarProps){
    return (
      <SideBarContextProvider>
        <WrappedSideBar {...props} />
      </SideBarContextProvider>
    )

}

export default SideBar;
