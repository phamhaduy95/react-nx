import classNames from 'classnames';
import React, {
  HTMLInputTypeAttribute,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import './TextField.scss';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import {GlobalStyleProvider} from '../GlobalStyleProvider';


export type TextFieldProps = {
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
  onValueChange?: (value: string,name?:string) => void;
  onInput?: (e: React.FormEvent) => void;
  onEnterPressed?: (value: string) => void;
  onChange?: (e: React.FormEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.FormEvent) => void;
  onBlur?: (e: React.FormEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  type?: HTMLInputTypeAttribute;
  autocomplete?: string;
  name?: string;
  autoFocusWhenChanged?: boolean;
  error?: string | false;
  success?: string | false;
  typeable?: boolean;
};

const defaultProps: Required<TextFieldProps> = {
  placeHolder: null,
  value: '',
  type: 'text',
  className: null,
  required: false,
  disabled: false,
  label: '',
  autocomplete: 'off',
  name: '',
  labelPosition: 'top',
  helperText: null,
  prefix: null,
  suffix: null,
  addOnBefore: null,
  addOnAfter: null,
  autoFocusWhenChanged: false,
  onValueChange: (value) => {},
  onEnterPressed: (value) => {},
  onClick: (e) => {},
  onFocus: (e) => {},
  onChange(e) {},
  onBlur(e) {},
  onInput(value) {},
  onKeyDown(e) {},
  error: false,
  success: false,
  typeable: true,
};

export const TextField = memo(React.forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
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
      onValueChange,
      onEnterPressed,
      onClick,
      onFocus,
      onInput,
      onChange,
      onBlur,
      disabled,
      autoFocusWhenChanged,
      onKeyDown,
      error,
      success,
      value,
      typeable,
      type,
      name,
      autocomplete,
    } = newProps;
    const inputRef = useRef<HTMLInputElement>(null);
    // the error flag has higher priority than success
    let newSuccess = error ? false : success;
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      setInputValue(value.toString());
    }, [value]);

    useEffectSkipFirstRender(()=>{
       onValueChange(inputValue,name)   
    },[inputValue])

    useEffectSkipFirstRender(() => {
      if (!autoFocusWhenChanged) return;
      const input = inputRef.current as HTMLInputElement;
      if (input === null) return;
      input.focus();
    }, [props.value]);

    const rootClassName = classNames('TextField', {
      [`${className}`]: className,
      disabled: disabled,
      error: error,
      success: newSuccess,
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
      const content = error
        ? error
        : newSuccess
        ? success
        : helperText
        ? helperText
        : false;
      if (content)
        return <div className="TextField__HelperText">{content}</div>;
      return <></>;
    };

    const handleInputChange = (e: React.FormEvent) => {
      if (!typeable) return;
      onChange(e);
      const target = e.target as HTMLInputElement;
      const value = target.value;
      setInputValue(value);
    };

    const handleEnterPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        onEnterPressed(value);
      }
      onKeyDown(e);
    };

    return (
    <GlobalStyleProvider>
      <div className={rootClassName}>
        <label className="TextField__Label">{label}</label>
        <div className="TextField__InputContainer">
          {renderAddonBefore()}
          <div className={inputFieldClassName} onClick={onClick} ref={ref}>
            {renderPrefix()}
            <input
              className="TextField__Input"
              autoComplete={autocomplete}
              name={name}
              placeholder={placeHolder ? placeHolder : ''}
              onChange={handleInputChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onInput={onInput}
              onKeyDown={handleEnterPress}
              value={inputValue}
              disabled={disabled}
              ref={inputRef}
              type={type}
            />
            {renderSuffix()}
          </div>
          {renderAddonAfter()}
        </div>
        {renderHelpText()}
      </div>
      </GlobalStyleProvider>
    );
  }
));

export default TextField;
