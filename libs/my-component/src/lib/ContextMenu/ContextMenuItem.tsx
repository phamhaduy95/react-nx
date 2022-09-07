import React, { useEffect, useRef } from 'react';
import { ensureElementsListAsArray } from '../utils/ReactElementProcessor';
import { useContextMenuStore } from './ContextMenuStoreProvider';
import { useSwitchFocus } from '../utils/hooks';
import classNames from 'classnames';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

export type ContextMenuItemProps = {
  className?: string;
  suffix?: JSX.Element | string | false;
  prefix?: JSX.Element | string | false;
  disabled?: boolean;
  children: React.ReactNode;
  onSelect?: () => void;
};

const defaultProps: Required<ContextMenuItemProps> = {
  className: '',
  suffix: false,
  prefix: false,
  disabled: false,
  children: <></>,
  onSelect() {},
};

export function ContextMenuItem(props: ContextMenuItemProps) {
  return <></>;
}

type IndexedContextMenuItemProps = ContextMenuItemProps & { index: number };

function IndexedContextMenuItem(props: IndexedContextMenuItemProps) {
  const newProps = { ...defaultProps, ...props };
  const { children, suffix, prefix, onSelect, index, disabled } = newProps;
  const itemRef = useRef<HTMLDivElement>(null);
  const action = useContextMenuStore((state) => state.action);
  const isFocus = useContextMenuStore(
    (state) => state.highLightedItem?.index === index
  );

  useSwitchFocus(itemRef, isFocus);

  useEffect(() => {
    action.subscribe({ index, disabled });
    return () => {
      action.unsubscribe(index);
    };
  }, []);

  useEffectSkipFirstRender(() => {
    if (disabled) action.disableItem(index);
    else action.unDisableItem(index);
  }, [disabled]);

  const className = classNames('ContextMenu__Item', {
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

  const handleItemFocused = () => {
    if (disabled) return;
    action.highlightOne(index);
  };

  const handleClick = () => {
    if (disabled) return;
    action.togglePopup(false);
    onSelect();
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    if (isFocus) action.highlightOne(null);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    action.highlightOne(index);
  };

  const renderPrefix = () => {
    if (prefix)
      return <span className="ContextMenu__Item__Prefix">{prefix}</span>;
    return <></>;
  };

  const renderSuffix = () => {
    if (suffix)
      return <span className="ContextMenu__Item__Suffix">{suffix}</span>;
    return <></>;
  };

  return (
    <div
      className={className}
      tabIndex={-1}
      ref={itemRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleItemFocused}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
    
        {renderPrefix()}
        <span className="ContextMenu__Item__Content">{children}</span>
        {renderSuffix()}
   
    </div>
  );
}

export function giveIndexToItems(children: JSX.Element[] | JSX.Element) {
  const childrenArray = ensureElementsListAsArray(children);
  return childrenArray
    .filter((e) => e.type.name === ContextMenuItem.name)
    .map((e, i) => {
      const props = e.props;
      const newProps = { ...props, index: i };
      return <IndexedContextMenuItem {...newProps} key={i} />;
    });
}
