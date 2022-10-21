import { TextField } from '@phduylib/my-component';
import React from 'react';
import './LoginPage.scss';
export function LoginPage() {
  return (
    <div className="LoginPage">
      <div className="LoginForm">
        <div className="LoginForm__Title">Account Login</div>
        <TextField
          label="email"
          className="LoginForm__EmailInput"
          placeHolder="type your email"
        />
        <TextField
          label="password"
          className="LoginForm__PasswordInput"
          placeHolder="type your password"
        />
        <div className="LoginForm__Control">
          <button className="LoginForm__SignInButton">Log In</button>
          <p className='LoginForm__SignUpMessage'>Not a member? <a>Sign up</a></p>
        </div>
      </div>
    </div>
  );
}
