import React, { createContext, useContext, useMemo } from 'react';
import { StoreApi, createStore } from 'zustand';

type DropDownState = {
  highLightedItem: string | null;
  itemList: string[];
  isPopupOpen: boolean;
  action: {
    changeHighLightItem: (id: DropDownState['highLightedItem']) => void;
    togglePopup: (isOpen: DropDownState['isPopupOpen']) => void;
    subscribe: (id: string) => void;
    unsubscribe: (id: string) => void;
    hightLightNextItem: () => void;
    hightLightPreviousItem: () => void;
    hightLightFirstItem: () => void;
  };
};

type ContextValue = {
  store: StoreApi<DropDownState>;
} | null;

const storeContext = createContext<ContextValue>(null);

type DropDownStoreProviderProps = {
  children: JSX.Element;
};

export function DropDownStoreProvider(props: DropDownStoreProviderProps) {
  const store = useMemo(() => {
    return createStore<DropDownState>((set) => ({
      highLightedItem: null,
      itemList: [],
      isPopupOpen: false,
      action: {
        togglePopup(isOpen) {
          set({ isPopupOpen: isOpen });
        },
        changeHighLightItem(id) {
          set({ highLightedItem: id });
        },

        subscribe(id) {
          set((state) => {
            const newList = [...state.itemList];
            newList.push(id);
            return { itemList: newList };
          });
        },
        unsubscribe(id) {
          set((state) => {
            const newList = [...state.itemList];
            newList.filter((e) => e !== id);
            return { itemList: newList };
          });
        },
        hightLightNextItem() {
          set((state) => {
            const currItem = state.highLightedItem;
            if (currItem === null)
              return { highLightedItem: state.itemList[0] };
            const currPos = state.itemList.findIndex((e) => e === currItem);
            const nextPos =
              currPos + 1 > state.itemList.length - 1 ? 0 : currPos + 1;

            return { highLightedItem: state.itemList[nextPos] };
          });
        },
        hightLightPreviousItem() {
          set((state) => {
            const currItem = state.highLightedItem;
            if (currItem === null)
              return { highLightedItem: state.itemList[0] };
            const currPos = state.itemList.findIndex((e) => e === currItem);
            const previousPos =
              currPos - 1 < 0 ? state.itemList.length - 1 : currPos - 1;

            return { highLightedItem: state.itemList[previousPos] };
          });
        },
        hightLightFirstItem() {
          set((state) => {
            const firstItemId = state.itemList[0];
            return { highLightedItem: firstItemId };
          });
        },
      },
    }));
  }, []);

  return (
    <storeContext.Provider value={{ store }}>
      {props.children}
    </storeContext.Provider>
  );
}

export function useDropDownStore() {
  const value = useContext(storeContext);
  if (value === null) throw new Error('');
  const { store } = value;
  return store;
}
