import classNames from 'classnames';
import { useDrawerStore } from './DrawerStoreProvider';
import CloseIcon from '@mui/icons-material/Close';

export type DrawerHeaderProps = {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  closeIcon?: boolean;
};

const defaultProps: Required<Omit<DrawerHeaderProps, 'children'>> = {
  className: '',
  closeIcon: false,
};

export function DrawerHeader(props: DrawerHeaderProps) {
  const newProps = { ...defaultProps, ...props };
  const { className, closeIcon, children } = newProps;
  const action = useDrawerStore((state) => state.action);
  const headerClassName = classNames('Drawer__Header', className);
  const renderCloseIcon = () => {
    if (closeIcon) {
      const handleClickToClose = () => {
        action.toggleOpen(false);
      };
      return (
        <div className="Drawer__CloseIcon" onClick={handleClickToClose}>
            <CloseIcon/>
        </div>
      );
    }
    return <></>;
  };
  return (
    <div className={headerClassName}>
      {renderCloseIcon()}
      {children}
    </div>
  );
}
