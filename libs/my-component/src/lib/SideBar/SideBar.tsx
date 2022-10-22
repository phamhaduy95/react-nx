import classNames from 'classnames';
import './SideBar.scss';
import SideBarHeader from './SideBarHeader';
import { useSideBarStore, SideBarStoreProvider } from './SideBarStoreProvider';

/* eslint-disable-next-line */
export interface SideBarProps {
  BranchIcon: React.ReactElement;
  BranchText: React.ReactElement | string;
  children: JSX.Element[] | JSX.Element;
}

function WrappedSideBar(props: SideBarProps) {
  const { BranchIcon, BranchText, children } = props;
  const action = useSideBarStore((state) => state.action);
  const isExpanded = useSideBarStore((state) => state.isExpanded);
  const handleMouseOver = () => {
    action.toggleExpand(true);
  };

  const handleMouseOut = () => {
    action.toggleExpand(false);
  };

  const containerClassName = classNames('SideBar__Container', {
    ['expanded']: isExpanded,
  });

  return (
    <div className="SideBar">
      <div
        className={containerClassName}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <SideBarHeader Icon={BranchIcon} Name={BranchText} />
        <div className="SideBar__Content">{children}</div>
      </div>
    </div>
  );
}

export function SideBar(props: SideBarProps) {
  return (
    <SideBarStoreProvider>
      <WrappedSideBar {...props} />
    </SideBarStoreProvider>
  );
}

export default SideBar;
