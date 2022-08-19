import classNames from 'classnames';
import React, { HTMLInputTypeAttribute } from 'react';
import './TextField.scss';

export interface TextFieldProps {
  className?: string | null;
  placeHolder?: string | null;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  label: string;
  labelPosition?: 'top' | 'inline' | 'hidden';
  helperText?: string | null;
  prefix?: React.ReactNode | null;
  addOnBefore?: React.ReactNode | null;
  addOnAfter?: React.ReactNode | null;
  suffix?: React.ReactNode | null;
  onChange?: (value: string) => void;
  onEnterPressed?: (value: string) => void;
  onClick?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.FormEvent) => void;
  type?: HTMLInputTypeAttribute;
}

const defaultProps: Required<TextFieldProps> = {
  placeHolder: null,
  value: '',
  type: 'text',
  className: null,
  required: false,
  disabled: false,
  label: '',
  labelPosition: 'top',
  helperText: null,
  prefix: null,
  suffix: null,
  addOnBefore: null,
  addOnAfter: null,
  onChange: (value) => {},
  onEnterPressed: (value) => {},
  onClick: (e) => {},
  onFocus: (e) => {},
};

export const TextField = React.forwardRef<any, TextFieldProps>((props, ref) => {
  const newProps = { ...defaultProps, ...props };
  const {
    className,
    placeHolder,
    label,
    helperText,
    prefix,
    addOnBefore,
    suffix,
    addOnAfter,
    onChange,
    onEnterPressed,
    onClick,
    onFocus,
    type,
    disabled,
  } = newProps;

  const rootClassName = classNames('TextField', {
    [`${className}`]: className,
    disabled: disabled,
  });

  const inputFieldClassName = classNames('TextField__InputField', {
    'has-addon-before': addOnBefore,
    'has-addon-after': addOnAfter,
  });

  const renderAddonBefore = () => {
    if (addOnBefore)
      return <div className="TextField__AddonBefore">{addOnBefore}</div>;
    return <></>;
  };

  const renderAddonAfter = () => {
    if (addOnAfter)
      return <div className="TextField__AddonAfter">{addOnAfter}</div>;
    return <></>;
  };

  const renderPrefix = () => {
    if (prefix) return <div className="TextField__InputPrefix">{prefix}</div>;
    return <></>;
  };

  const renderSuffix = () => {
    if (suffix) return <div className="TextField__InputSuffix">{suffix}</div>;
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
    <div className={rootClassName}>
      <label className="TextField__Label">{label}</label>
      <div className="TextField__InputContainer">
        {renderAddonBefore()}
        <div className={inputFieldClassName} onClick={onClick} ref={ref}>
          {renderPrefix()}
          <input
            className="TextField__Input"
            autoComplete="hidden"
            type="tel"
            placeholder={placeHolder ? placeHolder : ''}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
            onFocus={onFocus}
            value={props.value}
            disabled={disabled}
          />
          {renderSuffix()}
        </div>
        {renderAddonAfter()}
      </div>
      {renderHelpText()}
    </div>
  );
});

export default TextField;
