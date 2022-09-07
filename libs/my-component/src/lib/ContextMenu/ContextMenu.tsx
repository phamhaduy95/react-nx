import { Placement } from './useContextMenuPlacement';
import './ContextMenu.scss';
import { ContextMenuStoreProvider } from './ContextMenuStoreProvider';
import { ContextMenuPopup } from './ContextMenuPopup';
import { giveIndexToItems } from './ContextMenuItem';
import "./ContextMenu.scss"

type ContextMenuProps = {
  className?: string;
  targetRef: React.MutableRefObject<HTMLElement | null>;
  placement?: Placement;
  children: JSX.Element[] | JSX.Element;
};

const defaultProps: Omit<
  Required<ContextMenuProps>,
  'targetRef' | 'children'
> = {
  className: '',
  placement: 'bottom-right',
};

export function ContextMenu(props: ContextMenuProps) {
  return (
    <ContextMenuStoreProvider>
      <WrappedContextMenu {...props} />
    </ContextMenuStoreProvider>
  );
}

function WrappedContextMenu(props: ContextMenuProps) {
  const newProps = { ...defaultProps, ...props };
  const { children, placement, className, targetRef } = newProps;
  const menuItems = giveIndexToItems(children);
  return (
    <ContextMenuPopup
      targetRef={targetRef}
      className={className}
      initialPlacement={placement}
    >
      {menuItems}
    </ContextMenuPopup>
  );
}

export type { ContextMenuProps };
