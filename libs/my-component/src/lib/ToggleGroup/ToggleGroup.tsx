import { useEffect } from 'react';

import { giveIndexToGroupItems } from './ToggleGroupItem';
import './ToggleGroup.scss';
import {
  ToggleGroupStoreProvider,
  useToggleGroupStore,
} from './ToggleGroupStoreProvider';
import { ToggleGroupSharedDataContextProvider } from './SharedDataContextProvider';
import {GlobalStyleProvider} from '../GlobalStyleProvider';
export type ToggleGroupProps = {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  /** the callback function triggered when there is new active item. It wont triggered when multiple is set true */
  onChange?: (value: string) => void;
  /** if true then it allows multiple active item at once*/
  mode?: 'single' | 'multi';
  disabled?: boolean;
};

const defaultProps: Required<ToggleGroupProps> = {
  children: <></>,
  className: '',
  onChange(activeIndex) {},
  mode: 'single',
  disabled: false,
};

export function ToggleGroup(props: ToggleGroupProps) {
  const newProps = { ...defaultProps, ...props };
  const { onChange } = newProps;
  return (
    <GlobalStyleProvider>
      <ToggleGroupStoreProvider>
        <ToggleGroupSharedDataContextProvider onChange={onChange}>
          <WrappedToggleGroup {...props} />
        </ToggleGroupSharedDataContextProvider>
      </ToggleGroupStoreProvider>
    </GlobalStyleProvider>
  );
}

/**
 * The Wrapped component for ButtonBox so that it can access to the context value of ComboBoxContext.
 */
function WrappedToggleGroup(props: ToggleGroupProps) {
  const newProps = { ...defaultProps, ...props };
  const { children, className, onChange, disabled, mode } = newProps;
  const action = useToggleGroupStore((state) => state.action);
  useEffect(() => {
    action.changeSettings({ mode });
  }, [mode]);
  const indexItems = giveIndexToGroupItems(children);
  return <div className={`ToggleGroup ${className}`}>{indexItems}</div>;
}
