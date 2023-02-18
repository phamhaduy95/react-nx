import {
  useAppAction,
  useAppDispatch,
} from 'apps/todo-app/src/redux';
import { appApi } from 'apps/todo-app/src/redux/appApi';
import { memo, useCallback, useState, useEffect } from 'react';
import {
  ErrorMessage,
  PasswordInput,
  validatePasswordData,
} from './validation';

import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import {
  Button,
  Collapsible,
  LoadingButton,
  TextField,
} from '@phduylib/my-component';
import { ModalType } from 'apps/todo-app/src/type/model';

const defaultErrorMessage: ErrorMessage<PasswordInput> = Object.freeze({
  confirmPassword: false,
  newPassword: false,
  oldPassword: false,
});

const defaultInputData: PasswordInput = Object.freeze({
  confirmPassword: '',
  newPassword: '',
  oldPassword: '',
});

export const UserPageUpdatePasswordSection = memo(() => {
  const [isExpanded, setExpanded] = useState(false);

  const action = useAppAction();
  const dispatch = useAppDispatch();
  const [changePassword, result] = appApi.useChangePasswordMutation();

  const [inputData, setInputData] = useState<PasswordInput>({
    confirmPassword: '',
    newPassword: '',
    oldPassword: '',
  });

  const [inputErrors, setInputErrors] =
    useState<ErrorMessage<PasswordInput>>(defaultErrorMessage);

  useEffect(() => {
    const { isError, isSuccess } = result;
    const error = result.error as FetchBaseQueryError;

    if (isError) {
      dispatch(action.AppModal.openModal(ModalType.error));
      switch (error.status) {
        case 400: {
          setInputErrors((prev) => ({
            ...prev,
            oldPassword: 'incorrect password',
          }));
          break;
        }
        case "FETCH_ERROR":{
          dispatch(action.AppModal.openModal(ModalType.error));
          dispatch(action.AppModal.updateMessages(["cannot connect to server"]));
          break;
        }
        case 403:{
          dispatch(action.AppModal.openModal(ModalType.error));
          const data = error.data as any;
          dispatch(action.AppModal.updateMessages(data.message));
          break;
        }
      }
      result.reset();
      return;
    }
    if (isSuccess) {
      dispatch(action.AppModal.openModal(ModalType.success));
      result.reset();
      return;
    }
  }, [result]);

  const handleInputChange = useCallback(
    async (value: string, name?: string) => {
      setInputData((prev) => ({ ...prev, [`${name}`]: value }));
    },
    []
  );

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleSaveChangeClick = async () => {
    const { result, error } = await validatePasswordData(inputData);
    if (result) {
      setInputErrors({ ...defaultErrorMessage });
      await changePassword(inputData);
      return;
    }
    setInputErrors({ ...error });
  };

  const handleClearClick = async () => {
    setInputData({ ...defaultInputData });
    setInputErrors({ ...defaultErrorMessage });
  };

  return (
    <>
      <div className="UserPage__SecurityPasswordSection">
        <div className="SecuritySection">
          <p className="SecuritySection__Label">User Password</p>
          <p className="SecuritySection__Text">********</p>
        </div>
        <Button
          className="UserPage__Security__ConfirmButton"
          onClick={handleClick}
          type="outlined"
        >
          {isExpanded ? 'Cancel' : 'Change Password'}
        </Button>
      </div>
      <Collapsible
        className="SecuritySection__DataChangeArea PasswordArea"
        direction="vertical"
        showed={isExpanded}
      >
        <div className="SecuritySection__DataInput">
          <TextField
            type="password"
            label="old password"
            name="oldPassword"
            value={inputData.oldPassword}
            onValueChange={handleInputChange}
            error={inputErrors.oldPassword}
          />
          <TextField
            type="password"
            label=" new password"
            name="newPassword"
            value={inputData.newPassword}
            onValueChange={handleInputChange}
            error={inputErrors.newPassword}
          />
          <TextField
            type="password"
            label=" confirm password"
            name="confirmPassword"
            value={inputData.confirmPassword}
            onValueChange={handleInputChange}
            error={inputErrors.confirmPassword}
          />
        </div>
        <div className="SecuritySection__DataControlBox">
          <LoadingButton
            onClick={handleSaveChangeClick}
            isLoading={result.isLoading}
          >
            Save Change
          </LoadingButton>
          <Button
            type="outlined"
            variant="secondary"
            onClick={handleClearClick}
          >
            Clear
          </Button>
        </div>
      </Collapsible>
    </>
  );
});
