import React from 'react';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGenerateUUID } from '../SideBar/hooks';
import useEffect from 'react';
import { useSelectContext } from './SelectContextProvider';
import { SelectState } from './reducer';
import classNames from 'classnames';
export interface SelectOption {
  value: string | number | boolean;
  children?: React.ReactNode | false;
  label?: string | false;
}

const defaultProps: SelectOption = {
  value: 'option 1',
  label: 'option 1',
  children: false,
};

export function SelectOption(props: SelectOption) {
  const newProps = { ...defaultProps, ...props };
  const { children, label, value } = newProps;
  const { state, action } = useSelectContext();
  const id = useMemo(() => {
    return uuidv4();
  }, []);

  const renderInnerContent = () => {
    if (children) return children;
    return label;
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
