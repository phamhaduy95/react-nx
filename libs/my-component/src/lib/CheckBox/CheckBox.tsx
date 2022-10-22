import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './CheckBox.scss';
import { useEffectSkipFirstRender } from '../../../../../apps/todo-app/src/utils/hooks';
export type CheckBoxProps = {
  isSelected?: boolean;
  onSelected?: (value: string, isSelected: boolean) => void;
  className?: string;
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
};

const defaultProps: Required<CheckBoxProps> = {
  isSelected: false,
  onSelected(value, isSelected) {},
  className: '',
  label: '',
  disabled: false,
  value: '',
};

export function CheckBox(props: CheckBoxProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    isSelected: selectSignal,
    className,
    label,
    onSelected,
    value,
  } = newProps;
  useEffect(() => {
    setSelected(selectSignal);
  }, [selectSignal]);

  const [isSelected, setSelected] = useState(false);
  const rootClassName = classNames('CheckBox', className, {
    ['selected']: isSelected,
  });

  useEffectSkipFirstRender(()=>{
      onSelected(value,isSelected);
  },[isSelected])

  const handleClick = () => {
    setSelected((prev) => !prev);
   
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    const key = e.key;
    switch (key) {
      case 'Enter': {
        setSelected((prev) => !prev);
        return;
      }
    }
  };

  return (
    <div className={rootClassName} tabIndex={0} onKeyDown={handleOnKeyDown}>
      <div className="CheckBox__Box" onClick={handleClick}>
        <div className="CheckBox__BoxInner">&#x2713;</div>
      </div>
      <span className="CheckBox__Label">{label}</span>
    </div>
  );
}
