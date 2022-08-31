import { createContext, useContext } from 'react';
import { createStore, StoreApi } from 'zustand';

export type SelectState = {
  selectedItem: {
    value: string;
    id: string;
  } | null;
  itemList: string[];
  highLightedItem: string | null;
  isPopupOpen: boolean;
  action: {
    subscribe: (id: string) => void;
    unsubscribe: (id: string) => void;
    selectItem: (item: SelectState['selectedItem']) => void;
    togglePopup: (isOpen: boolean) => void;
    hightLightItem: (id: SelectState['highLightedItem']) => void;
    hightLightNextItem: () => void;
    hightLightPreviousItem: () => void;
    hightLightFirstItem: () => void;
  };
};

type StoreContextValue = {
  store: StoreApi<SelectState>;
} | null;

const StoreContext = createContext<StoreContextValue>(null);

type StoreContextProps = {
  children: JSX.Element;
};

export function SelectStoreProvider(props: StoreContextProps) {
  const { children } = props;
  const store = createStore<SelectState>((set) => ({
    selectedItem: null,
    isPopupOpen: false,
    itemList: [],
    highLightedItem: null,
    action: {
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
      selectItem(item) {
        set((state) => {
          if (item?.id === state.selectedItem?.id) return state;
          return { selectedItem: item };
        });
      },
      togglePopup(isOpen) {
        set({ isPopupOpen: isOpen });
      },
      hightLightFirstItem() {
        set((state) => {
          const firstItemId = state.itemList[0];
          return { highLightedItem: firstItemId };
        });
      },
      hightLightItem(id) {
        set({ highLightedItem: id });
      },
      hightLightNextItem() {
        set((state) => {
          const currItem = state.highLightedItem;
          if (currItem === null) return state;
          const currPos = state.itemList.findIndex((e) => e === currItem);
          const nextPos =
            currPos + 1 > state.itemList.length - 1 ? 0 : currPos + 1;
          return { highLightedItem: state.itemList[nextPos] };
        });
      },
      hightLightPreviousItem() {
        set((state) => {
          const currItem = state.highLightedItem;
          if (currItem === null) return state;
          const currPos = state.itemList.findIndex((e) => e === currItem);
          const previousPos =
            currPos - 1 < 0 ? state.itemList.length - 1 : currPos - 1;
          return { highLightedItem: state.itemList[previousPos] };
        });
      },
    },
  }));

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useSelectStore() {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('store context is null');
  const { store } = value;
  return store;
}
