import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { ErrorsMessage, TaskDataSchema, TaskDataInput } from './types';

export type TaskEditDrawerState = {
  taskData: TaskDataInput;
  errorMessages: ErrorsMessage<TaskDataSchema>;
  isOpen: boolean;
  action: {
    updateTaskData: (taskData: Partial<TaskDataSchema>) => void;
    toggleDrawerOpen: (isOpen: boolean) => void;
    updateErrorMessages: (error: ErrorsMessage<TaskDataSchema>) => void;
    clearErrorMessages: () => void;
  };
};

type ContextValueType = {
  store: StoreApi<TaskEditDrawerState>;
} | null;

const StoreContext = createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
};

const defaultErrorsMessage: TaskEditDrawerState['errorMessages'] =
  Object.freeze({
    title: false,
    category: false,
    description: false,
    endTime: false,
    startTime: false,
  });

export function TaskEditDrawerStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(
    () =>
      createStore<TaskEditDrawerState>((set) => ({
        taskData: {
          taskId: '',
          title: '',
          categoryId: '',
          description: '',
          endTime: null,
          startTime: null,
        },
        isOpen: true,
        errorMessages: defaultErrorsMessage,
        action: {
          updateTaskData(partialTaskData) {
            set((state) => ({
              taskData: { ...state.taskData, ...partialTaskData },
            }));
          },
          toggleDrawerOpen(isOpen) {
            set((state) => ({ isOpen }));
          },
          updateErrorMessages(errorMessages) {
            set((state) => ({ errorMessages }));
          },
          clearErrorMessages() {
            set((state) => ({ errorMessages: defaultErrorsMessage }));
          },
        },
      })),
    []
  );

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useTaskEditDrawerStore<U>(
  selector: (state: TaskEditDrawerState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('TaskEditDrawerStore Context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}
