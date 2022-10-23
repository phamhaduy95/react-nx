import { TextField } from '@phduylib/my-component';
import { appApi } from 'apps/todo-app/src/redux/appApi';
import { useNavigate } from 'react-router-dom';
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
    await signIn(loginData)
      .unwrap()
      .then((e) => {
        navigate('/calendar');
      });
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
        <div className="LoginForm__Control">
          <button
            className="LoginForm__SignInButton"
            onClick={handleClickSignIn}
          >
            Log In
          </button>
          <p className="LoginForm__SignUpMessage">
            Not a member? <a>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
