import React, { useEffect, useRef } from 'react';
import { ensureElementsListAsArray } from '../utils/ReactElementProcessor';
import { useButtonGroupStore } from './ButtonGroupStoreProvider';
import classNames from 'classnames';
import { useSwitchFocus } from '../utils/hooks';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { useButtonGroupSharedData } from './SharedDataContextProvider';

export type ButtonGroupItemProps = {
  children: JSX.Element | string;
  value: string;
  disabled?: boolean;
};

export function ButtonGroupItem(props: ButtonGroupItemProps) {
  return <></>;
}

type IndexedButtonGroupItemProps = ButtonGroupItemProps & { index: number };

const defaultProps: Required<IndexedButtonGroupItemProps> = {
  children: <></>,
  value: '',
  disabled: false,
  index: 0,
};

function IndexedButtonGroupItem(props: IndexedButtonGroupItemProps) {
  const newProps = { ...defaultProps, ...props };
  const { index, value, disabled, children } = newProps;
  const itemRef = useRef<HTMLButtonElement>(null);
  const {onChange} = useButtonGroupSharedData();
  const action = useButtonGroupStore((state) => state.action);
  const isSelected = useButtonGroupStore((state) => {
    const id = state.itemList.findIndex(
      (e) => e.isSelected && e.index === index
    );
    return id === -1 ? false : true;
  });

  const isFocus = useButtonGroupStore(
    (state) => state.highLightedItem?.index === index
  );

  useEffectSkipFirstRender(()=>{
   if (isSelected) onChange(value)
  },[isSelected])


  useSwitchFocus(itemRef, isFocus);

  useEffect(() => {
    action.subscribe({index,disabled,isSelected});
    return () => {
      action.unsubscribe(index);
    };
  }, []);

  useEffectSkipFirstRender(()=>{
    if (disabled) action.disableItem(index);
  },[disabled])

  const className = classNames('ButtonGroup__Item', {
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
      case "ArrowLeft":
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
    .filter((e) => e.type.name === ButtonGroupItem.name)
    .map((e, i) => {
      const props = e.props as ButtonGroupItemProps;
      const newProps = { ...props, index: i };
      return <IndexedButtonGroupItem {...newProps} key={i} />;
    });
}
