import React, { useEffect, useMemo, useRef } from 'react';
import { ensureElementsListAsArray } from '../utils/ReactElementProcessor';
import { useSwitchFocus } from '../utils/hooks';
import classNames from 'classnames';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { v4 as uuidv4 } from 'uuid';
import { usePopupMenuStore } from './PopupMenuStoreProvider';
import { PopupMenuSubMenu } from './SubMenu/SubMenu';

export type PopupMenuItemProps = {
  className?: string;
  suffix?: JSX.Element | string | false;
  prefix?: JSX.Element | string | false;
  disabled?: boolean;
  children: React.ReactNode;
  onSelect?: () => void;
};

const defaultProps: Required<PopupMenuItemProps> = {
  className: '',
  suffix: false,
  prefix: false,
  disabled: false,
  children: <></>,
  onSelect() {},
};

export function PopupMenuItem(props: PopupMenuItemProps) {
  return <></>;
}

type IndexedContextMenuItemProps = PopupMenuItemProps;

function PopupMenuItemWithId(props: IndexedContextMenuItemProps) {
  const newProps = { ...defaultProps, ...props };
  const { children, suffix, prefix, onSelect, disabled } = newProps;
  const itemRef = useRef<HTMLDivElement>(null);
  const id = useMemo(() => {
    return uuidv4();
  }, []);
  const action = usePopupMenuStore((state) => state.action);
  const isFocus = usePopupMenuStore(
    (state) => state.highLightedItem?.id === id
  );

  useSwitchFocus(itemRef, isFocus);

  useEffect(() => {
    action.subscribe({ id, disabled });
    return () => {
      action.unsubscribe(id);
    };
  }, []);

  useEffectSkipFirstRender(() => {
    if (disabled) action.disableItem(id);
    else action.unDisableItem(id);
  }, [disabled]);

  const className = classNames('PopupMenu__Item', {
    ['is-disabled']: disabled,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key;

    switch (key) {
      case 'Enter': {
        if (disabled) return;
        onSelect();
        action.togglePopup(false);
        return;
      }
    }
  };

  const handleClick = () => {
    if (disabled) return;
    action.togglePopup(false);
    onSelect();
  };


  const handleMouseEnter = () => {
    if (disabled) return;
    action.highlightOne(id);
  };

  const renderPrefix = () => {
    if (prefix)
      return <span className="PopupMenu__Item__Prefix">{prefix}</span>;
    return <></>;
  };

  const renderSuffix = () => {
    if (suffix)
      return <span className="PopupMenu__Item__Suffix">{suffix}</span>;
    return <></>;
  };

  const handleMouseLeave = () => {
    if (isFocus) action.highlightOne(null);
  };


  return (
    <div
      className={className}
      tabIndex={-1}
      ref={itemRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderPrefix()}
      <span className="PopupMenu__Item__Content">{children}</span>
      {renderSuffix()}
    </div>
  );
}

export function reDefineMenuItem(children: JSX.Element[] | JSX.Element) {
  const childrenArray = ensureElementsListAsArray(children);
  let newArray = [];
  let i = 0;
  for (let element of childrenArray) {
    if (element.type.name === PopupMenuItem.name) {
      const props = element.props as PopupMenuItemProps;
      newArray.push(<PopupMenuItemWithId {...props} key={i} />);
      i++;
      continue;
    }
    if (element.type.name === PopupMenuSubMenu.name) {
      const props = element.props;
      newArray.push(<PopupMenuSubMenu {...props} key={i} />);
      i++;
      continue;
    }
    newArray.push(element);
  }
  return newArray;
}
