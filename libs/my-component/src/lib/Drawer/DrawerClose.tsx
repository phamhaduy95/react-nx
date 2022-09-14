import classNames from 'classnames';
import { useDrawerStore } from './DrawerStoreProvider';
export type DrawerCloseProps = {
  children: JSX.Element[] | JSX.Element;
  className?: string;
};

const defaultProps: Required<Omit<DrawerCloseProps, 'children'>> = {
  className: '',
};

export function DrawerCloseAction(props: DrawerCloseProps) {
  const newProps = { ...defaultProps, ...props };
  const className = classNames('Drawer__CloseAction', newProps.className);
  const action = useDrawerStore((state) => state.action);
  const handleClick = () => {
    action.toggleOpen(false);
  };
  return (
    <div className={className} onClick={handleClick}>
      {newProps.children}
    </div>
  );
}
