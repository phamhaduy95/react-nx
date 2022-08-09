import classNames from 'classnames';
import React from 'react';
import './TextField.scss';

export interface TextFieldProps {
  required?: boolean;
  disabled?: boolean;
  label: string;
  labelPosition?: 'top' | 'inline' | 'hidden';
  helperText?: string | false;
  prefix?: React.ReactNode | false;
  addOnBefore?: React.ReactNode | false;
  addOnAfter?: React.ReactNode | false;
  suffix?: React.ReactNode | false;
  onChange?: (value: string) => void;
  onEnterPressed: (value: string) => void;
}

const defaultProps: Required<TextFieldProps> = {
  required: false,
  disabled: false,
  label: '',
  labelPosition: 'top',
  helperText: false,
  prefix: false,
  suffix: false,
  addOnBefore: false,
  addOnAfter: false,
  onChange: (value) => {},
  onEnterPressed: (value) => {},
};

export function TextField(props: TextFieldProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    label,
    helperText,
    prefix,
    addOnBefore,
    suffix,
    addOnAfter,
    onChange,
    onEnterPressed,
  } = newProps;

  const InputFieldClassName = classNames('TextField__InputField', {
    'has-addon-before': addOnBefore,
    'has-addon-after': addOnAfter,
  });

  const renderAddonBefore = () => {
    if (addOnBefore)
      return <div className="TextField__AddonBefore">{addOnBefore}</div>;
    return <></>;
  };

  const renderPrefix = () => {
    if (prefix) return <div className="TextField__InputPrefix">{prefix}</div>;
    return <></>;
  };

  const renderSuffix = () => {
    if (suffix) return <div className="TextField__InputSuffix">{prefix}</div>;
    return <></>;
  };

  const renderHelpText = () => {
    if (helperText)
      return <div className="TextField__HelperText">{helperText}</div>;
    return <></>;
  };

  const handleInputChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    onChange(value);
  };

  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      onEnterPressed(value);
    }
  };

  return (
    <div className={'TextField'}>
      <label className="TextField__Label">{label}</label>
      <div className="TextField__InputContainer">
        {renderAddonBefore()}
        <div className={InputFieldClassName}>
          {renderPrefix()}
          <input
            className="TextField__Input"
            autoComplete="hidden"
            type="text"
            placeholder="input text"
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
          />
          {renderSuffix()}
        </div>
      </div>
      {renderHelpText()}
    </div>
  );
}

export default TextField;
