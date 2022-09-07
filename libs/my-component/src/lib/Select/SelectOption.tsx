import React, { useEffect, useRef } from 'react';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import classNames from 'classnames';
import { useSelectStore } from './SelectStoreProvider';
import { useStore } from 'zustand';
import { useSwitchFocus } from '../utils/hooks';
import { ensureElementsListAsArray } from '../utils/ReactElementProcessor';
export interface SelectOption {
  value: string;
  children?: React.ReactNode | false;
  label?: string | false;
  isDefault?: boolean;
  disabled?: boolean;
}

const defaultProps: Required<SelectOption> = {
  value: 'option 1',
  label: 'option 1',
  children: false,
  isDefault: false,
  disabled: false,
};

export function SelectOption(props: SelectOption) {
  return <></>;
}

type IndexedSelectOption = SelectOption & { index: number };

function IndexedSelectOption(props: IndexedSelectOption) {
  const newProps = { ...defaultProps, ...props };
  const { children, label, value, isDefault, index, disabled } = newProps;
  const store = useSelectStore();
  const action = useStore(store, (state) => state.action);
  const isSelected = useStore(
    store,
    (state) => state.selectedItem?.index === index
  );
  const isHighLighted = useStore(
    store,
    (state) => state.highLightedItem?.index === index
  );

  console.log('debug');

  useEffect(() => {
    action.subscribe(index);
    return () => {
      action.unsubscribe(index);
    };
  }, []);

  // update disabled state of item in ItemList in store when then disabled prop is changed. This useEffect must always be put after the item subscription in store useEffect
  useEffect(() => {
    if (disabled) {
      action.disableItem(index);
      return;
    }
    action.unDisableItem(index);
  }, [disabled]);

  const itemRef = useRef(null);
  useSwitchFocus(itemRef, isHighLighted);
  useEffect(() => {
    if (!isDefault) return;
    action.selectItem({ index, value });
  }, [isDefault]);

  const renderContent = () => {
    if (children) return children;
    if (label !== defaultProps.label) return label;
    return value;
  };

  const handleSelectItem = (e: React.MouseEvent) => {
    if (disabled) return;
    action.selectItem({ index, value });
    action.togglePopup(false);
  };

  const className = classNames('Select__Option', {
    selected: isSelected,
    [`is-highlighted`]: isHighLighted,
  });

  const handleKeyPressed = (e: React.KeyboardEvent) => {

    const key = e.key;
    switch (key) {
      case 'Enter': {
        if (disabled) return;
        action.selectItem({ index, value });
        return;
      }
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    action.hightLightItem({ index });
  };
  const handleMouseLeave = () => {
    if (disabled) return;
    action.hightLightItem(null);
  };

  return (
    <div
      className={className}
      tabIndex={-1}
      ref={itemRef}
      onClick={handleSelectItem}
      onKeyDown={handleKeyPressed}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderContent()}
    </div>
  );
}

export function giveIndexToSelectOptions(
  children: JSX.Element[] | JSX.Element
) {
  const childrenArray = ensureElementsListAsArray(children);
  return childrenArray
    .filter((e) => e.type.name === SelectOption.name)
    .map((e, i) => {
      const props = e.props;
      const newProps = { ...props, index: i };
      return <IndexedSelectOption {...newProps} key={i} />;
    });
}
