import classNames from 'classnames';
import React from 'react';
import './TextField.scss';

export interface TextFieldProps {
  className?: string | false;
  placeHolder?: string | false;
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
  onEnterPressed?: (value: string) => void;
  onClick?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.FormEvent) => void;
}

const defaultProps: Required<TextFieldProps> = {
  placeHolder: false,
  className: false,
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
  } = newProps;

  const InputFieldClassName = classNames('TextField__InputField', {
    'has-addon-before': addOnBefore,
    'has-addon-after': addOnAfter,
    [`${className}`]: className,
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
    <div className={'TextField'} ref={ref}>
      <label className="TextField__Label">{label}</label>
      <div className="TextField__InputContainer" onClick={onClick}>
        {renderAddonBefore()}
        <div className={InputFieldClassName}>
          {renderPrefix()}
          <input
            className="TextField__Input"
            autoComplete="hidden"
            type="text"
            placeholder={placeHolder ? placeHolder : ''}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
            onFocus={onFocus}
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
