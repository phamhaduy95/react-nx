import React, { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { Select, SelectOption, useSelectStore } from '@phduylib/my-component';
import './TestPage.scss';
import { v4 as uuidv4 } from 'uuid';
import { useSwitchFocus } from 'libs/my-component/src/lib/utils/hooks';
import { useAppAction, useAppDispatch } from '../../../redux/rootStore';

export function TestPage() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const handleClickModalOpen = () => {
    dispatch(action.AddCategoryModal.toggleOpen(true));
  };

  return (
    <div className={'TestPage'}>
      <button onClick={handleClickModalOpen}>Open Modal</button>
      <Select className="TestSelect">
        <SelectOption value="OK" label="OK" />
        <SelectOption value="1" label="OK" />
        <SelectOption value="1" label="OK" />
        <SelectOption value="1" label="OK" />
        <SelectOption value="1" label="OK" />
        <SelectOption value="1" label="OK" />
        <div className="Select__Divider"></div>
        <SelectExpansion />
      </Select>
    </div>
  );
}

export function SelectExpansion() {
  const id = useMemo(() => uuidv4(), []);
  const action = useSelectStore((state) => state.action);
  const isHighlighted = useSelectStore(
    (state) => state.highLightedItem?.id === id
  );

  const ref = useRef(null);
  useSwitchFocus(ref, isHighlighted);
  useEffect(() => {
    action.subscribe({ id: id, disabled: false, label: '', value: '' });
    return () => {
      action.unsubscribe(id);
    };
  }, []);

  const rootClassName = classNames('Select__Option', 'Select__AddNew', {
    [`is-highlighted`]: isHighlighted,
  });

  const handleMouseEnter = () => {
    action.highlightOne(id);
  };
  const handleMouseLeave = () => {
    action.highlightOne(null);
  };

  return (
    <div
      className={rootClassName}
      tabIndex={-1}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Add category <span>+</span>
    </div>
  );
}
