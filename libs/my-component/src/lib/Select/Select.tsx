import React, { useMemo, useRef } from 'react';
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
  const { children, autoWidth, label, helperText } = newProps;
  const rootRef = useRef<HTMLDivElement>(null);
  const { state, action } = useSelectContext();
  const { selectedItem, isPopupOpen } = state;

  const renderLabel = () => {
    if (label) return <div className="Select__Label">{label}</div>;
    return <></>;
  };

  const renderHelperText = () => {
    if (helperText)
      return <div className="Select__HelperText">{helperText}</div>;
    return <></>;
  };

  const SelectValueClassName = classNames('Select__Value', {
    'auto-width': autoWidth,
  });

  const handleClickToTogglePopup = () => {
    action.togglePopup(!isPopupOpen);
  };

  const handleClickOutSide = ()=>{
    action.togglePopup(false)
  }

  return (
    <ClickOutSideWatcher ref={rootRef} onClickOutSide={handleClickOutSide } >
    <div className="Select">
      {renderLabel()}
     
      <div
        className="Select__Field"
        ref={rootRef}
        tabIndex={0}
        onClick={handleClickToTogglePopup}
      >
        {/* <div className="Select__Prefix"></div> */}
        <div className={SelectValueClassName}>{selectedItem.value}</div>
        <div className="Select__ArrowIcon">
          <KeyboardArrowDownIcon />
        </div>
      </div>
      {renderHelperText()}
      <SelectPopup targetRef={rootRef} isShowed={isPopupOpen}>
        {children}
      </SelectPopup>
    </div>
    </ClickOutSideWatcher>
  );
}

export default Select;
