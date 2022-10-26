import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { LoginData, LoginErrorsMessage } from './type';

type LoginPageState = {
  loginData: LoginData;
  errorMessage: LoginErrorsMessage;
  action: {
    updateLoginData: (data: Partial<LoginData>) => void;
    updateErrorMessage: (error: Partial<LoginErrorsMessage>) => void;
    clearErrorMessage: () => void;
  };
};

type ContextValueType = StoreApi<LoginPageState> | null;

const context = createContext<ContextValueType>(null);

const initialErrorMessage: LoginErrorsMessage = Object.freeze({
  email: false,
  password: false,
  connection:false,
});

const initialLoginData: LoginData = Object.freeze({
  email: '',
  password: '',
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
