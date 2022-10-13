import { createContext, useContext, useMemo } from 'react';
import { StoreApi, createStore, useStore } from 'zustand';
import { searchForNextNonDisableItem } from '../utils/highLightedItemState';

type ItemDataType = {
  id: string;
  disabled: boolean;
  value: string;
  label: string;
};

type SelectState = {
  itemList: ItemDataType[];
  highLightedItem: { id: string } | null;
  selectedItem: { id: string } | null;
  isPopupOpen: boolean;
  action: {
    togglePopup: (isOpen: boolean) => void;
    updateItemState: (
      id: string,
      itemState: Partial<Omit<ItemDataType, 'id'>>
    ) => void;
    selectItem: (item: { id: string } | null) => void;
    selectItemByValue: (value: string | null) => void;
    highlightNext: () => void;
    highlightPrev: () => void;
    highlightOne: (id: ItemDataType['id'] | null) => void;
    subscribe: (item: ItemDataType) => void;
    unsubscribe: (id: ItemDataType['id']) => void;
  };
};

type StoreContextValue = {
  store: StoreApi<SelectState>;
} | null;

const StoreContext = createContext<StoreContextValue>(null);

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export function SelectStoreProvider(props: Props) {
  const { children } = props;
  const value = useMemo(() => {
    const store = createStore<SelectState>((set) => ({
      itemList: [],
      highLightedItem: null,
      selectedItem: null,
      isPopupOpen: false,
      action: {
        togglePopup(isOpen) {
          set((state) => ({ isPopupOpen: isOpen }));
        },
        selectItem(item) {
          set((state) => {
            return { selectedItem: item };
          });
        },
        updateItemState(id, itemState) {
          set((state) => {
            const index = state.itemList.findIndex((i) => i.id === id);
            if (index === -1) return {};
            const newList = [...state.itemList];
            const oldItemState = newList[index];
            newList[index] = { ...oldItemState, ...itemState };
            return { itemList: newList };
          });
        },
        selectItemByValue(value) {
          set((state) => {
            if (value === null) return { selectedItem: null };
            const item = state.itemList.find((item) => item.value === value);
            if (item === undefined) return {};
            return { selectedItem: { id: item.id } };
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
            itemList.filter((item) => item.id !== id);
            return { itemList: itemList };
          });
        },
        highlightNext() {
          set((state) => {
            if (state.highLightedItem === null) {
              const newPos = searchForNextNonDisableItem(
                state.itemList,
                -1,
                'acs'
              );
              const newID = state.itemList[newPos].id;
              return { highLightedItem: { id: newID } };
            }

            const hightLightedId = state.highLightedItem.id;
            const oldPos = state.itemList.findIndex(
              (e) => e.id === hightLightedId
            );
            if (oldPos === -1) return {};
            const newPos = searchForNextNonDisableItem(
              state.itemList,
              oldPos,
              'acs'
            );
            const newID = state.itemList[newPos].id;

            return { highLightedItem: { id: newID } };
          });
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
              const newID = state.itemList[newPos].id;
              return { highLightedItem: { id: newID } };
            }
            const hightLightedId = state.highLightedItem.id;
            const oldPos = state.itemList.findIndex(
              (e) => e.id === hightLightedId
            );
            if (oldPos === -1) return {};
            const newPos = searchForNextNonDisableItem(
              state.itemList,
              oldPos,
              'des'
            );
            const newID = state.itemList[newPos].id;
            return { highLightedItem: { id: newID } };
          });
        },
        highlightOne(id) {
          set((state) => {
            if (id === null)
              return {
                highLightedItem: null,
              };
            return { highLightedItem: { id: id } };
          });
        },
      },
    }));
    return { store };
  }, []);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useSelectStore<U>(
  selector: (state: SelectState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('ToggleGroupStore context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}

function updateItemStateWithinItemList(
  id: string,
  itemList: SelectState['itemList'],
  newState: Partial<Omit<SelectState['itemList'][number], 'id'>>
) {
  const index = itemList.findIndex((e) => e.id === id);
  if (index === -1) return;
  const itemToUpdate = { ...itemList[index], ...newState };
  itemList[index] = itemToUpdate;
}
