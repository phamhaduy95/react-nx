import { LoginSchema } from 'apps/todo-app/src/validation/loginValidation';
import { ErrorMessage } from 'apps/todo-app/src/validation/types';
import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

type LoginErrorMessage = ErrorMessage<LoginSchema> & {
  connection: false | string;
};

type LoginPageState = {
  loginData: LoginSchema;
  errorMessage: LoginErrorMessage;
  action: {
    updateLoginData: (data: Partial<LoginSchema>) => void;
    updateErrorMessage: (error: Partial<LoginErrorMessage>) => void;
    clearErrorMessage: () => void;
  };
};

type ContextValueType = StoreApi<LoginPageState> | null;

const context = createContext<ContextValueType>(null);

const initialErrorMessage: LoginErrorMessage = Object.freeze({
  email: false,
  password: false,
  connection: false,
});

const initialLoginData: LoginSchema = Object.freeze({
  email: 'guest@mail.com',
  password: 'guest',
});

export function LoginPageStoreProvider(props: { children: JSX.Element }) {
  const store = useMemo(
    () =>
      createStore<LoginPageState>((set) => ({
        errorMessage: initialErrorMessage,
        loginData: initialLoginData,
        action: {
          updateErrorMessage(error) {
            set((state) => ({
              errorMessage: { ...state.errorMessage, ...error },
            }));
          },
          updateLoginData(data) {
            set((state) => ({
              loginData: { ...state.loginData, ...data },
            }));
          },
          clearErrorMessage() {
            set(() => ({ errorMessage: initialErrorMessage }));
          },
        },
      })),
    []
  );

  return <context.Provider value={store}>{props.children}</context.Provider>;
}

export function useLoginPageStore<U>(
  selector: (state: LoginPageState) => U,
  equalFunc?: (a: U, b: U) => boolean
) {
  const store = useContext(context);
  if (store === null) throw new Error('LoginPageStore context is null');
  return useStore(store, selector, equalFunc);
}
