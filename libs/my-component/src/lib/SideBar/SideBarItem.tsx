import React, { useEffect } from 'react';
import { useGenerateUUID } from './hooks';
import { useSideBarStore } from './SideBarStoreProvider';
import classNames from 'classnames';

export interface SideBarItemProps {
  Icon?: React.ReactNode;
  label: React.ReactNode;
  disabled?: boolean;
  value?: string;
  isSelected?: boolean;
  onSelected?: (value: string) => void;
  type?: 'button' | 'nav';
}

const defaultProps: Required<SideBarItemProps> = {
  Icon: <></>,
  label: '',
  value: '',
  disabled: false,
  type: 'nav',
  isSelected: false,
  onSelected(value) {},
};

export function SideBarItem(props: SideBarItemProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    Icon,
    label,
    disabled,
    value,
    onSelected,
    type,
    isSelected: selectSignal,
  } = newProps;
  const id = useGenerateUUID();
  const action = useSideBarStore((state) => state.action);
  const isSelected = useSideBarStore((state) => state.selectedItem?.id === id);

  useEffect(() => {
    action.subscribe({ id, disabled, value });
    return () => {
      action.unsubscribe(id);
    };
  }, []);

  
  useEffect(() => {
    action.updateItemState(id, { value, disabled });
  }, [value, disabled]);

  useEffect(()=>{
    if (selectSignal)
    action.selectItem({id});
  },[selectSignal])

  const handleSelectItem = (e: React.MouseEvent) => {
    if (type === 'nav') {
      action.selectItem({ id });
    }
    onSelected(value);
  };

  const itemClassName = classNames('SideBar__Item', {
    ['selected']: isSelected,
  });

  return (
    <div className={itemClassName} onClick={handleSelectItem}>
      <div className="SideBar__Item__Icon">{Icon}</div>
      <div className="SideBar__Item__Text">{label}</div>
    </div>
  );
}

export default SideBarItem;
