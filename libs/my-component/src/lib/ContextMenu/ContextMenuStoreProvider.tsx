import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { searchForNextNonDisableItem } from '../utils/highLightedItemState';

type ContextMenuState = {
  itemList: { index: number; disabled: boolean }[];
  highLightedItem: { index: number } | null;
  isPopupOpen: boolean;
  action: {
    togglePopup: (isOpen: boolean) => void;
    disableItem: (index: number) => void;
    unDisableItem: (index: number) => void;
    highlightNext: () => void;
    highlightPrev: () => void;
    highlightOne: (index: number | null) => void;
    subscribe: (index: ContextMenuState['itemList'][number]) => void;
    unsubscribe: (index: number) => void;
  };
};

type StoreContextValue = {
  store: StoreApi<ContextMenuState>;
} | null;

const StoreContext = createContext<StoreContextValue>(null);

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export function ContextMenuStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<ContextMenuState>((set) => ({
      itemList: [],
      highLightedItem: null,
      isPopupOpen: false,
      action: {
        togglePopup(isOpen) {
          set((state) => ({ isPopupOpen: isOpen }));
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
        subscribe(item) {
          set((state) => {
            const itemList = [...state.itemList];
            itemList.push(item);
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
        highlightNext() {
          set((state) => {
            if (state.highLightedItem === null) {
              const newPos = searchForNextNonDisableItem(state.itemList,-1,"acs");
              return {highLightedItem:{index:newPos}}
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
        highlightPrev() {
          set((state) => {
     
            if (state.highLightedItem === null) {
              const oldPos = state.itemList.length;
              const newPos = searchForNextNonDisableItem(state.itemList,oldPos,"des");
              return {highLightedItem:{index:newPos}}
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
        highlightOne(index) {
          set((state) => {
            if (index === null)
              return {
                highLightedItem: null,
              };
            return { highLightedItem: { index: index } };
          });
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useContextMenuStore<U>(
  selector: (state: ContextMenuState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('ToggleGroupStore context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}

