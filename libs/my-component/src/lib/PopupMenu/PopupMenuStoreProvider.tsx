import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { searchForNextNonDisableItem } from '../utils/highLightedItemState';

type PopUpMenuState = {
  itemList: { id: string; disabled: boolean }[];
  highLightedItem: { id: string } | null;
  selectedItem: { id: string } | null;
  isPopupOpen: boolean;
  action: {
    togglePopup: (isOpen: boolean) => void;
    disableItem: (id: PopUpMenuState['itemList'][number]['id']) => void;
    unDisableItem: (id: PopUpMenuState['itemList'][number]['id']) => void;
    selectItem:(id:string)=>void;
    highlightNext: () => void;
    highlightPrev: () => void;
    highlightOne: (
      id: PopUpMenuState['itemList'][number]['id'] | null
    ) => void;
    subscribe: (item: PopUpMenuState['itemList'][number]) => void;
    unsubscribe: (id: PopUpMenuState['itemList'][number]['id']) => void;
  };
};

type StoreContextValue = {
  store: StoreApi<PopUpMenuState>;
} | null;

const StoreContext = createContext<StoreContextValue>(null);

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export function PopupMenuStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<PopUpMenuState>((set) => ({
      itemList: [],
      highLightedItem: null,
      selectedItem: null,
      isPopupOpen: false,
      action: {
        togglePopup(isOpen) {
          set((state) => ({ isPopupOpen: isOpen }));
        },
        selectItem(id){
          set((state) => {
            return {selectedItem:{id}}
          });
        },
        disableItem(id) {
          set((state) => {
            const itemList = [...state.itemList];
            const item = itemList.find((e) => e.id === id);
            if (item === undefined) return {};
            item.disabled = true;
            let newState: any = { itemList: itemList };
            // if item is disabled remove highlight
            if (state.highLightedItem?.id === id) {
              newState = { ...newState, highLightedItem: null };
            }
            // if item is disabled remove select
            if (state.selectedItem?.id === id) {
              newState = { ...newState, selectedItem: null };
            }
            return newState;
          });
        },
        unDisableItem(id) {
          set((state) => {
            const itemList = [...state.itemList];
            const item = itemList.find((e) => e.id === id);
            if (item === undefined) return {};
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
  }, []);

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function usePopupMenuStore<U>(
  selector: (state: PopUpMenuState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('ToggleGroupStore context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}
