import { useEffect } from 'react';

import { giveIndexToGroupItems } from './ButtonGroupItem';
import './ButtonGroup.scss';
import { ButtonGroupStoreProvider, useButtonGroupStore } from './ButtonGroupStoreProvider';
import { ButtonGroupSharedDataContextProvider } from './SharedDataContextProvider';
export type ButtonGroupProps = {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  /** the callback function triggered when there is new active item. It wont triggered when multiple is set true */
  onChange?: (value: string) => void;
  /** if true then it allows multiple active item at once*/
  mode?: 'single' | 'multi';
  disabled?: boolean;
};

const defaultProps: Required<ButtonGroupProps> = {
  children: <></>,
  className: '',
  onChange(activeIndex) {},
  mode: 'single',
  disabled: false,
};

export function ButtonGroup(props: ButtonGroupProps) {
  const newProps = {...defaultProps,...props};
  const { onChange } = newProps;
  return (
    <ButtonGroupStoreProvider>
      <ButtonGroupSharedDataContextProvider onChange={onChange}>
      <WrappedButtonGroup {...props}/>
      </ButtonGroupSharedDataContextProvider>
    </ButtonGroupStoreProvider>
  );
}

/**
 * The Wrapped component for ButtonBox so that it can access to the context value of ComboBoxContext.
 */
function WrappedButtonGroup(props: ButtonGroupProps) {
  const newProps = {...defaultProps,...props};
  const { children, className, onChange, disabled,mode } = newProps;
  const action = useButtonGroupStore((state)=>state.action);
  useEffect(()=>{
    action.changeSettings({mode});
  },[mode])
  const indexItems = giveIndexToGroupItems(children);
  return <div className={`ButtonGroup ${className}`}>{indexItems}</div>;
}



