import { TextField } from '@phduylib/my-component';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SpinnerV2 } from 'apps/todo-app/src/components/Spinner/Spinner';
import { appApi } from 'apps/todo-app/src/redux/appApi';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';

import './LoginPage.scss';
import {  
  LoginPageStoreProvider,
  useLoginPageStore,
} from './LoginPageStoreProvider';
import { validateLoginData } from './loginValidation';

export function LoginPage() {
  return (
    <LoginPageStoreProvider>
      <WrappedLoginPage />
    </LoginPageStoreProvider>
  );
}

function WrappedLoginPage() {
  const [signIn, signInResult] = appApi.useSignInMutation();
  const navigate = useNavigate();
  const action = useLoginPageStore((state) => state.action);
  const loginData = useLoginPageStore((state) => state.loginData, shallow);
  const errorMessage = useLoginPageStore(
    (state) => state.errorMessage,
    shallow
  );

  useEffect(() => {
    if (!signInResult.isError) return;
    const error = signInResult.error as FetchBaseQueryError;
    debugger
    console.log(error)
    switch (error.status) {
      case "FETCH_ERROR":{
        action.updateErrorMessage({connection:"Fail to connect to server !"});
        return;
      }
      case 404: {
        action.updateErrorMessage({ email: 'email not found' });
        return;
      }
      case 400: {
        action.updateErrorMessage({ password: 'wrong password' });
        return;
      }
    }
  }, [signInResult]);


  useEffect(() => {
    if (!signInResult.isSuccess) return;
    navigate('/');
  }, [signInResult]);

  const submitButtonText = signInResult.isLoading ? 'Signing in...' : 'Sign In';
  const LoadingSpinner = signInResult.isLoading ? (
    <SpinnerV2 className="LoginForm__Spinner" />
  ) : (
    <></>
  );

  const connectionErrorMessage = (errorMessage.connection)?errorMessage.connection:"";

  const handleEmailInputChange = (value: string) => {
    action.updateLoginData({ email: value });
  };

  const handlePasswordInputChange = (value: string) => {
    action.updateLoginData({ password: value });
  };

  const handleClickSignIn = async () => {
    const { result, error } = await validateLoginData(loginData);
    if (!result) {
      action.updateErrorMessage(error);
      return;
    }
    action.clearErrorMessage();
    await signIn(loginData);
  };

  return (
    <div className="LoginPage">
      <div className="LoginForm">
        <div className="LoginForm__Title">Account Login</div>
        <TextField
          label="email"
          className="LoginForm__EmailInput"
          placeHolder="type your email"
          value={loginData.email}
          onValueChange={handleEmailInputChange}
          error={errorMessage.email}
        />
        <TextField
          label="password"
          className="LoginForm__PasswordInput"
          placeHolder="type your password"
          type="password"
          value={loginData.password}
          onValueChange={handlePasswordInputChange}
          error={errorMessage.password}
        />
        <div className='LoginForm__ConnectionErrorMessage'>{connectionErrorMessage}</div>
        <div className="LoginForm__Control">
          <button
            className="LoginForm__SignInButton"
            onClick={handleClickSignIn}
            disabled={signInResult.isLoading}
          >
            {submitButtonText}
            {LoadingSpinner}
          </button>
          <p className="LoginForm__SignUpMessage">
            Not a member? <Link to="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
