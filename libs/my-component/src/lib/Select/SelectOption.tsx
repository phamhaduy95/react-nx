import React, { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { useSelectStore } from './SelectStoreProvider';
import { useSwitchFocus } from '../utils/hooks';
import { ensureElementsListAsArray } from '../utils/ReactElementProcessor';
import { v4 as uuidv4 } from 'uuid';
export interface SelectOption {
  value: string;
  children?: React.ReactNode | false;
  label?: string | false;
  disabled?: boolean;
}

const defaultProps: Required<SelectOption> = {
  value: '',
  label: '',
  children: false,
  disabled: false,
};

export function SelectOption(props: SelectOption) {
  return <></>;
}

function SelectOptionWithId(props: SelectOption) {
  const newProps = { ...defaultProps, ...props };
  const { children, label, value, disabled } = newProps;
  const id = useMemo(() => {
    return uuidv4();
  }, []);

  const action = useSelectStore((state) => state.action);
  const isSelected = useSelectStore((state) => state.selectedItem?.id === id);
  const isHighLighted = useSelectStore(
    (state) => state.highLightedItem?.id === id
  );

  useEffect(() => {
    const itemLabel = label ? label : value;
    action.subscribe({ id, disabled, value, label: itemLabel });
    return () => {
      action.unsubscribe(id);
    };
  }, []);

  // update disabled state of item in ItemList in store when then disabled prop is changed. This useEffect must always be put after the item subscription in store useEffect
  useEffect(() => {
    const itemLabel = label ? label : value;
      action.updateItemState(id, { disabled,value,label:itemLabel });
  }, [disabled,value,label]);

  const itemRef = useRef(null);
  useSwitchFocus(itemRef, isHighLighted);

  const renderContent = () => {
    if (children) return children;
    if (label !== defaultProps.label) return label;
    return value;
  };

  const handleSelectItem = (e: React.MouseEvent) => {
    if (disabled) return;
    action.selectItem({ id });
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
        action.selectItem({ id });
        return;
      }
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    action.highlightOne(id);
  };
  const handleMouseLeave = () => {
    if (disabled) return;
    action.highlightOne(null);
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
      return <SelectOptionWithId {...newProps} key={i} />;
    });
}
