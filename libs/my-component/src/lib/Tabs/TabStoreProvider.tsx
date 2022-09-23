import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

type TabState = {
  selectedTab: { index: number };
  highlightedTab: { index: number } | null;
  numberOfTabs: number;
  action: {
    subscribe: () => void;
    unsubscribe: () => void;
    selectTab: (index: number) => void;
    highlightNextTab: () => void;
    highlightPrevTab: () => void;
    highlightTab: (index: number) => void;
  };
};

type StoreContextValueType = StoreApi<TabState> | null;

const StoreContext = createContext<StoreContextValueType>(null);

type Props = {
  children: JSX.Element;
};

export function TabStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(() => {
    return createStore<TabState>((set) => ({
      selectedTab: { index: 0 },
      highlightedTab: null,
      numberOfTabs: 0,
      action: {
        subscribe() {
          set((state) => {
            const numberOfTabs = state.numberOfTabs + 1;
            if (numberOfTabs === 1) {
              return { numberOfTabs, selectedTab: { index: 0 } };
            }
            return { numberOfTabs };
          });
        },
        unsubscribe() {
          set((state) => ({ numberOfTabs: state.numberOfTabs - 1 }));
        },
        highlightNextTab() {
          set((state) => {
            if (state.highlightedTab === null) return {};
            const oldPos = state.highlightedTab.index;
            const newPos = limitNumberInRange(oldPos + 1, {
              min: 0,
              max: state.numberOfTabs - 1,
            });
            return { highlightedTab: { index: newPos } };
          });
        },
        highlightPrevTab() {
          set((state) => {
            if (state.highlightedTab === null) return {};
            const oldPos = state.highlightedTab.index;
            const newPos = limitNumberInRange(oldPos - 1, {
              min: 0,
              max: state.numberOfTabs - 1,
            });
            return { highlightedTab: { index: newPos } };
          });
        },
        highlightTab(index) {
          set((state) => {
            return { highlightedTab: { index: index } };
          });
        },
        selectTab(index) {
          set((state) => {
            return { selectedTab: { index: index } };
          });
        },
      },
    }));
  }, []);

  return (
    <StoreContext.Provider value={ store }>{children}</StoreContext.Provider>
  );
}

export function useTabStore<U>(
  selector: (state: TabState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error(' store context of DataColumn is null');
  const store  = value;
  return useStore(store, selector, equalFunc);
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
