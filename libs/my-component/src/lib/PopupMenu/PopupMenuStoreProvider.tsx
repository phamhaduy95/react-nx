import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { searchForNextNonDisableItem } from '../utils/highLightedItemState';

type PopUpMenuState = {
  itemList: { id: string; disabled: boolean; value?: string }[];
  highLightedItem: { id: string } | null;
  selectedItem: { id: string } | null;
  isPopupOpen: boolean;
  action: {
    togglePopup: (isOpen: boolean) => void;
    updateItemValue: (id: string, value: string) => void;
    disableItem: (id: PopUpMenuState['itemList'][number]['id']) => void;
    unDisableItem: (id: PopUpMenuState['itemList'][number]['id']) => void;
    selectItem: (item: { id: string } | null) => void;
    selectItemByValue:(value:string|null)=>void,
    highlightNext: () => void;
    highlightPrev: () => void;
    highlightOne: (id: PopUpMenuState['itemList'][number]['id'] | null) => void;
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
  const value = useMemo(() => {
    const store = createStore<PopUpMenuState>((set) => ({
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
        selectItemByValue(value) {
          set((state) => {
            if (value === null) return {selectedItem:null};
            const item = state.itemList.find((item)=>item.value === value);
            if (item === undefined) return {}   
            return {selectedItem: {id:item.id}};
          });
        },
        updateItemValue(id, value) {
          set((state) => {
            const itemList = [...state.itemList];
            updateItemStateWithinItemList(id,itemList,{value})
            return { itemList: itemList,selectedItem:null};
          });
        },
        disableItem(id) {
          set((state) => {
            const itemList = [...state.itemList];
            updateItemStateWithinItemList(id,itemList,{disabled:true})
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
            updateItemStateWithinItemList(id,itemList,{disabled:false});
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
    return { store };
  }, []);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
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

function updateItemStateWithinItemList(
  id: string,
  itemList: PopUpMenuState['itemList'],
  newState:Partial<Omit<PopUpMenuState["itemList"][number],"id">>
) {
  const index = itemList.findIndex((e) => e.id === id);
  if (index === -1) return;
  const itemToUpdate = { ...itemList[index],...newState};
  itemList[index] = itemToUpdate;
}
