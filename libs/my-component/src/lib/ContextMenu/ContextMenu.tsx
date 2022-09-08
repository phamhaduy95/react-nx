import { Placement, useContextMenuPlacement } from './useContextMenuPlacement';
import './ContextMenu.scss';
import { ContextMenuStoreProvider } from './ContextMenuStoreProvider';
import './ContextMenu.scss';
import { PopupMenu } from '../PopupMenu/PopupMenu';
import { useRef } from 'react';
import { reDefineMenuItem } from '../PopupMenu/PopupMenuItem';


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
  const MenuItems = reDefineMenuItem(children);
  const popupRef = useRef<HTMLDivElement>(null);
  useContextMenuPlacement(targetRef,popupRef,placement);
  return (
    <PopupMenu className='ContextMenu' targetRef={targetRef} ref={popupRef}>
      {MenuItems}
    </PopupMenu>
  );
}

export type { ContextMenuProps };
