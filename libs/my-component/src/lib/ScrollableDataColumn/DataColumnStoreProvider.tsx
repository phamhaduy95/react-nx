import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

type DataColumnsState = {
  selectedItem: {
    id: string;
  } | null;
  action: {
    selectItem: (item: DataColumnsState['selectedItem']) => void;
  };
};

type StoreContextValueType = {
  store: StoreApi<DataColumnsState>;
} | null;

const StoreContext = createContext<StoreContextValueType>(null);

type Props = {
  children: JSX.Element;
};

export default function DataColumnStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<DataColumnsState>((set) => ({
      selectedItem: null,
      action: {
        selectItem(item) {
          set((state) => {
            if (item?.id === state.selectedItem?.id) return {};
            return { selectedItem: item };
          });
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useDataColumnStore<U>(
  selector: (state: DataColumnsState) => U,
  equalFunc?: (a: U, b: U) => boolean
):U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error(' store context of DataColumn is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}
