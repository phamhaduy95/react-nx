import classNames from 'classnames';
import {GlobalStyleProvider} from '../GlobalStyleProvider';
import './SideBar.scss';
import SideBarHeader from './SideBarHeader';
import { useSideBarStore, SideBarStoreProvider } from './SideBarStoreProvider';

/* eslint-disable-next-line */
export interface SideBarProps {
  BranchIcon: React.ReactElement;
  BranchText: React.ReactElement | string;
  children: JSX.Element[] | JSX.Element;
  className?: string;
}

const defaultProps: Required<SideBarProps> = {
  BranchIcon: <></>,
  BranchText: <></>,
  children: [],
  className: '',
};

function WrappedSideBar(props: SideBarProps) {
  const newProps = { ...defaultProps, ...props };
  const { BranchIcon, BranchText, children, className } = newProps;
  const action = useSideBarStore((state) => state.action);
  const isExpanded = useSideBarStore((state) => state.isExpanded);
  const handleMouseOver = () => {
    action.toggleExpand(true);
  };

  const handleMouseOut = () => {
    action.toggleExpand(false);
  };

  const rootClassName = classNames('SideBar', className);

  const containerClassName = classNames('SideBar__Container', {
    ['expanded']: isExpanded,
  });

  return (
    <div className={rootClassName}>
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
    <GlobalStyleProvider>
    <SideBarStoreProvider>
      <WrappedSideBar {...props} />
    </SideBarStoreProvider>
    </GlobalStyleProvider>
  );
}

export default SideBar;
