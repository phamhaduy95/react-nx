import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import shallow from 'zustand/shallow';

type ButtonGroupState = {
  itemList: { index: number; isSelected: boolean; disabled: boolean }[];
  highLightedItem: { index: number } | null;
  settings: {
    mode: 'single' | 'multi';
  };
  action: {
    toggleItem: (item: {index:number,isSelected:boolean}) => void;
    disableItem:(index:number)=>void;
    highlightNext: () => void;
    highlightPrev: () => void;
    highlightOne: (index: number) => void;
    subscribe: (index: ButtonGroupState['itemList'][number]) => void;
    unsubscribe: (index: number) => void;
    changeSettings: (setting: ButtonGroupState['settings']) => void;
  };
};

type StoreContextValue = {
  store: StoreApi<ButtonGroupState>;
} | null;

const StoreContext = createContext<StoreContextValue>(null);

type Props = {
  children: JSX.Element[]|JSX.Element;
};

export function ButtonGroupStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<ButtonGroupState>((set) => ({
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
                  return {itemList:itemList};
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
            const numberOfItem = state.itemList.length;
            const newPos = limitNumberInRange(oldPos + 1, {
              min: 0,
              max: numberOfItem - 1,
            });
            if (state.itemList[newPos].disabled) return {};
            return { highLightedItem: { index: newPos } };
          });
        },
        highlightPrev() {
          set((state) => {
            if (state.highLightedItem === null) return {};
            const numberOfItem = state.itemList.length;
            const oldPos = state.highLightedItem.index;
            const newPos = limitNumberInRange(oldPos - 1, {
              min: 0,
              max: numberOfItem - 1,
            });
            if (state.itemList[newPos].disabled) return {};
            return { highLightedItem: { index: newPos } };
          });
        },
        highlightOne(index) {
          set((state) => {
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

export function useButtonGroupStore<U>(
  selector: (state: ButtonGroupState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('ButtonGroup Store context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}

function closeAllButOpenOneItem(
  itemList: ButtonGroupState['itemList'],
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
  itemList: ButtonGroupState['itemList'],
  openItemId: number,
  isOpen: boolean
) {
  for (let item of itemList) {
    if (item.index === openItemId) {
      item.isSelected = isOpen;
    }
  }
}

/** make input number equal to min when it is larger than max and equal to max when it is smaller than min, otherwise keep its value */
function limitNumberInRange(
  number: number,
  range: { min: number; max: number }
) {
  const { max, min } = range;
  if (number > max) return max;
  if (number < min) return min;
  return number;
}
