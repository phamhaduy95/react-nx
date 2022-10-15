import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import shallow from 'zustand/shallow';

type ItemStateType = { index: number; isSelected: boolean; disabled: boolean };

type ToggleGroupState = {
  itemList:ItemStateType[];
  highLightedItem: { index: number } | null;
  settings: {
    mode: 'single' | 'multi';
  };
  action: {
    toggleItem: (item: { index: number; isSelected: boolean }) => void;
    disableItem: (index: number) => void;
    unDisableItem: (index: number) => void;
    highlightNext: () => void;
    highlightPrev: () => void;
    highlightOne: (index: number | null) => void;
    subscribe: (index: ToggleGroupState['itemList'][number]) => void;
    unsubscribe: (index: number) => void;
    changeSettings: (setting: ToggleGroupState['settings']) => void;
  };
};

type StoreContextValue = StoreApi<ToggleGroupState> | null;

const StoreContext = createContext<StoreContextValue>(null);

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export function ToggleGroupStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<ToggleGroupState>((set) => ({
      itemList: [],
      highLightedItem: null,
      settings: {
        mode: 'single',
      },
      action: {
        toggleItem(item) {
          set((state) => {
            const { index, isSelected } = item;
            const { mode } = state.settings;
            const itemList = [...state.itemList];
            if (mode === 'single' && isSelected) {
              closeAllButOpenOneItem(itemList, index);
              return { itemList: itemList };
            }
            toggleOneItemSeparately(itemList, index, isSelected);
            return { itemList: itemList };
          });
        },
        disableItem(index) {
          set((state) => {
            const itemList = [...state.itemList];
            const item = itemList[index];
            item.disabled = true;
            item.isSelected = false;
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
            item.isSelected = false;
            return { itemList: itemList };
          });
        },
        changeSettings(setting) {
          set((state) => {
            if (shallow(setting, state.settings)) return {};
            return { settings: setting };
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
            if (state.highLightedItem === null) return {};
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
            if (state.highLightedItem === null) return {};
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
    <StoreContext.Provider value={ store }>{children}</StoreContext.Provider>
  );
}

export function useToggleGroupStore<U>(
  selector: (state: ToggleGroupState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('ToggleGroupStore context is null');
  const store  = value;
  return useStore(store, selector, equalFunc);
}

function closeAllButOpenOneItem(
  itemList: ToggleGroupState['itemList'],
  openItemId: number
) {
  for (let item of itemList) {
    if (item.index === openItemId) {
      item.isSelected = true;
      continue;
    }
    item.isSelected = false;
  }
}

function toggleOneItemSeparately(
  itemList: ToggleGroupState['itemList'],
  openItemId: number,
  isOpen: boolean
) {
  for (let item of itemList) {
    if (item.index === openItemId) {
      item.isSelected = isOpen;
    }
  }
}

function searchForNextNonDisableItem(
  itemList: ToggleGroupState['itemList'],
  startPos: number,
  dir: 'des' | 'acs'
) {
  if (dir === 'acs') {
    for (let i = startPos + 1; i < itemList.length; i++) {
      console.assert(itemList[i] !== undefined, itemList, i);
      if (itemList[i].disabled) continue;
      return i;
    }
  } else {
    for (let i = startPos - 1; i >= 0; i--) {
      if (itemList[i].disabled) continue;
      return i;
    }
  }
  return startPos;
}
