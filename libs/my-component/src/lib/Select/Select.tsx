import { useMemo, useRef } from 'react';
import { SelectPopup } from './SelectPopup';
import './Select.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames';

import { TextField, TextFieldProps } from '../TextField';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { SelectStoreProvider, useSelectStore } from './SelectStoreProvider';
import { useStore } from 'zustand';

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
  const newProps = { ...defaultPropsValue, ...props };

  return (
    <SelectStoreProvider>
      <WrappedSelect {...props} />
    </SelectStoreProvider>
  );
}

function WrappedSelect(props: SelectProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const { children, autoWidth, label, helperText, onSelect } = newProps;
  const rootRef = useRef<HTMLDivElement>(null);
  const store = useSelectStore();
  const action = useStore(store, (state) => state.action);
  const selectedItem = useStore(
    store,
    (state) => state.selectedItem,
    (a, b) => a?.id === b?.id
  );


  useEffectSkipFirstRender(() => {
    if (selectedItem === null) return;
    onSelect(selectedItem.value);
    action.togglePopup(false);
  }, [selectedItem?.id]);

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

  const getInputValue = () => {
    if (selectedItem?.value === undefined) return '';
    return selectedItem.value;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const keyPressed = e.key;
    e.preventDefault();
    switch (keyPressed) {
      case 'ArrowDown': {
        action.togglePopup(true);
        action.hightLightFirstItem();
        return;
      }
      case 'Enter': {
        action.togglePopup(true);
        return;
      }
      case 'Escape': {
        action.togglePopup(false);
        return;
      }
    }
  };

  return (
    <div className={rootClassName} >
      <TextField
        className={'Select__TextField'}
        onClick={handleClickToTogglePopup}
        label={label}
        value={getInputValue()}
        ref={rootRef}
        suffix={<IconField />}
        // autoFocusWhenChanged
        helperText={helperText}
        onKeyDown={handleKeyDown}
      />
      <SelectPopup targetRef={rootRef}>{children}</SelectPopup>
    </div>
  );
}

export default Select;

