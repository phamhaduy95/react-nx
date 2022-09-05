import React, { useEffect, useRef } from 'react';
import { ensureElementsListAsArray } from '../utils/ReactElementProcessor';
import { useToggleGroupStore } from './ToggleGroupStoreProvider';
import classNames from 'classnames';
import { useSwitchFocus } from '../utils/hooks';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { useToggleGroupSharedData } from './SharedDataContextProvider';

export type ToggleGroupItemProps = {
  children: JSX.Element | string;
  value: string;
  disabled?: boolean;
};

export function ToggleGroupItem(props: ToggleGroupItemProps) {
  return <></>;
}

type IndexedToggleGroupItemProps = ToggleGroupItemProps & { index: number };

const defaultProps: Required<IndexedToggleGroupItemProps> = {
  children: <></>,
  value: '',
  disabled: false,
  index: 0,
};

function IndexedToggleGroupItem(props: IndexedToggleGroupItemProps) {
  const newProps = { ...defaultProps, ...props };
  const { index, value, disabled, children } = newProps;
  const itemRef = useRef<HTMLButtonElement>(null);
  const { onChange } = useToggleGroupSharedData();
  const action = useToggleGroupStore((state) => state.action);
  const isSelected = useToggleGroupStore((state) => {
    const id = state.itemList.findIndex(
      (e) => e.isSelected && e.index === index
    );
    return id === -1 ? false : true;
  });

  const isFocus = useToggleGroupStore(
    (state) => state.highLightedItem?.index === index
  );

  useEffectSkipFirstRender(() => {
    if (isSelected) onChange(value);
  }, [isSelected]);

  useSwitchFocus(itemRef, isFocus);

  useEffect(() => {
    action.subscribe({ index, disabled, isSelected });
    return () => {
      action.unsubscribe(index);
    };
  }, []);

  useEffectSkipFirstRender(() => {
    if (disabled) action.disableItem(index);
    else action.unDisableItem(index);
  }, [disabled]);

  const className = classNames('ToggleGroup__Item', {
    ['is-selected']: isSelected,
  });

  const handleClick = (event: React.MouseEvent) => {
    action.toggleItem({ index, isSelected: !isSelected });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key;
    switch (key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        e.preventDefault();
        action.highlightNext();
        return;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        e.preventDefault();
        action.highlightPrev();
        return;
      }
    }
  };

  const handleButtonFocused = () => {
    action.highlightOne(index);
  };

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={handleClick}
      ref={itemRef}
      onFocus={handleButtonFocused}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
}

export function giveIndexToGroupItems(children: JSX.Element[] | JSX.Element) {
  const childrenArray = ensureElementsListAsArray(children);
  return childrenArray
    .filter((e) => e.type.name === ToggleGroupItem.name)
    .map((e, i) => {
      const props = e.props as ToggleGroupItemProps;
      const newProps = { ...props, index: i };
      return <IndexedToggleGroupItem {...newProps} key={i} />;
    });
}
