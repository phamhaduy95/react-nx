import React from 'react';

export interface SideBarHeaderProps {
  Icon: React.ReactElement;
  Name: string | React.ReactElement;
}

/** SideBarHeader is where you put branch name and branch icon */
export function SideBarHeader(props: SideBarHeaderProps) {
  const { Icon, Name } = props;
  return (
    <div className="SideBar__Header">
      <div className="SideBar__Header__Icon">{Icon}</div>
      <div className="SideBar__Header__Text">{Name}</div>
    </div>
  );
}

export default SideBarHeader;