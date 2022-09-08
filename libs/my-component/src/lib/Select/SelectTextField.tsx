import React, { forwardRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelectStore } from './SelectStoreProvider';
import { SelectProps } from './Select';
import { TextField, TextFieldProps } from '../TextField';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

type SelectTextFieldProps = {
  label: TextFieldProps['label'];
  helperText: TextFieldProps['helperText'];
  onSelect: Required<SelectProps>['onSelect'];
};

export const SelectTextField = forwardRef<
  HTMLElement | null,
  SelectTextFieldProps
>((props, ref) => {
  const { helperText, label, onSelect } = props;
  const action = useSelectStore((state) => state.action);
  const selectedItem = useSelectStore(
    (state) => state.selectedItem,
    (a, b) => a?.id === b?.id
  );

  useEffectSkipFirstRender(() => {
    const value =
      selectedItem === null
        ? ''
        : selectedItem.value === undefined
        ? ''
        : selectedItem.value;
    onSelect(value);
  }, [selectedItem?.id]);

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
        action.highlightNext();
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
    <TextField
      className={'Select__TextField'}
      onClick={handleClickToTogglePopup}
      label={label}
      value={getInputValue()}
      ref={ref}
      suffix={<IconField />}
      helperText={helperText}
      onKeyDown={handleKeyDown}
    />
  );
});
