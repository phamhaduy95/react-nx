import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { SignUpSchema } from '../../../validation/signupValidation';
import { ErrorMessage } from '../User/validation';

type SignUpErrorMessage = ErrorMessage<SignUpSchema & { connection: false }>;

type SignUpState = {
  signUpData: SignUpSchema;
  errorMessage: SignUpErrorMessage;
  action: {
    updateLoginData: (data: Partial<SignUpSchema>) => void;
    updateErrorMessage: (error: Partial<SignUpErrorMessage>) => void;
    clearErrorMessage: () => void;
    clearSignUpData: () => void;
  };
};

type ContextValueType = StoreApi<SignUpState> | null;

const context = createContext<ContextValueType>(null);

const initialErrorMessage: SignUpErrorMessage = Object.freeze({
  email: false,
  password: false,
  displayName: false,
  confirmPassword: false,
  connection: false,
});

const initialLoginData: SignUpSchema = Object.freeze({
  displayName: '',
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
