import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { SignUpData, ErrorsMessage } from './type';

type SignUpState = {
  signUpData: SignUpData;
  errorMessage: ErrorsMessage;
  action: {
    updateLoginData: (data: Partial<SignUpData>) => void;
    updateErrorMessage: (error: Partial<ErrorsMessage>) => void;
    clearErrorMessage: () => void;
    clearSignUpData: () => void;
  };
};

type ContextValueType = StoreApi<SignUpState> | null;

const context = createContext<ContextValueType>(null);

const initialErrorMessage: ErrorsMessage = Object.freeze({
  email: false,
  password: false,
  userName: false,
  confirmPassword: false,
  connection:false,
});

const initialLoginData: SignUpData = Object.freeze({
  userName: '',
  email: '',
  confirmPassword: '',
  password: '',
});

export function SignUpPageStoreProvider(props: { children: JSX.Element }) {
  const store = useMemo(
    () =>
      createStore<SignUpState>((set) => ({
        errorMessage: initialErrorMessage,
        signUpData: initialLoginData,
        action: {
          updateErrorMessage(error) {
            set((state) => {
              const { errorMessage } = state;
              const newError = { ...errorMessage, ...error };
              return { errorMessage: newError };
            });
          },
          updateLoginData(data) {
            set((state) => ({
              signUpData: { ...state.signUpData, ...data },
            }));
          },
          clearErrorMessage() {
            set((state) => {
              return { errorMessage: initialErrorMessage };
            });
          },
          clearSignUpData() {
            set((state) => {
              return { signUpData: initialLoginData };
            });
          },
        },
      })),
    []
  );

  return <context.Provider value={store}>{props.children}</context.Provider>;
}

export function useSignUpPageStore<U>(
  selector: (state: SignUpState) => U,
  equalFunc?: (a: U, b: U) => boolean
) {
  const store = useContext(context);
  if (store === null) throw new Error('SignUpPageStore context is null');
  return useStore(store, selector, equalFunc);
}
