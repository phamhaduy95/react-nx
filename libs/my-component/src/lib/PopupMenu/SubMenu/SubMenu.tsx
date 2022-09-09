import { useEffect, useMemo, useRef } from 'react';
import { SubMenuStoreProvider } from './SubMenuStoreProvider';
import { reDefineMenuItem } from '../PopupMenuItem';
import { SubMenuPopup } from './SubMenuPopup';
import { SubMenuTrigger } from './SubMenuTrigger';
import { usePopupMenuStore } from '../PopupMenuStoreProvider';
import { v4 as uuidv4 } from 'uuid';
import './SubMenu.scss';
import classNames from 'classnames';

export type PopupMenuSubMenuProps = {
  className?: string;
  children: JSX.Element[] | JSX.Element;
  label: string;
  disabled?: boolean;
};

const defaultProps: Required<PopupMenuSubMenuProps> = {
  className: '',
  children: [],
  label: 'item',
  disabled: false,
};

export function PopupMenuSubMenu(props: PopupMenuSubMenuProps) {
  const newProps = { ...defaultProps, ...props };
  const { children, label, className, disabled } = newProps;

  const MenuItems = useMemo(() => reDefineMenuItem(children), [children]);
  // register an id to store
  const id = useMemo(() => {
    return uuidv4();
  }, []);
  useEffect(() => {
    action.subscribe({ id, disabled });
    return () => {
      action.unsubscribe(id);
    };
  }, []);


  const action = usePopupMenuStore((state) => state.action);
  const isHighLighted = usePopupMenuStore(
    (state) => state.highLightedItem?.id === id
  );

  const triggerRef = useRef<any>(null);


  const rootClassName = classNames('PopupMenu__SubMenu', className, {
    [`is-disabled`]:disabled,
  });

  const handleItemFocused = () => {
    if (disabled) return;
    // console.log("1")
    // action.highlightOne(id);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    action.highlightOne(id);
  };

  return (
    <SubMenuStoreProvider>
      <div
      className={rootClassName}
        onFocus={handleItemFocused}
        onMouseEnter = {handleMouseEnter}
      >
        <SubMenuTrigger
          isHighLighted={isHighLighted}
          ref={triggerRef}
          label={label}
          disabled={disabled}
        />
        <SubMenuPopup triggerRef={triggerRef}>{MenuItems}</SubMenuPopup>
      </div>
    </SubMenuStoreProvider>
  );
}
