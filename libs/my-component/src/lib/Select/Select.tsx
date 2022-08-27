import { useMemo, useRef } from 'react';
import { SelectPopup } from './SelectPopup';
import './Select.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames';
import { SelectState } from './reducer';
import {
  SelectContextProvider,
  useSelectContext,
} from './SelectContextProvider';
import { TextField, TextFieldProps } from '../TextField';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

export interface SelectProps {
  children: JSX.Element[] | JSX.Element;
  onSelect?: (value: string) => void;
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  error?: string | false;
  valid?: string | false;
  autoWidth?: boolean;
  defaultValue?: string;
}

const defaultPropsValue: Required<SelectProps> = {
  children: <></>,
  onSelect: (value) => {},
  label: '',
  helperText: null,
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
  const { children, autoWidth, label, helperText, onSelect } = newProps;
  const rootRef = useRef<HTMLDivElement>(null);
  const { state, action } = useSelectContext();
  const { selectedItem, isPopupOpen } = state;
  useEffectSkipFirstRender(() => {
    onSelect(selectedItem.value);
    action.togglePopup(false);
  }, [selectedItem.id]);

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
    <div className={rootClassName} >
      <TextField
        className={'Select__TextField'}
        onClick={handleClickToTogglePopup}
        label={label}
        value={selectedItem.value}
        ref={rootRef}
        suffix={<IconField />}
        autoFocusWhenChanged
        helperText={helperText}
      />
      <SelectPopup targetRef={rootRef} isShowed={state.isPopupOpen}>
        {children}
      </SelectPopup>
    </div>
  );
}

export default Select;
