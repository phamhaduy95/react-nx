import React, { useEffect, useMemo, useRef } from 'react';
import { SelectPopup } from './SelectPopup';
import './Select.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames';

import { SelectState } from './reducer';
import {
  SelectContextProvider,
  useSelectContext,
} from './SelectContextProvider';
import ClickOutSideWatcher from '../ClickOutsideWatcher/ClickOutSideWatcher';
import { TextField } from '../TextField';

export interface SelectProps {
  children: JSX.Element[] | JSX.Element;
  onSelect?: (value: string) => void;
  label?: string | false;
  helperText?: string | false;
  error?: string | false;
  valid?: string | false;
  autoWidth?: boolean;
  defaultValue?: string;
}

const defaultPropsValue: Required<SelectProps> = {
  children: <></>,
  onSelect: (value) => {},
  label: false,
  helperText: false,
  error: false,
  valid: false,
  autoWidth: false,
  defaultValue: '',
};

export function Select(props: SelectProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const { defaultValue } = newProps;
  const initialState: SelectState = useMemo(() => {
    return {
      isPopupOpen: false,
      selectedItem: {
        id: '',
        value: defaultValue,
      },
    };
  }, [defaultValue]);

  return (
    <SelectContextProvider initialState={initialState}>
      <WrappedSelect {...props} />
    </SelectContextProvider>
  );
}

function WrappedSelect(props: SelectProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const { children, autoWidth, label, helperText,onSelect } = newProps;
  const rootRef = useRef<HTMLDivElement>(null);
  const { state, action } = useSelectContext();
  const { selectedItem, isPopupOpen } = state;
  useEffect(()=>{
    onSelect(selectedItem.value);
    action.togglePopup(false)
  },[selectedItem.id])
 
  const rootClassName = classNames('Select', {
    'auto-width': autoWidth,
  });



  const IconField = () => {
    return (
      <div className="Select__ArrowIcon">
        <KeyboardArrowDownIcon />
      </div>
    );
  };

  const handleClickToTogglePopup = () => {
    action.togglePopup(true);
  };




  return (
    <div className={rootClassName}>
      <TextField
        className={'Select__TextField'}
        label=""
        onClick={handleClickToTogglePopup}
        value={selectedItem.value}
        ref={rootRef}
        suffix={<IconField/>}
      />

      <SelectPopup targetRef={rootRef} isShowed={state.isPopupOpen}>
        {children}
      </SelectPopup>
    </div>
  );
}

export default Select;
