import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import shallow from 'zustand/shallow';


type AccordionState = {
  itemList: {id:string,isOpen:boolean}[];
  settings: {
    isAlwaysOpen:boolean;
  }
  action: {
    toggleItem: (item:{id:string,isOpen:boolean}) => void;
    subscribe: (id:string)=>void;
    unsubscribe: (id:string)=>void;
    changeSettings:(setting:AccordionState["settings"])=>void;
  };
};

type StoreContextValue = {
  store: StoreApi<AccordionState>;
} | null;

const StoreContext = createContext<StoreContextValue>(null);

type Props = {
  children: JSX.Element;
};

export default function AccordionStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<AccordionState>((set) => ({
      itemList:[],
      settings:{
        isAlwaysOpen:false,
      },
      action: {
        toggleItem(item) {
            set((state)=>{
                const {id,isOpen} = item;
                const {isAlwaysOpen} = state.settings;
                const itemList = [...state.itemList];
                if (!isAlwaysOpen && isOpen ) {
                  closeAllButOpenOneItem(itemList,id);
                  return {itemList:itemList}
                };
                toggleOneItemSeparately(itemList,id,isOpen);
                return {itemList:itemList}
            })
        },
        changeSettings(setting) {
              set((state)=>{
                  if (shallow(setting,state.settings)) return {};
                  return {settings:setting}
              });
        },
        subscribe(id) {
          set((state)=>{
              const itemList = [...state.itemList];
              itemList.push({id:id,isOpen:false});
              return {itemList:itemList}
          });
        },
        unsubscribe(id) {
          set((state)=>{
            const itemList = [...state.itemList];
              itemList.filter((item)=>item.id !== id);
              return {itemList:itemList}
        });
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useAccordionStore<U>(
  selector: (state: AccordionState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
    const value = useContext(StoreContext);
    if (value === null) throw new Error("Accordion Store context is null");
    const {store} = value;
    return useStore(store,selector,equalFunc);
}

function closeAllButOpenOneItem(itemList:AccordionState["itemList"],openItemId:string){
    for (let item of itemList){
        if (item.id === openItemId) {
          item.isOpen = true
         continue
        }
        item.isOpen = false;
    }
}

function toggleOneItemSeparately(itemList:AccordionState["itemList"],openItemId:string,isOpen:boolean){
  for (let item of itemList){
    if (item.id === openItemId) {
      item.isOpen = isOpen
    }
}
}