import classNames from 'classnames';
export type DrawerContentProps = {
  children: JSX.Element[] | JSX.Element;
  className?: string;
};

const defaultProps: Required<Omit<DrawerContentProps, 'children'>> = {
  className: '',
};

export function DrawerContent(props: DrawerContentProps) {
  const newProps = { ...defaultProps, ...props };
  const className = classNames('Drawer__Content', newProps.className);
  return <div className={className}>{newProps.children}</div>;
}
