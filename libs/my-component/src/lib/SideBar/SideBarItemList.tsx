import React from 'react';

export interface SideBarItemListProps {
  subHeader?: string;
  children: React.ReactElement[] | React.ReactElement;
  divider?: boolean;
  id?: string;
}

type SubHeaderProps = {
  text: string;
};

function SubHeader(props: SubHeaderProps) {
  const { text } = props;
  return (
    <li className="SideBar__List__SubHeader">
      <span className="SubHeader__Line"></span>
      <span className="SubHeader__Text">{text}</span>
    </li>
  );
}

export function SideBarItemList(props: SideBarItemListProps) {
  const { subHeader, children, divider } = props;
  const renderSubHeader = () => {
    if (subHeader) return <SubHeader text={subHeader} />;
    return <></>;
  };
  const renderDividerLine = () => {
    if (divider) return <div className="SideBar__List__Divider"></div>;
    return <></>;
  };

  return (
    <>
      <ul className="SideBar__List">
        {renderSubHeader()}
        {children}
        {renderDividerLine()}
      </ul>
    </>
  );
}

export default SideBarItemList;
