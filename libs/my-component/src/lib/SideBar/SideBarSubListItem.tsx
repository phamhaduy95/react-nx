import classNames from 'classnames';
import { useEffect } from 'react';
import { useGenerateUUID } from './hooks';
import { useSideBarStore } from './SideBarStoreProvider';

export type SideBarSubListItemProps = {
  label: React.ReactNode;
  value: string;
  Icon?: React.ReactNode;
  onSelected?: (value: string) => void;
  disabled?: boolean;
};

const defaultItemProps: Required<SideBarSubListItemProps> = {
  Icon: <></>,
  label: '',
  onSelected(value) {},
  value: '',
  disabled: false,
};

export function SideBarSubListItem(props: SideBarSubListItemProps) {
  const newProps = { ...defaultItemProps, ...props };
  const { Icon, label, onSelected, value, disabled } = newProps;
  const action = useSideBarStore((state) => state.action);
  const id = useGenerateUUID();
  const isSelected = useSideBarStore((state) => state.selectedItem?.id === id);

  useEffect(() => {
    action.subscribe({ id, value, disabled });
    return () => {
      action.unsubscribe(id);
    };
  }, []);

  useEffect(() => {
    action.updateItemState(id, { value, disabled });
  }, [value, disabled]);

  const handleSelectItem = () => {
    action.selectItem({ id });
    onSelected(value);
  };

  const className = classNames('SideBar__SubList__ListItem', {
    ['selected']: isSelected,
  });

  return (
    <li className={className} onClick={handleSelectItem}>
      {Icon} {label}
    </li>
  );
}
