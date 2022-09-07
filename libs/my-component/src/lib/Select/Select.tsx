import { useRef } from 'react';
import { SelectPopup } from './SelectPopup';
import './Select.scss';
import classNames from 'classnames';
import { TextFieldProps } from '../TextField';
import { SelectStoreProvider } from './SelectStoreProvider';
import { SelectTextField } from './SelectTextField';
import { giveIndexToSelectOptions } from './SelectOption';

export interface SelectProps {
  children: JSX.Element[] | JSX.Element;
  onSelect?: (value: string) => void;
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  error?: string | false;
  valid?: string | false;
  autoWidth?: boolean;
}

const defaultPropsValue: Required<SelectProps> = {
  children: <></>,
  onSelect: (value) => {},
  label: '',
  helperText: null,
  error: false,
  valid: false,
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
  const { children, autoWidth, label, helperText,onSelect } = newProps;
  const rootRef = useRef<HTMLDivElement>(null);
  const IndexedItems = giveIndexToSelectOptions(children);
  const rootClassName = classNames('Select', {
    'auto-width': autoWidth,
  });
  return (
    <div className={rootClassName}>
      <SelectTextField label={label} helperText={helperText} ref={rootRef} onSelect={onSelect} />
      <SelectPopup targetRef={rootRef}>{IndexedItems}</SelectPopup>
    </div>
  );
}

export default Select;
