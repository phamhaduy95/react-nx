import React, { useEffect } from 'react';
import { SelectActionMethod, SelectState, useSelectReducer } from './reducer';

type SelectContextValue = {
  state: SelectState;
  action: SelectActionMethod;
} | null;

const SelectContext = React.createContext<SelectContextValue>(null);

export interface SelectContextProviderProps {
  children: JSX.Element;
  initialState: SelectState;
}

export function SelectContextProvider(props: SelectContextProviderProps) {
  const { children, initialState } = props;
  const { state, action } = useSelectReducer(initialState);

  // update the default value when defaultValue for the Select from initialState is changed
  useEffect(() => {
    const selectedItem = initialState.selectedItem;
    action.selectItem(selectedItem);
  }, [initialState]);

  return (
    <SelectContext.Provider value={{ state, action }}>
      {children}
    </SelectContext.Provider>
  );
}

export function useSelectContext() {
  const value = React.useContext(
    SelectContext
  ) as NonNullable<SelectContextValue>;
  if (value === null) throw new Error('Select Context is null');
  return value;
}
