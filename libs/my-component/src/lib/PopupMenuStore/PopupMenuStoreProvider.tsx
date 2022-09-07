import { createContext, useContext, useEffect, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { searchForNextNonDisableItem } from '../utils/highLightedItemState';

export type PopUpMenuState = {
  itemList: { index: number; disabled: boolean }[];
  selectedItem: { index: number,value:string } | null;
  highLightedItem: { index: number } | null;
  isPopupOpen: boolean;
  action: {
    disableItem: (index: number) => void;
    unDisableItem: (index: number) => void;
    subscribe: (index: number) => void;
    unsubscribe: (index: number) => void;
    selectItem: (item: PopUpMenuState['selectedItem']) => void;
    togglePopup: (isOpen: boolean) => void;
    hightLightItem: (index: PopUpMenuState['highLightedItem']) => void;
    highlightNext: () => void;
    highlightPrev: () => void;
  };
};

type StoreContextValue = {
  store: StoreApi<PopUpMenuState>;
} | null;

const StoreContext = createContext<StoreContextValue>(null);

type StoreContextProps = {
  children: JSX.Element;
};

export function PopUpMenuStoreProvider(props: StoreContextProps) {
  const { children } = props;

  const store = useMemo(() => {
    return createStore<PopUpMenuState>((set) => ({
      selectedItem: null,
      isPopupOpen: false,
      itemList: [],
      highLightedItem: null,
      action: {
        subscribe(index) {
          set((state) => {
            const itemList = [...state.itemList];
            const item: PopUpMenuState['itemList'][number] = {
              index,
              disabled: false,
            };
            itemList.push(item);
            return { itemList: itemList };
          });
        },
        disableItem(index) {
          set((state) => {
            const itemList = [...state.itemList];
            const item = itemList[index];
            item.disabled = true;
            let newState = { itemList: itemList };
            if (state.highLightedItem?.index === index) {
              return { ...newState, highLightedItem: null };
            }
            return newState;
          });
        },
        unDisableItem(index) {
          set((state) => {
            const itemList = [...state.itemList];
            const item = itemList[index];
            item.disabled = false;
            return { itemList: itemList };
          });
        },

        unsubscribe(id) {
          set((state) => {
            const itemList = [...state.itemList];
            itemList.filter((item) => item.index !== id);
            return { itemList: itemList };
          });
        },
        selectItem(item) {
          set((state) => {
            return { selectedItem: item };
          });
        },
        togglePopup(isOpen) {
          set({ isPopupOpen: isOpen });
        },
        highlightNext() {
          set((state) => {
            if (state.highLightedItem === null) {
              const newPos = searchForNextNonDisableItem(
                state.itemList,
                -1,
                'acs'
              );
              return { highLightedItem: { index: newPos } };
            }
            const oldPos = state.highLightedItem.index;
            const newPos = searchForNextNonDisableItem(
              state.itemList,
              oldPos,
              'acs'
            );
            return { highLightedItem: { index: newPos } };
          });
        },
        hightLightItem(id) {
          set({ highLightedItem: id });
        },

        highlightPrev() {
          set((state) => {
            if (state.highLightedItem === null) {
              const oldPos = state.itemList.length;
              const newPos = searchForNextNonDisableItem(
                state.itemList,
                oldPos,
                'des'
              );
              return { highLightedItem: { index: newPos } };
            }
            const oldPos = state.highLightedItem.index;
            const newPos = searchForNextNonDisableItem(
              state.itemList,
              oldPos,
              'des'
            );
            return { highLightedItem: { index: newPos } };
          });
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function usePopUpMenuStore<U>(
  selector: (state: PopUpMenuState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error(' PopUpStore context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}