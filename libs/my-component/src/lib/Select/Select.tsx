import { useRef } from 'react';
import { SelectPopup } from './SelectPopup';
import './Select.scss';
import classNames from 'classnames';
import { TextFieldProps } from '../TextField';
import { SelectStoreProvider } from './SelectStoreProvider';
import { SelectTextField } from './SelectTextField';
import { giveIndexToSelectOptions } from './SelectOption';

export interface SelectProps {
  className?: string;
  children: JSX.Element[] | JSX.Element;
  onSelect?: (value: string) => void;
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  error?: string | false;
  success?: string | false;
  autoWidth?: boolean;
}

const defaultPropsValue: Required<SelectProps> = {
  className: '',
  children: <></>,
  onSelect: (value) => {},
  label: '',
  helperText: null,
  error: false,
  success: false,
  autoWidth: false,
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
    success,
    error,
  } = newProps;
  const textFieldRef = useRef<any>(null);
  const IndexedItems = giveIndexToSelectOptions(children);
  const rootClassName = classNames('Select', className, {
    'auto-width': autoWidth,
  });
  return (
    <div className={rootClassName}>
      <SelectTextField
        label={label}
        success={success}
        error={error}
        helperText={helperText}
        ref={textFieldRef}
        onSelect={onSelect}
      />
      <SelectPopup targetRef={textFieldRef}>{IndexedItems}</SelectPopup>
    </div>
  );
}

export default Select;
