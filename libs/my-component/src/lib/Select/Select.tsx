import { useEffect, useRef } from 'react';
import { SelectPopup } from './SelectPopup';
import './Select.scss';
import classNames from 'classnames';
import { TextFieldProps } from '../TextField';
import { SelectStoreProvider, useSelectStore } from './SelectStoreProvider';
import { SelectTextField } from './SelectTextField';
import { giveIndexToSelectOptions } from './SelectOption';
import {GlobalStyleProvider} from '../GlobalStyleProvider';

export interface SelectProps {
  className?: string;
  children: JSX.Element[] | JSX.Element;
  onSelect?: (value: string) => void;
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  error?: string | false;
  success?: string | false;
  autoWidth?: boolean;
  defaultValue?: string;
  onPopupToggle?: (isOpen: boolean) => void;
}

// change select interface.

const defaultPropsValue: Required<SelectProps> = {
  className: '',
  children: <></>,
  onSelect: (value) => {},
  label: '',
  helperText: null,
  error: false,
  success: false,
  autoWidth: false,
  defaultValue: '',
  onPopupToggle(isOpen) {},
};

export function Select(props: SelectProps) {
  return (
    <SelectStoreProvider>
      <WrappedSelect {...props} />
    </SelectStoreProvider>
  );
}

function WrappedSelect(props: SelectProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const {
    children,
    autoWidth,
    label,
    helperText,
    onSelect,
    className,
    error,
    success,
    defaultValue,
    onPopupToggle,
  } = newProps;
  const textFieldRef = useRef<any>(null);
  const IndexedItems = giveIndexToSelectOptions(children);
  const rootClassName = classNames('Select', className, {
    'auto-width': autoWidth,
  });

  const action = useSelectStore((state) => state.action);

  useEffect(() => {
    const value = defaultValue === '' ? null : defaultValue;
    action.selectItemByValue(value);
  }, [defaultValue]);

  return (
    <GlobalStyleProvider>
      <div className={rootClassName}>
        <SelectTextField
          label={label}
          helperText={helperText}
          success={success}
          error={error}
          ref={textFieldRef}
          onSelect={onSelect}
        />
        <SelectPopup targetRef={textFieldRef} onPopupToggle={onPopupToggle}>
          {IndexedItems}
        </SelectPopup>
      </div>
    </GlobalStyleProvider>
  );
}

export default Select;
