import classNames from 'classnames';
import { useDrawerStore } from './DrawerStoreProvider';
import CloseIcon from '@mui/icons-material/Close';

export type DrawerProps = {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  closeIcon?: boolean;
};

const defaultProps: Required<Omit<DrawerProps, 'children'>> = {
  className: '',
  closeIcon: false,
};

export function DrawerHeader(props: DrawerProps) {
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
