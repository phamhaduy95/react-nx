import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelectContext } from './SelectContextProvider';
import { SelectState } from './reducer';
import classNames from 'classnames';
export interface SelectOption {
  value: string | number | boolean;
  children?: React.ReactNode | false;
  label?: string | false;
  isDefault?: boolean;
}

const defaultProps: Required<SelectOption> = {
  value: 'option 1',
  label: 'option 1',
  children: false,
  isDefault: false,
};

export function SelectOption(props: SelectOption) {
  const newProps = { ...defaultProps, ...props };
  const { children, label, value, isDefault } = newProps;
  const { state, action } = useSelectContext();
  const id = useMemo(() => {
    return uuidv4();
  }, []);

  useEffect(() => {
    if (!isDefault) return;
    action.selectItem({ id: id, value: value.toString() });
  }, [isDefault]);
  const renderInnerContent = () => {
    if (children) return children;
    if (label !== defaultProps.label) return label;
    return value;
  };

  const handleSelectItem = (e: React.MouseEvent) => {
    const newItem: SelectState['selectedItem'] = {
      id: id,
      value: value.toString(),
    };
    action.selectItem(newItem);
  };

  const isSelected = id === state.selectedItem.id;

  const className = classNames('Select__Option', { selected: isSelected });

  return (
    <div className={className} tabIndex={-1} onClick={handleSelectItem}>
      {renderInnerContent()}
    </div>
  );
}
