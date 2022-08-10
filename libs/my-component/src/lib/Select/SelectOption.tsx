import React from 'react';
export interface SelectOption {
  value: string | number | boolean;
  children?: React.ReactNode | false;
  label?: string | false;
}

const defaultProps: SelectOption = {
  value: 'option 1',
  label: 'option 1',
  children: false,
};

export function SelectOption(props: SelectOption) {
  const newProps = { ...defaultProps, ...props };
  const { children, label, value } = newProps;
  const renderInnerContent = () => {
    if (children) return children;
    return <div className="Select__OptionLabel">{label}</div>;
  };

  return <div className="Select__Option">{renderInnerContent()}</div>;
}
