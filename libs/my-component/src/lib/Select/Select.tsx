import React, { useRef } from 'react';
import { SelectPopup } from './SelectPopup';
import "./Select.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface SelectProps {
  children: JSX.Element[] | JSX.Element;
  onSelect?: (value: string) => void;
  label?: string | false;
  helperText?: string | false;
  error?: string | false;
  valid?: string | false;
  autoWidth?: boolean;
}

const defaultPropsValue: Required<SelectProps> = {
  children: <></>,
  onSelect: (value) => {},
  label: false,
  helperText: false,
  error: false,
  valid: false,
  autoWidth: true,
};

export function Select(props: SelectProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const { children } = newProps;
  const rootRef = useRef<HTMLElement>(null);
  return (
    <div className="Select">
      <div className="Select__Field" tabIndex={0}>
        {/* <div className="Select__Prefix"></div> */}
        <div className="Select__Value" >1234</div>
        <div className="Select__ArrowIcon">
            <KeyboardArrowDownIcon/>
        </div>
      </div>
      {/* <SelectPopup targetRef={rootRef} isShowed>
        {children}
      </SelectPopup> */}
    </div>
  );
}

export default Select;
