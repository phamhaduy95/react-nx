import { Button, LoadingButton, TextField } from '@phduylib/my-component';
import {
  SignUpPageStoreProvider,
  useSignUpPageStore,
} from './SignUpStoreProvider';
import shallow from 'zustand/shallow';
import { validateSignUpData } from './SignUpValidation';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.scss';
import { appApi } from 'apps/todo-app/src/redux/appApi';
import { useEffect } from 'react';
export function SignUpPage() {
  return (
    <SignUpPageStoreProvider>
      <WrappedSignUpPage />
    </SignUpPageStoreProvider>
  );
}

function WrappedSignUpPage() {
  const navigate = useNavigate();
  const errorMessages = useSignUpPageStore(
    (state) => state.errorMessage,
    shallow
  );

  const signUpData = useSignUpPageStore((state) => state.signUpData, shallow);
  const action = useSignUpPageStore((state) => state.action);
  const [signUp, signUpResult] = appApi.useSignUpMutation();

  useEffect(() => {
    if (!signUpResult.isError) return;
    const error = signUpResult.error as FetchBaseQueryError;
    switch (error.status) {
      case 'FETCH_ERROR': {
        action.updateErrorMessage({ connection: 'fail to connect to server!' });
        return;
      }
      case 400: {
        action.updateErrorMessage({ email: 'email is used' });
        return;
      }
    }
  }, [signUpResult]);

  useEffect(() => {
    if (signUpResult.isSuccess) {
      signUpResult.reset();
      navigate('/');
    }
  }, [signUpResult]);

  const connectionErrMessage = errorMessages.connection
    ? errorMessages.connection
    : '';

  const handleNameInput = (value: string) => {
    action.updateLoginData({ displayName: value });
  };

  const handleEmailInput = (value: string) => {
    action.updateLoginData({ email: value });
  };

  const handlePasswordInput = (value: string) => {
    action.updateLoginData({ password: value });
  };

  const handleConfirmPasswordInput = (value: string) => {
    action.updateLoginData({ confirmPassword: value });
  };


  const handleSubmitButtonClick = async () => {
    const { result, error } = await validateSignUpData(signUpData);

    if (result) {
      action.clearErrorMessage();
      signUp(signUpData);
      return;
    }
    action.updateErrorMessage(error);
  };

  const handleClearButtonClick = () => {
    action.clearErrorMessage();
    action.clearSignUpData();
  };

  return (
    <div className="SignUpPage">
      <div className="SignUpForm">
        <div className="SignUpForm__Title">Create new account</div>
        <TextField
          className="SignUpForm__Input"
          label="user Name"
          placeHolder={'PhamVanA'}
          value={signUpData.displayName}
          onValueChange={handleNameInput}
          error={errorMessages.displayName}
        />
        <TextField
          className="SignUpForm__Input"
          label="email"
          placeHolder={'PhamVanA@gmail.com'}
          value={signUpData.email}
          onValueChange={handleEmailInput}
          error={errorMessages.email}
        />
        <TextField
          className="SignUpForm__Input"
          label="password"
          type="password"
          value={signUpData.password}
          onValueChange={handlePasswordInput}
          error={errorMessages.password}
        />
        <TextField
          className="SignUpForm__Input"
          label="confirm Password"
          type="password"
          value={signUpData.confirmPassword}
          onValueChange={handleConfirmPasswordInput}
          error={errorMessages.confirmPassword}
        />
        <div className="SignUpForm__ConnectionErrorMessage">
          {connectionErrMessage}
        </div>

        <div className="SignUpForm__ButtonBox">
          <LoadingButton
            className="SignUpForm__SubmitButton"
            onClick={handleSubmitButtonClick}
            isLoading={signUpResult.isLoading}
          >
            Sign Up
          </LoadingButton>
          <Button
            className="SignUpForm__ClearButton"
            onClick={handleClearButtonClick}
            disabled={signUpResult.isLoading}
            type="outlined"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
